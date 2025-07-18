export const logoutAndRedirect = (setIsSignedIn, navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setIsSignedIn(false);
  navigate("/");
};