const express = require("express");
const db = require("./config/db");
const userRoute = require("./routes/userRoute");
const session = require("express-session");
const localStrategyInitializer = require("./middlewares/userValidate");
const passport = require("passport");
const productRoute = require("./routes/productRoutes");

const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(session({secret: "secret-key"}));
localStrategyInitializer(passport)

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRoute);
app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(8005, async () => {
  console.log("listening on port 8005");

  await db.sync();
  console.log("database connection");
});