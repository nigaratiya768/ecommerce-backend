const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "nigaratiya786@gmail.com",

    pass: process.env.APP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(orderHtml, to) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "nigaratiya786@gmail.com", // sender address
    to: to, // list of receivers
    subject: "order info", // Subject line
    text: "Here is your order details ", // plain text body
    html: orderHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);

async function sendEmail(customerDetails, orders, to) {
  console.log("sending email", customerDetails, "order:", orders);
  const orderHtml = `
  <body>
    <h3>Customer Details (#001)</h3>
    <hr>
    <table>
      <tr>
        <th>Product Name</th>
        <th>Image</th>
        <th>Size</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Status</th>
        
      </tr>
      ${orders.product_ids?.map((v) => {
        return ` <tr>
        <td>${v.product_id.product_name}</td>
        <td><img alt="img" src=${
          "http://localhost:4001/" + v.product_id.image
        }/></td>
        <td>${v.size}</td>
        <td>${v.quantity}</td>
        
        <td>${v.product_id.price * v.quantity}</td>
        <td>${customerDetails.status}</td>
      </tr>`;
      })}
      
    </table>
    <h3>Shipping Address</h3>
    
    <span>Name:${customerDetails.name}</span>

    <br />
    <span>Address:${
      customerDetails.address +
      "," +
      customerDetails.locality +
      "," +
      customerDetails.city
    }</span>
    <br />
    <span>${customerDetails.pincode}</span>
    <br />
    <span>${customerDetails.state}</span>
  </body>`;
  await main(orderHtml, to);
}

module.exports = { sendEmail };
