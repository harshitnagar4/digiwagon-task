import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAdminLogIn, setIsUserLogIn } from "../../redux/productSlice";

export default function Header() {
  const [userState, setUserState] = useState("Login");
  const isUserLogIn = useSelector((state) => state.productslice.isUserLogIn);
  const isAdminLogIn = useSelector((state) => state.productslice.isAdminLogIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLogIn || isAdminLogIn) {
      setUserState("Logout");
    }
  }, []);

  const loginHandler = () => {
    localStorage.removeItem("email");
    dispatch(setIsAdminLogIn(false));
    dispatch(setIsUserLogIn(false));
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "40px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img
              src="https://digiwagon.com/wp-content/uploads/2021/04/Digiwagon-footer-logo.svg"
              alt="logo"
              width={100}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit" onClick={loginHandler}>
            {userState}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
