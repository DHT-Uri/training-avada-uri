import React, {useEffect, useState} from 'react';
import './App.css';
import useFetchApi from "../../hooks/useFetchApi";

function App() {
    // const handleAddTodo = (todo) => {
    //     setTodos(prevTodos => {
    //         const newTodo = {
    //             todo: todo.todo,
    //             isCompleted: false
    //         }
    //
    //         return {
    //             ...prevTodos,
    //             newTodo
    //         }
    //     })
    // };

    const {data: todos, loading, fetched} = useFetchApi({url: "..."});
    return (
        <>
            <ul className="todo-list">
                {loading ? (
                    <div>Loading todo list...</div>
                ) : (
                    <>
                        {todos.map((todo, index)=> {
                            return (
                                <li className="todo"
                                    key={index}
                                >{todo.todo}</li>
                            )
                        })}
                    </>
                )}
                {/*{fetched && (<><br/><p>-----Done-----</p></>)}*/}
            </ul>
        </>
  );
}

export default App;
