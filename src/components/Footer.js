import React from "react";
import SocialLinks from "./SocialLinks";
import { FaChevronCircleUp } from "react-icons/fa";

const Footer = () => (
  <footer id="footer">
    <div className="row">
      <div className="twelve columns">
        <SocialLinks />

        <ul className="copyright">
          <li>&copy; Copyright 2018 Brent Arata</li>
          <li>
            Developed in React ⚛️ by{" "}
            <span>Brent Arata</span>
          </li>
        </ul>
      </div>

      <div id="go-top">
        <a className="smoothscroll" title="Back to Top" href="#home">
          <FaChevronCircleUp style={{verticalAlign:"middle"}}/>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
