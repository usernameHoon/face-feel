export const logoutAndRedirect = (setIsLoggedIn, navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setIsLoggedIn(false);
  navigate("/login");
};