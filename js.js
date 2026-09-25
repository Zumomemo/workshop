const express = require('express');

const app = express();

const PORT = 3000;


app.use(express.json());

// ข้อมูล Todo
let todos = [
  {
    id: 1,
    title: 'เรียน Node.js',
    completed: false
  },
  {
    id: 2,
    title: 'ทำ REST API',
    completed: false
  }
];


app.get('/', (req, res) => {
  res.send('Home Page');
});


app.get('/about', (req, res) => {
  res.send('About Page');
});



app.get('/todos', (req, res) => {
  res.json(todos);
});


app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found'
    });
  }

  res.json(todo);
});


app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length > 0
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1,
    title: req.body.title,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});


app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found'
    });
  }

  if (req.body.title !== undefined) {
    todo.title = req.body.title;
  }

  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  res.json(todo);
});


app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Todo not found'
    });
  }

  const deletedTodo = todos.splice(index, 1)[0];

  res.json(deletedTodo);
});


app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});