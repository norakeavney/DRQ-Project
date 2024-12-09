import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/nav';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import Footer from './Components/Footer';
//import EditPost from './pages/EditPost';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <NavigationBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
