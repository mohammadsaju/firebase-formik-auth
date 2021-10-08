import React, { useEffect, useState } from 'react';
import Firebase from 'firebase';
import { Link } from 'react-router-dom';
import  {auth}  from '../firebase';
import { useHistory } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const RegisterTwo = () => {
    const history = useHistory();
    const [error, setError] = useState('');

    const validate = Yup.object({
        firstname: Yup.string()
          .max(14, 'firstname must be less than 14 caracters')
          .required('firstname is required'),
        lastname: Yup.string()
          .max(10, 'lastname must be less than 10 caracters')
          .required('lastname is required'),
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
                    <div className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-5/12 xl:w-3/12 bg-gray-100 shadow-md p-10 rounded-md">
                        {/* <h1 className="text-4xl text-gray-700 font-semibold mb-9 text-center">Create Account</h1> */}
                        <div className="flex justify-center">
                           <img className='object-contain w-44 mb-6' src="https://www.innovate-design.co.uk/wp-content/uploads/2021/03/Innovate-Design-Trademark-icon.png" alt="login" />
                        </div>
                        {error ? <div className='text-lg text-red-400 font-semibold mb-7 text-center'>{error}</div> : ''}
                        <Formik
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            email: '',
                            password: '',
                        }}
                        validationSchema={validate}
                        onSubmit={({firstname, email, password}) => {
                            auth.createUserWithEmailAndPassword(email, password)
                            .then(userauth => {
                                userauth.user.updateProfile({
                                    displayName: firstname
                                });
                                history.push('./login')
                            })
                            .catch(err => {
                                setError('This user email already exists!')
                            })
                        }}
                        >
                            {formik => (
                                <Form>
                                <label className="block font-semibold text-gray-600 ml-2">First Name</label>
                                <div className="mb-4">
                                <Field className="block text-gray-500 pl-8 font-semibold w-full bg-gray-100 p-2 rounded-full focus:outline-none border focus:bg-gray-200 focus:shadow-inner" type="text" name='firstname'/>
                                <ErrorMessage className='text-red-400 font-semibold ml-5' name='firstname' component='div'/>
                                </div>
                                <label className="block text-gray-600 font-semibold ml-2">Last Name</label>
                                <div className="mb-4">
                                <Field className="block w-full text-gray-500 pl-8 font-semibold bg-gray-100 p-2 rounded-full border focus:bg-gray-200 focus:shadow-inner focus:outline-none" type="text" name='lastname'/>
                                <ErrorMessage className='text-red-400 font-semibold ml-5' name='lastname' component='div'/>
                                </div>
                                <label className="block text-gray-600 font-semibold ml-2">Email Adress</label>
                                <div className="mb-4">
                                <Field className="block w-full text-gray-500 pl-8 font-semibold bg-gray-100 p-2 rounded-full border focus:bg-gray-200 focus:shadow-inner focus:outline-none" type="email" name='email'/>
                                <ErrorMessage className='text-red-400 font-semibold ml-5' name='email' component='div'/>
                                </div>
                                <label className="block text-gray-600 font-semibold ml-2">Password</label>
                                <div className="mb-4">
                                <Field className="block w-full text-gray-500 pl-8 font-semibold bg-gray-100 p-2 rounded-full border focus:bg-gray-200 focus:shadow-inner focus:outline-none" type="password" name='password' autoComplete='off' />
                                <ErrorMessage className='text-red-400 font-semibold ml-5' name='password' component='div'/>
                                </div>
                                <button className="text-center w-full rounded-full text-white font-semibold bg-green-500 p-2 mt-3 hover:bg-green-600 transition" type='submit'>CREATE ACCOUNT</button>
                            </Form>
                            )}
                        </Formik>
                        <div className="flex justify-between items-center mt-7">
                            <hr className="w-2/5 border border-gray-500 "/> <span className="font-semibold">OR</span> <hr className="w-2/5 border border-gray-500"/>
                        </div>
                        <Link to='/login' className="block text-center w-full rounded-full text-gray-800 hover:text-white border-4 border-gray-800 font-semibold bg-transparent p-2 mt-7 hover:bg-gray-900 transition">SIGN IN</Link>
                    </div>
            </section>
    )
}

export default RegisterTwo;
