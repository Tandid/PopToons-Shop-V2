import db from "../../utils/db";
import User from "../../models/user";
import users from "../../utils/users";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(users);
  await db.disconnect();
  res.send({ message: "seeded successfully!" });
};

export default handler;