require('dotenv').config();
const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const fs = require('fs');
const path = require('path');
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resumeData = require('../config/resume-data.js');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

// Get /admin - check login (modified for testing)
const authMiddleware = (req, res, next) => {
  // For testing purposes, always authorize
  console.log('Auth middleware bypassed for testing');
  next();
};

// Get /admin - login page
router.get('/admin', async (req, res) => {
  const locals = {
    title: 'Admin page',
    description: 'nothing.',
  };

  try {
    res.render('admin/index', { locals, layout: adminLayout });
  } catch (err) {
    console.error(err);
  }
});

// Post /admin - check login
router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id }, // payload
      jwtSecret, // secret key
      { expiresIn: '1h' } // options
    );

    console.log('JWT_SECRET exists: ', !!process.env.JWT_SECRET);

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Post /admin - dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'test description.',
    };

    // Mock data for testing
    const data = [];

    res.render('admin/dashboard', {
      locals, // passing data to template
      data,
      layout: adminLayout,
    });
  } catch (err) {
    console.error(err);
  }
});

// GET /admin - create new post
router.get('/add-post', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'test description.',
    };

    const data = await Post.find();
    res.render('admin/add-post', {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (err) {
    console.error(err);
  }
});

// POST /admin - create new post
router.post('/add-post', authMiddleware, async (req, res) => {
  try {
    const { title, body } = req.body;

    // Varify input text
    if (!title || !body) {
      return res.status(400).json({
        message: 'Title and body are required.',
      });
    }

    await Post.create({
      title,
      body,
      // author: req.user._id,
      createdAt: new Date(),
    });

    req.flash('success', 'Post created successfully');
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error creating post: ', err);

    req.flash('error', 'Failed to create post');
    res.status(500).redirect('/dashboard');
  }
});

// GET admin - edit post
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Edit post',
      description: 'test description.',
    };

    const data = await Post.findOne({
      _id: req.params.id,
    });

    res.render('admin/edit-post', {
      locals,
      data,
      currentRoute: req.path,
      layout: adminLayout,
    });
  } catch (err) {
    console.error(err);
  }
});

// PUT admin - edit post
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    res.redirect(`/edit-post/${req.params.id}`);
  } catch (err) {
    console.error(err);
  }
});

// router.post('/admin', async (req, res) => {
// 	try {

// 		const { username, password } = req.body;
// 		console.log(req.body);

// 		if (req.body.username === 'admin' && req.body.password === 'password') {
// 			res.send('You are logged in.')
// 		} else {
// 			res.send('Wrong user.')
// 		}

// 	} catch (err) {
// 		console.error(err);
// 	}
// });

// POST /register
router.post('/resgister', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.log('Registration Error: ', err);

    if (err.code === 11000) {
      return res.status(409).json({ message: 'User already in use.' });
    }

    res.status(500).json({
      message: 'Internal server error.',
    });
  }
});

// DELETE /admin - delete post
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
  }
});

// Error [ERR_HTTP_HEADERS_SENT]: 서버가 2개 이상의 res를 보낼 때 발생!

// GET admin - edit about page
router.get('/edit-about', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Edit About Information',
      description: 'Edit your personal information for the About page',
    };

    res.render('admin/edit-about', {
      ...resumeData,
      locals,
      layout: adminLayout,
    });
  } catch (err) {
    console.error(err);
  }
});

// PUT admin - update about information
router.put('/update-about', authMiddleware, async (req, res) => {
  try {
    // Process form data
    const { name, email, phone, location, Interests } = req.body;

    // Process experiences array
    const experiences = [];
    if (req.body.experiences) {
      const expKeys = Object.keys(req.body.experiences);
      for (let i = 0; i < expKeys.length; i++) {
        const responsibilities = [];
        if (req.body.experiences[i].responsibilities) {
          const respKeys = Object.keys(
            req.body.experiences[i].responsibilities
          );
          for (let j = 0; j < respKeys.length; j++) {
            responsibilities.push(req.body.experiences[i].responsibilities[j]);
          }
        }

        experiences.push({
          title: req.body.experiences[i].title,
          company: req.body.experiences[i].company,
          startDate: req.body.experiences[i].startDate,
          endDate: req.body.experiences[i].endDate,
          responsibilities,
        });
      }
    }

    // Process projects array
    const projects = [];
    if (req.body.projects) {
      const projKeys = Object.keys(req.body.projects);
      for (let i = 0; i < projKeys.length; i++) {
        const description = [];
        if (req.body.projects[i].description) {
          const descKeys = Object.keys(req.body.projects[i].description);
          for (let j = 0; j < descKeys.length; j++) {
            description.push(req.body.projects[i].description[j]);
          }
        }

        // Process technologies (convert comma-separated string to array)
        let technologies = [];
        if (req.body.projects[i].technologies) {
          technologies = req.body.projects[i].technologies
            .split(',')
            .map(tech => tech.trim());
        }

        projects.push({
          name: req.body.projects[i].name,
          startDate: req.body.projects[i].startDate,
          endDate: req.body.projects[i].endDate,
          link: req.body.projects[i].link || '',
          description,
          technologies,
        });
      }
    }

    // Process education array
    const education = [];
    if (req.body.education) {
      const eduKeys = Object.keys(req.body.education);
      for (let i = 0; i < eduKeys.length; i++) {
        education.push({
          institution: req.body.education[i].institution,
          degree: req.body.education[i].degree,
          startDate: req.body.education[i].startDate,
          endDate: req.body.education[i].endDate,
          gpa: req.body.education[i].gpa || '',
          logo: req.body.education[i].logo || '',
        });
      }
    }

    // Process certifications array
    const certifications = [];
    if (req.body.certifications) {
      const certKeys = Object.keys(req.body.certifications);
      for (let i = 0; i < certKeys.length; i++) {
        certifications.push({
          name: req.body.certifications[i].name,
          organization: req.body.certifications[i].organization,
          dateEarned: req.body.certifications[i].dateEarned,
          validUntil: req.body.certifications[i].validUntil || '',
          link: req.body.certifications[i].link || '',
        });
      }
    }

    // Create updated resume data object
    const updatedResumeData = {
      name,
      email,
      phone,
      location,
      Interests,
      experiences,
      projects,
      education,
      certifications,
    };

    // Convert to JavaScript code string
    const resumeDataString = `const resumeData = ${JSON.stringify(
      updatedResumeData,
      null,
      2
    )};

module.exports = resumeData;`;

    // Write to file
    const resumeDataPath = path.join(__dirname, '../config/resume-data.js');
    fs.writeFileSync(resumeDataPath, resumeDataString);

    req.flash('success', 'About information updated successfully');
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error updating about information:', err);
    req.flash('error', 'Failed to update about information');
    res.redirect('/edit-about');
  }
});

// GET /admin - logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  // res.json({ message: 'Logout successful.' });
  res.redirect('/');
});

module.exports = router;
