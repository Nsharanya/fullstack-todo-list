import './App.css';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const buttonSend = () => {
    setOutput(input);
     setInput('');
     console.log(input);

  fetch('http://localhost:3000/log-input', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }) 
   });
  };

  return (
    <>
      <input
        className='input-bar'
        placeholder='enter the text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className='button' onClick={buttonSend}>
        send
      </button>
    </>
  );
}

export default App;
