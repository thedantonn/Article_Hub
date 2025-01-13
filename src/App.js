import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ReadingPage from './pages/ReadingPage';
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Login from './components/Login';
import { Provider } from 'react-redux';
import appStore from './utils/appstore';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function App() {
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { path: "/browse", element: <HomePage /> },
      { path: "/article/:id", element: <ReadingPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

return (
  <Provider store={appStore}>
     <RouterProvider router={appRouter} />
  </Provider>
  
);
  }
export default App;