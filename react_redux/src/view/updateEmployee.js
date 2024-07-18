import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateEmployeeInfo } from '../redux/employeReducer'

const UpdateEmployee = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [first, setFirst] = useState()
    const [emList, setEmList] = useState([])

    const updateEmployee = (firstName) => {
        const store = JSON.parse(localStorage.getItem("employeeEditList"));
        const updateEmployeeList = { "id": store.id, "firstName": firstName }
        dispatch(updateEmployeeInfo(updateEmployeeList))
        const updateList = emList.map((i) => i.id ===store.id ?updateEmployeeList : i  )
        localStorage.setItem("employeeList", JSON.stringify(updateList))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        updateEmployee(first)
        navigate("/")
        localStorage.removeItem("employeeEditList")
    }

    const handleChange = (event) => {
        setFirst(event.target.value);
    }

    useEffect(() => {
        const editStore = JSON.parse(localStorage.getItem("employeeEditList"));
        const store = JSON.parse(localStorage.getItem("employeeList"));
        if (!editStore) {
            navigate("/");
            return;
        }
        setEmList(store)
        setFirst(editStore.firstName)
    }, [navigate])

  return (
    <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>firstName</label>
                <input type='text' value={first} onChange={handleChange} />
                <button type='submit' >update</button>
            </form>
        </React.Fragment>
  )
}

export default UpdateEmployee