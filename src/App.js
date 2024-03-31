import React, { useEffect } from "react";
import { Route, Routes,  } from "react-router-dom";
import Login from "./pages/login";
import { useDispatch, useSelector } from "react-redux";
import UserDashBoard from "./pages/user-dashboard";
import AdminDashboard from "./pages/admin-dashboard";
import NotFound from "./pages/notfound";
import { setIsAdminLogIn, setIsUserLogIn } from "./redux/productSlice";

const App = () => {
  const dispatch = useDispatch();
  const isAdminLogIn = useSelector((state) => state.productslice.isAdminLogIn);
  const isUserLogIn = useSelector((state) => state.productslice.isUserLogIn);

  useEffect(() => {
    const user = localStorage.getItem("email");
    if (user === "admin@admin.com") {
      dispatch(setIsAdminLogIn(true));
    } else if (user === "user@user.com") {
      dispatch(setIsUserLogIn(true));
    }
  }, [dispatch]);

  return (
    <>
        <Routes>
          {!isUserLogIn && <Route path="/" exact element={<Login />}></Route>}
          {isUserLogIn && (
            <Route path="/userdashboard" exact element={<UserDashBoard />} />
          )}
          {isAdminLogIn && (
            <Route path="/admindashboard" exact element={<AdminDashboard />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
};

export default App;
