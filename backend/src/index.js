require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/civil', require('./routes/civil'));

app.get('/', (_req, res) => {
  res.json({ message: 'Arav API ажиллаж байна' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} порт дээр ажиллаж байна`);
});
