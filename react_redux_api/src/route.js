import AddEmployeeList from "./Employee/AddEmployeeList";
import EmployeeList from "./Employee/EmployeList";
import UpdateEmployee from "./Employee/UpdateEmployee";

const pageRouter = [
    {path:"/", Component : EmployeeList},
    {path:"/add", Component : AddEmployeeList},
    {path:"/update", Component : UpdateEmployee},
]

export default pageRouter;