import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeInfo, getEmployeeInfo } from '../redux/employeReducer';
import { employee } from '../common/employeeList';
import { createSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

const Employee = () => {

    const dispatch =  useDispatch()
    const navigate = useNavigate()
    const [employeeInfo,setEmployeeInfo] = useState([])

    const selectEmployeeInfo = createSelector(
        (state) => state.Employee.employeeInfo,
        (employeeInfo) => ({ employeeList: employeeInfo })
    )
    const {employeeList}  = useSelector(selectEmployeeInfo)

    const addEmployee = () => {
        navigate('/add')
    }

    const handleDelete  = (id) => {
        dispatch(deleteEmployeeInfo(id))
        localStorage.setItem("employeeList", JSON.stringify(employeeInfo.filter((i) => i.id !== id)))
        const store = JSON.parse(localStorage.getItem("employeeList"));
        setEmployeeInfo(store)
    }

    const handleUpdate = (item) => {
        localStorage.setItem("employeeEditList", JSON.stringify(item))
        navigate('/update')
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem("employeeList")).length <= 0){
            dispatch(getEmployeeInfo(employee))
            localStorage.setItem("employeeList", JSON.stringify(employeeList));
        }
    }, [dispatch, employeeList])

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem("employeeList"));
        setEmployeeInfo(store)
    }, [])

  return (
    <React.Fragment>
        <div>Employee</div>
        <button onClick={addEmployee}>Add Employee</button>
        <ul>
                {(employeeInfo || [])?.map((emp) => (
                    <div key={emp.id}>
                        <li>{emp.firstName}</li>
                        <li><button onClick={() =>handleDelete(emp.id)}>delete Employee</button></li>
                        <li><button onClick={() =>handleUpdate(emp)}>update Employee</button></li>

                    </div>
                ))}
            </ul>
    </React.Fragment>
  )
}

export default Employee;