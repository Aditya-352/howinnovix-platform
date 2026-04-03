const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, name, title } = req.body;
    if (!email || !password || !name || !title) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const exists = await Doctor.findOne({ email });
    if (exists) {
        return res.status(400).json({ message: 'Email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({ email, password: hashedPassword, name, title });
    await doctor.save();
    
    const token = jwt.sign(
      { id: doctor._id, name: doctor.name, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(201).json({
      token,
      doctor: { id: doctor._id, name: doctor.name, email: doctor.email, title: doctor.title }
    });
  } catch (err) {
    console.error('❌ Detailed Registration Error:', err);
    res.status(500).json({ message: 'Server error during registration', detail: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check pass
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: doctor._id, name: doctor.name, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        title: doctor.title
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Seed utility to create exactly one doctor for testing
exports.seedDoctor = async (req, res) => {
  try {
    const exists = await Doctor.findOne({ email: 'admin@howinnovix.com' });
    if (exists) {
      return res.json({ message: 'Doctor already exists' });
    }
    const hashedPassword = await bcrypt.hash('password123', 10);
    const doc = new Doctor({
      email: 'admin@howinnovix.com',
      password: hashedPassword,
      name: 'Dr. Sarah Jenkins',
      title: 'Chief Medical Evaluator'
    });
    await doc.save();
    res.json({ message: 'Seeded test doctor admin@howinnovix.com / password123' });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
