// function Footer () {
//   return (
//     <div className="footer">
//       <div className="footer-content">
//         <p>© 2023 Your Company Name. All rights reserved.</p>
//         <p>Privacy Policy | Terms of Service</p>
//       </div>
//     </div>
//   );
// }
// export default Footer;

// Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 py-20 px-10vw flex flex-col">
      <div className="flex flex-row gap-10 mb-20">
        <div className="w-1/2">
          <div className="text-white text-2xl mb-3">
            <h4>Few Words About Aria</h4>
          </div>
          <p className="text-gray-300 leading-relaxed">
            We're passionate about delivering the best business growth services for companies just starting out
            as startups or industry players that have established their market position a long time ago.
          </p>
        </div>
        <div>
          <div className="text-white text-2xl mb-3">
            <h4>Links</h4>
          </div>
          <a href="#" className="block text-gray-300 mb-3">Terms & Conditions</a>
          <a href="#" className="block text-gray-300 mb-3">Privacy Policy</a>
        </div>
        <div>
          <div className="text-white text-2xl mb-3">
            <h4>Tools</h4>
          </div>
          <a href="#" className="block text-gray-300 mb-3">businessgrowth.com</a>
          <a href="#" className="block text-gray-300 mb-3">influencers.com</a>
          <a href="#" className="block text-gray-300 mb-3">optimizer.net</a>
        </div>
        <div>
          <div className="text-white text-2xl mb-3">
            <h4>Partners</h4>
          </div>
          <a href="#" className="block text-gray-300 mb-3">unicorns.com</a>
          <a href="#" className="block text-gray-300 mb-3">staffmanager.com</a>
          <a href="#" className="block text-gray-300 mb-3">association.gov</a>
        </div>
      </div>
      <div className="text-center text-gray-300">
        <span>
          Copyright &copy; 2045 All rights reserved - By Inovatik
        </span>
      </div>
    </footer>
  );
}

export default Footer;
