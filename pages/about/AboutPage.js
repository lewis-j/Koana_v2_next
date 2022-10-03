import React from "react";
import styles from "./AboutPage.module.css";
// import koanaVid from "../../assets/videos/koana_insta_mp4.mp4";
import { aboutPageText } from "../../assets/text/aboutPageText";

const AboutPage = () => {
  const video = () => {
    return (
      <>
        <div className={styles.videoTextContainer}>
          <div className={styles.videoContainer}>
            <video
              // src={koanaVid}
              // src="https://asset.cloudinary.com/dazkdscju/f141d6c4042942d4a8059f4f3cca56ff"
              src="https://res.cloudinary.com/dazkdscju/video/upload/v1664818250/Koana/koana_insta_mp4_j8czec.mp4"
              autoPlay
              loop
              muted
              className={styles.video}
            />
          </div>
          <div className={styles.textContent}>
            <div>
              <h2>Our Aloha Story</h2>
              <h4>Aloha from Brian and Jan,</h4>
              <p>{aboutPageText}</p>
              <h4>Aloha A Hui Hou~ Sincerely,</h4>
              <h4>Brian and Jan</h4>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <div>{video()}</div>;
};

export default AboutPage;
