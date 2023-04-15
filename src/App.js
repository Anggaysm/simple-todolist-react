import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [aktifitas, setAktifitas] = React.useState("");
  const [edit, setEdit] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  const [pesan, setPesan] = React.useState("");

  function generedId() {
    return Date.now();
  }

  function saveTodoHandler(event) {
    event.preventDefault();

    if (!aktifitas) {
      alert("Isi dulu");
      return setPesan("Aktifitas harus diisi");
    }
    setPesan("");

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        aktifitas,
        done: false,
      };

      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id == edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;

      setTodos(updatedTodos);
      return cencelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generedId(),
        aktifitas,
        done: false,
      },
    ]);
    setAktifitas("");
  }

  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id !== todoId;
    });
    setTodos(filteredTodos);
    if (edit.id) cencelEditHandler();
  }

  function editTodoHandler(todo) {
    setAktifitas(todo.aktifitas);
    setEdit(todo);
  }
  function cencelEditHandler() {
    setEdit({});
    setAktifitas("");
  }
  function doneTodoHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };
    const editTodoIndex = todos.findIndex(function (currentTodu) {
      return currentTodu.id == todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }

  return (
    <>
      <h1 className="judul">Simple Todo List</h1>
      {pesan && <div style={{ color: "red" }}>{pesan}</div>}
      <form onSubmit={saveTodoHandler}>
        <input
          type="text"
          placeholder="Masukan Aktifitas"
          value={aktifitas}
          onChange={function (e) {
            setAktifitas(e.target.value);
          }}
        />
        <button type="submit" className="tambah">
          {edit.id ? "Simpan Perubahan" : "Tambah"}
        </button>
        {edit.id && <button onClick={cencelEditHandler}>cencel</button>}
      </form>
      <ul className="no-bullets">
        {todos.map(function (todo) {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={doneTodoHandler.bind(this, todo)}
              />
              {todo.aktifitas}
              <button onClick={editTodoHandler.bind(this, todo)}>Edit</button>
              <button onClick={removeTodoHandler.bind(this, todo.id)}>
                Hapus
              </button>
              <p>{todo.done ? "Selesai" : "Kelarin gih"}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
