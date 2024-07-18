import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateEmployeeList } from '../redux/EmployeeReducer';

const UpdateEmployee = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [first, setFirst] = useState("");
    const [emList, setEmList] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put(`${process.env.REACT_APP_BASE_URL}/employee/update/${emList._id}`, {
            "firstName": first
        })
        const updateEmList = { _id: emList.id, firstName: first }
        dispatch(updateEmployeeList(updateEmList))
        localStorage.removeItem("editEmployeeData")
        navigate("/");
    }

    useEffect(() => {
        const editStore = JSON.parse(localStorage.getItem("editEmployeeData"))
        setFirst(editStore.firstName)
        setEmList(editStore)
    }, [])
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>firstName :</label>
                <input type='text' value={first} onChange={(event) => setFirst(event.target.value)} />
                <button type='submit'>update</button>
            </form>
        </React.Fragment>
    )
}

export default UpdateEmployee