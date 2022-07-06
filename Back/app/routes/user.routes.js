const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

const usersController = require("../controllers/user.controller");

module.exports = function(app) {
  const users = require("../controllers/user.controller");
  var router = require("express").Router();
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api", (req, res) => {
  //   res.json({ message: "Test api" });
  // });

  // app.get("/api/test/all", controller.allAccess);

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );
    // Retrieve all user
    router.get("/", controller.findAll);
    // Retrieve a single user with id
    router.get("/:id", users.findByPk);
    // Update a user with id
    router.patch("/:id", users.update);
    // Delete a user with id
    router.delete("/:id", users.delete);
    // Delete all users
    router.delete("/", users.deleteAll);
    app.use('/api/users', router);

    // router.get(
    //   "/comptes/:id/:userId",
    //   authJwt.verifyToken,

    //   compteController.addToComptes
    // );
  // app.get(
  //   "/api/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
