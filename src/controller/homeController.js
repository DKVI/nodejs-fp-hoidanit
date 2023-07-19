import pool from "../configs/connectDB";
import multer from "multer";
import path from "path";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { users: rows });
};

let getDetailUserPage = async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  const [rows] = await pool.execute("SELECT * FROM `users` WHERE id = ?", [
    userId,
  ]);
  return res.send(JSON.stringify(rows));
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  console.log(req.body);
  await pool.execute(
    "INSERT INTO `users`(`firstName`, `lastName`,`email` , `address`) VALUES (?, ? ,?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await pool.execute("DELETE FROM `users` WHERE id = ?", [userId]);
  return res.redirect("/");
};

const editUser = async (req, res) => {
  const [user] = await pool.execute("SELECT * FROM `users` WHERE id = ?", [
    req.params.id,
  ]);
  return res.render("update.ejs", { user: user[0] });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "UPDATE `users` SET `firstName`=?,`lastName`=?, `email`=?,`address`=? WHERE id = ?",
    [firstName, lastName, email, address, req.params.id]
  );
  return res.redirect("/");
};

const getUploadPage = (req, res) => {
  return res.render("uploadFile.ejs");
};

const upload = multer().single("input-single-file");

const handleUploadFile = async (req, res) => {
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`
    );
  });
};

export {
  getHomePage,
  getDetailUserPage,
  createUser,
  deleteUser,
  editUser,
  updateUser,
  getUploadPage,
  handleUploadFile,
};
