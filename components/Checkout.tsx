import React from "react";

interface CheckoutProps {
  activeStep?: number;
}

const Checkout: React.FC<CheckoutProps> = ({
  activeStep = 0,
}): React.ReactElement => {
  return (
    <div className="flex flex-wrap mb-5">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? "border-blue-500   text-blue-500"
           : "border-gray-500 text-gray-500"
       }
          
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
};

export default Checkout;
