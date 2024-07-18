import AddEmployee from "./view/addEmployee";
import Employee from "./view/employe";
import UpdateEmployee from "./view/updateEmployee";

const pageRoute = [
    {path: '/', Component : Employee},
    {path: '/add', Component : AddEmployee},
    {path: '/update', Component : UpdateEmployee},
]

export default pageRoute;