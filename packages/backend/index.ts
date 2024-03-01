import express from "express";
import session from "cookie-session";
import { api } from "./api";
import { auth } from "./api/auth";

const app = express();
app.use(
  session({
    secret: process.env["SESSION_SECRET"],
  })
);
app.use(auth);
app.use(api);

app.listen(3002, () => console.log("Server started"));
