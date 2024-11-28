require('dotenv').config();
const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

// Get /admin - check login
const authMiddleware = (req, res, next) => {
	const token = req.cookies.token; // request로 받은 token
	
	if (!token) {
		// 401 : no auth credentials
		return res.status(401).json({ message: 'Unauthorized' });
	}
	
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized' });
		console.error(error);
	}
}

// Get /admin - login page
router.get('/admin', async (req, res) => {
	const locals = {
		title: "Admin page",
		description: "nothing."
	}
	
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
		res.status(500).json({ message: 'Internal server error.'})
	}
});

// Post /admin - dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
	try {
		const locals = {
			title: "Dashboard",
			description: "test description."
		}
		
		const data = await Post.find();
		res.render('admin/dashboard', {
			locals, // passing data to template
			data
		});
		
	} catch (err) {
		console.error(err);
	}
});

// GET /admin - create new post
router.get('/add-post', authMiddleware, async (req, res) => {
	try {
		const locals = {
			title: "Dashboard",
			description: "test description."
		}
		
		const data = await Post.find();
		res.render('admin/add-post', {
			locals,
			data,
			layout: adminLayout
		});
		
	} catch (err) {
		console.error(err);
	}
});

// POST /admin - create new post
router.post('/add-post', authMiddleware, async (req, res) => {
	try {
		
		const { title, body } = req.body; // 구조 분해 할당
		
		// Varify input text
		if (!title || !body) {
			return res.status(400).json({
				message: 'Title and body are required.'
			});
		}
		
		await Post.create({
			title,
			body,
			// author: req.user._id,
			createdAt: new Date()
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
router.get('/edit-post/:id', authMiddleware, async(req, res) => {
	try {
		
		const locals = {
			title: "Edit post",
			description: "test description."
		};
				
		const data = await Post.findOne({
			_id: req.params.id
		});
		
		res.render('admin/edit-post', {
			locals,
			data,
			currentRoute: req.path,
			layout: adminLayout
		})
		
	} catch (err) {
		console.error(err);
	}
})

// PUT admin - edit post
router.put('/edit-post/:id', authMiddleware, async(req, res) => {
	try {
		
		await Post.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			body: req.body.body,
			updatedAt: Date.now()
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
			return res.status(400).json({ message: 'Username and password are required!' });
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
			message: 'Internal server error.'
		});
	}	
});

// DELETE /admin - delete post
router.delete('/delete-post/:id', authMiddleware, async(req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id });
		res.redirect('/dashboard');
	} catch (err) {
		console.error(err);
	}
});

// Error [ERR_HTTP_HEADERS_SENT]: 서버가 2개 이상의 res를 보낼 때 발생!

// GET /admin - logout
router.get('/logout', (req, res) => {
	res.clearCookie('token');
	// res.json({ message: 'Logout successful.' });
	res.redirect('/');
})

module.exports = router;