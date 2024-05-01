import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "../pages/Page";

import NotFoundPage from "../pages/NotFoundPage";

import RegisterWithTokenPage from "../pages/RegisterWithTokenPage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import OnboardingPage from "../pages/OnboardingPage";

import SummaryPage from "../pages/SummaryPage";
import VisaPage from "../pages/VisaPage";
import HousingPage from "../pages/Housing/HousingPage";
import PersonalInfoPage from "../pages/PersonalInfo/PersonalInfoPage";

import HREmailPage from "../pages/HREmailPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/user">
        <Route path="" element={<Page title="Personal Information"><PersonalInfoPage /></Page>} />

        <Route
          path="registration-with-token/:regLinkToken"
          element={<Page title="Registration" navLinks={[]}><RegisterWithTokenPage /></Page>}
        />
        <Route
          path="registration"
          element={<Page title="Registration" navLinks={[]}><RegistrationPage /></Page>}
        />
        <Route
          path="login"
          element={<Page title="Login" navLinks={[]}><LoginPage /></Page>}
        />
        <Route
          path="onboarding-application"
          element={<Page title="Onboarding Application" navLinks={[]}><OnboardingPage /></Page>}
        />

        <Route path="summary" element={<Page title="Summary"><SummaryPage /></Page>} />
        <Route path="visa-status" element={<Page title="Visa Status"><VisaPage /></Page>} />
        <Route path="housing" element={<Page title="Housing"><HousingPage /></Page>} />
        <Route path="send-email" element={<Page title="Send Email" navLinks={[]}><HREmailPage /></Page>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
