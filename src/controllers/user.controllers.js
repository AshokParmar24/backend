const { createUser, findByUser } = require("../service/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createSession,
  updateSession,
  findOneSession,
} = require("../service/session.service");

const createNewUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      ...req.body,
      password: hashedPassword,
    };
    req.body.password = hashedPassword;
    const newUser = await createUser(userData);
    console.log("newUsernewUser", newUser);
    return res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (error) {
    throw error;
  }
};

const singInUser = async (req, res) => {
   try {
    const existUser = await findByUser({
      email: req?.body?.email,
      isActive: true,
    });

    if (!existUser) {
      return res
        .status(400)
        .json({ message: "User not  exists", status: false });
    }
    const matchPassword = await bcrypt.compare(
      req?.body?.password,
      existUser?.password
    );
    if (!matchPassword) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: false });
    }

    const token = jwt.sign(
      {
        email: existUser?.email,
        id: existUser?.id,
        role: existUser?.role,
      },
      process?.env?.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userAgent = req.headers["user-agent"];
    const ipAddress = req.ip || req.connection.remoteAddress;

    const existingSession = await findOneSession({
      userId: existUser._id,
      isActive: true,
    });

 
    if (existingSession) {
      await updateSession(
        { _id: existingSession._id },
        { $set: { isActive: false } }
      );
    }

    const session = await createSession({
      userId: existUser._id,
      jwtToken: token,
      ipAddress: ipAddress,
      userAgent: userAgent,
      isActive: true,
    });

    console.log("sessionsessionsession", session);

    res.status(200).json({
      message: "Login successful",
      status: true,
      user: {
        id: existUser.id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", status: false });
  }
};

module.exports = { createNewUser, singInUser };
