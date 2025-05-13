import { useLocation } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import ScrollToTop from "./components/layout/ScrollToTop";
import Slider from "./components/layout/Slider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
    const location = useLocation();

    return (
        <>
            <ScrollToTop />
            <Toaster position="top-right" reverseOrder={false} />
            <Navbar />
            {location.pathname === "/" && <Slider />}
            <main className="min-h-screen px-4 py-6">
                <AppRoutes />
            </main>
        </>
    );
}

export default App;

