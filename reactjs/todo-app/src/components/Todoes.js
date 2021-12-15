import TodoForm from "./TodoForm";
import Todo from "./Todo";
import useFetchTodo from "../hooks/useFetchTodo";
import makeRequest from "../helpers/api/makeRequest";
import LoadingPageMarkup from "./loadingPage";
import React from "react";

const Todoes = () => {
    const {data: todos, setData: setTodos , loading} = useFetchTodo({url: "http://localhost.com:5000/api/todos"});

    const addTodo = async (input) => {
        try {
            const maxId = Math.max.apply(Math, todos.map(todo => todo.id));
            const id = maxId ? maxId + 1 : 0;

            const newData = JSON.stringify({
                "id": id,
                "todo": input,
                "isCompleted": false
            });

            const postData = await makeRequest({url: "http://localhost.com:5000/api/todos", method: "POST", postData: newData});

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

            const updateData = JSON.stringify({
                ...input,
                isCompleted: true
            })
            const putData = await makeRequest({url: `http://localhost.com:5000/api/todos/${todoId}`, method: "PUT", postData: updateData});

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
            const removeData = await makeRequest({url: `http://localhost.com:5000/api/todo/${todoId}`, method: "DELETE", postData: input});

            if (removeData.success) {
                const newTodo = todos.filter(todo => todo.id !== todoId);
                setTodos(newTodo);
            }
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <>
            <TodoForm addTodo={addTodo} />
            {loading ? (
                <LoadingPageMarkup />
            ) : (
                <div className="todo-list">
                    <Todo todo={todos}
                          loading={loading}
                          completeTodo={completeTodo}
                          removeTodo={removeTodo}
                    />
                </div>
            )}

        </>
    );
};

export default Todoes;