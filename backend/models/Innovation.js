const mongoose = require('mongoose');

const innovationSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String },
  phone: { type: String },
  category: { type: String, required: true },
  university: { type: String },
  city: { type: String },
  
  problemStatement: { type: String, required: true },
  solutionDesign: { type: String, required: true },
  
  patientReach: { type: String },
  outcomeImprovement: { type: Number },
  evidenceFiles: [{ type: String }],
  
  status: { type: String, default: 'Validation' }
}, { timestamps: true });

module.exports = mongoose.model('Innovation', innovationSchema);
