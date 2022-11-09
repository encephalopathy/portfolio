import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

import profilePic from "../assets/images/profilepic.jpg";


const About = () => (
  <section id="about">
    <div className="row">
      <div className="three columns">
        <img className="profile-pic" src={profilePic} alt="" />
      </div>
      <div className="nine columns main-col">
        <h2>About Me</h2>
        <p>
          I am a software engineer who has a passion for building unique and sometimes odd experiences.
          If you don't find me in front of a computer, you will find me lost in
          adventure somewhere.
        </p>
        <div className="row">
          <div className="columns contact-details">
            <h2>Contact Details</h2>
            <p className="address">
              <span>Brent Arata</span>
              <br />
              <span>
                26493 Montana Way
                <br /> Hayward, CA 94544 US
              </span>
              <br />
              <span>(858)248-5809</span>
              <br />
              <span>brent.arata@gmail.com</span>
            </p>
          </div>
          <div className="columns download">
            <p>
              <a href="https://drive.google.com/open?id=0B2r4AQmywI0oMThZc0xibTJ3TnZjaFhsWXdHaUJ1ZnVDaWow" className="button">
                <FaCloudDownloadAlt style={{verticalAlign:"text-top"}}/> Download Resume
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
