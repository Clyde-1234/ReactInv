import { ItemData } from "../InterTypes"

export default function ItemCard({name, current, maxAmount}: ItemData){
    return(
        <div className="border rounded-lg p-4 shadow-lg flex flex-col items-center">
            <div className="w-64 h-32 bg-gray-200 flex items-center justify-center ">
                <img
                    src=""
                    alt="Image not available"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <span className="absolute text-gray-500 text-sm">Image not available</span>
            </div>            
            <h2 className=" text-2xl font-bold">{name}</h2>
            <p>{current.toString()} / {maxAmount.toString()}</p>
        </div>
    )
}