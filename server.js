const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const session = require("express-session");

const db = require("./models/index");

const PORT = process.env.PORT || 8080;

const app = express();

// View Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(session({
  secret: 'keyboard cat',
}))

// Static assets
app.use(express.static("public"));

// Authentication
app.use((req, res, next) => {
  if (!req.session.userId) {
    return next();
  }

  db.User.findByPk(req.session.userId)
    .then(user => {
      if (!user) {
        console.log("Cannot find user in session, destroying session.");
        return req.session.destroy(err => {
          if (err) throw err;
        });
      }

      req.user = user;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      next();
    });
});

// Routes
app.use(require("./controllers/staticController"));
app.use(require("./controllers/authController"));
app.use(require("./controllers/listController"));

// Synchronize my schema
db.sequelize.sync({ force: process.env.NODE_ENV !== "production" })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`==> Server listening at http://localhost:${PORT}/`);
    });
  });
