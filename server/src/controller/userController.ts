import { Hono } from "hono";
import User from "../models/userModel";

const user = new Hono().basePath("/user");

// create user
user.post("/", async (c) => {
  const body = await c.req.parseBody();

  const { name, email, phone, unitName } = body;

  if (!name || !phone) {
    return c.json({ message: "name and phone are required" }, 400);
  }

  const existingUser = await User.findOne({ name });

  if (existingUser) {
    return c.json({ message: "User already exists" }, 409);
  }

  const existingUserByEmail = await User.findOne({ email });

  if (existingUserByEmail) {
    return c.json({ message: "User with this email already exists" }, 409);
  }

  const existingUserByPhone = await User.findOne({ phone });

  if (existingUserByPhone) {
    return c.json(
      { message: "User with this phone number already exists" },
      409
    );
  }

  const user = await User.create({
    name,
    email,
    phone,
    unitName,
  });

  return c.json(user, 201);
});

// get all users
user.get("/", async (c) => {
  const users = await User.find().sort({ createdAt: -1 });
  return c.json(users);
});

// get user by id
user.get("/:id", async (c) => {
  const user = await User.findById(c.req.param("id"));
  return c.json(user);
});

// update user
user.put("/:id", async (c) => {
  const id = c.req.param("id");
  const user = await User.findById(id);
  const body = await c.req.parseBody();
  const { name, email, phone, unitName } = body;

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      unitName,
    },
    { new: true }
  );

  return c.json(updatedUser);
});

// delete user
user.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    await User.findByIdAndDelete(id);
    return c.json({ message: "User deleted" });
  } catch (error) {
    return c.json({ message: "User not found" }, 404);
  }
});

export default user;
