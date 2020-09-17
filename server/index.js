const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Routes
//ADD TODOS
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
// GET ALL TODOS
app.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// GET TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//UPDATE TODO
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 where todo_id = $2",
      [description, id]
    );
    res.json("todo was updated!");
  } catch (error) {
    console.log(error.message);
  }
});
//DELETE TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo where todo_id = ($1)",[id]
    );
    res.json("Todo was deleted");
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
