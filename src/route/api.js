import express from "express";
import { getAllUsers, createUser } from "../controller/APIController";

let router = express.Router();

const initAPI = (app) => {
  router.get("/users", getAllUsers);
  router.post("/create-user", createUser);
  return app.use("/api/v1/", router);
};

export default initAPI;
