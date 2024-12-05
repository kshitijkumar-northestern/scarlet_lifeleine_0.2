import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const useRequireAuth = (requiredRole) => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (requiredRole && role !== requiredRole) {
      navigate("/");
    }
  }, [user, role, requiredRole, navigate]);

  return { user, role };
};
