
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import FormPage from './pages/FormPage';
import PortfolioPage from './pages/PortfolioPage';
import ProfilesPage from './pages/ProfilesPage';
import TemplateSelection from './pages/TemplateSelection';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/form" element={<FormPage />} />
        <Route path="/portfolio/:id" element={<PortfolioPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/" element={<TemplateSelection />} />

      </Routes>
    </Router>
  );
};

export default App;
