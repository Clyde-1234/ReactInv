interface EmployeeDataProps{
    id: number,
    name: string,
    role: string,
    salary: number
}

export default function EmployeeCard({id, name, role, salary}: EmployeeDataProps) {
    const isSenior = salary < 50000
    return(
        <div className={`
            ${ isSenior? 'bg-amber-900': 'bg-slate-600 border-yellow-500'}
            flex justify-center items-center pr-16 h-16 border-4 border-red-500 space-x-8 relative 
        `}>
            <div className={`absolute flex h-12 w-32 border-2 rounded-2xl -top-6 -left-6 justify-center items-center
                ${ isSenior ? 'bg-gray-900 border-red-800' : ' bg-blue-950 border-yellow-600'}`}>
                { isSenior? 'Entry Level': 'Senior'}
            </div>
            
            <span className=" text-slate-500">{id}</span>
            <span className=" text-slate-100">{name}</span>
            <span className=" text-blue-500">{role}</span>
            <span className={isSenior? 'text-green-500': 'text-red-600'}>{salary}</span>
        </div>
    )
}