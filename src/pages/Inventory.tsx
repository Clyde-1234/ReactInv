import PageHeader from "../components/PageHeader";
import SideNav from "../components/SideNav";
import Main from "../components/Main";
import { ItemData } from "../InterTypes";
import ItemCard from "../components/ItemCard";

const items: ItemData[] = [
    { name: "Item 1", current: 100, maxAmount: 200 },
    { name: "Item 2", current: 200, maxAmount: 200},
    { name: "Item 3", current: 400, maxAmount: 400},
    { name: "Item 3", current: 400, maxAmount: 400},
    { name: "Item 3", current: 400, maxAmount: 400},
    { name: "Item 3", current: 400, maxAmount: 400},
    { name: "Item 3", current: 400, maxAmount: 400},
    { name: "Item 3", current: 400, maxAmount: 400},
    { name: "Item 3", current: 400, maxAmount: 400},
    { name: "Item 3", current: 400, maxAmount: 400},
];

export default function Inventory() {

    return(
        <>
        <PageHeader/>
        <SideNav/>
        <Main>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {items.map((item, index) => (
                    <ItemCard key={index} {...item} />
                ))}
            </div>
        </Main>
            
        </>
    )
}




