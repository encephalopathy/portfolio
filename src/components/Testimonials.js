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
                    Your work is going to fill a large part of your life, and
                    the only way to be truly satisfied is to do what you believe
                    is great work. And the only way to do great work is to love
                    what you do. If you haven't found it yet, keep looking.
                    Don't settle. As with all matters of the heart, you'll know
                    when you find it.
                  </p>
                  <cite>Steve Jobs</cite>
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
