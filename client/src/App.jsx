import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing Page/Landing.jsx';
import HomePage from './components/Home/Home.jsx';
import FormPage from './components/Form/Form.jsx';
import Detail from './components/Detail/Detail.jsx';
import { fetchData } from './redux/actionCreator.js';
import { collectTeams } from './redux/actionCreator.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
const dispatch = useDispatch();
const teamsState = useSelector((state) => state.collectTeams);

 useEffect(() => {
   dispatch(fetchData());
 }, [dispatch]);

 useEffect(() => {
  dispatch(collectTeams());
}, [dispatch]);



  return (
      <Router>
          <Routes> 
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/Home" element={<HomePage />} />
            <Route exact path="/crDriver" element={<FormPage />} />
            <Route exact path="/driverDetail/:id" element={<Detail />} />
          </Routes>
      </Router>
  );
}

 
 export default App;

