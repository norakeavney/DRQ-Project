//IMPORTS
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/nav';
import Content from './components/content';
import Read from './components/Read';
import Create from './components/Create';

// App Function - Displaying compenents - using client side routing handling paths
function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/read" element={<Read /> } />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

//export app 
export default App;