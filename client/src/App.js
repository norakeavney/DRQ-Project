import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/nav';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
//import PostDetails from './pages/PostDetails';
//import EditPost from './pages/EditPost';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
