# Blog with Node js

## Purpose
I began learning Node.js during my military service to build my own portfolio blog site. <br/>
It is for back-end development, authentication, and database about writing blogs.

## Information
- Project name: [hyunfinity.com](hyunfinity.com) <br/>
- Period: 2024.10 - 2024.12 <br/>
- Tech Stack: Node.js, css, ejs, express, MongoDB, AWS EC2

## Features
1. Create, read, update, and delete blog posts (CRUD)
2. Admin dashboard
4. Athentication
5. session cookie
6. Newsletter subscription api

## Image
![image1](https://github.com/user-attachments/assets/fc7d6cc1-b8bc-44a0-a7f7-6a20714a387c")

## Getting Started
1. Prerequisites
- Node.js (v14+ recommended)
- npm (comes with Node.js) or Yarn
- MongoDB (local or remote instance)

2. Clone the repository
``` bash
git clone https://github.com/jdh4601/blog-with-nodejs
cd blog-with-nodejs
```

3. Install npm
``` bash
npm install
```

4. Set environment variables (.env)
Create a .env file in the root directory.
``` bash
PORT=3000
MONGO_URI=<your MongoDB connection string>
SESSION_SECRET=<your session secret>
```

5. Run app locally
```bash
npm start
```

## Project structure
``` plaintext
my-node-blog/
├── public/             # Static files (CSS, images, icons, client-side JS)
├── views/              # EJS templates
│   ├── partials/       # Header, footer, etc.
│   └── pages/          # Page-specific templates
├── routes/             # Express routes 
├── models/             # Mongoose models
├── middleware/         # Custom middleware (authentication checks, etc.)
├── .env                # Environment variables
├── app.js              # Express app setup
├── package.json        
└── README.md
```

## Contact
Author: Donghyun Jeong <br/>
Website: hyunfinity.com <br/>
Email: jdh9490@gmail.com <br/>

Feel free to reach out if you have questions or feedback!
