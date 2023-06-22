import pool from "../configs/connectDB";
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
  const { firstName, lastName, address } = req.body;
  await pool.execute(
    "INSERT INTO `users`(`firstName`, `lastName`, `address`) VALUES (?, ?, ?)",
    [firstName, lastName, address]
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
  const { firstName, lastName, address } = req.body;
  await pool.execute(
    "UPDATE `users` SET `firstName`=?,`lastName`=?,`address`=? WHERE id = ?",
    [firstName, lastName, address, req.params.id]
  );
  return res.redirect("/");
};

export {
  getHomePage,
  getDetailUserPage,
  createUser,
  deleteUser,
  editUser,
  updateUser,
};
