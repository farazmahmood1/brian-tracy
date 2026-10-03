
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, authToken } from '@/services/api';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        if (!authToken.get()) {
            navigate('/admin/login');
            return;
        }

        // Verify the token is still valid with the server
        api.auth.me()
            .then((res) => {
                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    authToken.clear();
                    navigate('/admin/login');
                }
            })
            .catch(() => {
                // Server unreachable - show the shell; every admin request is still checked server-side
                setIsAuthenticated(true);
            });
    }, [navigate]);

    if (!isAuthenticated) return null;

    return <>{children}</>;
}
