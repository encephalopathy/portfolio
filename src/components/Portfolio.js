import React from "react";
import { FaPlus, FaTag } from "react-icons/fa";
import Img from "gatsby-image";
import { StaticQuery, graphql } from 'gatsby';

import Lightbox from "../components/Lightbox";

import Coffee from "../assets/images/portfolio/coffee.jpg";
import Console from "../assets/images/portfolio/console.jpg";
import Judah from "../assets/images/portfolio/judah.jpg";
import IntoTheLight from "../assets/images/portfolio/into-the-light.jpg";
import Farmerboy from "../assets/images/portfolio/farmerboy.jpg";
import Girl from "../assets/images/portfolio/girl.jpg";
import Origami from "../assets/images/portfolio/origami.jpg";
import Retrocam from "../assets/images/portfolio/retrocam.jpg";

const Portfolio = () => (
  <StaticQuery
    query = {
      graphql`
      query {
        galleryImages: allFile(filter: {sourceInstanceName: { eq: "images" }}) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth:2000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }`
    }
    render = {
      data => (
      <section id="portfolio">
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Check Out Some of My Works.</h1>
              <Lightbox images={data.galleryImages.edges} />
          </div>
        </div>
      </section>
    )}
  />
);

export default Portfolio;
