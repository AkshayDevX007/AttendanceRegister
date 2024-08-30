import { Hono } from "hono";
import { logger } from "hono/logger";
import { connectDb } from "./db/connectDb";
import user from "./controller/userController";
import attendance from "./controller/attendanceController";


const app = new Hono();

// middlewares
app.use(logger());

// database connection
connectDb();

// Routes
app.route("/api/v1", user);
app.route("/api/v1", attendance);



export default {
  port: process.env.PORT || 8000,
  fetch: app.fetch,
};


console.log("🔥 bun server is running on port 8000");