// libraries
import { useState, useContext, useId } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cell } from "baseui/layout-grid";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";

// components
import Spacer from "../shared/spacer";

// utils
import uuid from "../../utils/uuid";
import baseButtonStyle from "../../utils/baseButtonStyle";

function Form() {
  const navigate = useNavigate();

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  function handleClickLogin() {
    return navigate("/login");
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    let customer = { id: uuid(), name: name, email: email, password: password };
    let response = await axios.post("http://localhost:5000/register", customer);
    if (response.data.message === "OK") {
      navigate("/login");
    }
  }

  return (
    <>
      <Cell span={12}></Cell>

      <Cell span={4}>
        <form onSubmit={handleSubmitForm}>
          <Input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <Spacer val=".5rem" />
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
          <Spacer val=".5rem" />
          <Input
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
          <Spacer val="1rem" />
          <Button overrides={baseButtonStyle} type="submit">
            REGISTER
          </Button>
          <Spacer val=".5rem" />
          <Button
            overrides={baseButtonStyle}
            kind={KIND.secondary}
            onClick={handleClickLogin}
          >
            LOGIN
          </Button>
        </form>
      </Cell>
    </>
  );
}

export default Form;
