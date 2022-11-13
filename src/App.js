import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <div className="App"></div>
    </BrowserRouter>
  );
}

export default App;
