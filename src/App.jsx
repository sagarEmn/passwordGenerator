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

  return (
    <>
      <div className="w-full max-w-fit mx-auto shadow-md rounded-lg px-3 py-3 my-20 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center py-0.5">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeHolder="eminem"
            readOnly
          />
          
          {/* Div for length range button */}
          <div className="flex text-sm gap-x-2">
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
              <label>Length: {Length}</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              />
              <label>Special Characters </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;