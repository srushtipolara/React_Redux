import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import pageRouter from './route';
import EmployeeList from './Employee/EmployeList';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <React.Fragment>
      <Routes>
        {
          pageRouter.map(({path, Component}) =>(
            <Route key={path} path={path} element={<Component />}  />
          ))
        }
            <Route path="/" element={<PrivateRoute component={EmployeeList}></PrivateRoute>}  />
        
      </Routes>
    </React.Fragment>
  );
}

export default App;
