import { LoginPage } from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { Toaster } from "@/components/ui/toaster";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import AdminHomePage from "./pages/AdminHomePage";
import { ThemeProvider } from "./utils/ThemeProvider";

/* TRPC */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./lib/trpc";
/* TRPC */

import { store } from "./app/store";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import AdminMailPage from "./pages/AdminMailPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import ProtectedRoute from "./lib/ProtectedRoute";

function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:4000/api/v1",
                    headers: { Authorization: Cookies.get("__crud_app") },
                }),
            ],
        })
    );

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Provider store={store}>
                <trpc.Provider client={trpcClient} queryClient={queryClient}>
                    <QueryClientProvider client={queryClient}>
                        <div className="min-h-screen w-screen">
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route
                                        path="/login"
                                        element={<LoginPage />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={
                                            <ProtectedRoute>
                                                <UserProfile />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/settings"
                                        element={
                                            <ProtectedRoute>
                                                <UserSettingsPage />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/sign-up"
                                        element={<SignUpPage />}
                                    />
                                    <Route
                                        path="/admin/login"
                                        element={<AdminLoginPage />}
                                    />
                                    <Route
                                        path="/admin/dashboard"
                                        element={<AdminHomePage />}
                                    />
                                    <Route
                                        path="/admin/mails"
                                        element={<AdminMailPage />}
                                    />
                                </Routes>
                            </BrowserRouter>
                            <Toaster />
                        </div>
                    </QueryClientProvider>
                </trpc.Provider>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
