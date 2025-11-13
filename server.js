const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const SECRET_KEY = 'career-will-advanced-2024-secret-key-secure';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Database Setup
let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('❌ Database Error:', err);
  } else {
    console.log('✅ Database Connected');
    initializeDatabase();
  }
});

// Initialize Database Tables
function initializeDatabase() {
  db.serialize(() => {
    // Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      class TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Exam Submissions Table
    db.run(`CREATE TABLE IF NOT EXISTS exam_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      exam TEXT NOT NULL,
      marks REAL NOT NULL,
      stream TEXT NOT NULL,
      percentile REAL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id)
    )`);

    // Careers Table
    db.run(`CREATE TABLE IF NOT EXISTS careers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      stream TEXT NOT NULL,
      domain TEXT,
      salary INTEGER,
      demandLevel TEXT,
      skills TEXT NOT NULL
    )`);

    // Test Results Table
    db.run(`CREATE TABLE IF NOT EXISTS test_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      testType TEXT NOT NULL,
      score REAL,
      totalQuestions INTEGER,
      correctAnswers INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id)
    )`);

    // Mentors Table
    db.run(`CREATE TABLE IF NOT EXISTS mentors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      expertise TEXT NOT NULL,
      email TEXT NOT NULL,
      experience INTEGER,
      rating REAL DEFAULT 4.5
    )`);

    // Colleges Table
    db.run(`CREATE TABLE IF NOT EXISTS colleges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      stream TEXT NOT NULL,
      location TEXT,
      rating REAL,
      cutoff INTEGER
    )`);

    // Test Questions Table
    db.run(`CREATE TABLE IF NOT EXISTS test_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      testType TEXT NOT NULL,
      category TEXT,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      correctAnswer TEXT NOT NULL,
      difficulty TEXT
    )`);

    console.log('✅ All database tables created');
    seedInitialData();
  });
}

// Seed Initial Data
function seedInitialData() {
  db.get("SELECT COUNT(*) as count FROM careers", (err, row) => {
    if (err) return console.error(err);
    if (row.count === 0) {
      seedCareers();
      seedMentors();
      seedColleges();
      seedTestQuestions();
      console.log('✅ Initial data seeded');
    }
  });
}

function seedCareers() {
  const careers = [
    { name: 'Software Developer', desc: 'Build and maintain software applications and systems', stream: 'Engineering', domain: 'IT', salary: 1500000, demand: 'Very High', skills: 'Programming,Java,Python,DSA' },
    { name: 'Data Scientist', desc: 'Analyze data and build machine learning models', stream: 'Engineering', domain: 'IT', salary: 1800000, demand: 'Very High', skills: 'Python,ML,Statistics,SQL' },
    { name: 'Civil Engineer', desc: 'Design and manage infrastructure projects', stream: 'Engineering', domain: 'Civil', salary: 900000, demand: 'High', skills: 'CAD,Design,Project Management' },
    { name: 'Mechanical Engineer', desc: 'Design and manufacture mechanical systems', stream: 'Engineering', domain: 'Mechanical', salary: 1100000, demand: 'High', skills: 'CAD,Thermodynamics,Design' },
    { name: 'AI/ML Engineer', desc: 'Develop artificial intelligence and machine learning solutions', stream: 'Engineering', domain: 'AI/ML', salary: 2000000, demand: 'Very High', skills: 'Python,TensorFlow,Deep Learning' },
    { name: 'Doctor', desc: 'Provide medical care and treatment to patients', stream: 'Medical', domain: 'Clinical', salary: 1000000, demand: 'High', skills: 'Medical Knowledge,Empathy,Diagnosis' },
    { name: 'Surgeon', desc: 'Perform surgical procedures and operations', stream: 'Medical', domain: 'Surgery', salary: 1500000, demand: 'High', skills: 'Precision,Medical Knowledge,Experience' },
    { name: 'Lawyer', desc: 'Provide legal advice and representation', stream: 'Laws', domain: 'Legal', salary: 800000, demand: 'High', skills: 'Legal Knowledge,Communication,Advocacy' },
    { name: 'Chartered Accountant', desc: 'Manage financial accounts and taxation', stream: 'Commerce', domain: 'Finance', salary: 1200000, demand: 'High', skills: 'Accounting,Taxation,Audit' },
    { name: 'Investment Banker', desc: 'Manage investment portfolios and financial services', stream: 'Commerce', domain: 'Finance', salary: 2500000, demand: 'Very High', skills: 'Finance,Analysis,Negotiation' }
  ];

  careers.forEach(c => {
    db.run('INSERT INTO careers (name, description, stream, domain, salary, demandLevel, skills) VALUES (?,?,?,?,?,?,?)',
      [c.name, c.desc, c.stream, c.domain, c.salary, c.demand, c.skills]);
  });
}

function seedMentors() {
  const mentors = [
    { name: 'Rajesh Kumar', expertise: 'Software Development', email: 'rajesh@mentor.com', exp: 10, rating: 4.8 },
    { name: 'Priya Singh', expertise: 'Medical Field', email: 'priya@mentor.com', exp: 8, rating: 4.6 },
    { name: 'Amit Patel', expertise: 'Data Science', email: 'amit@mentor.com', exp: 7, rating: 4.7 },
    { name: 'Neha Verma', expertise: 'Civil Engineering', email: 'neha@mentor.com', exp: 9, rating: 4.5 },
    { name: 'Vikas Sharma', expertise: 'AI/ML', email: 'vikas@mentor.com', exp: 6, rating: 4.9 }
  ];

  mentors.forEach(m => {
    db.run('INSERT INTO mentors (name, expertise, email, experience, rating) VALUES (?,?,?,?,?)',
      [m.name, m.expertise, m.email, m.exp, m.rating]);
  });
}

function seedColleges() {
  const colleges = [
    { name: 'IIT Bombay', stream: 'Engineering', location: 'Mumbai', rating: 4.9, cutoff: 100 },
    { name: 'IIT Delhi', stream: 'Engineering', location: 'Delhi', rating: 4.9, cutoff: 100 },
    { name: 'AIIMS Delhi', stream: 'Medical', location: 'Delhi', rating: 4.8, cutoff: 650 },
    { name: 'Delhi University', stream: 'Laws', location: 'Delhi', rating: 4.7, cutoff: 150 },
    { name: 'NIT Trichy', stream: 'Engineering', location: 'Tamil Nadu', rating: 4.6, cutoff: 95 }
  ];

  colleges.forEach(c => {
    db.run('INSERT INTO colleges (name, stream, location, rating, cutoff) VALUES (?,?,?,?,?)',
      [c.name, c.stream, c.location, c.rating, c.cutoff]);
  });
}

function seedTestQuestions() {
  const questions = [
    { testType: 'INTEREST', category: 'Technical', q: 'Do you enjoy solving complex mathematical problems?', opts: 'Yes,Somewhat,No', ans: 'Yes', diff: 'Easy' },
    { testType: 'INTEREST', category: 'Creative', q: 'Do you like creative and design-oriented work?', opts: 'Yes,Somewhat,No', ans: 'Yes', diff: 'Easy' },
    { testType: 'INTEREST', category: 'Social', q: 'Do you prefer working with people?', opts: 'Yes,Somewhat,No', ans: 'Yes', diff: 'Easy' },
    { testType: 'INTEREST', category: 'Analytical', q: 'Do you enjoy data analysis?', opts: 'Yes,Somewhat,No', ans: 'Yes', diff: 'Easy' },
    { testType: 'INTEREST', category: 'Leadership', q: 'Do you like leading teams?', opts: 'Yes,Somewhat,No', ans: 'Yes', diff: 'Easy' },
    { testType: 'APTITUDE', category: 'Reasoning', q: 'What comes next: 2, 4, 6, 8, ?', opts: '10,12,14,16', ans: '10', diff: 'Easy' },
    { testType: 'APTITUDE', category: 'Quantitative', q: 'If 5x + 3 = 18, what is x?', opts: '2,3,4,5', ans: '3', diff: 'Easy' },
    { testType: 'APTITUDE', category: 'English', q: 'Choose correct sentence:', opts: 'He go to school,He goes to school,He going to school', ans: 'He goes to school', diff: 'Easy' },
    { testType: 'APTITUDE', category: 'Reasoning', q: 'Find odd one out: Lion, Tiger, Elephant, Eagle', opts: 'Lion,Tiger,Elephant,Eagle', ans: 'Eagle', diff: 'Medium' },
    { testType: 'APTITUDE', category: 'Quantitative', q: 'What is 15% of 200?', opts: '20,25,30,35', ans: '30', diff: 'Easy' }
  ];

  questions.forEach(q => {
    db.run('INSERT INTO test_questions (testType, category, question, options, correctAnswer, difficulty) VALUES (?,?,?,?,?,?)',
      [q.testType, q.category, q.q, q.opts, q.ans, q.diff]);
  });
}

// ============ AUTHENTICATION ENDPOINTS ============

// Register Endpoint
app.post('/api/auth/register', (req, res) => {
  const { username, email, password, class: userClass } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  db.run('INSERT INTO users (username, email, password, class) VALUES (?,?,?,?)',
    [username, email, hashedPassword, userClass || 'Class 10'],
    function(err) {
      if (err) {
        return res.status(400).json({ error: 'User already exists' });
      }
      const token = jwt.sign({ userId: this.lastID }, SECRET_KEY, { expiresIn: '30d' });
      res.status(201).json({
        message: 'Registration successful',
        userId: this.lastID,
        token: token
      });
    });
});

// Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '30d' });
    res.json({
      message: 'Login successful',
      userId: user.id,
      username: user.username,
      userClass: user.class,
      token: token
    });
  });
});

// ============ EXAM ENDPOINTS ============

// Submit Exam
app.post('/api/exam/submit', (req, res) => {
  const { userId, exam, marks, stream, percentile } = req.body;
  
  if (!userId || !exam || !marks || !stream) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  db.run('INSERT INTO exam_submissions (userId, exam, marks, stream, percentile) VALUES (?,?,?,?,?)',
    [userId, exam, marks, stream, percentile || 0],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: 'Exam submitted successfully',
        submissionId: this.lastID
      });
    });
});

// Get User Exams
app.get('/api/exam/user/:userId', (req, res) => {
  db.all('SELECT * FROM exam_submissions WHERE userId = ? ORDER BY createdAt DESC',
    [req.params.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

// ============ CAREER ENDPOINTS ============

// Get Career Recommendations
app.post('/api/careers/recommend', (req, res) => {
  const { stream, marks } = req.body;
  
  if (!stream || !marks === undefined) {
    return res.status(400).json({ error: 'Stream and marks required' });
  }
  
  db.all('SELECT * FROM careers WHERE stream = ? ORDER BY demandLevel DESC, salary DESC',
    [stream],
    (err, careers) => {
      if (err) return res.status(500).json({ error: err.message });
      
      let recommended = careers;
      if (marks >= 75) {
        recommended = careers.filter(c => c.demandLevel === 'Very High');
      } else if (marks >= 60) {
        recommended = careers.filter(c => c.demandLevel !== 'Low');
      }
      
      res.json({
        careers: recommended.slice(0, 10),
        totalMatches: recommended.length,
        marksPercentage: marks
      });
    });
});

// Get All Careers
app.get('/api/careers/all', (req, res) => {
  db.all('SELECT * FROM careers', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get Careers by Stream
app.get('/api/careers/stream/:stream', (req, res) => {
  db.all('SELECT * FROM careers WHERE stream = ?',
    [req.params.stream],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

// Get Careers by Domain
app.get('/api/careers/domain/:domain', (req, res) => {
  db.all('SELECT * FROM careers WHERE domain = ?',
    [req.params.domain],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

// ============ ROADMAP ENDPOINTS ============

// Get Career Roadmap
app.get('/api/roadmap/career/:careerId', (req, res) => {
  db.get('SELECT * FROM careers WHERE id = ?',
    [req.params.careerId],
    (err, career) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ career });
    });
});

// ============ TEST ENDPOINTS ============

// Get Test Questions
app.get('/api/tests/:testType', (req, res) => {
  db.all('SELECT * FROM test_questions WHERE testType = ? ORDER BY RANDOM() LIMIT 10',
    [req.params.testType],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

// Submit Test
app.post('/api/tests/submit', (req, res) => {
  const { userId, testType, score, totalQuestions, correctAnswers } = req.body;
  
  db.run('INSERT INTO test_results (userId, testType, score, totalQuestions, correctAnswers) VALUES (?,?,?,?,?)',
    [userId, testType, score, totalQuestions, correctAnswers],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, resultId: this.lastID });
    });
});

// Get Test Results
app.get('/api/tests/results/:userId', (req, res) => {
  db.all('SELECT * FROM test_results WHERE userId = ? ORDER BY timestamp DESC',
    [req.params.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

// ============ MENTOR ENDPOINTS ============

// Get All Mentors
app.get('/api/mentors/all', (req, res) => {
  db.all('SELECT * FROM mentors ORDER BY rating DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get Mentors by Domain
app.get('/api/mentors/domain/:domain', (req, res) => {
  db.all('SELECT * FROM mentors WHERE expertise LIKE ?',
    ['%' + req.params.domain + '%'],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

// ============ COLLEGE ENDPOINTS ============

// Get All Colleges
app.get('/api/colleges/all', (req, res) => {
  db.all('SELECT * FROM colleges ORDER BY rating DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get Colleges by Stream
app.get('/api/colleges/stream/:stream', (req, res) => {
  db.all('SELECT * FROM colleges WHERE stream = ? ORDER BY rating DESC',
    [req.params.stream],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

// ============ ADMIN ENDPOINTS ============

// Get All Students
app.get('/api/admin/students', (req, res) => {
  db.all('SELECT id, username, email, class, createdAt FROM users', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get All Exam Submissions
app.get('/api/admin/exams', (req, res) => {
  db.all('SELECT * FROM exam_submissions ORDER BY createdAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get All Test Results
app.get('/api/admin/tests', (req, res) => {
  db.all('SELECT * FROM test_results ORDER BY timestamp DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get Statistics
app.get('/api/admin/statistics', (req, res) => {
  db.all('SELECT COUNT(*) as totalUsers FROM users', (err, users) => {
    db.all('SELECT COUNT(*) as totalSubmissions FROM exam_submissions', (err, submissions) => {
      db.all('SELECT AVG(marks) as avgMarks FROM exam_submissions', (err, avgMarks) => {
        db.all('SELECT COUNT(*) as totalTests FROM test_results', (err, tests) => {
          res.json({
            totalUsers: users[0]?.totalUsers || 0,
            totalSubmissions: submissions[0]?.totalSubmissions || 0,
            totalTests: tests[0]?.totalTests || 0,
            avgMarks: Math.round(avgMarks[0]?.avgMarks || 0)
          });
        });
      });
    });
  });
});

// ============ ERROR HANDLING ============

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// ============ START SERVER ============

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║  🚀 CAREER WILL SERVER STARTED                         ║
║  Port: ${PORT}                                         ║
║  URL: http://localhost:${PORT}                        ║
║  Status: ✅ Running & Ready                            ║
╚════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
