import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import NotFoundPage from "../pages/NotFoundPage";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";

const AppRouter = () => (
  <BrowserRouter>
    <div className="flex-row full-view-height">
      <NavBar />
      <div className="flex-col full-parent-width">
        <Header />
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;
