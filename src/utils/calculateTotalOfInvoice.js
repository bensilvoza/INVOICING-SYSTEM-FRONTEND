function calculateTotalOfInvoice(items) {
  let output = 0;
  for (let i = 0; i < items.length; i++) {
    output = output + items[i]["productQuantity"] * items[i]["productPrice"];
  }

  return output;
}

export default calculateTotalOfInvoice;
