const express = require('express');
let cors = require('cors');
const bcrypt = require('bcrypt');

const User = require('./models/user');
const router = express.Router();

const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const errorController = require('./controllers/error');

const app = express();
const ports = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
    next();
})

const loginRoutes = require('./routes/login');
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     console.log('HI IM IN THE SERVER');
//     try {
//       const [userRows] = await User.findByCredentials(email);
  
//       if (userRows.length === 0) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }
  
//       const user = userRows[0];
//       const isPasswordValid = await bcrypt.compare(password, user.password);
  
//       if (isPasswordValid) {
//         // You might generate a token or set a session here, depending on your authentication strategy
//         res.status(200).json({ message: 'Login successful', user });
//       } else {
//         res.status(401).json({ error: 'Invalid credentials' });
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
// });


app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => {
    console.log(`Listening on port ${ports}`)
})

// module.exports = router;
