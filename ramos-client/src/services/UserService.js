import axios from "axios";

const API_URL =
  "http://localhost:5000/api/users";

// REGISTER
const register = async (
  userData
) => {

  const response =
    await axios.post(
      `${API_URL}/register`,
      userData
    );

  return response.data;
};

// LOGIN
const login = async (
  userData
) => {

  const response =
    await axios.post(
      `${API_URL}/login`,
      userData
    );

  if (
    response.data.token
  ) {

    localStorage.setItem(
      "userInfo",
      JSON.stringify(
        response.data
      )
    );
  }

  return response.data;
};

// LOGOUT
const logout = () => {

  localStorage.removeItem(
    "userInfo"
  );
};

// GET USERS
const getUsers =
  async () => {

    const response =
      await axios.get(
        API_URL
      );

    return response.data;
  };

// CREATE USER
const createUser =
  async (userData) => {

    const response =
      await axios.post(
        `${API_URL}/register`,
        userData
      );

    return response.data;
  };

  const deleteUser =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return response.data;
  };

// UPDATE USER
const updateUser =
  async (
    id,
    userData
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        userData
      );

    return response.data;
  };

// TOGGLE STATUS
const toggleUserStatus =
  async (id) => {

    const response =
      await axios.patch(
        `${API_URL}/${id}/status`
      );

    return response.data;
  };


const UserService = {
  register,
  login,
  logout,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
};

export default UserService;