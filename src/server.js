//server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // 추가: Cross-Origin Resource Sharing 허용을 위한 미들웨어

const app = express();
const port = 3001;

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: 'root',
  database: 'cyber_note_db',
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('[Error] connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware 설정
app.use(express.json());
app.use(cors()); // 추가: Cross-Origin Resource Sharing 허용을 위한 미들웨어

// Question 목록 조회
app.get('/api/questions/list', (req, res) => {
  const sql = 'SELECT * FROM questions';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Question 한개 조회
app.get('/api/questions/select/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM questions WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error Selecting item:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
      console.error('Item selected successfully'+ results.id);
    }
  });
});

// Question 추가
app.post('/api/questions/add', (req, res) => {
  const { id, name, contents, reply } = req.body;
  const sql = 'INSERT INTO questions (id, name, contents, reply) VALUES (?, ?, ?, ?)';
  const values = [id, name, contents, reply];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding question:', err);
      res.status(500).send('Error 1');
    } else {
      const insertedId = result.insertId;
      const getInsertedQuestionSql = 'SELECT * FROM questions WHERE id = ?';
      connection.query(getInsertedQuestionSql, [insertedId], (err, rows) => {
        if (err) {
          console.error('Error fetching inserted question:', err);
          res.status(500).send('Error 2');
        } else {
          const insertedQuestion = rows[0];
          res.status(201).json(insertedQuestion);
        }
      });
    }
  });
});

// Answer 추가 또는 업데이트
app.post('/api/questions/reply/:id', (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  // 여기에서 해당 id의 question을 찾아서 reply를 업데이트하는 로직을 추가해야 합니다.
  // 이 예시에서는 간단히 저장된 모든 질문을 가져와서 해당 id의 reply를 업데이트합니다.
  
  const sql = 'UPDATE questions SET reply = ? WHERE id = ?';
  connection.query(sql, [reply, id], (err, result) => {
    if (err) {
      console.error('Error updating reply:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Reply updated successfully');
    }
  });
});

// Question 모두 삭제
app.delete('/api/questions/delete', (req, res) => {
  const sql = 'DELETE FROM questions';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error deleting questions:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('All questions deleted successfully');
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
