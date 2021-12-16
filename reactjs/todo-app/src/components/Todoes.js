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

    async function multiRequest({method, arrIds}) {
        try {
            const ids = arrIds.toString();
            const respTodo = await fetch(`http://localhost.com:5000/api/todo?ids=${ids}`);
            const respData = await respTodo.json();

            const putData = respData['data'].map(todo => {
                return {
                    ...todo,
                    isCompleted: true
                }
            });

            const resp = await fetch(`http://localhost.com:5000/api/todo?ids=${ids}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(putData)
            });

            const respJson = await resp.json();
            if (respJson.success) {
                setTodos(todos => {
                    const aaa = todos.map(todo => {
                        if (ids.includes((todo.id).toString())) {
                            return {
                                ...todo,
                                isCompleted: true
                            }
                        }
                        return todo;
                    });

                    return aaa;
                });
            }
            debugger;
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="page-div-title">
                <p className="page-title">Todoes</p>
                <TodoForm addTodo={addTodo} />
            </div>
            {loading ? (
                <LoadingPageMarkup />
            ) : (
                <div className="todo-list">
                    <Todo todo={todos}
                          loading={loading}
                          multiRequest = {multiRequest}
                          completeTodo={completeTodo}
                          removeTodo={removeTodo}
                    />
                </div>
            )}

        </>
    );
};

export default Todoes;