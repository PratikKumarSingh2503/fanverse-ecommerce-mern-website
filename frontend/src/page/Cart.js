import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../component/cartProduct';
import emptyCartImage from "../Image/empty.gif";
import toast from 'react-hot-toast';
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.email) {
      try {
        const stripePromise = await loadStripe(
          process.env.REACT_APP_STRIPE_PUBLIC_KEY
        );

        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(productCartItem),
          }
        );

        if (res.status !== 200) {
          throw new Error("Failed to create checkout session");
        }

        const data = await res.json();

        if (data && data.sessionId) {
          toast("Redirecting to payment gateway...");
          await stripePromise.redirectToCheckout({ sessionId: data.sessionId });
        } else {
          toast("Error: Session ID not received!");
        }
      } catch (error) {
        console.error(error);
        toast("Payment failed, please try again.");
      }
    } else {
      toast("You are not logged in!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-bold text-slate-700 mb-4">
        Your Cart Items
      </h2>

      {productCartItem.length ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Display cart items */}
          <div className="w-full lg:w-2/3 bg-white shadow rounded p-4">
            {productCartItem.map((el) => (
              <CartProduct
                key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                brand={el.brand}
                category={el.category}
                qty={el.qty}
                total={el.total}
                price={el.price}
              />
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3 bg-gray-100 shadow-md rounded p-4">
            <h2 className="bg-blue-600 text-white p-3 text-lg font-semibold rounded mb-4 text-center">
              Summary
            </h2>
            <div className="flex justify-between py-2 border-b text-lg">
              <p>Total Qty:</p>
              <p className="font-bold">{totalQty}</p>
            </div>
            <div className="flex justify-between py-2 border-b text-lg">
              <p>Total Price:</p>
              <p className="font-bold text-red-500">₹ {totalPrice}</p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 w-full text-lg font-bold py-2 text-white rounded mt-4 transition-all duration-200"
              onClick={handlePayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src={emptyCartImage}
            alt="Empty Cart"
            className="w-64 h-64 mb-6"
          />
          <p className="text-gray-600 text-xl font-semibold mb-4">
            Your cart is empty!
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Go to Shop
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
