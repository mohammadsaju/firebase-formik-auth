import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../firebase';
import {useStateValue} from '../StateProvider';

const Dashboard = ({user}) => {
    const history = useHistory();
    const logOut = (e) => {
        e.preventDefault();
        auth.signOut();
        history.push('/login');
    }
    return (
        <section style={{background: '#1e272e'}} className="h-screen grid place-items-center">
            <div className='flex flex-col justify-center items-center gap-10'>
                <img className='object-contain w-52' src="https://images.unsplash.com/photo-1553610074-8c838fa2e56e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"/>
               <h1 className='text-3xl font-bold text-gray-200 text-center px-5'>Welcome {user?.name} to your new world...</h1>
               <button onClick={logOut} className='px-8 py-2 bg-gray-900 text-white text-gray-400 hover:bg-red-500 transition hover:text-red-50 font-bold' type='submit'>পালাও </button>
            </div>
        </section>
    )
}

export default Dashboard;
