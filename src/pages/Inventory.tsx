import PageHeader from "../components/PageHeader";
import SideNav from "../components/SideNav";
import Main from "../components/Main";
import { ItemData } from "../InterTypes";
import ItemCard from "../components/ItemCard";
import TopContainer from "../components/TopContainer";

const items: ItemData[] = [
    { name: "ndnasdnsajkdnjsandkjsandjknsadkjnaksjndkjasndkjnasdkjnsalkjdnkjasndkjasndkjansdkjansdkjnasd 1", current: 100, maxAmount: 200, color: 'green' },
    { name: "Item 2", current: 200, maxAmount: 200, color: 'green', imageSrc: "https://i.kym-cdn.com/entries/icons/facebook/000/036/356/limmy.jpg"},
    { name: "Item 3", current: 400, maxAmount: 400 , color: 'slate'},
    { name: "Item 3", current: 400, maxAmount: 400, color: 'green'},
    { name: "Item 3", current: 400, maxAmount: 400, color: 'green'},
    { name: "Item 3", current: 400, maxAmount: 400, color: 'green'},
    { name: "Item 3", current: 400, maxAmount: 400, color: 'green'},
    { name: "Item 3", current: 400, maxAmount: 400, color: 'green'},
    { name: "Item 3", current: 400, maxAmount: 400, color: 'green'},
    { name: "Item 3", current: 400, maxAmount: 400, color: 'green'},
];

export default function Inventory() {

    return(
        <>
        <PageHeader enableSearch={false}/>
        <SideNav/>
        <TopContainer>
            <div>Sort</div>
            <div> Filter</div>
        </TopContainer>
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




