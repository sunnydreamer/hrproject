import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "../pages/Page";
import NotFoundPage from "../pages/NotFoundPage";
import UserPage from "../pages/UserPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/user"
        element={
          <Page >
            <UserPage />
          </Page>
        }
      />
      <Route
        path="*"
        element={
          <Page title="Not Found Page">
            <NotFoundPage />
          </Page>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
