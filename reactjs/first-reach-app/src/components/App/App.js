import React, {useEffect, useState} from 'react';
import './App.css';
import useFetchApi from "../../hooks/useFetchApi";

function ActiveState() {
    useEffect(() => {
        console.log("Active state mounted");

        return function cleanup() {
            console.log("Active state unmounted")
        }
    },[]);
    return <div>
        Active state mounted
    </div>
}

function App() {
  const [active, setActive] = useState();
  const [name, setName] = useState('');
  const [input, setInput] = useState({
      name: "",
      age: ""
  });

  const handleChangeInput = (key, value) => {
    setInput(prevInput => {
        return {
            ...prevInput,
            [key]: value
        }
    })
  };

  useEffect(() => {
      console.log("Active state has been changed");
  }, [active]);

  //Api
  const {data: users, loading, fetched} = useFetchApi({url: "https://jsonplaceholder.typicode.com/users"});
  return (
    <>
        <p>--------------------------------------Api</p>
        <ul>
            {loading ? (
                <div>Loading users...</div>
            ) : (
                <>
                    {users.map(user => {
                        return (
                            <li key={user.id}>{user.name}</li>
                        )
                    })}
                </>
            )}
            {fetched && (<><br/><p>Done fetching</p></>)}
        </ul>

        <p>--------------------------------------</p>
      <button onClick={() => setActive((prev) => {
          return !prev;
        })
      }>
        {active ? ('This button is active') : ('This button is not active')}
      </button>

        <p>--------------------------------------</p>
        <input
            placeholder="Name"
            value={name}
            onChange={event => {
                setName(event.target.value);
            }}
        />
        <br/>
        <p>My name is {name ? name : ('...')}</p>

        <p>--------------------------------------</p>
        <input
            id="input-name"
            placeholder="Name"
            onChange={event => {
                handleChangeInput("name", event.target.value);
            }}
        />
        <br/>
        <input
            id="input-age"
            placeholder="Age"
            onChange={event => {
                handleChangeInput("age", event.target.value);
            }}
        />
        <br/>
        <button onClick={() =>{
            alert(JSON.stringify(input));
        }}>Show</button>

        <p>----------------------------------Form</p>
        <form onSubmit={() =>{
            alert(`My name is ${name}`);
        }}>
            <label>
                Name:
                <input value = {name}
                       onChange = {event => {
                            setName(event.target.value);
                       }}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>

        <p>-----------------------------useEffect</p>
        <button onClick={() => setActive((prev) => {
            return !prev;
        })
        }>Click check
        </button>
        {active && <ActiveState />}
    </>
  );
}

export default App;
