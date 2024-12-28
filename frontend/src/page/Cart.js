import React from "react";
import { useSelector, useDispatch } from "react-redux";
import emptyCartImage from "../Image/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import {
  increaseQty,
  decreaseQty,
  deleteCartItem,
} from "../redux/productSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
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
            headers: { "content-type": "application/json" },
            body: JSON.stringify(productCartItem),
          }
        );

        if (res.status !== 200)
          throw new Error("Failed to create checkout session");

        const data = await res.json();

        if (data?.sessionId) {
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
      setTimeout(() => navigate("/login"), 1000);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-bold text-slate-700 mb-4">
        Your Cart
      </h2>
      {productCartItem.length ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Display cart items */}
          <div className="w-full lg:w-3/4 p-2 bg-white shadow-md rounded">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-br from-purple-600 to-blue-500 text-white text-left rounded ">
                  <th className="p-3">Product</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {productCartItem.map((el) => (
                  <tr key={el._id} className="border-b">
                    <td className="p-3 flex items-center gap-4">
                      <img
                        src={el.image}
                        alt={el.name}
                        className="w-16 h-17 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{el.name}</h3>
                        <p className="text-gray-500 text-sm">₹{el.price}</p>
                        <button
                          onClick={() => dispatch(deleteCartItem(el._id))}
                          className="text-red-500 hover:text-red-700 mt-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => dispatch(decreaseQty(el._id))}
                          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                        >
                          -
                        </button>
                        <span className="border border-black px-3 py-1 rounded">
                          {el.qty}
                        </span>
                        <button
                          onClick={() => dispatch(increaseQty(el._id))}
                          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 font-bold text-red-500">₹{el.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Summary Section */}
          <div className="w-full lg:w-1/4 p-2 bg-white shadow-md rounded flex flex-col">
            <h2 className="bg-gradient-to-br from-purple-600 to-blue-500 text-white p-3 text-lg font-semibold rounded mb-4 text-center">
              Summary
            </h2>
            <div className="flex justify-between py-2 border-b text-lg">
              <p>Total Qty:</p>
              <p className="font-bold">{totalQty}</p>
            </div>
            <div className="flex justify-between py-2 border-b text-lg">
              <p>Total Price:</p>
              <p className="font-bold text-red-500">₹{totalPrice}</p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-lg mx-8 py-2 text-white rounded-full mt-6"
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
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow"
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
