import React, { useState, useTransition } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';

const AddEmployeeList = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [first, setFirst] = useState("");
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const addEmployeeList =async (firstName) => {
        if (typeof firstName !== 'string' || firstName.trim() === "") {
            return "First Name is required";
        }
        try {
            const response =await axios.post(`${process.env.REACT_APP_BASE_URL}/employee/add`, {
                "firstName": firstName
            })
            dispatch(addEmployeeList(response.data))
            setError('')
        } catch (error) {
            console.log("add employee list Error : ", error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        startTransition(async() => {
            const error =await addEmployeeList(first)

            if (error) {
                setError(error)
                return;
            }
            setFirst('');
            navigate("/");
        })
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>firstName :</label>
                <input type='text' value={first} onChange={(event) => setFirst(event.target.value)} />
                <button type='submit' disabled={isPending}>submit</button>
            </form>
            {error ?? <p>{error}</p>}
        </React.Fragment>
    )
}

export default AddEmployeeList;
