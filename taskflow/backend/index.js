
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/taskflow", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashed });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Пользователь уже существует" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Неверные данные" });
  }
  const token = jwt.sign({ id: user._id }, "secret123");
  res.json({ token });
});

app.listen(5000, () => console.log("Сервер запущен на http://localhost:5000"));
