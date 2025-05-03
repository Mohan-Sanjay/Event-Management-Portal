const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  seminarHall: {
    type: String,
    enum: ['homije_baba', 'mahatma_ganthi', 'sir_c_v_raman'],
    required: true,  // Tied to one of the seminar halls
  },
  isActive: {
    type: Boolean,
    default: true,  // Whether the admin is active or not
  },
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
