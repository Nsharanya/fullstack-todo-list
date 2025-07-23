const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sharanya@12345',
  database: 'todo',
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Database connected');
});

app.post('/log-input', (req, res) => {
  console.log('Received from front:', req.body);

  const { input } = req.body; // ✅ inside the route!

  if (typeof input !== 'string' || !input.trim()) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  db.execute(
    'INSERT INTO todoItems (itemDescription) VALUES (?)',
    [input], 
    (err, result) => {
      if (err) {
        console.error('DB insert error:', err);
        return res.status(500).json({ error: err.message });
      }
      console.log('Insert OK! ID =', result.insertId);
      res.status(201).json({ status: 'ok', id: result.insertId });
    }
  );
});

app.listen(3000, () => console.log('Server running on port 3000'));

