import { Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CampsitesDirectoryPage from "./pages/CampsitesDirectoryPage";
import CampsiteDetailPage from "./pages/CampsiteDetailPage";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="directory" element={<CampsitesDirectoryPage />} />
                <Route path="directory/:campsiteId" element={<CampsiteDetailPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
