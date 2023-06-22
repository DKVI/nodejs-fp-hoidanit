import express from "express";
import {
  getHomePage,
  getDetailUserPage,
  createUser,
  deleteUser,
  editUser,
  updateUser,
} from "../controller/homeController";
let router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/detail/user/:id", getDetailUserPage);
  router.get("/about", (req, res) => {
    res.send("About page");
  });
  router.post("/delete-user/:id", deleteUser);
  router.get("/edit-user/:id", editUser);
  router.post("/create-new-user", createUser);
  router.post("/update-user/:id", updateUser);
  return app.use("/", router);
};

export default initWebRoutes;
