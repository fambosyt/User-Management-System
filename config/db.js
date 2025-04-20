const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Datenbank verbunden');
  } catch (error) {
    console.error('Fehler bei der Verbindung mit der Datenbank:', error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;