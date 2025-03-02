export const isAuthenticated = () => {
    const userToken = localStorage.getItem('user');
    return !!userToken;
  };
  