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
  origin: function(origin, callback) {
    console.log("Origin attempting to access the resource:", origin);
    const allowedOrigins = [
      "https://mydunamis.vercel.app",
      "http://localhost:3000",
      "https://www.mydunamis.ca/",
      "https://mydunamis.ca/"
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  methods: ["POST", "GET", "PUT"],
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

  if (!token) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.log(`Token verification failed: ${err.message}`);
      return res.sendStatus(403);
    }
    console.log(`Token verified successfully for user ID: ${user.id}`);
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

const getUserModel = (role) => {
  const models = {
    student: Student,
    teacher: Teacher,
    coOpRepresentative: CoOpRepresentative,
  };
  return models[role] || null;
};

const fetchUserProfile = async (model, userId) => {
  try {
    const user = await model.findById(userId);
    if (!user) {
      return { error: "User not found", statusCode: 404 };
    }
    // Optionally, exclude sensitive information
    const { password, ...profileData } = user.toObject();
    return { profileData, statusCode: 200 };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { error: "Server error", statusCode: 500 };
  }
};

const updateUserProfile = async (model, userId, updates) => {
  try {
    const user = await model.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return { error: "User not found", statusCode: 404 };
    }
    return { user, statusCode: 200 };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { error: "Server error", statusCode: 500 };
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
    coOpRepresentative: { model: CoOpRepresentative, role: 'coOpRepresentative' },
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




// opp logic
const Opportunity = require('./models/Opportunity');
app.get('/opportunities', async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to create a new opportunity
app.post('/opportunities', async (req, res) => {
  const opportunity = new Opportunity(req.body);
  try {
    const newOpportunity = await opportunity.save();
    res.status(201).json(newOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//coop logic
const CoOp = require('./models/CoOp');
app.get('/coops', async (req, res) => {
  try {
    const coops = await CoOp.find();
    res.json(coops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to create a new opportunity
app.post('/coops', authenticateToken, async (req, res) => {
  const coop = new CoOp(req.body);
  try {
    const newCoop = await coop.save();
    await CoOpRepresentative.findByIdAndUpdate(req.user.id, {
      $push: { availableCoopIds: newCoop._id }
    });
    res.status(201).json(newCoop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get('/my-coops', authenticateToken, async (req, res) => {
  try {
    // Find the CoOpRepresentative document for the authenticated user
    const coOpRepresentative = await CoOpRepresentative.findById(req.user.id);
    if (!coOpRepresentative) {
      return res.status(404).json({ message: "CoOpRepresentative not found" });
    }

    // Use the availableCoopIds array to fetch the corresponding co-ops
    const coOps = await CoOp.find({
      '_id': { $in: coOpRepresentative.availableCoopIds }
    });

    res.json(coOps);
  } catch (error) {
    console.error("Failed to fetch co-ops:", error);
    res.status(500).json({ message: error.message });
  }
});


// Fetch user profile
app.get('/profile', authenticateToken, async (req, res) => {
  const model = getUserModel(req.user.role);
  if (!model) {
    return res.status(400).json({ message: "Invalid user role" });
  }

  const { profileData, error, statusCode } = await fetchUserProfile(model, req.user.id);
  if (error) {
    return res.status(statusCode).json({ message: error });
  }
  res.json(profileData);
});

// Update user profile
app.put('/profile', authenticateToken, async (req, res) => {
  const model = getUserModel(req.user.role);
  if (!model) {
    return res.status(400).json({ message: "Invalid user role" });
  }

  const { user, error, statusCode } = await updateUserProfile(model, req.user.id, req.body);
  if (error) {
    return res.status(statusCode).json({ message: error });
  }
  res.json(user);
});



const SHSM = require('./models/SHSM'); // Adjust the path as necessary

// Fetch SHSMs that match a specific program
app.get('/shsms/:program', authenticateToken, async (req, res) => {
  const { program } = req.params;
  try {
    const shsms = await SHSM.find({ SHSMs: program });
    if (shsms.length === 0) {
      return res.status(404).json({ message: "No SHSMs found for this program" });
    }
    res.json(shsms);
  } catch (error) {
    console.error("Failed to fetch SHSMs:", error);
    res.status(500).json({ message: error.message });
  }
});
app.post('/shsms',  async (req, res) => {
  const shsm = new SHSM(req.body);
  try {
    const newSHSM = await shsm.save();
    res.status(201).json(newSHSM);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
