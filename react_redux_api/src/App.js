import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import pageRouter from './route';

function App() {
  return (
    <React.Fragment>
      <Routes>
        {
          pageRouter.map(({path, Component}) =>(
            <Route key={path} path={path} element={<Component />}  />
          ))
        }
      </Routes>
    </React.Fragment>
  );
}

export default App;
