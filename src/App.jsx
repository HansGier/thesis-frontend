import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Announcements, Contacts, Dashboard, Messages, Projects, SharedLayout } from "./pages/navigation/index.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <SharedLayout /> }>
                    <Route path="dashboard" element={ <Dashboard /> } />
                    <Route path="projects" element={ <Projects /> } />
                    <Route path="announcements" element={ <Announcements /> } />
                    <Route path="messages" element={ <Messages /> } />
                    <Route path="contacts" element={ <Contacts /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
