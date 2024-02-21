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
  }, [length, numberAllowed, charAllowed, setPassword])
  //memoizes function and returns the same functin reference unless dependencies change

  //calling passwordGenerator() is a change, even though it's dependencies aren't changed, leading to re-rendering

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);
  // runs passwordGenerator() once, doesn't run again unless dependencies change

  return (
    <>
      
    </>
  )


}