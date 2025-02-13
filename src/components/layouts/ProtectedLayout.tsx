import { Outlet } from "react-router-dom";
import RequireAuth from "@/components/auth/RequireAuth";
import { QuickNav } from "@/components/navigation/QuickNav";

const ProtectedLayout = () => {
  return (
    <RequireAuth>
      <QuickNav />
      <Outlet />
    </RequireAuth>
  );
};

export default ProtectedLayout;