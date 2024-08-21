const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser')
const bankRoutes = require('./routes/bankRoutes');
const ekycRoutes = require('./routes/ekycRoutes');
const nomineeRoutes = require('./routes/nomineeRoutes');
const faqRoutes = require('./routes/faqRoutes');
const referRoutes = require('./routes/referRoutes');
const rmRoutes = require('./routes/rmRoutes');
const helpSupportRoutes = require('./routes/helpSupportRoutes');
const termsRoutes = require('./routes/termsRoutes');
const privacyPolicyRoutes = require('./routes/privacyPolicyRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const userRoute=require('./routes/userRoute');
app.use('/api',userRoute)
app.use('/api/banks',bankRoutes)
app.use('/api', ekycRoutes);
app.use('/api', nomineeRoutes);
app.use('/api', faqRoutes);
app.use('/api', referRoutes);
app.use('/api', rmRoutes);
app.use('/api', helpSupportRoutes);
app.use('/api', termsRoutes);
app.use('/api', privacyPolicyRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

