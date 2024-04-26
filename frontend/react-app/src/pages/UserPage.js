import React from 'react';
import { Outlet } from 'react-router-dom';

const UserPage = () => {
  return (
    <div className="full-parent-height">
      <Outlet />
    </div>
  );
}

export default UserPage;
