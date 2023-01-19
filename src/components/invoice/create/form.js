// TODO
// create form.css to separate style

// Libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { Cell } from "baseui/layout-grid";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";

// components
import Spacer from "../../shared/spacer";

// utils
import uuid from "../../../utils/uuid";
import generateInvoiceNumber from "../../../utils/generateInvoiceNumber";
import calculateTotalOfInvoice from "../../../utils/calculateTotalOfInvoice";

function Form() {
  const navigate = useNavigate();

  let [invoice, setInvoice] = useState([]);

  let [invoiceNumber] = useState(generateInvoiceNumber());
  let [invoiceDate] = useState(moment().format("LL"));
  let [customerName, setCustomerName] = useState("");

  let [productName, setProductName] = useState("");
  let [productQuantity, setProductQuantity] = useState("");
  let [productPrice, setProductPrice] = useState("");

  let [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);

  function handleChangeProductName(e, index) {
    let newValue = e.target.value;
    // create a deep copy of invoice
    let invoiceCopy = JSON.parse(JSON.stringify(invoice));
    // modify invoiceCopy
    invoiceCopy[index]["productName"] = newValue;
    setInvoice(invoiceCopy);
  }

  function handleChangeProductQuantity(e, index) {
    let newValue = e.target.value;
    // create a deep copy of invoice
    let invoiceCopy = JSON.parse(JSON.stringify(invoice));
    // modify invoiceCopy
    invoiceCopy[index]["productQuantity"] = newValue;
    // update also the subTotal
    invoiceCopy[index]["subTotal"] =
      newValue * invoiceCopy[index]["productPrice"];

    // update the totalInvoiceAmount
    setTotalInvoiceAmount(calculateTotalOfInvoice(invoiceCopy));
    setInvoice(invoiceCopy);
  }

  function handleChangeProductPrice(e, index) {
    let newValue = e.target.value;
    // create a deep copy of invoice
    let invoiceCopy = JSON.parse(JSON.stringify(invoice));
    // modify invoiceCopy
    invoiceCopy[index]["productPrice"] = newValue;
    // update also the subTotal
    invoiceCopy[index]["subTotal"] =
      newValue * invoiceCopy[index]["productQuantity"];

    // update the totalInvoiceAmount
    setTotalInvoiceAmount(calculateTotalOfInvoice(invoiceCopy));
    setInvoice(invoiceCopy);
  }

  function handleClickCreate() {
    // input validation
    if (productName === "" || productQuantity === "" || productPrice === "") {
      return;
    }
    let invoiceInformation = {
      productName: productName,
      productQuantity: productQuantity,
      productPrice: productPrice,
      subTotal: productQuantity * productPrice,
    };
    // create a deep copy of invoice
    let invoiceCopy = JSON.parse(JSON.stringify(invoice));
    invoiceCopy.push(invoiceInformation);
    // update the totalInvoiceAmount
    setTotalInvoiceAmount(calculateTotalOfInvoice(invoiceCopy));
    setInvoice(invoiceCopy);

    // reset value of the following state
    setProductName("");
    setProductQuantity("");
    setProductPrice("");
  }

  async function handleSubmitInvoice() {
    // input validation
    if (invoice.length === 0) return;

    let data = {
      id: uuid(),
      invoiceNumber: invoiceNumber,
      invoiceDate: invoiceDate,
      customerName: customerName,
      items: invoice,
      totalInvoiceAmount: totalInvoiceAmount,
    };

    // JWT
    let token = JSON.parse(localStorage.getItem("jwt"));

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    let response = await axios.post(
      "http://localhost:5000/invoice/create",
      data,
      config
    );

    if (response.data.message === "OK") {
      navigate("/");
    }
  }

  useEffect(function () {
    function getCustomerName() {
      let customer = JSON.parse(localStorage.getItem("customer"));
      setCustomerName(customer.name);
    }
    // call
    getCustomerName();
  }, []);

  return (
    <>
      <Cell span={12}></Cell>

      <Cell span={8}>
        {/* This section is for invoice number, invoice date and customer name */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Montserrat",
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
                <p>Invoice number:</p>
              </div>
              <div>
                <Input value={invoiceNumber} type="number" />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <p>Invoice date:</p>
              </div>
              <div>
                <Input value={invoiceDate} />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Montserrat" }}>
            <div>
              <p>Customer name:</p>
            </div>
            <div>
              <Input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* This section is for invoice title like product name, quantity, price and sub total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Montserrat",
          }}
        >
          <div style={{ width: "24%" }}>
            <p>Product name</p>
          </div>
          <div style={{ width: "24%" }}>
            <p>Quantity</p>
          </div>
          <div style={{ width: "24%" }}>
            <p>Price</p>
          </div>
          <div style={{ width: "24%" }}>
            <p>Sub Total</p>
          </div>
        </div>

        {/* This section is for running through every value of invoice information like product name, quantity, price, sub total */}
        {invoice.map(function (info, index) {
          return (
            <div key={info.productName}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "Montserrat",
                }}
              >
                <div style={{ width: "24%" }}>
                  <Input
                    value={info.productName}
                    onChange={function (e) {
                      handleChangeProductName(e, index);
                    }}
                  />
                </div>

                <div style={{ width: "24%" }}>
                  <Input
                    value={info.productQuantity}
                    onChange={function (e) {
                      handleChangeProductQuantity(e, index);
                    }}
                  />
                </div>

                <div style={{ width: "24%" }}>
                  <Input
                    value={info.productPrice}
                    onChange={function (e) {
                      handleChangeProductPrice(e, index);
                    }}
                  />
                </div>

                <div style={{ width: "24%" }}>
                  <Input value={info.subTotal} />
                </div>
              </div>
              <Spacer val=".5rem" />
            </div>
          );
        })}

        {/* This section is for the invoice input */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Montserrat",
          }}
        >
          <div style={{ width: "24%" }}>
            <Input
              value={productName}
              type="text"
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div style={{ width: "24%" }}>
            <Input
              value={productQuantity}
              type="number"
              onChange={(e) => setProductQuantity(e.target.value)}
              placeholder="Quantity"
            />
          </div>
          <div style={{ width: "24%" }}>
            <Input
              value={productPrice}
              type="number"
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Price"
            />
          </div>
          <div style={{ width: "24%" }}>
            <Input value={productPrice * productQuantity} placeholder="0" />
          </div>
        </div>
        <Spacer val=".5rem" />
        <div>
          <Button kind={KIND.secondary} onClick={handleClickCreate}>
            +
          </Button>
        </div>
        {/* This section is for the total amount */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontFamily: "Montserrat",
          }}
        >
          <div style={{ width: "24%" }}>
            <p>Total</p>
          </div>
          <div style={{ width: "24%" }}>
            <p>{totalInvoiceAmount}</p>
          </div>
        </div>
        <Spacer val="2rem" />

        <Button onClick={handleSubmitInvoice}>Submit</Button>
      </Cell>
    </>
  );
}

export default Form;
