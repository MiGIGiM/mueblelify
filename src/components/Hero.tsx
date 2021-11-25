import { useRouter } from "next/router";


const Hero = () => {
    const history = useRouter();

    function onLogout() {
        localStorage.removeItem('token');
        history.push('/');
    }
    
    return (
        <div className="w-full flex px-10 relative" style={{ backgroundColor: "#10525e" }}>
            <p className="absolute top-0 left-0 p-8 font-bold text-white cursor-pointer" onClick={onLogout}>Cerrar sesion</p>
            <div className="w-1/3 flex flex-col items-center justify-center text-white font-bold text-3xl">
                <h1>Haz que tu hogar sea elegante</h1>
                <h2 className="font-normal text-lg">Conoce nuestro catalogo</h2>
            </div>
            <div className="w-2/3">
                <img src="/sofa.png" alt="" />
            </div>
        </div>
    )
}

export default Hero;
