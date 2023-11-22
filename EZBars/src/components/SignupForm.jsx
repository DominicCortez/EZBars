import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  let navigate = useNavigate();

    const initialValues = {
        useremail: "",
        userpassword: ""
    }
    const validationSchema = Yup.object().shape({
        useremail:Yup.string().required(),
        userpassword: Yup.string().min(5).max(30).required(),
    })

    const onSubmit = (data) => {
        axios.post("http://ec2-3-27-189-2.ap-southeast-2.compute.amazonaws.com/api/users", data).then((response) => {
      navigate('/login')
    });
    };

 
  return (
    <div className='flex  justify-center items-center min-h-[700px]'>
        <div className='w-[25%] border p-5'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
            <Form>
            <div className="relative mb-6" data-te-input-wrapper-init>
                <ErrorMessage name="useremail" component="span"/>
                <Field id="inputCreateUsername" name="useremail" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100" placeholder="Username"/>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                <ErrorMessage name="userpassword" component="span"/>
                <Field type="password" id="inputCreatePassword" name="userpassword" placeholder="Password" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"/>
                </div>
                <div className="text-center lg:text-center">
            <button
              type="submit"
              className="inline-block rounded bg-[#FE8C37] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              Sign Up
            </button>
            </div>
            </Form>
        </Formik>
        </div>
    </div>
  )
}

export default SignupForm