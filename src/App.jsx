import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
  // Initialize state from localStorage or use an empty array if none exists
  const loadTodoList = () => {
    const savedTodos = localStorage.getItem("todoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

  const [todos, setTodos] = useState(loadTodoList());
  const [newActivity, setNewActivity] = useState("");

  // Save todos to localStorage when the todos state changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setTodos((todos) => [
        ...todos,
        {
          id: uuid(),
          text: newActivity,
          isCompleted: false,
        },
      ]);
      setNewActivity("");
    }
  };

  const handleRemoveActivity = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggleCompletion = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleClearStorage = () => {
    setTodos([]);
    localStorage.removeItem("todoList");
  };

  return (
    <>
      <div className="container">
        <h1>To-Do List</h1>
        <input
          type="text"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="Add a new todo..."
        />

        <button onClick={handleAddActivity}>Add</button>

        <ul className="todos-list">
          {todos.map(({ id, text, isCompleted }) => (
            <li key={id} className={`todo ${isCompleted ? "completed" : ""}`}>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => handleToggleCompletion(id)}
              />
              <span>{text}</span>
              <button
                className="close"
                onClick={() => handleRemoveActivity(id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <button className="clear-all" onClick={() => handleClearStorage()}>
          Clear All
        </button>
      </div>
    </>
  );
}

export default App;
