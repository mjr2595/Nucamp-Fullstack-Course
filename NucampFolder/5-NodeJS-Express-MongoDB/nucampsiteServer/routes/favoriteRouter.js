const express = require("express");
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");
const cors = require("./cors");

const favoriteRouter = express.Router();

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .populate("user")
      .populate("campsites")
      .then((favorite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then((favDocument) => {
        if (favDocument) {
          req.body.forEach((favCampsite) => {
            if (!favDocument.campsites.includes(favCampsite._id)) {
              favDocument.campsites.push(favCampsite._id);
            }
          });
          favDocument
            .save()
            .then((favDocument) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favDocument);
            })
            .catch((err) => next(err));
        } else {
          Favorite.create({ user: req.user._id })
            .then((favDocument) => {
              req.body.forEach((favCampsite) => {
                favDocument.campsites.push(favCampsite._id);
              });
              favDocument
                .save()
                .then((favDocument) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(favDocument);
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end("PUT operation not supported on /favorites");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({ user: req.user._id })
      .then((response) => {
        res.statusCode = 200;
        if (!response) {
          res.setHeader("Content-Type", "text/plain");
          res.end("You do not have any favorites to delete.");
        } else {
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        }
      })
      .catch((err) => next(err));
  });

favoriteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end(`GET operation not supported on /favorites/${req.params.campsiteId}`);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOne({ user: req.user._id })
      .then((favDocument) => {
        if (favDocument) {
          // found one, check if present
          if (!favDocument.campsites.includes(req.params.campsiteId)) {
            favDocument.campsites.push(req.params.campsiteId);
            favDocument
              .save()
              .then((favDocument) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favDocument);
              })
              .catch((err) => next(err));
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end("That campsite is already in the list of favorites!");
          }
        } else {
          // didn't find, create new doc
          Favorite.create({ user: req.user._id, campsites: [req.params.campsiteId] })
            .then((favDocument) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favDocument);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end(`PUT operation not supported on /favorites/${req.params.campsiteId}`);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then((favDocument) => {
        if (favDocument) {
          /*
          const indexToDelete = favDocument.campsites.indexOf(req.params.campsiteId);
          if (indexToDelete !== -1) {
            favDocument.campsites.splice(indexToDelete, 1);
          }
          */
          favDocument.campsites = favDocument.campsites.filter((id) => id.toString() !== req.params.campsiteId);
          favDocument
            .save()
            .then((favDocument) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favDocument);
            })
            .catch((err) => next(err));
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("There are no favorites to delete!");
        }
      })
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
