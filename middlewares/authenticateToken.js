import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401).send({ errorMessage: "Invalid Access Token" });
  } else {
    jwt.verify(jwtToken, process.env.JWT_SECRET_TOKEN, async (err, payload) => {
      if (err) {
        res.status(401).send({ errorMessage: "Invalid Access Token" });
      } else {
        req.userMail = payload.email;
        next();
      }
    });
  }
};

export default authenticateToken;
