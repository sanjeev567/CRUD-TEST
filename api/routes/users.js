const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../modals/User");

// UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(`server error: ${err}`);
    }
  } else {
    res.status(401).json("You are not allowed to update !");
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has beed deleted !");
    } catch (err) {
      res.status(500).json(`server error: ${err}`);
    }
  } else {
    res.status(401).json("You are not allowed to delete !");
  }
});

// SEARCH
router.get("/search", async (req, res) => {
  const { q } = req.query;

  try {
    const results = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json("Server error " + err);
  }
});

router.get("/all/stats/page", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      users,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /users/sort
router.get("/sort/all", async (req, res) => {
  const field = req.query.field || "name";
  const order = req.query.order || "asc";
  const allowedFields = ["name", "email", "age", "isAdmin"];
  const allowedOrders = ["asc", "desc"];

  if (!allowedFields.includes(field)) {
    return res.status(400).json("Invalid field for sorting");
  }

  if (!allowedOrders.includes(order)) {
    return res.status(400).json("Invalid sorting order");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    // sorting and pagination
    const users = await User.find()
      .sort({ [field]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    // total no of Users
    const totalCount = await User.countDocuments();

    // total pages
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({ users, totalPages });
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;
