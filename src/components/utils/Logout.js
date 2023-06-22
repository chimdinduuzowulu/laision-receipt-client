const Logout = () => {
  window.localStorage.removeItem('token');
  window.location.replace('/login');
};

export default Logout;
