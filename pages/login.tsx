import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const history = useRouter();
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token != null)
            history.push('/');
    }, [history]);

    const [{ data, loading, error }, execute] = useAxios({
        url: '/api/identity/login',
        method: 'POST',
    }, {
        manual: true
    });

    async function onSubmit(e: any) {
        e.preventDefault();
        
        try {
            if (username?.current?.value == "" || password?.current?.value == "") {
                alert('Llena todos los datos');
                return;
            }

            let res = await execute({ data: { username: username?.current?.value, password: password?.current?.value } });

            localStorage.setItem('token', res.data.token);

            history.push('/');
        } catch(err: any) {
            const { response }: AxiosError = err;
            
            if (response?.status === 404)
                alert('Usuario no encontrado');
        }
    }

    return (
        <div className="bg-blue-200 w-screen h-screen flex justify-center items-center ">
            <div className="flex items-center bg-gray-100 rounded-lg shadow-lg">
                <div className="container mx-auto">
                    <div className="w-full mx-auto my-10">
                        <div className="text-center mx-7">
                            <h1 className="my-3 text-6xl font-thin text-gray-700">Sign in</h1>
                            <p className="text-gray-500 text-2xl font-extralight">Sign in to access your account</p>
                        </div>
                        <div className="m-7">
                            <form onSubmit={onSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Username</label>
                                    <input ref={username} type="email" name="email" id="email" placeholder="you@email.com" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                                </div>
                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                                    </div>
                                    <input ref={password} type="password" name="password" id="password" placeholder="Your Password" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                                </div>
                                <div className="mb-6">
                                    <button type="submit" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
                                </div>
                                <p className="text-sm text-center text-gray-400">Don&#x27;t have an account yet? 
                                    <Link href="/register">
                                        <a className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Sign up</a>
                                    </Link>
                                    .
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
