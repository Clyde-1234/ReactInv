import { useState } from "react";
import { useAtomValue } from "jotai";
import { sessionAtom } from "../atoms";
import CreateStorageHouse from "../components/CreateStoreHouse";
import PageHeader from "../components/PageHeader";
import StoreHouseContainer from "../components/StoreHouseContainer";

const StoreHouse = () => {

    const photo = useAtomValue(sessionAtom);
    //@ts-ignore
    const googleAvatarUrl = photo?.user?.user_metadata?.avatar_url;
    //@ts-ignore
    const googleId = photo?.user?.user_metadata?.sub;

    const publicGooglePhotoUrl = googleId
    ? `https://profiles.google.com/s2/photos/profile/${googleId}`
    : null;

    const photoUrl = googleAvatarUrl || publicGooglePhotoUrl || '/default-avatar.png';

    const [isOverlayOpen, setisOverlayOpen] = useState(false);

    const toggleOverlay = () => setisOverlayOpen(!isOverlayOpen)

    return(
        <>
        <PageHeader enableSearch={false}/>
        
        <main className="space-y-4 fixed left-0 top-10 p-4 h-[calc(100vh-40px)] w-[100vw] overflow-y-auto bg-slate-900
                         md:flex md:space-x-4 md:items-center">

            <div className=" w-full h-64 bg-slate-600 rounded-2xl">
                
            </div>
            <StoreHouseContainer name="Lee's Catering" borderColor="red" members={[]} recentUpdate={new Date()}/>
        </main>        
        <CreateStorageHouse isOpen={isOverlayOpen} onClose={toggleOverlay}/>
        </>
    )
}

export default StoreHouse