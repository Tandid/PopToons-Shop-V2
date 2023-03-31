import { User } from "./data.interface";
import bcrypt from "bcryptjs";

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
