import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter
} from "react-icons/fa";
// https://gorangajic.github.io/react-icons/fa.html

const SocialLinks = () => (
  <ul className="social">
    <li>
      <a href="https://twitter.com/BrentArata">
        <FaTwitter />
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/brentarata">
        <FaLinkedin />
      </a>
    </li>
    <li>
      <a href="https://github.com/encephalopathy">
        <FaGithub />
      </a>
    </li>
  </ul>
);

export default SocialLinks;
