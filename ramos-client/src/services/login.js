import axios from "axios";

const API_URL =
  "http://localhost:5000/api/users";

// LOGIN
export const login = async (
  formData
) => {

  const response =
    await axios.post(
      `${API_URL}/login`,
      formData
    );

  // SAVE TOKEN
  localStorage.setItem(
    "token",
    response.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(
      response.data.user
    )
  );

  return response.data;
};

// LOGOUT
export const logout = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );
};

// GET CURRENT USER
export const getCurrentUser =
  () => {

    return JSON.parse(
      localStorage.getItem(
        "user"
      )
    );
  };

// CHECK LOGIN
export const isAuthenticated =
  () => {

    return !!localStorage.getItem(
      "token"
    );
  };