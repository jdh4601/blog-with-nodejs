# Blog with Node.js

A full-stack personal blog and portfolio website built with Node.js, Express, and MongoDB.

## Purpose
I started learning Node.js in the military to build my own portfolio blog website. This project showcases my skills in backend development, database management, authentication, and full-stack web development.

## Project Information
- **Project Name:** [hyunfinity.com](https://hyunfinity.com)
- **Period:** October 2024 - Present
- **Repository:** [github.com/jdh4601/blog-with-nodejs](https://github.com/jdh4601/blog-with-nodejs)

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Template engine
- **CSS** - Styling
- **TypeIt** - Text animation library

### Authentication & Security
- **JWT (JSON Web Tokens)** - Secure authentication
- **bcrypt** - Password hashing
- **express-session** - Session management
- **connect-mongo** - MongoDB session store

### Additional Tools
- **Mailchimp Marketing API** - Newsletter integration
- **method-override** - HTTP verb support (PUT, DELETE)
- **cookie-parser** - Cookie handling
- **express-flash** - Flash messages
- **dotenv** - Environment variable management

### Deployment
- **AWS** - Cloud hosting platform

## Features

### 1. Blog Post Management (CRUD)
- Create, read, update, and delete blog posts
- Markdown support for post content
- Post timestamps (created/updated dates)
- Post pagination (5 posts per page)

### 2. Authentication System
- Secure user login with JWT tokens
- Password hashing with bcrypt
- Session-based authentication using cookies
- Protected admin routes with middleware
- Secure logout functionality

### 3. Admin Dashboard
- Post management interface
- Create new posts
- Edit existing posts
- Delete posts
- View all posts overview

### 4. About/Resume Page
- Dynamic resume data management
- Experience, projects, education, and certifications sections
- Editable through admin interface
- Persistent data storage

### 5. Newsletter Integration
- Mailchimp integration for subscriber management
- Newsletter signup functionality

### 6. Additional Pages
- Home page
- Thoughts/Blog listing with pagination
- Projects showcase
- Success confirmation page

## Screenshots
<img src="https://github.com/user-attachments/assets/e34fb3e7-f5ea-4b7a-931c-d7a782f8a9f3" alt="main" width="300" />
<img src="https://github.com/user-attachments/assets/36dc3376-1ac4-4973-99cd-97649cdd1c6b" alt="login" width="300" />
<img src="https://github.com/user-attachments/assets/3a75d4cc-a1f6-4185-9db2-a1d5a44d3dc3" alt="dashboard" width="300" />

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jdh4601/blog-with-nodejs.git
   cd blog-with-nodejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret_key
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Run the application**

   Development mode (with nodemon):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

5. **Access the application**

   Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
blog-with-nodejs/
├── app.js                      # Main application entry point
├── server/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── resume-data.js     # Resume/about page data
│   ├── helpers/
│   │   └── routeHelpers.js    # Route utility functions
│   ├── models/
│   │   ├── Post.js            # Post schema
│   │   └── User.js            # User schema
│   └── routes/
│       ├── admin.js           # Admin routes (protected)
│       └── main.js            # Public routes
├── views/                      # EJS templates
├── public/                     # Static files (CSS, images, JS)
└── package.json
```

## API Routes

### Public Routes
- `GET /` - Home page
- `GET /about` - About/Resume page
- `GET /thoughts` - Blog post listing (paginated)
- `GET /post/:id` - Individual blog post
- `GET /projects` - Projects showcase
- `GET /success` - Success confirmation page

### Admin Routes (Protected)
- `GET /admin` - Admin login page
- `POST /admin` - Admin login handler
- `GET /dashboard` - Admin dashboard
- `GET /add-post` - New post form
- `POST /add-post` - Create new post
- `GET /edit-post/:id` - Edit post form
- `PUT /edit-post/:id` - Update post
- `DELETE /delete-post/:id` - Delete post
- `GET /edit-about` - Edit about page form
- `PUT /update-about` - Update about information
- `POST /register` - User registration
- `GET /logout` - Logout handler

## Security Features
- JWT-based authentication
- Password hashing with bcrypt (10 salt rounds)
- HTTP-only cookies for token storage
- Session management with MongoDB store
- Protected admin routes with authentication middleware
- 1-hour token expiration
- 24-hour session expiration

## Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Development Tools
- **nodemon** - Auto-restart on file changes during development

## Future Enhancements
- Add comments system for blog posts
- Implement search functionality
- Add categories/tags for posts
- Image upload for posts
- Social media integration
- SEO optimization
- Analytics dashboard

## Contact
Author: Donghyun Jeong
Website: hyunfinity.com
Email: jdh9490@gmail.com

Feel free to reach out if you have questions or feedback!
