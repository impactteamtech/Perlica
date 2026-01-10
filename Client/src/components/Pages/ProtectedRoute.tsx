import { Navigate, Outlet } from 'react-router-dom';

export interface ProtectedRouteProps {
    isAllowed: boolean;
    redirectTo?: string;
}

/**
 * UX-only route guard. This protects routes from casual access in the UI,
 * but it does NOT secure backend data or APIs. Always enforce authorization
 * on the server as the source of truth.
 */
export const ProtectedRoute = ({ isAllowed, redirectTo = '/' }: ProtectedRouteProps) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};
