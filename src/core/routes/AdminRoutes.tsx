import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "@/features/admin-portal/components/AdminLayout";
import NotFoundPage from "@/components/common/NotFoundPage";
import { adminRoutes } from "./RoutesConfig";
export const AdminRoutes = () => {
  return (
    <Routes>
      {adminRoutes.map(({ path, element: Element, roles, permission }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute roles={roles} permission={permission}>
              <AdminLayout>
                <Element />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      ))}
      <Route
        path="*"
        element={
          <AdminLayout>
            <NotFoundPage />
          </AdminLayout>
        }
      />
    </Routes>
  );
};
