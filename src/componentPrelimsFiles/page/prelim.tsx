import PrelimMain from "../components/prelimMain";
import EmployeeCard from "../components/employeeCard";
export default function Prelim(){

    const employees = [
        { id: 1, name: 'Justine Clyde Pelagio', salary: 10000, role: 'Software Engineer' },
        { id: 2, name: 'Bob Johnson', salary: 999999, role: 'Product owner' },
        { id: 3, name: 'Mark Rober', salary: 5000, role: 'Sanitary Maintenance Engineer (Janitor)' },
        { id: 4, name: 'Mark Zuckerburger', salary: 62000, role: 'Human Rescource' },
        { id: 5, name: 'Gwapo si Edmel', salary: 58000, role: 'QA Engineer' },
      ];

    async function fetchEmployees() {
        

        try {
          const response = await fetch('http://localhost:3000/employees');

          if (!response.ok) {
            throw new Error(`errorr at:  ${response.status}`);
          }

          const employees = await response.json();
          return employees; 
        } 
        
        catch (error) {
          console.error('failed at fetching data: ', error);
          return null; 
        }
      }

    async function processData(){
        const employeeData = await fetchEmployees()
        if (employeeData){
            alert(employeeData)
        }
    }

    return(
        <PrelimMain 
        children = {
            <div className="flex-col space-y-8">
                {employees.map((employee) => (
                    <EmployeeCard id={employee.id} name={employee.name} role={employee.role} salary={employee.salary}></EmployeeCard>
                ))}
            </div>
        }/>
    )
}