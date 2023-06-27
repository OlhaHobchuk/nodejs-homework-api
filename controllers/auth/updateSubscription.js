const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const changedSubscription = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  res.status(200).json(changedSubscription);
};

module.exports = updateSubscription;
