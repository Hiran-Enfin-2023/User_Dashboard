import {GiReceiveMoney} from "react-icons/gi"
import {AiFillEye,AiOutlineShoppingCart} from "react-icons/ai"
import {FaUserPlus} from "react-icons/fa"

const cardsData = [{
    icon: <AiFillEye/>,
    data : 2561,
    title: "Daily vistors" ,
    bg:"#D7FED6"
},
{
    icon: <GiReceiveMoney/>,
    data : `$ 97522.9`,
    title: "Revenue" ,
    bg:"#FED6FA"
},
{
    icon: <AiOutlineShoppingCart/>,
    data : 231,
    title: "Orders" ,
    bg:"#D6F8FE"
},
{
    icon: <FaUserPlus/>,
    data : 52,
    title: "User Registration" ,
    bg:"#FEE3D6"
},
]

export default cardsData