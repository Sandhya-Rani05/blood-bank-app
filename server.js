// const express = require("express");
// const dotenv = require("dotenv");
// const colors = require("colors");
// const morgan = require("morgan");
// const cors = require("cors");
// const connectDB = require("./config/db");
// //dot config
// dotenv.config({ path: "./config/" });

// //mongodb connection
// connectDB();

// //rest object
// const app = express();

// //middlewares
// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));

// //routes
// // 1 test route , get method can be used in browser only
// // app.get('/',(req,res) => {
// //      res.status(200).json({
// //         message:"Welcome to Blood Bank App",
// //      });
// // });
// app.use("/api/v1/test", require("./routes/testRoutes"));
// app.use("/api/v1/auth", require("./routes/authRoutes"));
// //port
// const PORT = process.env.PORT || 8080;

// //listen
// app.listen(PORT, () => {
//   console.log(
//     `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`
//       .bgBlue.white
//   );
// });
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Ensure required environment variables are present
if (!process.env.PORT || !process.env.MONGO_URI) {
  console.error("Error: Environment variables PORT or MONGO_URI are not defined");
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

//static folder
app.use(express.static(path.join(__dirname, "./client/build")));

//static routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.NODE_ENV} Mode On Port ${PORT}`.bgBlue.white
  );
});
