import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/nav';
import Content from './Components/content';

function App() {
  return (
    <Router>
       <NavigationBar />
      <Routes>
        <Route path="/home" element={<Content />} />
      </Routes>
    </Router>
  );
}

export default App;