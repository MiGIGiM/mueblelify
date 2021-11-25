import { HeartIcon } from "@heroicons/react/solid";
import { FunctionComponent, useState } from "react";

const Card: FunctionComponent<any> = ({ name, description, image, price }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="mx-6 my-3 flex flex-col bg-gray-300 rounded-xl relative">
            <div className="absolute p-2 cursor-pointer" onClick={() => setIsActive(!isActive)}>
                <HeartIcon className={`w-5 h-5 ${isActive && 'stroke text-red-600'}`} />
            </div>
            <div className="bg-white rounded-t-xl p-2">
                <img src={`${image == "" ? "/chair.png" : image}`} className="w-52 rounded-t-xl p-2" alt="" />
            </div>
            <div className="w-52 flex flex-col items-center space-y-2 p-4">
                <h1 className="font-bold text-lg">{name}</h1>
                <p className="text-sm">{description}</p>
                <p className="rounded-full bg-gray-600 px-2 py-1 font-bold text-white text-sm">$ {price}</p>
            </div>
        </div>
    )
}

export default Card;