import StoreHouseContainer from '../components/StoreHouseContainer';
import '../index.css';
import { StoreHouseProps } from "../InterTypes";
import { BrowserRouter } from "react-router-dom";

export default{
    title: 'StoreHouse',
    component: StoreHouseContainer
}

//@ts-ignore
export const Default = (args) => {
    return(
    <BrowserRouter>
        <StoreHouseContainer {...args}/>
    </BrowserRouter>
    )
}