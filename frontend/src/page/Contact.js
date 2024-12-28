import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      toast.success(data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      toast.success("Thank you for contacting us!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send your message. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section */}
        <motion.div
          className="p-8 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-center">
            We’d love to hear from you! Fill out the form below to send us a
            message.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className={`w-full py-3 text-lg font-medium text-white bg-blue-600 rounded-lg ${
                  loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:bg-blue-700 hover:transform hover:translate-y-[-3px] hover:shadow-lg transition-all"
                }`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="p-8 bg-gradient-to-br from-purple-600 to-blue-500 text-white flex flex-col justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-center mb-6">
            Follow us on social media to stay updated with our latest news and
            updates.
          </p>
          <div className="flex space-x-6">
            <motion.a
              href="#"
              className="p-3 bg-blue-600 rounded-full hover:bg-blue-700"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FaFacebookF size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="p-3 bg-blue-400 rounded-full hover:bg-blue-500"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FaTwitter size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="p-3 bg-pink-600 rounded-full hover:bg-pink-700"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FaInstagram size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="p-3 bg-blue-800 rounded-full hover:bg-blue-900"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FaLinkedinIn size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
