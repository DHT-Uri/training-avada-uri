import React from "react";

function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
        <div
            className="todo"
            style={{textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.todo}
            <div>
                {!todo.isCompleted && (<button className="todo-complete" onClick={() => completeTodo(index)}>Complete</button>)}
                <button className="todo-remove" onClick={() => removeTodo(index)}>x</button>
            </div>
        </div>
    );
}

export default Todo;