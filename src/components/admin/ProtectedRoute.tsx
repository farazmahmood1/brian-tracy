
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
        if (!isLoggedIn) {
            navigate('/admin/login');
            return;
        }

        // Verify session is still valid with the server
        fetch(`${import.meta.env.VITE_API_BASE}/me`, {
            credentials: 'include',
        })
            .then((res) => {
                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('admin_logged_in');
                    navigate('/admin/login');
                }
            })
            .catch(() => {
                // If /me endpoint doesn't exist yet, fall back to localStorage check
                setIsAuthenticated(true);
            });
    }, [navigate]);

    if (!isAuthenticated) return null;

    return <>{children}</>;
}
