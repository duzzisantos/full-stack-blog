const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const db = require("./models");

//connect to database
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(
      err || "Error in connecting to database. Please check settings!"
    );
    process.exit();
  });

//cross origin resource options
var corsOptions = {
  origin: "https://localhost:4000",
};

//utilities
app.use(cors(corsOptions));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true , limit: "50mb"}));
app.use(methodOverride());
app.use(helmet());
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

//**s0#-5e00c--u*/9r///i**--t/998y */
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["self"],
      scriptSrc: ["'self'", "http://localhost:3000/"], //only scripts from this host
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      upgradeInsecureRequests: [],
      objectSrc: ["'none'"],
    },
  })
);

app.use(
  helmet.frameguard({
    action: "DENY",
  })
);
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.crossOriginResourcePolicy());
app.use(
  helmet.referrerPolicy({
    policy: "no-referrer",
  })
);

app.use(
  helmet.hsts({
    maxAge: 15552000,
    includeSubDomains: false,
    preload: true,
  })
);

//Test our server on local host
app.get("/", (req, res) => {
  res.send({
    message: "Blockhead server application",
    author: "Duzie Uche-Abba",
  });
});

app.post("/", (req, res) => {
  res.send({ message: "Works like a charm!" });
});

//api routes

require("./routes/blog")(app);
require("./routes/comments")(app);

//server connection
const PORT = 4000;
app.listen(PORT, (err) => {
  console.log("LISTENING TO PORT", PORT);
  if (err) {
    console.log(err);
  }
});
