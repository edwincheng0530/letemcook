const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.getAllUsers = async (req, res, next) => {
    try {
        const [allUsers] = await User.fetchAll();
        res.status(200).json(allUsers);
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postUser = async (req, res, next) => {
    try {
        const postResponse = await User.post(req.body.email, req.body.password);
        res.status(201).json(postResponse);
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log('HI IM IN THE SERVER');
    try {
      const [userRows] = await User.findByEmail(email);
      console.log(userRows);
      console.log(userRows.length);
      if (userRows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const user = userRows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        // You might generate a token or set a session here, depending on your authentication strategy
        return res.status(200).json({ message: 'Login successful', user });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}