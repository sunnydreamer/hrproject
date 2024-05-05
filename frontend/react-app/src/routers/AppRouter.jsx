import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Page from "../pages/Page";

import ErrorPage from "../pages/ErrorPage";

import RegisterWithTokenPage from "../pages/RegisterWithTokenPage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import OnboardingPage from "../pages/OnboardingPage";

import SummaryPage from "../pages/SummaryPage";
import VisaPage from "../pages/VisaPage";
import HousingPage from "../pages/Housing/HousingPage";
import PersonalInfoPage from "../pages/PersonalInfo/PersonalInfoPage";
import HRPersonalInfoPage from "../pages/HRPersonalInfo/HRPersonalInfoPage";

import HREmailPage from "../pages/HREmailPage";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : <Navigate to="/not-found" state={ { errorTitle: "403 Forbidden" } } replace />;
}

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/user">
        <Route path="" element={<Page title="Personal Information"><PersonalInfoPage /></Page>} />
        
        <Route path="hruser/:id" element= {<HRPersonalInfoPage />} />



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
      
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
