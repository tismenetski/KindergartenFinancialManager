const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      userNewUrlParser: true, //Added because of deprecationWarning
      useCreateIndex: true, //Added because of course instructor added
      useUnifiedTopology: true, //Added because of deprecationWarning
      useFindAndModify: false, //  Added because of deprecationWarning
    }); // Added {userNewUrlParser: true} to disable the deprecationWarning
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); //Exit process with failure
  }
};

module.exports = connectDB;
