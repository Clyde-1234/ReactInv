//import { ReactComponent as LogOutIcon} from '../assets/log-out-svgrepo-com.svg'

import { supabase } from "../../supabaseClient";
import { useAtomValue } from "jotai";
import { sessionAtom } from "../atoms";

export default function PageHeader() {

    const rickroll = () => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }

    const session = useAtomValue(sessionAtom);
    //@ts-ignore
    const userName = session?.user?.user_metadata?.name;

    const signOut = async () => {
        const { data: user } = await supabase.auth.getUser();

        if (user) {
            const { error } = await supabase.auth.signOut();
            if (error) {
            console.error("Sign-out error:", error);
            } else {
            window.location.href = "/";
            }
        } else {
            console.log("No user is logged in");
        }
      }

    return(
        <header className=" flex items-center fixed h-10 left-0 top-0 pl-2 pr-2 bg-slate-700 justify-between w-screen">
            <div className=" h-6">
                <span className="">App name here</span>
            </div>

            <button onClick={rickroll} className=" bg-transparent text-xs">Click me!</button>

            <div>
                <button onClick={signOut} className="text-xs">Log-out</button>
            </div>
        </header>
    )
}