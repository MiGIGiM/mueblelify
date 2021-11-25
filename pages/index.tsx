import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import type { NextPage } from 'next'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Hero from '@components/Hero';
import Card from '@components/Card';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { generate } from 'shortid';

const Home: NextPage = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    
    const history = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token == null)
            history.push('/login');
    }, [history]);

    const [{ data, loading, error }, execute] = useAxios({
        url: '/api/furniture/add',
        method: 'POST'
    }, {
        manual: true
    });

    const [{ data: furnitureArray, loading: furnitureLoading, error: furnitureError }, fetchData] = useAxios({
        url: '/api/furniture',
    }, {
        manual: true
    });

    async function onSubmit(e: React.SyntheticEvent) {
        try {
            e.preventDefault();

            let name = nameRef?.current?.value,
            description = descriptionRef?.current?.value,
            price = priceRef?.current?.value,
            image = imageRef?.current?.value;
    
            if (name == "" || description == "" || price == "") {
                alert('Llena todos los campos primero');
                return;
            }
    
            const body = { name, description, price, image }

            await execute({ data: body });

            await fetchData();
        } catch(err) {
            alert('Algo ha salido mal');
        }
    }

    useEffect(() => {
        async function getInitialData() {
            await fetchData();
        }

        getInitialData();

        console.log(furnitureArray);
    }, []);

    return (
        <div className="flex flex-col bg-blue-200 max-w-screen">
            <Hero />
            <div className="w-full">
                <form className="flex justify-evenly items-center p-4" onSubmit={onSubmit}>
                    <div className="space-x-5">
                        <label className="font-medium">Titulo</label>
                        <input ref={nameRef} className="rounded-full border-2 border-blue-600 px-2" type="text" />
                    </div>
                    <div className="space-x-5">
                        <label className="font-medium">Descripcion</label>
                        <input ref={descriptionRef} className="rounded-full border-2 border-blue-600 px-2" type="text" />
                    </div>
                    <div className="space-x-5">
                        <label className="font-medium">URL de imagen</label>
                        <input ref={imageRef} className="rounded-full border-2 border-blue-600 px-2" type="text" />
                    </div>
                    <div className="space-x-5">
                        <label className="font-medium">Precio</label>
                        <input ref={priceRef} className="rounded-full border-2 border-blue-600 px-2" type="text" />
                    </div>
                    <button style={{ backgroundColor: "#10525E" }} className="px-4 py-1 flex items-center justify-center rounded-full text-white font-bold space-x-2">
                        <PlusCircleIcon className="w-5 h-5" /> <span>Agregar</span>
                    </button>
                </form>
                <div className="mx-auto w-4/5 flex justify-center items-center flex-wrap">
                    {
                        furnitureArray && furnitureArray.map((it) => <Card key={generate()} name={it.name} description={it.description} price={it.price} image={it.image} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
