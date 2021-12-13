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
            <ul>
                {loading ? (
                    <div>Loading users...</div>
                ) : (
                    <>
                        {todos.map(todo => {
                            return (
                                <li>{todo.todo}</li>
                            )
                        })}
                    </>
                )}
                {fetched && (<><br/><p>Done fetching</p></>)}
            </ul>
        </>
  );
}

export default App;
