import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {

  const [length,setlength] = useState(8);
  const [numberAllowed,setnumberAllowd] = useState(false);
  const [characterAllowed,setcharacterAllowed] = useState(false);
  const [pwd,setpwd] = useState("")
  const passwordGenerator = useCallback(()=>{

    let pass = ""
    let strr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) strr += "1234567890"
    if(characterAllowed) strr += "{}[]!@#$%^&*~`"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random()*strr.length+1)
      pass += strr.charAt(char);
    }

    setpwd(pass)
    console.log(pass)
    console.log("testing...")

  },[length,numberAllowed,characterAllowed,setpwd])
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  const passwordref = useRef(null)

  const copyPasswordToClipboard = ()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(pwd)
  }


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 mt-16'>
      <div className='inner-container mt-400'>
      <div className=' flex shadow rounded-lg overflow-hidden mt-20  '> 
      <input type="text"
      value={pwd}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly 
      ref={passwordref}
      />
      <button onClick={copyPasswordToClipboard}>copy</button>
      </div>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          onChange={(e)=>{setlength(e.target.value)}}
          className='cursor-pointer' />
          <label >Length : {length}</label>
        </div>
  <div class="inline-flex items-center">
   <label ><input type="checkbox"
    onChange={()=>{setnumberAllowd((prev => {return !prev}))}}
    /></label>
    <label >Number</label>
  </div>

  <div class="inline-flex items-center">
    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="blue">
      <input type="checkbox"
        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
        id="blue"
        onChange={()=>{setcharacterAllowed((prev => {return !prev}))}} />
      <span
        class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
          stroke="currentColor" stroke-width="1">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"></path> 
        </svg>
      </span>
      
    </label>
    <label >Character</label>
  </div>
      </div>
    </div>
     </>
  )
}

export default App
