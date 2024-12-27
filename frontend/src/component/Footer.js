import React from "react";
import {
  SiVisa,
  SiMastercard,
  SiAmericanexpress,
  SiPaypal,
} from "react-icons/si";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      {/* Main Footer Container */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Travel Tour</h3>
          <p>12 Main tPt. London</p>
          <p>+44 3656 4567</p>
          <p>contact@traveltourtheme.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Travel Blog & Tips
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Working With Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Be Our Partner
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Packages
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Customer Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy & Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Channels
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Pay Safely With Us
          </h3>
          <p className="mb-4">
            The payment is encrypted and transmitted securely with an SSL
            protocol.
          </p>
          <div className="flex space-x-4">
            <SiVisa className="w-8 h-8" />
            <SiMastercard className="w-8 h-8" />
            <SiAmericanexpress className="w-8 h-8" />
            <SiPaypal className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-800 text-center py-4 mt-8">
        <p>
          &copy; 2024 Travel Tour by GoodLayers. All Rights Reserved |{" "}
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-white">
            Terms and Conditions
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
