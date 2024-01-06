import { LoginPage } from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { Toaster } from "@/components/ui/toaster";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import AdminHomePage from "./pages/AdminHomePage";

function App() {
    return (
        <div className="grid place-items-center h-screen">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route
                        path="/admin/dashboard"
                        element={<AdminHomePage />}
                    />
                </Routes>
            </BrowserRouter>
            <Toaster />
        </div>
    );
}

export default App;
