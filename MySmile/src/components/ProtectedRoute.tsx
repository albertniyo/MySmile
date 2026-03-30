// src/components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        return;
      }
      // Check admin_users table
      const { data } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .single();
      setIsAdmin(!!data);
    };
    checkAdmin();
  }, []);

  if (isAdmin === null) return <div className="p-8 text-center">Loading...</div>;
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;