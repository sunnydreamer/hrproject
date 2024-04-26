import React from "react";

const Header = (props) => {
  return (
    <div className="header">
      {props.title ? <h1>{props.title}</h1> : <h1>Welcome</h1>}
    </div>
  );
};

export default Header;
