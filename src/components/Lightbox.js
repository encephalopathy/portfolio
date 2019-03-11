import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

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
    const galleryInfo = this.props.galleryInfo;
    images = images.filter(img => img.node.childImageSharp != null)
      .sort((a, b) => a.node.childImageSharp.fluid.originalName.localeCompare(
        b.node.childImageSharp.fluid.originalName
      ));
    for (let i = 0; i < images.length && i < galleryInfo.length; ++i) {
      images[i].title = galleryInfo[i].title;
      images[i].description = galleryInfo[i].description;
    }
    const { selectedImage, showLightbox } = this.state;
    return (
      <Fragment>
        <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
          {images.map(image => (
            <a
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
            </a>
          ))}
        </div>
        {showLightbox && (
        <Dialog>
          <button type="button" onClick={() => this.setState({ showLightbox: false })}>
            x
          </button>
          <Img fluid={selectedImage.node.childImageSharp.fluid} />
        </Dialog>
        )}
      </Fragment>
    );
  }
}
