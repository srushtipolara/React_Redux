import { configureStore } from "@reduxjs/toolkit"
import EmployeeReducer from "./EmployeeReducer"

export default configureStore({
    reducer: {
        Employee: EmployeeReducer
    }
})