import PageHeader from "../components/PageHeader";
import SideNav from "../components/SideNav";
import Main from "../components/Main";

export default function Home() {

    return(
        <>
        <PageHeader/>
        <SideNav/>
        <Main>
            <div>This is the homepage</div>
        </Main>
            
        </>
    )
}