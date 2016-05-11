import React from "react";
import styles from "./style.css";


export default class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <h1>Home Page</h1>
        <p className={styles.welcomeText}>Thanks for joining!</p>
      </div>
      <div className={styles.content}>
       <h1>Gallery</h1>
      </div>
      <div className={styles.content}>
       <h1>Services</h1>
      </div>
      <div className={styles.content}>
       <h1>Contact</h1>
      </div>
    );
  }
}
