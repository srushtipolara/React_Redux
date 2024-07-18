import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import axios from "axios";
import { deleteEmployeeLIst, getEmployeeList } from '../redux/EmployeeReducer';

const EmployeeList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [employees, setEmployees] = useState('')

    const selectEmployee = createSelector(
        state => state.Employee.employeeList,
        employeeList => ({ employeeInfo: employeeList })
    )

    const { employeeInfo } = useSelector(selectEmployee)

    const handleAddEmployee = () => {
        navigate("/add")
    }

    const handleDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/employee/delete/${id}`)
        dispatch(deleteEmployeeLIst(id))
    }

    const handleUpdate = (item) => {
        localStorage.setItem("editEmployeeData", JSON.stringify(item))
        navigate("/update")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee`)
                dispatch(getEmployeeList(response.data))
            } catch (error) {
                setError(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setEmployees(employeeInfo)
    }, [employeeInfo])

    if (error) return <div>{error}</div>

    return (
        <React.Fragment>
            <div>EmployeeList</div>
            <button onClick={handleAddEmployee}>add</button>
            <ul>
                {
                    (employees || [])?.map((emp) => (
                        <React.Fragment key={emp._id}>
                            <li>{emp.firstName}</li>
                            <li><button onClick={() => handleDelete(emp._id)}>delete</button></li>
                            <li><button onClick={() => handleUpdate(emp)}>update</button></li>
                        </React.Fragment>
                    ))
                }
            </ul>
        </React.Fragment>
    )
}


export default EmployeeList;