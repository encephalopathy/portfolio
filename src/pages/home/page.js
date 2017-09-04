import React from "react";
import styles from "./style.css";
//import imgContent from "./content/images";
//TODO: CDN the images from somewhere.
export default class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.websiteContainer}>
        <section className={styles.container}>
          <span className={styles.title}>Brent Arata</span>
        </section>
        <footer className={styles.containertwo}>
            <a href="https://twitter.com/BrentArata" ><div className={styles.twitter}></div></a>
            <a href="https://www.linkedin.com/in/brentarata/"><div className={styles.linkedin}></div></a>
            <a href="mailto:brent,arata@gmail.com"><div className={styles.email}></div></a>
            <a href="https://github.com/encephalopathy"><div className={styles.github}></div></a>
        </footer>
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
