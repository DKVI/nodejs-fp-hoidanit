import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/APIController";

let router = express.Router();

const initAPI = (app) => {
  router.get("/users", getAllUsers);
  router.post("/create-user", createUser);
  router.put("/update-user/:id", updateUser);
  router.delete("/delete-user/:id", deleteUser);
  return app.use("/api/v1/", router);
};

export default initAPI;
