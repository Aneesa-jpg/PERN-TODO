import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
 
  const deleteTodo = async (todo_id) => {
    try {
      const deleteTodoItem = await fetch(
        `http://localhost:8000/todos/${todo_id}`,
        {
          method: "DELETE",
        }
      );
      setTodos(todos.filter(todo => todo.todo_id != todo_id));
    } catch (error) {}
  };
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/");
      const jsonData = await response.json();
      setTodos(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <table className="table mt-5 text-center">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td>
              <EditTodo todo={todo}/>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.todo_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTodos;
