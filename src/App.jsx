import { useEffect, useState, useRef } from 'react'


function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(6)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const passwordRef = useRef(null)


  const passwordGenerator = () => {
    let randomPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(numbersAllowed){
      str+= "123456789"
    }

    if(charAllowed){
      str+= "!@#$%^&*()_"
    }

    for(let i=1; i<=length; i++){
      let randomString = Math.floor(Math.random() * str.length + 1)
       randomPassword += str.charAt(randomString)
    }

    setPassword(randomPassword)
  }
  const copyToClipBoard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,2)
    window.navigator.clipboard.writeText(password)
  }

  useEffect( () => {
    passwordGenerator()
  }, [length, numbersAllowed, charAllowed, setPassword])
  return (
    <>
      <h2>Password Generator</h2>
      <br />
      <input type="text" value={password} placeholder='Password' readOnly ref={passwordRef}/>
      <button onClick={copyToClipBoard}>copy text</button>
      <br />

      <div>
        <input 
          type="range" 
          min={6} 
          max={100} 
          value={length} 
          onChange={(e) => setLength(e.target.value)}
        />
        <label>Length: {length}</label>
      </div>

      <div>
        <input 
          type="checkbox" 
          defaultChecked={numbersAllowed} 
          onChange={() => setNumbersAllowed((prev) => !prev)}
        />
        <label>Number</label>
      </div>

      <div>
        <input 
          type="checkbox" 
          defaultChecked={charAllowed} 
          onChange={() => setCharAllowed( (prev) => !prev)}
        />
        <label>Characters</label>
      </div>
    </>
  )
}

export default App
