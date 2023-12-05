import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing Page/Landing.jsx';
import Home from './components/Home/Home.jsx';
import FormPage from './components/Form/Form.jsx';
import ErrorBoundary from './ErrorBoundary.jsx'


function App() {
  return (
      <Router>
        <ErrorBoundary>
          <Routes> 
            <Route path="/" element={<Landing />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/cr.Driver" element={<FormPage />} />
            <Route path="/driver/"
          </Routes>
        </ErrorBoundary>
      </Router>
  );
}

 
 export default App;

