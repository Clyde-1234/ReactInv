import { ItemData } from "../InterTypes"
import PropTypes from "prop-types"

const ItemCard = ({name, current, maxAmount,imageSrc, isPrioritized = false , color = 'green'}: ItemData) => {

    const borderColors = {
        'green': 'border-green-400',
        'red': 'border-red-400',

        'orange': 'border-orange-400',
        'slate': 'border-slate-400',
    }

    return(
        <div className={` border-2 rounded-lg p-4 shadow-lg flex flex-col items-center ${borderColors[color]} ${isPrioritized ? "bg-gradient-to-br from-gray-300 to-yellow-600":""}`}>
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                <img
                    src={imageSrc}
                    alt=""
                    className="w-full h-full object-fill"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
                
                <span className="absolute text-gray-500  text-sm">{imageSrc? "" : "Image not available   "}</span>
            </div>            
            <h2 className=" text-2xl font-bold break-all">{name}</h2>
            <p>{current.toString()} / {maxAmount.toString()}</p>
        </div>
    )
}

ItemCard.PropTypes = {
    name: PropTypes.string,
    current: PropTypes.number,
    maxAmount: PropTypes.number,
    color: PropTypes.oneOf(['slate', 'green', 'red', 'orange'])
}

export default ItemCard