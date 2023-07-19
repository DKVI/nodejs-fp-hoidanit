import express from "express";
import {
  getHomePage,
  getDetailUserPage,
  createUser,
  deleteUser,
  editUser,
  updateUser,
  getUploadPage,
  handleUploadFile,
} from "../controller/homeController";
import multer from "multer";
import path from "path";
const appRoot = require("app-root-path");

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/images/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });

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
  router.get("/upload", getUploadPage);
  router.post(
    "/upload-single-pic",
    upload.single("input-single-file"),
    handleUploadFile
  );

  return app.use("/", router);
};

export default initWebRoutes;
