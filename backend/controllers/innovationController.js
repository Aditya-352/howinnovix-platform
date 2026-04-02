const Innovation = require('../models/Innovation');

exports.getInnovations = async (req, res) => {
  try {
    const innovations = await Innovation.find().sort({ createdAt: -1 });
    res.json(innovations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInnovationById = async (req, res) => {
  try {
    const innovation = await Innovation.findById(req.params.id);
    if (!innovation) return res.status(404).json({ message: 'Not found' });
    res.json(innovation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createInnovation = async (req, res) => {
  try {
    const data = req.body;
    
    // multer files
    if (req.files && req.files.length > 0) {
      data.evidenceFiles = req.files.map(f => `/uploads/${f.filename}`);
    }

    const newInnovation = new Innovation(data);
    await newInnovation.save();

    res.status(201).json(newInnovation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
