import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch } from 'react-redux'
import { addEmployeeInfo } from '../redux/employeReducer'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [value, setValue] = useState({
        first: '',
        description: ''
    })
    const [error, setError] = useState({
        first: '',
        description: ''
    })
    const [emList, setEmList] = useState([])
    // handle pending states
    const [isPending, startTransition] = useTransition()

    const handleValidation = (value) => {
        let errors = {
            first: '',
            description: ''
        };
        if (value.first?.trim() === '') {
            errors.first = "Name is required";
        }
        if (value.description?.trim() === '') {
            errors.description = "Description is required";
        }
        return errors;
    }

    const addEmployee = async (value) => {
        const errors = handleValidation(value)
        if (errors.first === '' && errors.description === '') {
            const newEmployeeInfo = { "id": Math.floor(Math.random() * (20 - 10) + 10), "firstName": value.first, "description": value.description }
            dispatch(addEmployeeInfo(newEmployeeInfo))
            const updatedEmList = [...emList, newEmployeeInfo];
            localStorage.setItem("employeeList", JSON.stringify(updatedEmList))
            setEmList(updatedEmList)
            setError(null)
        } else {
            return errors;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        startTransition(async () => {
            const error = await addEmployee(value)
            if (error) {
                setError(error)
                return;
            }
            navigate("/")
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue({ ...value, [name]: value })
    }

    useEffect(() => {
        setEmList(JSON.parse(localStorage.getItem("employeeList")) || [])
    }, [])

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>firstName</label>
                    <input type='text' name="first" value={value.first} onChange={handleChange} />
                </div>
                {error.first ?? <p>{error.first}</p>}
                <div>
                    <label>description</label>
                    <textarea type='text' name="description" value={value.description} onChange={handleChange} />
                </div>
                {error.description ?? <p>{error.description}</p>}
                <button type='submit' disabled={isPending}>submit</button>
            </form>

        </React.Fragment>
    )
}

export default AddEmployee
