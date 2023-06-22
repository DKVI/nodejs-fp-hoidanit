import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./route/web";
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
