import { useLocation, useNavigate } from "react-router-dom";

export const useCreateThread=()=>{
  const navigate=useNavigate();
  const loction=useLocation();
  const open=loction.pathname==="/create";
  const openDialog=()=>{
    navigate("/create");
  } 
  const closeDialog=()=>{
    navigate(-1);//go back to previous page

  }
  return{
    open,
    openDialog,
    closeDialog
  }


}
