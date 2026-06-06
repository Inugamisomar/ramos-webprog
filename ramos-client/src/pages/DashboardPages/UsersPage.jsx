import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import UserService from "../../services/UserService";

const roles = ["admin", "editor", "viewer"];

const genders = ["Male", "Female"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "Male",
  contactNumber: "",
  email: "",
  role: "viewer",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const [modal, setModal] = useState({
    open: false,
    id: null,
  });

  const [form, setForm] = useState(blankForm);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // SEARCH + FILTER
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const [genderFilter, setGenderFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  // FETCH USERS

  const fetchUsers = async () => {
    try {
      const data = await UserService.getUsers();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER USERS
  const filteredUsers = users.filter((user) => {
    const text = search.toLowerCase();

    return (
      (user.firstName?.toLowerCase().includes(text) ||
        user.lastName?.toLowerCase().includes(text) ||
        user.email?.toLowerCase().includes(text) ||
        user.username?.toLowerCase().includes(text)) &&
      (!roleFilter || user.role === roleFilter) &&
      (!genderFilter || user.gender === genderFilter) &&
      (statusFilter === ""
        ? true
        : statusFilter === "active"
          ? user.isActive
          : !user.isActive)
    );
  });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteUser = (id) => {
    setSelectedUser(id);

    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await UserService.deleteUser(selectedUser);

      fetchUsers();

      setSuccess(
        modal.id ? "User updated successfully!" : "User added successfully!",
      );

      setTimeout(() => {
        setSuccess("");
      }, 5000);

      closeModal();

      setDeleteDialog(false);

      setSelectedUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    // NOT LOGGED IN
    if (!userInfo) {
      navigate("/auth/signin");

      return;
    }

    // VIEWER CANNOT LOGIN
    if (userInfo?.role === "viewer") {
      navigate("/auth/signin");

      return;
    }

    // EDITOR CANNOT ACCESS USERS PAGE
    if (userInfo?.role === "editor") {
      alert("Editors cannot access Users Page");

      navigate("/dashboard");

      return;
    }

    fetchUsers();
  }, []);

  // VALIDATION
  const validate = () => {
    const e = {};

    if (!form.firstName) e.firstName = "Required";

    if (!form.lastName) e.lastName = "Required";

    if (!form.age) e.age = "Required";

    if (!form.email) e.email = "Required";

    if (!form.username) e.username = "Required";

    if (!modal.id && !form.password) {
      e.password = "Required";
    }

    return e;
  };

  // OPEN MODAL
  const openModal = (user) => {
    setModal({
      open: true,
      id: user?._id || null,
    });

    setForm(
      user
        ? {
            ...user,
            password: "",
          }
        : blankForm,
    );
  };

  // CLOSE MODAL
  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });

    setForm(blankForm);

    setErrors({});
  };

  // SAVE / UPDATE USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();

    if (Object.keys(validation).length) {
      setErrors(validation);

      return;
    }

    try {
      if (modal.id) {
        await UserService.updateUser(modal.id, {
          ...form,
          age: Number(form.age),
        });
      } else {
        await UserService.createUser({
          ...form,
          age: Number(form.age),
        });
      }

      fetchUsers();

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  // TOGGLE STATUS
  const toggleStatus = async (id) => {
    try {
      const updatedUser = await UserService.toggleUserStatus(id);

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? updatedUser : user)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // TABLE COLUMNS
  const columns = [
    {
      field: "idNumber",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
      },
    },

    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      headerAlign: "center",
      align: "center",

      valueGetter: (_, row) => `${row.firstName}`,
    },

    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      headerAlign: "center",
      align: "center",

      valueGetter: (_, row) => `${row.lastName}`,
    },

    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      headerAlign: "center",
      align: "center",

      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },

    {
      field: "username",
      headerName: "Username",
      width: 150,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "age",
      headerName: "Age",
      width: 80,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "gender",
      headerName: "Gender",
      width: 120,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "role",
      headerName: "Role",
      width: 120,
      headerAlign: "center",
      align: "center",

      valueGetter: (_, row) => labelize(row.role),
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => (
        <Chip
          label={params.row.isActive ? "Active" : "Inactive"}
          color={params.row.isActive ? "success" : "default"}
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => openModal(params.row)}>
            Edit
          </Button>

          <Button size="small" onClick={() => toggleStatus(params.row._id)}>
            {params.row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" className="text-teal-400">
        Users
      </Typography>
      {success && (
        <Box
          sx={{
            mt: 2,
            mb: 2,
            p: 2,
            borderRadius: "12px",
            backgroundColor: "rgba(16,185,129,0.12)",
            border: "1px solid #10b981",
            color: "#6ee7b7",
            fontWeight: "bold",
          }}
        >
          {success}
        </Box>
      )}

      <Button variant="contained" onClick={() => openModal()}>
        ADD USER
      </Button>

      {/* FILTERS */}
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        sx={{ mt: 2 }}
      >
        <TextField
          label="Search User"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          sx={{
            minWidth: 140,
          }}
        >
          <MenuItem value="">All</MenuItem>

          {roles.map((r) => (
            <MenuItem key={r} value={r}>
              {labelize(r)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Gender"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          sx={{
            minWidth: 140,
          }}
        >
          <MenuItem value="">All</MenuItem>

          {genders.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{
            minWidth: 140,
          }}
        >
          <MenuItem value="">All</MenuItem>

          <MenuItem value="active">Active</MenuItem>

          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Stack>

      {/* TABLE */}
      <Paper sx={{ mt: 2 }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          autoHeight
          getRowId={(row) => row._id}
          sx={{
            border: "1px solid #1f4d57",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#111827 !important",
              color: "#ffffff",
              borderBottom: "1px solid #1f4d57",
            },

            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#111827 !important",
            },

            "& .MuiDataGrid-cell": {
              color: "#e5e7eb",
              borderBottom: "1px solid #1f4d57",
              fontSize: "15px",
            },

            "& .MuiDataGrid-row": {
              backgroundColor: "#14343b",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#1b4b54",
            },

            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#111827",
              color: "#ffffff",
              borderTop: "1px solid #1f4d57",
            },

            "& .MuiTablePagination-root": {
              color: "#ffffff",
            },

            "& .MuiSvgIcon-root": {
              color: "#ffffff",
            },
          }}
        />
      </Paper>
      {/* DELETE DIALOG */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#061a1d",
            border: "1px solid #00e5d0",
            borderRadius: "16px",
            color: "white",
            minWidth: 350,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#00e5d0",
            fontWeight: "bold",
          }}
        >
          Delete User
        </DialogTitle>

        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteDialog(false)}
            sx={{
              color: "#9ca3af",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={confirmDelete}
            sx={{
              background: "linear-gradient(to right, #ff4d4f, #dc2626)",
              color: "white",
              borderRadius: "10px",

              "&:hover": {
                background: "linear-gradient(to right, #ff6b6b, #ef4444)",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL */}
      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle
          sx={{
            color: "#00e5d0",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          {modal.id ? "Edit User" : "Add User"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={3}>
              <Typography>Personal Information</Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  label="First Name"
                  required
                  fullWidth
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      firstName: e.target.value,
                    })
                  }
                />

                <TextField
                  label="Last Name"
                  required
                  fullWidth
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      lastName: e.target.value,
                    })
                  }
                />
              </Stack>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  label="Age"
                  required
                  fullWidth
                  value={form.age}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      age: e.target.value,
                    })
                  }
                />

                <TextField
                  select
                  label="Gender"
                  required
                  fullWidth
                  value={form.gender}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      gender: e.target.value,
                    })
                  }
                >
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>
                      {g}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <TextField
                label="Email"
                required
                fullWidth
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              <Typography>Account Information</Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  label="Username"
                  required
                  fullWidth
                  value={form.username}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      username: e.target.value,
                    })
                  }
                />

                <TextField
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />
              </Stack>

              <TextField
                select
                label=" Role"
                required
                fullWidth
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value,
                  })
                }
              >
                {roles.map((r) => (
                  <MenuItem key={r} value={r}>
                    {labelize(r)}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Address"
                required
                fullWidth
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isActive: e.target.checked,
                      })
                    }
                  />
                }
                label={`User status: ${form.isActive ? "Active" : "Inactive"}`}
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            {modal.id && (
              <Button color="error" onClick={() => handleDeleteUser(modal.id)}>
                Delete
              </Button>
            )}

            <Button onClick={closeModal}>Cancel</Button>

            <Button type="submit" variant="contained">
              {modal.id ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
