const app = require("./app");
const port = process.env.PORT;
// Settting up the database
const mongoose = require("mongoose");
console.log(process.env.DATABASE_LOCAL);
const dbCOnnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to the server");
  }
};
dbCOnnection();
console.log("Connected to database");
// Initializing the server
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
