const mysql = require('mysql2');

// Cấu hình kết nối MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'nodejs'
  });
  
  // Kết nối đến MySQL
  connection.connect(err => {
    if (err) {
      console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
      return;
    }
    console.log('Kết nối thành công đến cơ sở dữ liệu');
  });
  
  module.exports = connection;
  