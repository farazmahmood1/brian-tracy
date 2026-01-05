
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Check for auth token in cookies or local storage/state
        // Since we used HTTP-only cookies, we might just assume validity or try a "me" endpoint.
        // However, without a "me" endpoint, we can rely on local state set during login (e.g. localStorage)
        // For better security, we should have a /api/me endpoint, but for this task I will trust localStorage flag for UI
        // and let the API reject requests if cookie is missing.

        // Simple check: Is "admin_logged_in" flag set?
        const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
        if (!isLoggedIn) {
            navigate('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    if (!isAuthenticated) return null; // or loading spinner

    return <>{children}</>;
}
