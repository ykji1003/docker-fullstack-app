const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();

// json 형태로 오는 요청의 본문을 해석
app.use(bodyParser.json());

// DB lists 테이블에 있는 모든 데이터를 프론트 서버로 전송
app.get("/api/values", (req, res) => {
  db.pool.query("SELECT * FROM lists", (err, results, fileds) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

// 클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 삽입
app.post("/api/value", (req, res, next) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES ("${req.body.value}");`,
    (err, results, fileds) => {
      if (err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5000, () => {
  console.log("application port 5000 start.");
});
