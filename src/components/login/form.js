// libraries
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cell } from "baseui/layout-grid";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";

// components
import Spacer from "../shared/spacer";

// Utils
import baseButtonStyle from "../../utils/baseButtonStyle";

function Form() {
  const navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  function handleClickRegister() {
    return navigate("/register");
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    let response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    if (response.data.message === "OK") {
      // save JWT to localStorage
      localStorage.setItem(
        "jwt",
        JSON.stringify(`Bearer ${response["data"]["token"]}`)
      );

      // save customer to localStorage
      localStorage.setItem(
        "customer",
        JSON.stringify(response["data"]["customer"])
      );

      navigate("/");
    }
  }

  return (
    <>
      <Cell span={12}></Cell>

      <Cell span={4}>
        <form onSubmit={handleSubmitForm}>
          <Input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <Spacer val=".5rem" />
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <Spacer val="1rem" />
          <Button overrides={baseButtonStyle} type="submit">
            LOGIN
          </Button>
          <Spacer val=".5rem" />
        </form>

        <Button
          overrides={baseButtonStyle}
          kind={KIND.secondary}
          onClick={handleClickRegister}
        >
          REGISTER
        </Button>
      </Cell>
    </>
  );
}

export default Form;
