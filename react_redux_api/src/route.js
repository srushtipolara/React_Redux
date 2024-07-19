import Login from "./auth/login";
import AddEmployeeList from "./Employee/AddEmployeeList";
import UpdateEmployee from "./Employee/UpdateEmployee";

const pageRouter = [
    {path:"/add", Component : AddEmployeeList},
    {path:"/update", Component : UpdateEmployee},
    {path:"/login", Component : Login},
]

export default pageRouter;