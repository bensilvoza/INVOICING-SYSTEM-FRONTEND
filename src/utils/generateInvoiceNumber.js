function generateInvoiceNumber() {
  let output = "";
  let numbers = "0123456789";
  for (let i = 1; i <= 10; i++) {
    let rand = Math.floor(Math.random() * numbers.length);
    output = output + numbers[rand];
  }
  return Number(output);
}

export default generateInvoiceNumber;
