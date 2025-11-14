# Career Will 🎓

**Your Future, Designed by You.**

Career Will is an advanced AI-powered career guidance platform designed specifically for Indian students. It helps students make informed career decisions by combining exam data, aptitude testing, expert mentorship, and comprehensive career resources—all in one place.

![Career Will Banner](https://via.placeholder.com/1200x400/667eea/ffffff?text=Career+Will+-+AI+Career+Guidance+Platform)

---

## 🌟 Features

### 🎯 Core Features
- **Personalized Career Recommendations**: Get AI-driven career suggestions based on your exam scores, stream, and interests
- **Exam Analysis**: Support for 8+ major Indian exams (JEE, NEET, GATE, CLAT, CAT, UPSC, NDA, CDS)
- **Aptitude & Interest Tests**: Discover your strengths with interactive assessments
- **4-Year Career Roadmaps**: Step-by-step guidance for 10+ career paths
- **Career Simulator**: Explore "what-if" scenarios with salary projections
- **Mentor Directory**: Connect with industry experts and professionals
- **College Database**: Explore top colleges with ratings, cutoffs, and rankings
- **Admin Dashboard**: Analytics and student data tracking

### ✨ Technical Highlights
- Secure JWT-based authentication with bcrypt password hashing
- RESTful API architecture with 25+ endpoints
- Responsive design (mobile, tablet, desktop)
- Glassmorphism UI with smooth animations
- Real-time data processing and storage
- SQLite database with normalized schema

---

## 🚀 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Dynamic functionality
- **Bootstrap 5** - Responsive framework
- **Font Awesome** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Embedded database
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

### Architecture
- **MVC Pattern** - Separation of concerns
- **RESTful API** - Stateless communication
- **Single Page Application (SPA)** - Smooth user experience

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Step-by-Step Guide


### Default Port
The application runs on **port 5000** by default. The database (`database.sqlite`) is automatically created on first run with seed data.

---

## 🎯 Usage Guide

### For Students

1. **Register/Login**
   - Create an account with username, email, password, and class/stream
   - Secure login with JWT tokens

2. **Complete Your Profile**
   - Enter exam scores and educational details
   - Select your stream (Engineering, Medical, Law, etc.)

3. **Take Assessment Tests**
   - Aptitude Test: Logical reasoning and problem-solving
   - Interest Test: Discover career preferences
   - Get instant results with career matches

4. **Explore Careers**
   - Browse 50+ career options
   - Filter by stream, domain, salary range
   - Sort by demand, salary, or name

5. **View Career Roadmaps**
   - Year-by-year breakdown (4 years)
   - Skills, courses, certifications
   - Expected salary progression

6. **Use Career Simulator**
   - Input different scenarios
   - See projected outcomes
   - Plan your career path

7. **Connect with Mentors**
   - Browse expert profiles
   - Filter by expertise
   - View ratings and experience

### For Admins

1. **Access Admin Dashboard**
   - Navigate to `/admin.html`
   - View student statistics
   - Analyze exam submissions
   - Monitor system activity

---

## 📊 Project Structure

Career-Will/
├── server.js # Express backend with 25+ API endpoints
├── package.json # Dependencies and scripts
├── database.sqlite # SQLite database (auto-created)
├── .gitignore # Git ignore rules
├── README.md # Project documentation
│
├── index.html # Landing page with About section
├── login.html # User authentication
├── register.html # New user registration
├── welcome.html # Main dashboard after login
├── exam-details.html # Exam score submission
├── career-options.html # Career recommendations with filters
├── tests.html # Aptitude & Interest assessments
├── roadmap.html # 4-year career roadmaps
├── mentors.html # Mentor & college directory
├── simulator.html # Career scenario simulator
├── admin.html # Admin analytics dashboard
│
├── sorting.js # Advanced sorting algorithms
└── particle.js # Animated background (optional)

text

---

## 🗄️ Database Schema

### Tables

1. **users** - User authentication and profiles
   - id, username, email, password (hashed), class, created_at

2. **careers** - Career information database
   - id, name, description, stream, domain, demand, salary, education

3. **exams** - Student exam submissions
   - id, fullName, exam, marks, email, timestamp

4. **tests** - Test results and scores
   - id, userId, testType, score, answers, timestamp

5. **mentors** - Mentor profiles
   - id, name, expertise, experience, rating, contact

6. **colleges** - College database
   - id, name, location, rating, cutoff, fees, type

---

## 🔐 API Endpoints

### Authentication
POST /api/auth/register # Register new user
POST /api/auth/login # User login

text

### Careers
GET /api/careers/all # Get all careers
GET /api/careers/:id # Get career by ID
POST /api/careers # Add new career (admin)

text

### Exams
POST /api/exams # Submit exam data
GET /api/admin/exams # Get all submissions (admin)

text

### Tests
POST /api/tests/submit # Submit test results
GET /api/tests/:userId # Get user's test history

text

### Recommendations
POST /api/recommend # Get career recommendations

text

---

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effect
- **Dark Theme**: Eye-friendly color scheme (#141620 base)
- **Purple Gradient**: Primary brand colors (#667eea to #764ba2)
- **Animated Particles**: Dynamic background (optional)
- **Responsive Layout**: Mobile-first design
- **Smooth Transitions**: CSS animations for better UX

---

## 🎓 Key Learnings

This project helped me learn and implement:

- **Full-Stack Development**: End-to-end web application
- **RESTful API Design**: Scalable backend architecture
- **Database Design**: Normalization and relationships
- **Authentication & Security**: JWT, password hashing, input validation
- **Frontend Development**: Responsive UI/UX with JavaScript
- **Version Control**: Git workflow and GitHub collaboration
- **Problem Solving**: Debugging and optimization

---

## 🔮 Future Enhancements

### Short-term (Next 2-3 months)
- [ ] AI chatbot for career advice using OpenAI API
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Dark/Light theme toggle
- [ ] Export reports to PDF

### Medium-term (Next 6 months)
- [ ] Integration with real college admission data APIs
- [ ] Video call feature for mentor consultations
- [ ] Mobile app (React Native or Flutter)
- [ ] Machine learning for better recommendations
- [ ] Multi-language support (Hindi, Marathi, etc.)

### Long-term (1 year+)
- [ ] Collaboration with educational institutions
- [ ] Scholarship and internship listings
- [ ] Community forum for students
- [ ] AI-powered resume builder
- [ ] Career prediction based on market trends

---

## 🐛 Known Issues

- [ ] Admin dashboard doesn't refresh automatically (requires page reload)
- [ ] Particle.js may cause performance issues on low-end devices
- [ ] SQLite has limitations for concurrent users (consider PostgreSQL for production)

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Career Will:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - feel free to use it for learning and personal projects.

MIT License

Copyright (c) 2025 Ayush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

text

---

## 👨‍💻 Author

**Ayush**  
Information Technology Student | Full-Stack Developer | DSA Enthusiast

- 🎓 SPPU University
- 💼 LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- 🐱 GitHub: [Your GitHub](https://github.com/yourusername)
- 📧 Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Bootstrap** - Responsive framework
- **Font Awesome** - Icon library
- **SQLite** - Embedded database
- **Express.js** - Web framework
- **Node.js** - JavaScript runtime
- **Inspiration**: Built to help students like me make better career decisions

---

## 📸 Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)
*Modern landing page with particle animation and About section*

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Main dashboard with all features accessible*

### Career Recommendations
![Career Options](screenshots/careers.png)
*Filtered and sorted career recommendations*

### Assessment Tests
![Tests](screenshots/tests.png)
*Interactive aptitude and interest tests*

### Career Roadmap
![Roadmap](screenshots/roadmap.png)
*Year-by-year career progression path*

---

## 📊 Project Stats

- **Lines of Code**: ~5,000+
- **Files**: 16 core files
- **API Endpoints**: 25+
- **Database Tables**: 6
- **Career Paths**: 10+
- **Supported Exams**: 8+
- **Development Time**: 3 weeks

---

## 🚀 Deployment

### Local Development
node server.js

Access: http://localhost:5000
text

### Production Deployment

**Recommended Platforms:**
- **Heroku** (Free tier available)
- **Render** (Easy deployment)
- **Railway** (Modern platform)
- **Vercel** (Frontend hosting)

**Environment Variables Required:**
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=production

text

---

## 💡 Tips for New Users

1. Start with registration to access all features
2. Complete exam details for accurate recommendations
3. Take both aptitude and interest tests
4. Explore different career paths in the simulator
5. Check admin dashboard for insights (if you're admin)

---

## 🔗 Related Projects

Check out my other projects:
- [Hand Detection System](https://github.com/yourusername/hand-detection) - OpenCV & MediaPipe
- [E-commerce Website](https://github.com/yourusername/ecommerce) - Responsive shopping site
- [Portfolio Website](https://github.com/yourusername/portfolio) - Personal portfolio with particle effects

---

## 📞 Support

If you encounter any issues or have questions:
- 📧 Email: your.email@example.com
- 💬 Open an issue on GitHub
- 🌟 Star the repo if you found it helpful!

---

<div align="center">

**⭐ If this project helped you, please star the repository! ⭐**

Made with ❤️ by Ayush | © 2025 Career Will

[⬆ Back to Top](#career-will-)

</div>
