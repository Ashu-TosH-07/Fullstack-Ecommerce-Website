import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";
import { FaYoutube } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-sm text-gray-400">
            We are a modern clothing brand dedicated to bringing you trendy,
            high-quality fashion at affordable prices. Crafted with care and
            passion since 2010.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Important Links</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/faq" className="hover:text-white hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-white hover:underline">
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-white hover:underline">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a
                href="/size-guide"
                className="hover:text-white hover:underline"
              >
                Size Guide
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Policies</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-white hover:underline"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-of-service"
                className="hover:text-white hover:underline"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-white hover:underline">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <PiXLogoBold />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaYoutube />
            </a>
            <a
              href="https://threads.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaThreads />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            Email: support@yourstore.com
            <br />
            Phone: +1 (555) 123-4567
          </p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} X-PLORE. All rights reserved.
      </div>
    </footer>
  );
}
