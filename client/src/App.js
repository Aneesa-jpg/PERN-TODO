import React, { Fragment } from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <div className="App">
      <Fragment>
        <div  className="container">
          <InputTodo />
          <ListTodos />
        </div>
      </Fragment>
    </div>
  );
}

export default App;
