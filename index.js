const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL bazaga ulanish
const db = mysql.createConnection({
    host: 'sql8.freesqldatabase.com',
    user: 'sql8777665',
    password: '6FjIuz37c5',
    database: 'sql8777665',
    port: 3306
});

// Test uchun
app.get('/', (req, res) => {
    res.send('Server ishlayapti!');
});

// POST orqali ma'lumot yozish
app.post('/register', (req, res) => {
    const { ism, yosh, guruh, oqituvchi_id } = req.body;
    const sql = "INSERT INTO oquvchi (ism, yosh, guruh, oqituvchi_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [ism, yosh, guruh, oqituvchi_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Bazaga yozishda xatolik' });
        }
        res.json({ message: 'Muvaffaqiyatli yozildi' });
    });
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server port ${PORT} da ishlayapti`));
