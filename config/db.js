// const mongoose = require('mongoose');
// const colors = require('colors');

// const connectDB = async () => {
//      try{
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log(`Connected to database ${mongoose.connection.host}`);
//      } catch(error){
//         console.log(`MongoDB Database error ${error}`.bgRed.white)
//      }
// }

// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
   } catch (error) {
      console.error(`Error: ${error.message}`.red.bold);
      process.exit(1);
   }
};

module.exports = connectDB;
