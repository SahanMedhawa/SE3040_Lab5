const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let todos = [
  { id: 1, text: 'Buy groceries', done: false },
  { id: 2, text: 'Do laundry', done: true },
];

// GET all todos
app.get('/api/todos', (req, res) => {
  res.send(todos);
});

// GET todo by id
app.get('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    res.send(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// POST new todo
app.post('/api/todos', (req, res) => {
  const { text, done } = req.body;
  const id = todos.length + 1;

  const todo = { id, text, done };
  todos.push(todo);

  res.send(todo);
});

// PUT update todo
app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { text, done } = req.body;

  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    if (text !== undefined) todo.text = text;
    if (done !== undefined) todo.done = done;

    res.send(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);

  todos = todos.filter(todo => todo.id !== id);

  res.send(`Todo with id ${id} has been deleted`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});