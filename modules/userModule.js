// implementations of operations on MENU users

const { strict } = require("assert");
var dataStore = require("./getDatabase");
let user = dataStore.collection("users");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const saltRounds = 10;

// parameters email, username, password,role
const createUserItem = async (req, res, next) => {
  let email = req.query?.email;
  let username = req.query?.username;
  let password = req.query?.password;
  let role = req.query?.role;

  try {
    let userItem = await user.get(email);
    if (!userItem) {
      const hash = await bcrypt.hash(password, saltRounds);

      let result = await user.create({
        id: email,
        username,
        password: hash,
        role,
      });
      res.send(result);
    } else {
      throw new Error("Duplicate record");
    }
  } catch (err) {
    next(err);
  }
};

//required parameters : email, password
const authUserItem = async (req, res, next) => {
  let email = req.query.email;
  let password = req.query.password;

  try {
    let userItem = user.get(email);
    if (!userItem) {
      next(new Error("User Does not exist"));
    }
    let result = await bcrypt.compare(password, userItem.password);
    if (result) {
      //since this is a dummy project I have directly added secret key in code i.e "Walhalla"
      jwt.sign(
        { email: userItem.email, role: userItem.role },
        "Walhalla",
        { expiresIn: 60 * 60 }, //expires in one hour (in seconds)
        function (err, token) {
          if (err) {
            next(err);
          }
          let cookieOptions = {
            SameSite: "strict",
            httpOnly: true,
            secure: true,
            maxAge: 60000 * 60, //expires in one hour (in milli seconds)
          };
          res
            .cookie("token", token, cookieOptions)
            .send({ role: userItem.role });
        }
      );
    } else {
      next(new Error("Invalid credentials"));
    }
  } catch (err) {
    next(err);
  }
};

//authorizes the user
const authorizeUser = async (req, res, next) => {
  let token = req.headers.cookie;
  if (token) {
    token = token.split("=")[1];
  } else {
    next(new Error("Session expired! kindly login again"));
  }
  console.log("token  : ", token, typeof req, typeof res, typeof next);
  jwt.verify(token, "Walhalla", function (err, decoded) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      let authorizeDetails = {
        //this has what user cannot access
        admin: { notAllowed: [] },
        user: { notAllowed: ["menu", "modifyOrderItems"] },
      };
      try {
        const role = decoded.role;
        if (authorizeDetails[role]["notAllowed"].includes(role)) {
          next(new Error("You are not authorised"));
        }
      } catch (err) {
        next(err);
      }
    }
  });
};

module.exports = {
  createUserItem,
  authUserItem,
  authorizeUser,
};
