import { configureStore} from "@reduxjs/toolkit"

// reducer files
import EmployeeReducer from "./employeReducer";

// configureStore Reducer 
export default configureStore({
    reducer:{
        Employee : EmployeeReducer
    }
});