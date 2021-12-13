import React, {useState} from 'react';
import './App.css';

function App() {
  const [active, setActive] = useState();
  const [name, setName] = useState(''); //Sử dụng state để khai báo 1 biến và hàm xử lý biến đó

  return (
    <>
      <button onClick={() => setActive((prev) => {
          return !prev;
        })
      }>
        {active ? ('This button is active') : ('This button is not active')}
      </button>

        <p>----------------------------</p>
        <input
            value={name}
            onChange={event => {
                setName(event.target.value);
            }}
        />
        <br/>
        <p>My name is {name ? name : ('...')}</p>
    </>
  );
}

export default App;
