import { Hono } from "hono";
import { cors } from "hono/cors";
import { sessionMiddleware, CookieStore } from 'hono-sessions'
import { api } from "./api";
import auth from "./auth";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: ["http://localhost:5173"],
  })
);

const store = new CookieStore()

// @ts-ignore:next-line
app.use('*', sessionMiddleware({
  store,
  encryptionKey: process.env.SESSION_SECRET, // Required for CookieStore, recommended for others
  expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
  cookieOptions: {
    sameSite: 'Lax', // Recommended for basic CSRF protection in modern browsers
    path: '/', // Required for this library to work properly
    httpOnly: true, // Recommended to avoid XSS attacks
  },
}))

// controllers route
app.route('', api);
app.route('', auth)

export default {
  port: 3002,
  fetch: app.fetch,
};
