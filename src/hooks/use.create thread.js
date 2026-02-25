import { useNavigate, useLocation } from "react-router-dom";

export const useCreateThread = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openDialog = () => {
    navigate("/create", {
      state: { backgroundLocation: location },
    });
  };

  const closeDialog = () => {
    navigate(-1);
  };

  return {
    openDialog,
    closeDialog,
  };
};