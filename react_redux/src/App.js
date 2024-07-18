import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import pageRoute from './routes';

function App() {
  return (
    <React.Fragment>
    <Routes>
      {
        pageRoute.map(({path,Component}) => (
          <Route key={path}  path={path} element={<Component  />} />
        ))
      }
    </Routes>
    </React.Fragment>
  );
}

export default App;
