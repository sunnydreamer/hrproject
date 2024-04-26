import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "../pages/Page";

import NotFoundPage from "../pages/NotFoundPage";

import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import OnboardingPage from "../pages/OnboardingPage";

import SummaryPage from "../pages/SummaryPage";
import VisaPage from "../pages/VisaPage";
import HousingPage from "../pages/HousingPage";
import PersonalInfoPage from "../pages/PersonalInfoPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/user">
        <Route path="" element={<Page title="Personal Information"><PersonalInfoPage /></Page>} />

        <Route
          path="login"
          element={<Page title="Login" navLinks={[]}><LoginPage /></Page>}
        />
        <Route
          path="registration" 
          element={<Page title="Registration" navLinks={[]}><RegistrationPage /></Page>}
        />
        <Route 
          path="onboarding-application" 
          element={<Page title="Onboarding Application" navLinks={[]}><OnboardingPage /></Page>}
        />

        <Route path="summary" element={<Page title="Summary"><SummaryPage /></Page>} />
        <Route path="visa-status" element={<Page title="Visa Status"><VisaPage /></Page>} />
        <Route path="housing" element={<Page title="Housing"><HousingPage /></Page>} />
      </Route>

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
