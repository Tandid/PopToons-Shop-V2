import bcrypt from "bcryptjs";
import { User } from "./data.interface";

const users: User[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];

export default users;
