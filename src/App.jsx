import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8); // password length
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();

  //password generator algorithm
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()`~";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      // Math.floor returns closest integer
      // Math.random * str.length generates randomness from 0 to length of str integer (0 - 52)
      // +1 ensures last index is created
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  //memoizes function and returns the same functin reference unless dependencies change

  //calling passwordGenerator() is a change, even though it's dependencies aren't changed, leading to re-rendering

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);
  // runs passwordGenerator() once, doesn't run again unless dependencies change

  const passwordRef = useRef(null);
  //refers to the value of input value
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-fit mx-auto shadow-md rounded-lg px-3 py-3 my-20 text-red-600 font-medium bg-gray-700">
        <h1 className="text-white text-center text-2xl py-0.5">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />

          {/* Copy button */}
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        {/* Div for length range button */}
        <div className="text-2xl flex gap-x-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(fireEvent) => {
                setLength(fireEvent.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          {/* Numbers */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number </label>
          </div>

          {/* Special characters */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
