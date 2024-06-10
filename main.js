const express = require('express');
const flash = require("express-flash");
const session = require("express-session");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.post || 3000;
const connection = require("./database/connectDB");



// Sử dụng body-parser để parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Thiết lập view engine là ejs
app.set('view engine', 'ejs');




app.get('/reset-table', (req, res) => {
  const dropTableQuery = 'DROP TABLE IF EXISTS users';
  const createTableQuery = `
    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )
  `;

  connection.query(dropTableQuery, (err, results) => {
    if (err) {
      console.error('Lỗi xóa bảng:', err);
      res.send('Lỗi xóa bảng.');
      return;
    }
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Lỗi tạo bảng:', err);
        res.send('Lỗi tạo bảng.');
        return;
      }
      console.log('Tạo bảng thành công!');
      res.send('Tạo bảng thành công!');
    });
  });
});


// Trang chủ: Hiển thị tất cả người dùng
app.get('/', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
      return;
    }
    res.render('index', { users: results });
  });
});

// Trang thêm người dùng
app.get('/add', (req, res) => {
  res.render('add');
});

// Xử lý thêm người dùng
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      console.error('Lỗi thêm người dùng:', err);
      return;
    }
    res.redirect('/');
  });
});

// Trang sửa người dùng
app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
      return;
    }
    if (results.length === 0) {
      res.send('Người dùng không tồn tại');
      return;
    }
    res.render('edit', { users: results[0] });
  });
});

// Xử lý sửa người dùng
app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
    if (err) {
      console.error('Lỗi cập nhật người dùng:', err);
      return;
    }
    res.redirect('/');
  });
});

// Xử lý xóa người dùng
app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Lỗi xóa người dùng:', err);
      return;
    }
    res.redirect('/');
  });
});

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Máy chủ đang chạy tại http://localhost:${port}`);
});
