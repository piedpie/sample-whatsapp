import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Whatsapp } from './Whatsapp';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Whatsapp />} />
      </Routes>
    </Router>
  );
}
