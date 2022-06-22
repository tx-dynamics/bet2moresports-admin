import React from "react";
import { Link } from "react-router-dom";

const ButtonMailto = ({ mailto, label }) => {
  return (
    <Link style={{ textDecoration: 'none', color: '#e6e5e8' }}
      to='#'
      onClick={(e) => {
        window.location = "mailto:" + mailto;
        e.preventDefault();
      }}
    >
      {label}
    </Link>
  );
};

export default ButtonMailto;