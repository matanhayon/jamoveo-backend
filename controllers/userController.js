function getProfile(req, res) {
  const { username, role } = req.user;
  console.log(`User profile accessed: ${username}, Role: ${role}`);
  res.status(200).json({ message: `Welcome, ${username}`, role });
}

module.exports = { getProfile };
