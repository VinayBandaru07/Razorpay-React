// import "./App.css";

import React from "react";

function App() {
  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => initializePayment();
    document.body.appendChild(script);
  };

  const initializePayment = () => {
    const options = {
      key: "rzp_test_KEp2vDNHDt8jWT", // Enter the Key ID generated from the Razorpay Dashboard
      amount: "50000", // Amount in currency subunits (paise for INR)
      currency: "INR",
      name: "Acme Corp", // Your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo", // Optional logo
      order_id: "order_9A33XWu170gUtm", // Pass the `id` from Step 1 of Razorpay API
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: "Gaurav Kumar", // Customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", // Customer's contact number
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert("hi")
      alert(`Error Code: ${response.error.code}`);
      alert(`Description: ${response.error.description}`);
      alert(`Source: ${response.error.source}`);
      alert(`Step: ${response.error.step}`);
      alert(`Reason: ${response.error.reason}`);
      alert(`Order ID: ${response.error.metadata.order_id}`);
      alert(`Payment ID: ${response.error.metadata.payment_id}`);
    });

    rzp1.open();
  };

  const handlePaymentClick = (e) => {
    e.preventDefault();
    loadRazorpayScript();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>React Razorpay Integration</h1>
      <button
        id="rzp-button1"
        onClick={handlePaymentClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#3399cc",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Pay
      </button>
    </div>
  );
}

export default App;
