import React, {useState} from 'react'
import {
  Input,
  Ripple,
  initTE,
} from "tw-elements";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

initTE({ Input, Ripple });

const LoginForm = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
    


  const login = () => {
    const data = {useremail : username, userpassword:password}
    axios.post("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/users/login",data ).then((response) =>{
      if(response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data)
      }
      navigate('/main');
    })
  };

  return (
    <div className='flex  justify-center items-center min-h-[700px]'>
      <form className='w-[25%] border p-5 '>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              onChange={(event) => {setUsername(event.target.value)}}
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"
              id="exampleFormControlInput2"
              placeholder="Username" />
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              onChange={(event) => {setPassword(event.target.value)}}
              type="password"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"
              id="exampleFormControlInput22"
              placeholder="Password" />
          </div>


          <div className="text-center lg:text-center">
            <button
              onClick={login}
              type="button"
              className="inline-block rounded bg-[#FE8C37] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              Login
            </button>

          </div>
        </form>
    </div>
  )
}

export default LoginForm