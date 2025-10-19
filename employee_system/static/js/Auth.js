// static/js/auth.js

const baseURL = "http://127.0.0.1:8000/api/";

function saveTokens(access, refresh) {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
}

function getAuthHeader() {
  return { Authorization: `Bearer ${localStorage.getItem("access")}` };
}

// REGISTER
async function registerUser(username, password) {
  await axios.post(`${baseURL}auth/register/`, { username, password });
  alert("Registration successful! Please log in.");
}

// LOGIN
async function loginUser(username, password) {
  const res = await axios.post(`${baseURL}auth/login/`, { username, password });
  saveTokens(res.data.access, res.data.refresh);
  alert("Login successful!");
  window.location.href = "employee_list.html";
}

// Auto-refresh token if expired
axios.interceptors.response.use(
  res => res,
  async error => {
    if (error.response.status === 401) {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        const res = await axios.post(`${baseURL}auth/token/refresh/`, { refresh });
        saveTokens(res.data.access, refresh);
        error.config.headers["Authorization"] = `Bearer ${res.data.access}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);
