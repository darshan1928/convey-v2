import axios from 'axios';

class AuthApi {
  // General method to handle login, signup, logout, etc.
  async handleAuthAction(action, data = null) {
    try {
      const url = `/auth/${action}`;
      const response = await axios.post(url, data); // Use axios directly with await
      return response?.data;  // Return the response data
    } catch (error) {
      console.error(error);
      throw new Error(`${action} failed. Please try again later.`); // Throw an error with a message
    }
  }

  // Wrapper method for login
  login(data) {
    return this.handleAuthAction("login", data);  
  }

  // Wrapper method for signup
  signup(data) {
    return this.handleAuthAction("signup", data); 
  }

  // Wrapper method for logout
  logout() {
    return this.handleAuthAction("logout");
  }
}

export const authApi = new AuthApi();
