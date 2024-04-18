const adminMiddleware = async (req, res, next) => {
  try {
    console.log(`Req use ${req.user}`);
    const adminRole = req.user.isAdmin;
    console.log(adminRole);
    if (!adminRole) {
      console.log("We are in");
      return res
        .status(403)
        .json({ message: "Access denied. User is not an admin." });
    }
    //  res.status(200).json({ msg: req.user.isAdmin });
    // If user is an admin, proceed to the next middleware
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
