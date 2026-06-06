import "./App.css";
import AboutPage from "./pages/AboutPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticlePage from "./pages/ArticlePage";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./layouts/AuthLayout";
import Layout from "./components/LayoutPage";
import SignInPage from "./pages/AuthPages/SignInPage";
import SignupPage from "./pages/AuthPages/SignupPage";
import LayoutPage from "./components/LayoutPage";
import DashLayout from "./layouts/DashLayout";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage";
const routes = [
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "articles", element: <ArticleListPage /> },
      { path: "articles/:slug", element: <ArticlePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },

  // ✅ ADDED DASHBOARD ROUTES (based on your lab)
  {
  path: "/dashboard",
  element: <DashLayout />,
  errorElement: <NotFoundPage />,
  children: [
    { path: "", element: <DashboardPage /> },
    { path: "reports", element: <ReportsPage /> },
    { path: "users", element: <UsersPage /> },

    // ADD THIS
   { path: "articles", element: <DashArticleListPage /> },
  ],
},
  
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;