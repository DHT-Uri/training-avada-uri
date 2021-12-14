import React from "react";

function Todo({todo, completeTodo, removeTodo}) {
    return (
        <div
            className="todo"
            style={{textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.todo}
            <div>
                {!todo.isCompleted && (<button className="todo-complete" onClick={() => completeTodo(todo)}>Complete</button>)}
                <button className="todo-remove" onClick={() => removeTodo(todo)}>x</button>
            </div>
        </div>
    );
}

export default Todo;