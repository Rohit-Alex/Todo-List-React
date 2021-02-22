import React, { useState, useEffect } from "react";
import "./../styles/App.css";

function App() {
  const [todos, settodos] = useState([]);
  const [todo, settodo] = useState("");
  const [todoEditing, settodoEditing] = useState(null);
  const [editingText, seteditingText] = useState("");
  const [disabled, setDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      const newtodo = {
        id: new Date().getTime(),
        text: todo
      };
      settodos([...todos].concat(newtodo));
      settodo("");
    }
  }

  function deletetodo(id) {
    const updatetodos = [...todos].filter((todo) => todo.id !== id);
    settodos(updatetodos);
  }

  const handledKeyUp = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") setDisabled(true);
    else setDisabled(false);
  };

  function editTodo(id) {
    if (editingText !== "") {
      const updatetodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.text = editingText;
        }
        return todo;
      });

      settodos(updatetodos);
      settodoEditing(null);
      seteditingText("");
    }
  }
  // if (editingText === "") setDisabled(true);

  return (
    <div id="main">
      <form>
        <textarea
          id="task"
          type="text"
          onChange={(e) => settodo(e.target.value)}
          value={todo}
        ></textarea>
        <button id="btn" type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => seteditingText(e.target.value)}
              onKeyUp={handledKeyUp}
              defaultValue={todo.text}
            />
          ) : (
            <li className="list">{todo.text}</li>
          )}

          <div>
            <button className="delete" onClick={() => deletetodo(todo.id)}>
              delete
            </button>
            {todoEditing === todo.id ? (
              <button onClick={() => editTodo(todo.id)} disabled={disabled}>
                update
              </button>
            ) : (
              <button className="edit" onClick={() => settodoEditing(todo.id)}>
                Edit
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
