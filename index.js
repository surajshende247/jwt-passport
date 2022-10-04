import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json())

// middleware to verify token
const verifyJWT = async (req, res, next) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message
    });
    return;
  }
  next();
};

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  // put route logic here

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1m' });

  res.json({
    status: 'success',
    token,
  });
});

// verifyJWT middleware will be called before this route
app.post('/test', verifyJWT, async (req, res) => {
  // put route logic here
  res.json({
    status: 'success',
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
})
