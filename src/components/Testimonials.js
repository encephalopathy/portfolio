import React from "react";
import Slider from "react-slick";

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';


const settings = {
  // dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slideToShow: 1,
  slideToScroll: 1,
  swipeToSlide: true
};

const Testimonials = () => (
  <section id="testimonials">
    <div className="text-container">
      <div className="row">
        <div className="two columns header-col" />
        <div className="ten columns">
          <h1>Client Testimonials</h1>
          <ul>
            <Slider {...settings}>
              <li>
                <blockquote>
                  <p>
                    An adapdatable and dedicated problem who excels at technical challenges and
                    keeps morale high.
                  </p>
                  <cite>Kevin Otoshi - Otoshi Games</cite>
                </blockquote>
              </li>
              <li>
                <blockquote>
                  <p>
                    Brent's Pretty Awesome.
                  </p>
                  <cite>R.J. Dunlap - Extrokold CEO</cite>
                </blockquote>
              </li>
            </Slider>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
