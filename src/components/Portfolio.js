import React from "react";
import { StaticQuery, graphql } from 'gatsby';
import { siteMetadata } from "../../gatsby-config";

import Lightbox from "../components/Lightbox";

export default class Portfolio extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
                    originalName
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
              <h1>Projects I have worked on</h1>
                <Lightbox images={data.galleryImages.edges} galleryInfo={siteMetadata.galleryInfo} />
            </div>
          </div>
        </section>
      )}
    />
  )
  }
};
