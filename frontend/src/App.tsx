import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComputerList from './components/ComputerList';
import ComputerForm from './components/ComputerForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComputerList />} />
        <Route path="/create" element={<ComputerForm />} />
        <Route path="/edit/:id" element={<ComputerForm />} />
      </Routes>
    </Router>
  );
};

export default App;
