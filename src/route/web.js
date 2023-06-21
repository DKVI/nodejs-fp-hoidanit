import express from "express";
import { getHomePage } from "../controller/homeController";
let router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/about", (req, res) => {
    res.send("About page");
  });
  return app.use("/", router);
};

export default initWebRoutes;
