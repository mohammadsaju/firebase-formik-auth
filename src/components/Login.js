import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, githubProvider, googleProvider } from '../firebase';
import { useHistory } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const history = useHistory();
    const [error, setError] = useState('');

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
          .then(result => {
              history.push('/dashboard');
          })
          .catch(err => {
              console.log(err.message);
          })
    }
    const signInWithGithub = () => {
        auth.signInWithPopup(githubProvider)
           .then(result => {
               history.push('/dashboard')
           })
           .catch(err => {
               console.log(err.message);
           })
    }
    const validate = Yup.object({
        email: Yup.string()
          .email('email is invalid')
          .required('email is required'),
        password: Yup.string()
          .min(6, 'password should be minimum 6 caracters')
          .max(8, 'password must be less than 8 caracters')
          .required('password is required')
    });
    return (
        <section className="h-screen grid place-items-center">
            <div className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-5/12 xl:w-3/12 bg-gray-100 p-10 shadow-md rounded-md">
                {/* <h1 className="text-4xl text-center text-gray-700 font-semibold mb-9">Login Account</h1> */}
                <div className="flex justify-center">
                <img className='object-contain w-28 mb-6' src="https://www.riverphysio.sg/wp-content/uploads/2017/12/d11a452f5ce6ab534e083cdc11e8035e.png" alt="login" />
                </div>
                <div className="rounded-t mb-5 px-6 pb-6">
                        <div className="text-center mb-3">
                            <h6 className="text-gray-600 text-sm font-bold">Sign in with</h6></div>
                        <div className="btn-wrapper text-center">
                            <button onClick={signInWithGoogle} className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button"><img alt="google" className="w-5 mr-1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3G1_GIszzyvBcF1eFgWhl5ULn8q_JhKZNaSykoYMKlg5BSvan7D7PlF1xOREVJWaYGO0&usqp=CAU"/>Google</button>
                            <button onClick={signInWithGithub} className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" ><img alt="github" className="w-5 mr-1" src="https://www.pngrepo.com/png/94698/512/github.png"/>Github</button>
                            {error ? <div className='text-lg text-red-400 font-semibold mt-4'>{error}</div> : ''}
                        </div>
                        <hr className="mt-6 border-b-1 border-gray-400"/>
                    </div>
                <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validate}
                onSubmit={({email, password}) => {
                    auth.signInWithEmailAndPassword(email, password)
                    .then(result => {
                        history.push('/dashboard');
                    })
                    .catch(err => {
                        setError(err.message)
                    })
                }}
                >
                    {formik => (
                        <Form>
                            <label className="block text-gray-600 font-semibold ml-2">Email Adress</label>
                            <div className="mb-4">
                            <Field className="block w-full text-gray-500 pl-8 font-semibold bg-gray-100 p-2 rounded-full border focus:bg-gray-200 focus:shadow-inner focus:outline-none" type="email" name='email'/>
                            <ErrorMessage className='text-red-400 font-semibold ml-5' name='email' component='div' />
                            
                            </div>
                            <label className="block text-gray-600 font-semibold ml-2">Password</label>
                            <div className="mb-4">
                            <Field className="block w-full text-gray-500 pl-8 font-semibold bg-gray-100 p-2 rounded-full border focus:bg-gray-200 focus:shadow-inner focus:outline-none" type="password" name='password' autoComplete='off' />
                            <ErrorMessage className='text-red-400 font-semibold ml-5' name='password' component='div' />
                            </div>
                            <button className="text-center w-full rounded-full text-white font-semibold bg-green-500 p-2 mt-3 hover:bg-green-600 transition" type='submit'>SIGN IN</button>
                        </Form>
                    )}
                </Formik>
                <div className="flex justify-between items-center mt-7">
                    <hr className="w-2/5 border border-gray-500 " /> <span className="font-semibold">OR</span> <hr className="w-2/5 border border-gray-500" />
                </div>
                <Link to='/register' className="text-center block w-full rounded-full text-gray-800 hover:text-white border-4 border-gray-800 font-semibold bg-transparent p-2 mt-7 hover:bg-gray-900 transition">CREATE ACCOUNT</Link>
            </div>
    </section>  
    )
}

export default Login;
