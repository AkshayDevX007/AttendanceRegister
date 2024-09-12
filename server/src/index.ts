import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from 'hono/bun';
import { connectDb } from "./db/connectDb";
import user from "./controller/userController";
import attendance from "./controller/attendanceController";

const app = new Hono();

// middlewares
app.use("*", logger());

// database connection
connectDb();

// Routes
app.route("/api/v1", user);
app.route("/api/v1", attendance);

// Serve static files from the 'dist' directory
app.use('/*', serveStatic({ root: '.././client/dist' }));

// Catch-all route to serve index.html for any unmatched routes
app.get('*', async (c) => {
  const html = await Bun.file('.././client/dist/index.html').text();
  return c.html(html);
});

export default {
  port: process.env.PORT || 8000,
  fetch: app.fetch,
};

console.log(`🔥 Bun server is running on port ${process.env.PORT || 8000}`);