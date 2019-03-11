import React from "react";
import { FaPlus, FaTag } from "react-icons/fa";
import Img from "gatsby-image";
import { StaticQuery, graphql } from 'gatsby';
import { siteMetadata } from "../../gatsby-config";

import Lightbox from "../components/Lightbox";

export default class Portfolio extends React.Component {

  constructor(props) {
    super(props);
    console.log('siteMetadata', siteMetadata);
  }

  render() {
    const { galleryData } = this.props;

    return (
      <StaticQuery
        query = {
          graphql`
          query {
            site {
            siteMetadata {
              author
              description
              galleryInfo {
                title
                description
              }
            }
          }
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
                <Lightbox images={data.galleryImages.edges} galleryInfo={siteMetadata.galleryInfo} />
            </div>
          </div>
        </section>
      )}
    />
  )
  }
};
