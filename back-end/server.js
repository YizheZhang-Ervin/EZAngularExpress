// require libs
let express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  path = require("path"),
  bodyParser = require("body-parser");

// connect to DB
mongoose.connect("mongodb://localhost:27017/test", {});
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

// start
const initApp = require("./app");
initApp(app);
app.listen(port, () => console.log(`start at ${port}`));
