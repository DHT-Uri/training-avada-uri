import React, {useEffect, useState} from 'react';
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const Todoes = () => {
    const [todos, setTodos] = useState([]);

    async function getTodoList() {
        const response = await fetch('http://localhost.com:5000/api/todos');
        return await response.json();
    }

    async function loadTodoList() {
        const todoList = await getTodoList();
        setTodos(todoList['data']);
        return todoList
    }

    useEffect(() => {
        loadTodoList();
    }, [])

    const addTodo = async text => {
        try {
            const todoList = await getTodoList();
            const maxId = Math.max.apply(Math, todoList['data'].map(todo => todo.id));
            const newId = maxId ? maxId + 1 : 0;
            const resp = await fetch("http://localhost.com:5000/api/todos", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": newId,
                    "todo": text,
                    "isCompleted": false
                }),
            });

            const data = await resp.json();
            if (data.success) {
                setTodos(prev => {
                    return [{
                        "id": newId,
                        "todo": text,
                        "isCompleted": false
                    }, ...prev]
                })
            }
        } catch (e) {
            console.error(e)
        }
    };

    const completeTodo = async (todo) => {
        try {
            const todoId = todo.id;
            const resp = await fetch(`http://localhost.com:5000/api/todos/${todoId}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...todo,
                    isCompleted: true
                }),
            })

            const data = await resp.json();
            if (data.success) {
                setTodos(currentTodoList => {
                    return currentTodoList.map(todo => {
                        if (todo.id === todoId) {
                            return {
                                ...todo,
                                isCompleted: true
                            }
                        }
                        return todo;
                    })
                });
            }
        } catch
            (e) {
            console.error(e)
        }
    }

    const removeTodo = async (todo) => {
        const todoId = todo.id;
        try {
            const resp = await fetch(`http://localhost.com:5000/api/todo/${todoId}`, {
                method: 'delete'
            });
            const data = await resp.json();
            if (data.success) {
                const newTodo = todos.filter(todo => todo.id !== todoId);
                setTodos(newTodo);
            }
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <>
            <h2 className="todo-title">Todo list</h2>
            <TodoForm addTodo={addTodo} />
            <div className="todo-list">
                {todos.map((todo,index) => (
                    <Todo
                        key={index}
                        todo={todo}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                    />
                ))}
            </div>
        </>
    );
};

export default Todoes;