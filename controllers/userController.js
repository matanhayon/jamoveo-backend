function getProfile(req, res) {
  const { username, role } = req.user;
  res.status(200).json({ message: `Welcome, ${username}`, role });
}

module.exports = { getProfile };
