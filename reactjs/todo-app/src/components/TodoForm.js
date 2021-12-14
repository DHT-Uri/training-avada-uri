import React, {useState} from "react";

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

export default TodoForm;