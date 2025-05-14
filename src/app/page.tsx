import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Welcome to Lees Rental Service!
      {/* <Link href={'/customer'} className="bg-gray-500 hover:bg-gray-700 active:bg-gray-400"> Click Here to Get Started</Link>
      <Link href={'/admin'} className="bg-gray-500 hover:bg-gray-700 active:bg-gray-400"> Admin</Link> */}


      <Link href={'/component-midterms'} className="bg-gray-500 hover:bg-gray-700 active:bg-gray-400 p-4"> CLICK ME FOR COMPONENT MIDTERMS</Link>
    </div>
  );
}
