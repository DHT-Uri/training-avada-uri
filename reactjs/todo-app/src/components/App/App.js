import React, {useEffect, useState} from 'react';
import './App.css';
// import useFetchApi from "../../hooks/useFetchApi";

function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.todo}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
        </div>
    );
}

function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Add todo..."
                type="text"
                className="todo-input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

function App() {
  const [todos, setTodos] = useState(
    [
      { todo: "Learn about React", isCompleted: true },
      { todo: "Meet friend for lunch", isCompleted: false},
      { todo: "Build really cool todo app", isCompleted: true }
    ]);

    const handleAddTodo = (todo) => {
        setTodos(prevTodos => {
            const newTodo = {
                todo: todo,
                isCompleted: false
            }

            return [...prevTodos, newTodo]
        })
    };

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

  return (
    <>
        <h2 className="todo-title">Todo list</h2>
        <TodoForm addTodo={handleAddTodo} />
        <ul className="todo-list">
            {todos.map((todo,index) => (
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
                // return (
                //   <li className="todo" key={index}>{todo.todo}</li>
                // );
            ))}
        </ul>
    </>
  );
}

export default App;
