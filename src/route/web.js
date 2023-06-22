import express from "express";
import {
  getHomePage,
  getDetailUserPage,
  createUser
} from "../controller/homeController";
let router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/detail/user/:id", getDetailUserPage);
  router.get("/about", (req, res) => {
    res.send("About page");
  });
  router.post("/create-new-user", createUser);
  return app.use("/", router);
};

export default initWebRoutes;
