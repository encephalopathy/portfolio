import React from "react";
import SocialLinks from "./SocialLinks";

const Banner = () => (
  <div className="row banner">
    <div className="banner-text">
      <h1 className="responsive-headline">I'm Brent Arata.</h1>
      <h3>
        I'm a California based <span>software engineer</span>, &nbsp;
        <span>game developer</span> and <span>tinkerer</span> creating awesome
        and effective visual and engaging experiences for companies of all sizes around the
        globe. Let's
        <a className="smoothscroll" href="#about">
          {" "}
          start scrolling
        </a>{" "}
        and learn more
        <a className="smoothscroll" href="#about">
          {" "}
          about me
        </a>.
      </h3>
      <hr />
    </div>
  </div>
);

export default Banner;
