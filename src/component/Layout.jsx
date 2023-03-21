import { Outlet } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Layout = () => {
  const loading = useSelector((state) => state.list.loading || state.edit.loading);

  return (
    <>
      <Outlet />
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default Layout;
