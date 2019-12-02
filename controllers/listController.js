const express = require("express");
const router = express.Router();

const db = require("../models/index");

router.get("/list", (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }

  db.Item.findAll({ where: { UserId: req.user.id } })
    .then(items => {
      res.render("list/index", {
        user: req.user,
        items: items
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.post("/list", (req, res) => {
  if (!req.user) {
    return res.status(403).end();
  }

  db.Item.create({ name: req.body.name, UserId: req.user.id })
    .then(() => {
      return db.Item.findAll({ where: { UserId: req.user.id } })
    })
    .then(items => {
      res.render("list/index", {
        user: req.user,
        items: items
      });
    });
});

module.exports = router;
