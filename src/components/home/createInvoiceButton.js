// Libraries
import { useNavigate } from "react-router-dom";

import { Cell } from "baseui/layout-grid";
import { Button, SIZE } from "baseui/button";

// Components
import Spacer from "../shared/spacer";

function CreateInvoiceButton() {
  const navigate = useNavigate();

  function handleClickCreateButton() {
    let customer = JSON.parse(localStorage.getItem("customer"));
    if (customer === null) {
      navigate("/login");
    } else {
      navigate("/invoice/create");
    }
  }

  return (
    <Cell span={8}>
      <Button size={SIZE.mini} onClick={handleClickCreateButton}>
        Create
      </Button>
      <Spacer val="2rem" />
    </Cell>
  );
}

export default CreateInvoiceButton;
