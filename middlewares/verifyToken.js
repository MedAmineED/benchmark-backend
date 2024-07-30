const jwt = require ("jsonwebtoken");


// Verify Token
function verifyToken(req, res, next) {
    const Token = req.headers.authorization;
    if (Token) {
      const token = Token.split(" ")[1];
      try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedPayload;
        next();
      } catch (error) {
        return res.status(401).json({ message: "invalid token, access denied" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "no token provided, access denied" });
    }
  };

  // Verify Token & Admin
  function VerifyTokenAdmin(req, res, next) {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json({ message: "not allowed, only admin" });
      }
    });
  }


  // Verify Token & Only User Himself
function verifyTokenOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json({ message: "not allowed, only user himself" });
    }
  });
}

// Verify Token & Authorization
function verifyTokenAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Only administrators are allowed" });
    }
  });
}

  
module.exports = {verifyToken, VerifyTokenAdmin, verifyTokenOnlyUser, verifyTokenAuthorization};