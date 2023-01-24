//rfce

import CollapsibleExample from "./components/NavBar";
import Diary from "./components/Diary/Diary";
import Logger from "./components/Logger/Logger";
import Programs from "./components/Programs/Programs";
import Calculators from "./components/Calculators/Calculators";

import Container from "react-bootstrap/Container";

import {
    Routes,
    Route,
    useMatch,
    useNavigate
  } from "react-router-dom"

const App = () => {
    return (
        <Container fluid className="px-0">
            <CollapsibleExample />
            <Routes>
                <Route path="/" element={<div>Welcome</div>} />
                <Route path="/diary" element={<Diary />} />
                <Route path="/logger" element={<Logger />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/calculators" element={<Calculators />} />
            </Routes>
        </Container>
    )
}

export default App;
