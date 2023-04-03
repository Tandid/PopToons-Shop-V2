// @ts-nocheck

import { NextApiRequest, NextApiResponse } from "next"; //TS
import Product from "../../models/Product";
import User from "../../models/User";
import db from "../../utils/db";
import products from "../../utils/products";
import users from "../../utils/users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(users);
  await Product.deleteMany();
  await Product.insertMany(products);
  await db.disconnect();
  res.send({ message: "seeded successfully!" });
};

export default handler;
