export const protect = async (req, res, next) => {
  try {
    // Clerk may give req.auth or req.auth() depending on setup
    const authData = typeof req.auth === "function" ? req.auth() : req.auth;

    const userId =
      authData?.userId ||
      authData?.user_id || // some setups use this
      req.userId ||        // fallback if someone set it earlier
      null;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Attach userId to req for future controllers
    req.userId = userId;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
