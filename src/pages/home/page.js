import React from "react";
import styles from "./style.css";
//import imgContent from "./content/images";
//TODO: CDN the images from somewhere.
export default class HomePage extends React.Component {
  render() {
    return (
      <div>
      <section className={styles.mainBg}>
        <div className={styles.title}>Brent Arata</div>
      </section>
      <section className={styles.galleryBg}>
        <div className={styles.container}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
      <section>
      </section>
      </div>
    );
  }
}

class Header extends React.Component {
  //TODO: Replace image and text alignment with a video.
  render() {
    return (
      <section className={styles.mainBg}>
        <div className={styles.title}>Brent Arata</div>
      </section>
    )
  }
}

class BackgroundImage extends React.Component {
  render() {
    return (
        <img src={this.props.src} className={styles.container}></img>
    )
  }
};
