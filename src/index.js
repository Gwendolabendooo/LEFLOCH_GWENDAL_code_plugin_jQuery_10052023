import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//steel
import './App.scss';
import './index.css';

//views
import Home from './views/Home'
import Employees from './views/Emplyees'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/employees" element={<Employees></Employees>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
