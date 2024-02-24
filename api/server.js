const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // To use environment variables for sensitive information

const app = express();
app.use(express.json());

// cors from frontend deployment url
const corsOptions = {
  origin: ["https://mydunamis.vercel.app", "http://localhost:3000"], // Add "http://" or "https://" as appropriate
  methods: ["POST", "GET"], // Specify each method as a separate item in the array
  credentials: true,
};

app.use(cors(corsOptions));

// Environment variables
const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

// MongoDB connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(console.error);

// Import models
const { Student, Teacher, CoOpRepresentative } = require('./models/User');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Generalized user registration
const registerUser = async (Model, req, res) => {
  try {

    // Create new user with hashed password; everything is hashed with the pre hook
    const user = new Model(req.body);

    // Save the new user
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Generalized user login
const loginUser = async (Model, role, req, res) => {
  try {
    const user = await Model.findOne({ email: req.body.email });
    if (!user) {
      console.log("No user found with this email");
      return res.status(401).json({ error: 'No user found with this email' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      console.log("Password incorrect");
      return res.status(401).json({ error: 'Password is incorrect' });
    }
    console.log("Password match");

		//it just throws up when I pass in Model.name raw idk why but this is O(1) so it dosnt matter :P

    const payload = { id: user._id, role }; // Include the user role in the JWT payload

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    // Send the token and role back to the client
    res.json({ token, role });
  } catch (error) {
    console.error("Error in loginUser function:", error);
    res.status(400).json({ error: error.message });
  }
};




// Registration endpoint for different user types
app.post('/:userType/register', async (req, res) => {
  const userType = req.params.userType;
  const userModels = {
    student: Student,
    teacher: Teacher,
    coOpRepresentative: CoOpRepresentative
  };
  if (userModels[userType]) {
    await registerUser(userModels[userType], req, res);
  } else {
    res.status(400).json({ error: "Invalid user type" });
  }
});

// Login endpoint for different user types
app.post('/:userType/login', async (req, res) => {
  const { userType } = req.params;
  const userModels = {
    student: { model: Student, role: 'student' },
    teacher: { model: Teacher, role: 'teacher' },
    coOpRepresentative: { model: CoOpRepresentative, role: 'co-op-manager' },
  };
  if (userModels[userType]) {
    console.log("logging in as", userModels[userType].role);
    await loginUser(userModels[userType].model, userModels[userType].role, req, res);
  } else {
    res.status(400).json({ error: "Invalid user type" });
  }
});

app.get("/", (req, res) => {
  res.json("DB");
});
// Example protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "Access to protected data" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
