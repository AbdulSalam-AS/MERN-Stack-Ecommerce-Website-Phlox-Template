import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <section class="footer grid">
        <div class="footer-logo grid">
          <div className="logo">
            <p className="LogoName">
              Buy<span>Digital</span>
            </p>
          </div>
          <p class="fs-montserrat fs-200">
            There are many variations passages of Lorem Ipsum available, but the
            majority have
          </p>

          <div class="social-media flex">
            <i class="uil uil-facebook-f"></i>
            <i class="uil uil-instagram"></i>
            <i class="uil uil-twitter"></i>
            <i class="uil uil-linkedin"></i>
          </div>
        </div>

        <div class="footer-menu grid">
          <h3 class="fs-poppins fs-100 bold-800">Quick Links</h3>
          <ul>
            <li>
              <a href="/" class="fs-montserrat text-black fs-100">
                Home
              </a>
            </li>
            <li>
              <a href="#" class="fs-montserrat text-black fs-100">
                About
              </a>
            </li>
            <li>
              <a href="#" class="fs-montserrat text-black fs-100">
                Shop
              </a>
            </li>
          </ul>
        </div>
        <div class="contact grid">
          <h3 class="fs-poppins fs-100 bold-800">Contact</h3>
          <p class="fs-montserrat">
            +93 (0) 730 000 111 Abdul Salam 
            Kabul Kb,  Afghanistan Af
          </p>
        </div>

        <div class="emails grid">
          <h3 class="fs-poppins fs-100 bold-800">Subscribe to Our Email</h3>
          <p class="updates fs-poppins fs-300 bold-800">
            For Latest News & Updates
          </p>
          <div class="inputField flex bg-gray">
            <input
              type="email"
              placeholder="Enter Your Email"
              class="fs-montserrat bg-gray"
            />
            <button class="bg-red text-white fs-poppins fs-50">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <section class="copyRight">
        <p class="c-font fs-100 fs-montserrat text-align">
          &copy; 2024 eStore. All rights Reserved
        </p>
        <p class="fs-100 fs-montserrat text-white text-align p-top">
          Privacy Policy. Terms & Conditions
        </p>
      </section>
    </>
  );
}

export default Footer;
