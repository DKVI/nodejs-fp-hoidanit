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
  return res.send("call post users");
};

export { getHomePage, getDetailUserPage, createUser };
