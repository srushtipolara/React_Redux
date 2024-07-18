import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employeeList: []
}

const EmployeeReducer = createSlice({
    name: "Employee",
    initialState: initialState,
    reducers: {
        getEmployeeList: (state, action) => {
            state.employeeList = action.payload
        },
        addEmployeeList: (state, action) => {
            state.employeeList.push(action.payload)
        },
        updateEmployeeList: (state, action) => {
            state.employeeList = state.employeeList.map((item) => item._id === action.payload._id ? { ...item, ...action.payload } : item)
        },
        deleteEmployeeLIst: (state, action) => {
            state.employeeList = state.employeeList.filter((d) => d._id !== action.payload)
        }
    }
})

export const { getEmployeeList, addEmployeeList, updateEmployeeList, deleteEmployeeLIst } = EmployeeReducer.actions;
export default EmployeeReducer.reducer;