// Libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Cell } from "baseui/layout-grid";

// Utils
import gridJustifyContentCenter from "../../utils/gridJustifyContentCenter";

// CSS
import "./header.css";

function Header() {
  const navigate = useNavigate();

  let [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleClickBrand() {
    navigate("/");
  }

  function handleClickAccount() {
    if (isLoggedIn === true) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("customer");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  useEffect(function () {
    function getCustomerName() {
      let customer = JSON.parse(localStorage.getItem("customer"));
      if (customer !== null) {
        setIsLoggedIn(true);
      }
    }
    // call
    getCustomerName();
  }, []);

  return (
    <Cell span={10}>
      <div className="header-box">
        <p className="brand" onClick={handleClickBrand}>
          INVOICE SYSTEM
        </p>
        <p className="account" onClick={handleClickAccount}>
          {isLoggedIn === true ? "Logout" : "Login"}
        </p>
      </div>
    </Cell>
  );
}

export default Header;
