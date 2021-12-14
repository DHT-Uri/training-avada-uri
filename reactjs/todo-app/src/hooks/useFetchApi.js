import {useEffect, useState} from "react";

function useFetchApi({url}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    async function fetchData() {
        try {
            setLoading(true);
            // const resp = await fetch(url);
            // const respData = await resp.json();
            const respData = [
                { todo: "Todo 1", isCompleted: true },
                { todo: "Todo 2", isCompleted: false},
                { todo: "Todo 3", isCompleted: true }
            ];

            setData(respData);
            setLoading(false);
            setFetched(true);
        }catch (e) {
            console.log(e);
        }finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        setData,
        loading,
        fetched
    }
}

function App() {
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

export default useFetchApi;