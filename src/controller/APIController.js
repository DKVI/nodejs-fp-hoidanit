import pool from "../configs/connectDB";
let getAllUsers = async (req, res) => {
  const [users] = await pool.execute("SELECT * FROM `users`");
  return res.status(200).json({ users: users });
};

let createUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  await pool.execute(
    `INSERT INTO users(firstName, lastName, email, address) VALUES ( ?, ?, ?, ?)`,
    [firstName, lastName, email, address]
  );
  return res.status(200).json({ message: "Access Create User" });
};

let updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(400).json({ message: "Missing fields" });
  }
  await pool.execute(
    `UPDATE users
  SET firstName = ?, lastName = ?, email = ?, address = ?
  WHERE id = ?;`,
    [firstName, lastName, email, address, userId]
  );
  return res.status(200).json({ message: "update successfully" });
};

let deleteUser = async (req, res) => {
  const userId = req.params.id;
  pool.execute("delete from users where id = ?", [userId]);
  return res.status(200).json({ message: "delete successfully" });
};

export { getAllUsers, createUser, updateUser, deleteUser };
