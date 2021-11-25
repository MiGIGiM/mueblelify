import useAxios from 'axios-hooks';
import { UserIcon } from '@heroicons/react/outline'
import { AtSymbolIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next';
import { useRef } from 'react';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
    const history = useRouter();

    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const [{ data, loading, error }, execute] = useAxios({
        url: '/api/identity/register',
        method: 'POST',
    }, { 
        manual: true
    });

    async function onSubmit(e: any) {
        e.preventDefault();

        if (firstName?.current?.value == "" || lastName?.current?.value == "" || username?.current?.value == "" || password?.current?.value == "") {
            alert('Llena todos los campos primero');
            return;
        }

        let res = await execute({ data: 
            { 
                firstName: firstName?.current?.value,
                lastName: lastName?.current?.value,
                username: username?.current?.value,
                password: password?.current?.value,
            } 
        });

        history.push('/login');
    }

    return (
        <div>
            <div className="min-w-screen min-h-screen bg-blue-200 flex items-center justify-center px-5 py-5">
                <form className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-3/4 overflow-hidden" onSubmit={onSubmit}>
                    <div className="md:flex w-auto">
                        <img src="https://i.ibb.co/1zq2ngV/88febe57b3335b422f4f3c5c6391e521.jpg" className="hidden md:block w-1/2" />
                        <div className="w-full md:w-1/2 py-28 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-thin text-3xl text-gray-900">Create your account</h1>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-5">
                                        <label className="text-xs font-normal px-1">First name</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <UserIcon className="h-5 w-5 text-gray-900" />
                                            </div>
                                            <input ref={firstName} type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" />
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-3 mb-5">
                                        <label className="text-xs font-normal px-1">Last name</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <UserIcon className="h-5 w-5 text-gray-900" />
                                            </div>
                                            <input ref={lastName} type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Smith" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label className="text-xs font-normal px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <AtSymbolIcon className="h-5 w-5 text-gray-900" />
                                            </div>
                                            <input ref={username} type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label className="text-xs font-normal px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <LockClosedIcon className="h-5 w-5 text-gray-900" />
                                            </div>
                                            <input ref={password} type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="*******" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button type="submit" className="block w-full mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Register account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;