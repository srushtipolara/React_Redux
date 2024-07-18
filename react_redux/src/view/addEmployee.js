import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch } from 'react-redux'
import { addEmployeeInfo } from '../redux/employeReducer'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [first, setFirst] = useState('')
    // const [value, setvalue] = useState({
    //     first: ''
    // })
    const [error, setError] = useState('')
    const [emList, setEmList] = useState([])
    // handle pending states
    const [isPending, startTransition] = useTransition()

    const addEmployee = (firstName) => {
        if (firstName.trim() === "") {
            return "Name is required"
        }
        const newEmployeeInfo = { "id": Math.floor(Math.random() * (20 - 10) + 10), "firstName": firstName }
        dispatch(addEmployeeInfo(newEmployeeInfo))
        const updatedEmList = [...emList, newEmployeeInfo];
        localStorage.setItem("employeeList", JSON.stringify(updatedEmList))
        setEmList(updatedEmList)
        setError('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        startTransition(async () => {
            const error = await addEmployee(first)
            if (error) {
                setError(error)
                return;
            }
            navigate("/")
        })
    }
    
    const handleChange = (event) => {
        //  const changeValue = {[name]: event.target.value};
        //  console.log("changeValue ==>", changeValue);
        setFirst(event.target.value);
    }
    
    useEffect(() => {
        setEmList(JSON.parse(localStorage.getItem("employeeList")) || [])
    }, [])

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>firstName</label>
                <input type='text' value={first} onChange={handleChange} />
                <button type='submit' disabled={isPending}>submit</button>
            </form>
            {error ?? <p>{error}</p>}
        </React.Fragment>
    )
}

export default AddEmployee
