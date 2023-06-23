import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./route/web";
import initAPI from "./route/api";
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoutes(app);
initAPI(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
