import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from 'fs';

const jsonFile = fs.readFileSync('./project_server/data.json', 'utf8');
let todos= [];
todos = JSON.parse(jsonFile);

const app = express();
const corsOptions = {
  origin: '*', // 출처 허용 옵션: 모든 출처 허용
  credentials: true, //사용자인증이 필요한 리소스(쿠키등) 허용옵션: 허용
}
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.listen({ port: 8000 }, () => {
  console.log("Todo 서버가 localhost:8000 에서 실행됩니다...");
});

// 전체 post 조회
app.get("/api/v1/todos", (req, res) => {
  res.status(200).send(todos);
});

// 특정 post 1개 조회
app.get("/api/v1/todos/:pid", (req, res) => {
  const post = todos.find((post) => post.id == req.params.pid);
  if(typeof post === 'undefined') {
    res.sendStatus(404);
  } else {
    res.send(post);
  } 
});

// 신규 todo insert
app.post("/api/v1/todos", (req, res) => {
  const todo = req.body;

  if(typeof todo.done === "undefined"){
    todo.done = false;
  }

  const length = todos.length;
  todo.id = length + 1;
  todos.push(todo);
  res.sendStatus(200);
});

// 체크박스 관련 업데이트
app.patch("/api/v1/todos/:pid/done", (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.pid);

  if(typeof todo === "undefined"){
     return res.sendStatus(404);
  }
  
  todo.done = !todo.done; // 현재 값과는 무조건 반대로 서버에 저장
  res.status(200).send(todo.done);
});

// 모든 일정 삭제
app.delete("/api/v1/todos", (req, res) => {
   todos = [];
   res.sendStatus(200);
});

// 체크된 일정들 삭제
app.delete("/api/v1/todos/done", (req, res) => {
  const newTodo = todos.filter(todo => todo.done != true);
  todos = newTodo;
  res.sendStatus(200);
})

// 특정 일정 삭제
app.delete("/api/v1/todos/:pid", (req, res) => {
  const afterTodo = todos.filter(todo => !(todo.id == req.params.pid));
  todos = afterTodo;
  res.sendStatus(200);
})

// 특정 Specific 삭제
app.delete("/api/v1/todos/:pid/specifics/:cid", (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.pid);

  if(typeof todo === 'undefined') {
    return res.sendStatus(404);
  }

  const afterSpecifics = todo.specifics.filter(specific => !(specific.id == req.params.cid))
  todo.specifics = afterSpecifics;
  res.sendStatus(200);
})

// 특정 일정 수정
app.patch("/api/v1/todos/:pid", (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.pid);
  const editTodo = req.body;

  if(typeof todo === 'undefined') {
    return res.sendStatus(404);
  }
  
  todo.title = editTodo.title;
  todo.content = editTodo.content;

  res.sendStatus(200);
})

// 신규 specific insert
app.post("/api/v1/todos/:pid", (req, res) => {
  const inPost = req.body;
  console.log("before inPost.specifics ", inPost.specifics);
  const post = todos.find((post) => post.id == req.params.pid);

  if(typeof post === 'undefined') {
    res.sendStatus(404);
  } 
  else {
    const length = post.specifics.length;
    const preSpecifics = todos[post.id-1].specifics;
    inPost.specifics[0].id = inPost.id * 10 + length + 1;

    console.log("after inPost.specifics ", inPost.specifics);
    console.log("before todos[post.id-1] ", todos[post.id-1]);

    preSpecifics.push(inPost.specifics[0]);
    inPost.specifics = preSpecifics;
    todos[post.id-1]= inPost;
    console.log("after todos[post.id-1] ", todos[post.id-1]);
    res.sendStatus(200);
  } 
});

// 나머지 path
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});