//rfce

import Main from "./components/Main"
import NavigationBar from "./components/NavBar"
import Logger from "./components/Logger/Logger"
import Programs from "./components/Programs/Programs"
import Calculators from "./components/Calculators/Calculators"
import Statistics from "./components/Statistics/Statistics"
import Overview from "./components/Overview/Overview"
import Exercises from "./components/Exercises/Exercises"
import Profile from "./components/Account/Profile"
import Info from "./components/Account/Info"
import Settings from "./components/Account/Settings"

import Container from "react-bootstrap/Container"

import { Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <Container fluid className="px-0">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/logger" element={<Logger />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/info" element={<Info />} />
        <Route path="/account/settings" element={<Settings />} />
      </Routes>
    </Container>
  )
}

export default App
