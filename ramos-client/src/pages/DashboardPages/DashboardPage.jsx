import React from "react";
import { useLocation } from "react-router-dom";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { DataGrid } from "@mui/x-data-grid";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Typography, Card, CardContent } from "@mui/material";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function DashboardPage() {
  const location = useLocation();

  return (
    <Box sx={{ color: "#fff" }}>
      {/* TITLE */}
      <Typography variant="h4" gutterBottom sx={{ color: "#00f5d4" }}>
         Dashboard
      </Typography>

      {/* TOP STATS WITH CENTERED GAUGES */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        {/* TOTAL USERS */}
        <Card
          sx={{
            flex: 1,
            bgcolor: "#0b2e2e",
            border: "1px solid #00f5d4",
            borderRadius: 3,
            boxShadow: "0 0 10px #00f5d455",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">👥 Total Users</Typography>
          <Typography variant="h3" sx={{ mt: 1 }}>
            {rows.length}
          </Typography>
        </Card>

        {/* AVERAGE AGE */}
        <Card
          sx={{
            flex: 1,
            bgcolor: "#0b2e2e",
            border: "1px solid #00f5d4",
            borderRadius: 3,
            boxShadow: "0 0 10px #00f5d455",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">📊 Average Age</Typography>
          <Typography variant="h3" sx={{ mt: 1 }}>
            {(
              rows.reduce((sum, row) => sum + (row.age || 0), 0) /
              rows.filter((row) => row.age !== null).length
            ).toFixed(1)}
          </Typography>
        </Card>

        {/* ENGAGEMENT */}
        <Card
          sx={{
            flex: 1,
            p: 2,
            bgcolor: "#0b2e2e",
            border: "1px solid #00f5d4",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ mb: 1 }}>🎯 Engagement</Typography>
          <Gauge width={110} height={110} value={50} />
        </Card>

        {/* ACTIVITY */}
        <Card
          sx={{
            flex: 1,
            p: 2,
            bgcolor: "#0b2e2e",
            border: "1px solid #00f5d4",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ mb: 1 }}>🔥 Activity</Typography>
          <Gauge width={110} height={110} value={50} />
        </Card>
      </Stack>

      {/* CHARTS */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        {/* BAR CHART */}
        <Card
          sx={{
            flex: 2,
            p: 2,
            bgcolor: "#0b2e2e",
            border: "1px solid #00f5d4",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            📊 Quarterly Performance
          </Typography>

          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: "Views" },
              { data: [51, 6, 49, 30], label: "Engagement" },
            ]}
            height={350}
            xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
          />
        </Card>

        {/* PIE CHART */}
        <Card
          sx={{
            flex: 1,
            p: 2,
            bgcolor: "#0b2e2e",
            border: "1px solid #00f5d4",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            🎮 Platform Distribution
          </Typography>

          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "PC" },
                  { id: 1, value: 15, label: "Console" },
                  { id: 2, value: 20, label: "Mobile" },
                ],
              },
            ]}
            width={250}
            height={250}
          />
        </Card>
      </Stack>

      {/* DATA GRID */}
      <Typography variant="h5" gutterBottom sx={{ color: "#00f5d4" }}>
        👥 Users Overview
      </Typography>

      <Box sx={{ height: 400, width: "100%", mb: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            bgcolor: "#0b2e2e",
            color: "#fff",
            border: "1px solid #00f5d4",
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#061a1a",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #00f5d420",
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        />
      </Box>

      {/* MAP */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, color: "#00f5d4" }}>
        📍 Location Map
      </Typography>

      <Box
        sx={{
          height: 400,
          border: "1px solid #00f5d4",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={[14.604253, 120.994314]}
          zoom={13}
          style={{ height: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>🎮 Gaming HQ - Manila</Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
}

export default DashboardPage;
