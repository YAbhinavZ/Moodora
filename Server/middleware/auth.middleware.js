import jwt from "jsonwebtoken"

// ─── Auth Middleware ─────────────────────────────────────────────────────────
// Attached to any route that requires the user to be logged in.
// Reads the JWT from the Authorization header, verifies it,
// and attaches the decoded user id to req.user.
// ─────────────────────────────────────────────────────────────────────────────

export const protect = (req, res, next) => {
  try {
    // Authorization header looks like: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    // Verify signature + expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to the request so controllers can use it
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

