const logoutController = async (req, res) => {
    try {      
      res.clearCookie('token');
      res.status(200).json({ message: 'Logged out successfully!', success: true });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error, success: false });
    }
  }

module.exports = logoutController;