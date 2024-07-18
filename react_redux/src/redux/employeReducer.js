import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employeeInfo: []
}

const EmployeeReducer = createSlice({
    name: "Employee",
    initialState: initialState,
    reducers: {
        getEmployeeInfo: (state, action) => {
            state.employeeInfo = action.payload;
        },
        addEmployeeInfo: (state, action) => {
            state.employeeInfo.push(action.payload)
        },
        updateEmployeeInfo : (state, action) => {
            state.employeeInfo = (state.employeeInfo || []).map((event) => {
                console.log('event.id.toString() === action?.payload.id', event.id.toString() === action?.payload.id.toString(), event.id.toString() ,  action?.payload.id.toString());
                return event.id.toString() === action?.payload.id.toString()
                    ? { ...event, ...action.payload }
                    : event
            });
            
        },
        deleteEmployeeInfo: (state, action) => {            
            state.employeeInfo = state.employeeInfo.filter((d) => d.id.toString() !== action.payload.toString())

        }
    }
})

export const { getEmployeeInfo, addEmployeeInfo,updateEmployeeInfo, deleteEmployeeInfo } = EmployeeReducer.actions;
export default EmployeeReducer.reducer