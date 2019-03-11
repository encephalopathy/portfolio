import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

const LightboxContainer = styled.div`
  /*display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;*/
  display: inherit;
`;

const PreviewButton = styled.a`

`;

export default class Lightbox extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired, // eslint-disable-line
  }

  constructor(props) {
    super(props);

    this.state = {
      showLightbox: false,
      selectedImage: null,
    };
  }

  render() {
    let images = this.props.images;
    let galleryInfo = this.props.galleryInfo;
    images = images.filter(image => image.node.childImageSharp != null);
    for (let i = 0; i < images.length && i < galleryInfo.length; ++i) {
      images[i].title = galleryInfo[i].title;
      images[i].description = galleryInfo[i].description;
    }
    const { selectedImage, showLightbox } = this.state;
    return (
      <Fragment>
        <LightboxContainer id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
          {images.map(image => (
            <PreviewButton
              key={image.node.childImageSharp.fluid.src}
              onClick={() => this.setState({ showLightbox: true, selectedImage: image })}
            >
              <div className="columns portfolio-item">
                <div className="item-wrap">
                  <Img fluid={image.node.childImageSharp.fluid} />
                    <div className="overlay">
                      <div className="portfolio-item-meta">
                        <h5>{image.title}</h5>
                          <p>{image.description}</p>
                      </div>
                    </div>
                </div>
              </div>
            </PreviewButton>
          ))}
        </LightboxContainer>
        {showLightbox && (
        <Dialog>
          <Img fluid={selectedImage.node.childImageSharp.fluid} />
          <button type="button" onClick={() => this.setState({ showLightbox: false })}>
            Close
          </button>
        </Dialog>
        )}
      </Fragment>
    );
  }
}
