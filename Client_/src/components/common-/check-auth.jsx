import { Navigate, useLocation } from "react-router-dom";

function CkeckAuth({ isAuthenticated, user, children }) {
  const location = useLocation(); //get current location

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />; //check if user is not authenticated and trying to access any page other than login or register
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (
      user.role === "admin" &&
      (location.pathname.includes("/login") ||
        location.pathname.includes("/register"))
    ) {
      return <Navigate to="/admin/dashboard" />; //check if user is admin and trying to access login or register page
    } else if (
      user.role === "user" &&
      (location.pathname.includes("/login") ||
        location.pathname.includes("/register"))
    ) {
      return <Navigate to="/shop/home" />; //check if user is user and trying to access login or register page
    }
  }

  if (
    isAuthenticated &&
    user.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauthpage" />; //check if user is not admin and trying to access admin page
  }

  if (
    isAuthenticated &&
    user.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />; //check if user is admin and trying to access shop page
  }

  return <>{children}</>;
}

export default CkeckAuth;
