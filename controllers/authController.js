const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registrierungs-Controller
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Bitte alle Felder ausfüllen' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Benutzer existiert bereits' });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    res.status(201).json({
      message: 'Benutzer erfolgreich registriert',
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Benutzers' });
  }
};

// Login-Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Bitte alle Felder ausfüllen' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Benutzer nicht gefunden' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Erfolgreich eingeloggt',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Login' });
  }
};

module.exports = { registerUser, loginUser };