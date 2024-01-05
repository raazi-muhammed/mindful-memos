import { Button } from "@/components/ui/button";
import { LoginPage } from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { Toaster } from "@/components/ui/toaster";
import { AdminLoginPage } from "./pages/AdminLoginPage";

function App() {
    return (
        <div className="grid place-items-center h-screen">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <p>Home Page</p>
                                <Link to="login">
                                    <Button>login</Button>
                                </Link>
                            </div>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="sign-up" element={<SignUpPage />} />
                    <Route path="admin/login" element={<AdminLoginPage />} />
                </Routes>
            </BrowserRouter>
            <Toaster />
        </div>
    );
}

export default App;
