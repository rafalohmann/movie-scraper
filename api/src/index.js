require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const connectDB = require("./db");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

if (process.env.USE_CORS === "true") app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use("/api/movies", movieRoutes);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
