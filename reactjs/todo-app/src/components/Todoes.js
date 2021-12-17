import TodoForm from "./TodoForm";
import Todo from "./Todo";
import useFetchTodo from "../hooks/useFetchTodo";
import makeRequest from "../helpers/api/makeRequest";
import LoadingPageMarkup from "./loadingPage";
import React, {useState} from "react";
import {Page, Button} from '@shopify/polaris';

const Todoes = () => {
    const urlApi = "http://localhost.com:5000/api";
    const {data: todos, setData: setTodos , loading} = useFetchTodo({url: `${urlApi}/todos`});
    const [updateLoading, setUpdateLoading] = useState(false);

    const [active, setActive] = useState(false);
    const toggleModal = () => setActive((active) => !active);

    const addTodo = async (input) => {
        try {
            setUpdateLoading(true);
            const maxId = Math.max.apply(Math, todos.map(todo => todo.id));
            const id = maxId ? maxId + 1 : 0;

            const newData = JSON.stringify({
                "id": id,
                "todo": input,
                "isCompleted": false
            });

            const postData = await makeRequest({url: `${urlApi}/todos`, method: "POST", postData: newData});

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
        }finally {
            setUpdateLoading(false);
        }
    };

    const completeTodo = async (input) => {
        try {
            setUpdateLoading(true);
            const todoId = input.id;
            const updateData = JSON.stringify({
                ...input,
                isCompleted: true
            })
            const putData = await makeRequest({url: `${urlApi}/todos/${todoId}`, method: "PUT", postData: updateData});

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
        }finally {
            setUpdateLoading(false);
        }
    }

    const removeTodo = async (input) => {
        try {
            setUpdateLoading(true);
            const todoId = input.id;
            const removeData = await makeRequest({url: `${urlApi}/todo/${todoId}`, method: "DELETE", postData: input});

            if (removeData.success) {
                const newTodo = todos.filter(todo => todo.id !== todoId);
                setTodos(newTodo);
            }
        } catch (e) {
            console.error(e)
        }finally {
            setUpdateLoading(false);
        }
    };

    async function multiRequest({method, arrIds}) {
        try {
            setUpdateLoading(true);
            const ids = arrIds.toString();
            const respTodo = await fetch(`${urlApi}/todo?ids=${ids}`);
            const respData = await respTodo.json();

            const putData = respData['data'].map(todo => {
                return {
                    ...todo,
                    isCompleted: true
                }
            });

            const resp = await fetch(`${urlApi}/todo?ids=${ids}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(putData)
            });

            const respJson = await resp.json();
            if (respJson.success) {
                if (method === 'PUT'){
                    setTodos(todos => {
                        return todos.map(todo => {
                            if (ids.includes((todo.id).toString())) {
                                return {
                                    ...todo,
                                    isCompleted: true
                                }
                            }
                            return todo;
                        });
                    });
                }else{
                    const newTodo = todos.filter(todo => !ids.includes((todo.id).toString()));
                    setTodos(newTodo);
                }
            }
        }catch (e) {
            console.log(e);
        }finally {
            setUpdateLoading(false);
        }
    }

    return (
        <Page
            breadcrumbs={[{content: 'Home', url: '/'}]}
            title="Todoes"
            primaryAction={
                <Button
                    primary
                    onClick={toggleModal}
                >
                    Creat new todo
                </Button>
            }
        >
            <TodoForm addTodo={addTodo} toggleModal={toggleModal} active={active}/>
            {loading ? (
                <LoadingPageMarkup />
            ) : (
                <div className="todo-list">
                    <Todo todo={todos}
                          loading={updateLoading}
                          multiRequest = {multiRequest}
                          completeTodo={completeTodo}
                          removeTodo={removeTodo}
                    />
                </div>
            )}
        </Page>
    );
};

export default Todoes;