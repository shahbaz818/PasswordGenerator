import { useState, useRef, useCallback, useEffect } from "react"

function App() {
  const [length, setlength] = useState(4);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const userRef=useRef(null)


  const passwrdRef = useRef();
  const handlePassword = useCallback(()=>{
    userRef.current?.select()
    userRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@(){}[].></?'";

    for (let a = 1; a <= length; a++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()

  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className=" flex justify-center items-center flex-col w-full h-screen   shadow-md rounded-lg px-4 bg-gray-800 text-orange-500">
      <div className="bg-teal-300 h-[200px] w-[450px] flex justify-center items-center flex-col rounded-lg shadow-xl">
      <h1 className="text-black text-center my-3">Password Genertor</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" placeholder="Password w-[350px]"  readOnly className="outline-none w-full py-1 px-3" value={password} ref={userRef} />
        <button className="outline-none bg-blue-700 text-teal-50 px-3 py-0.5 shrink-0" onClick={handlePassword}>Copy </button>
      </div>
      {/* 1st div close */}
      {/* range start */}
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" max={100} min={8} className="cursor-pointer" onChange={(e) => { setlength(e.target.value) }} />
          <label htmlFor="length">length {length}</label>
        </div>
        {/* for number */}
        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={() => { setNumberAllowed((prev) => !prev) }} />

          <label htmlFor="number"  >Number</label>
        </div>



        {/* for char */}
        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="charInput" defaultChecked={charAllowed} onChange={() => { setCharAllowed((prev) => !prev) }} />
          <label htmlFor="char" >Char</label>
        </div>

      </div>


      </div>
      
    </div>
  )
}

export default App