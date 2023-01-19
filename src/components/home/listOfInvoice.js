// TODO
// create list-of-invoice.css to separate style

// Libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { Cell } from "baseui/layout-grid";

// Components
import Spacer from "../shared/spacer";

function ListOfInvoice() {
  let [invoice, setInvoice] = useState([]);

  useEffect(function () {
    async function getListOfInvoice() {
      let response = await axios.get("http://localhost:5000/invoice");
      if (response.data.message === "OK") {
        setInvoice(response.data.result);
      }
    }
    // call
    getListOfInvoice();
  }, []);

  return (
    <Cell span={8}>
      {invoice.map(function (info) {
        return (
          <div key={info.id}>
            <div
              style={{
                fontFamily: "Montserrat",
                borderBottom: "1px solid lightgray",
              }}
            >
              {/* This section is for invoice number, invoice date and customer name */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: "0" }}>
                  Invoice number: {info.invoiceNumber}
                </p>
                <p style={{ margin: "0" }}>Invoice date: {info.invoiceDate}</p>
              </div>
              <div>
                <p style={{ margin: "0" }}>
                  Customer name: {info.customerName}
                </p>
              </div>

              {/* This section is for invoice title like product name, quantity, price and sub total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "24%" }}>
                  <p style={{ margin: "0" }}>Product name</p>
                </div>
                <div style={{ width: "24%" }}>
                  <p style={{ margin: "0" }}>Quantity</p>
                </div>
                <div style={{ width: "24%" }}>
                  <p style={{ margin: "0" }}>Price</p>
                </div>
                <div style={{ width: "24%" }}>
                  <p style={{ margin: "0" }}>Sub Total</p>
                </div>
              </div>

              {/* This section is for running through every item */}
              {info.items.map(function (item) {
                return (
                  <div key={item.productName}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "24%" }}>
                        <p style={{ margin: "0" }}>{item.productName}</p>
                      </div>
                      <div style={{ width: "24%" }}>
                        <p style={{ margin: "0" }}>{item.productQuantity}</p>
                      </div>
                      <div style={{ width: "24%" }}>
                        <p style={{ margin: "0" }}>{item.productPrice}</p>
                      </div>
                      <div style={{ width: "24%" }}>
                        <p style={{ margin: "0" }}>{item.subTotal}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* This section is for the total amount */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "24%" }}></div>
                <div style={{ width: "24%" }}></div>
                <div style={{ width: "24%" }}>
                  <p>Total</p>
                </div>
                <div style={{ width: "24%" }}>
                  <p>{info.totalInvoiceAmount}</p>
                </div>
              </div>
            </div>

            <Spacer val="3rem" />
          </div>
        );
      })}
    </Cell>
  );
}

export default ListOfInvoice;
