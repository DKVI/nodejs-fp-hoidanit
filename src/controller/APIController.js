import pool from "../configs/connectDB";
let getAllUsers = async (req, res) => {
  const [users] = await pool.execute("SELECT * FROM `users`");
  return res.status(200).json({ users: users });
};

let createUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  await pool.execute(
    `INSERT INTO users(firstName, lastName, email, address) VALUES ( ?, ?, ?, ?)`,
    [firstName, lastName, email, address]
  );
  return res.status(200).json({ message: "Access Create User" });
};

export { getAllUsers, createUser };
