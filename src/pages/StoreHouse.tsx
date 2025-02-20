import { useState } from "react";
import { useAtomValue } from "jotai";
import { sessionAtom } from "../atoms";

import CreateStorageHouse from "../components/CreateStoreHouse";
import PageHeader from "../components/PageHeader";


export default function StoreHouse() {

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
        
        <main className="flex-col place-items-center space-y-10 fixed left-0 top-10 p-4 h-[calc(100vh-40px)] w-[100vw] overflow-y-auto bg-slate-900">
            <div className=" w-full h-64 bg-slate-600 rounded-2xl p-2">
                <div className="flex justify-between w-full h-full bg-slate-500 rounded-2xl p-1">
                    
                    <div>
                        <div className=" flex items-center gap-2">
                            <img className=" w-8 h-8 rounded-full overflow-hidden" src={photoUrl} alt="no_img" />
                            <span className=" text-lg">Store House Name here</span>
                        </div>
                        <span className=" text-style-2">Most recent update: {">>insert time<<"}</span>
                    </div>

                    <div>
                        <div>
                        <button className="transparent-button" onClick={toggleOverlay}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="#cbd5e1" stroke-width="1.5"></circle> <path d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                        </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className=" w-full h-64 bg-slate-600 rounded-2xl">
                
            </div>
        </main>        
        <CreateStorageHouse isOpen={isOverlayOpen} onClose={toggleOverlay}/>
        </>
    )
}