import React from 'react';
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import usrFetchApi from "../hooks/useFetchApi";

const Todoes = () => {
    const {data: todos, setData: setTodos , loading} = usrFetchApi.GetFetchApi({url: "http://localhost.com:5000/api/todos"});

    const addTodo = async (input) => {
        try {
            const maxId = Math.max.apply(Math, todos.map(todo => todo.id));
            const id = maxId ? maxId + 1 : 0;

            const postData = await usrFetchApi.PostFetchApi({url: "http://localhost.com:5000/api/todos", input, id});

            if (postData.success) {
                setTodos(prev => {
                    return [{
                        "id": id,
                        "todo": input,
                        "isCompleted": false
                    }, ...prev]
                })
            }
        } catch (e) {
            console.error(e)
        }
    };

    const completeTodo = async (input) => {
        try {
            const todoId = input.id;
            const putData = await usrFetchApi.UpdateFetchApi({url: `http://localhost.com:5000/api/todos/${todoId}`, data: input});

            if (putData.success) {
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

    const removeTodo = async (input) => {
        const todoId = input.id;
        try {
            const deleteData = await usrFetchApi.RemoveFetchApi({url: `http://localhost.com:5000/api/todo/${todoId}`});

            if (deleteData.success) {
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
            {loading ? (
                <div className="todo-loading">Loading...</div>
            ) : (
                <div className="todo-list">
                    {todos.map((todo,index) => (
                        <Todo
                            key={index}
                            todo={todo}
                            loading={loading}
                            completeTodo={completeTodo}
                            removeTodo={removeTodo}
                        />
                    ))}
                </div>
            )}

        </>
    );
};

export default Todoes;