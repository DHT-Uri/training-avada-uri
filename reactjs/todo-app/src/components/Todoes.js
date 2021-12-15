import TodoForm from "./TodoForm";
import Todo from "./Todo";
import useFetchTodo from "../hooks/useFetchTodo";
import makeRequest from "../helpers/api/makeRequest";

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