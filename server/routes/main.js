const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const helpers = require('../helpers/routeHelpers');
const resumeData = require('../config/resume-data.js');

// GET /home
router.get('/', async (req, res) => {
	try {
		const locals = {
			title: "The hyunfinity world",
			description: "Welcome to Donghyun's blog!"
		};
		
		res.render('index', { 
			currentRoute: '/',
			locals 
		});
		
	} catch (err) {
		console.error(err);
	}
});

// GET /post/:id
router.get('/post/:id', async (req, res) => {
		
	try {
		// get id parameter from URL route
		let slug = req.params.id;
		// MongoDB query
		const data = await Post.findById({ _id: slug });
		
		const locals = {
			title: data.title,
			description: "Welcome to Donghyun's blog!",
			currentRoute: `/post/${slug}`
		};
		
		res.render('post', { 
			locals, 
			data, 
			currentRoute: locals.currentRoute
		});
		
	} catch (err) {
		console.error(err);
	}
});

// GET /about
router.get('/about', (req, res) => {
	res.render('about', resumeData);
});

// GET /thoughts
router.get('/thoughts', async (req, res) => {
	try {
		// Pagination controller
		const limit = 5;
		const page = parseInt(req.query.page) || 1;
		const startIndex = (page - 1) * limit
		const totalPosts = await Post.countDocuments();
		const totalPages = Math.ceil(totalPosts / limit);
		const hasNextPage = page < totalPages ? page + 1 : null;
		
		const data = await Post.find()
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip(startIndex);
		
		res.render('thoughts', {
			currentRoute: '/thoughts', // 현재 페이지 식별 -> nav bar에 표시
			current: page,
			nextPage: hasNextPage,
			data
		});
		
	} catch (err) {
		console.error(err);
	}
});

// GET /projects
router.get('/projects', (req, res) => {
	res.render('projects', {
		currentRoute: '/projects'
	});
});

// GET /success
router.get('/success', (req, res) => {
	res.render('success');
});

module.exports = router;