import React from "react";
import styles from "../styles/Super.module.css";
import Button from "./Button";
import { communityImage } from "../assets";

const About = () => {
  return (
    <section className={`section ${styles.superSection}`}>
      <div className={`sectionContainer relative`}>
        <div className={`${styles.colContainer}`}>
          <div className={`${styles.firstCol} `}>
            <div className={`${styles.textContainer}`}>
              <h2>Cute watch guard meme coin</h2>
              <p className={`${styles.text}`}>
                A blockchain watchdog ensuring transparency and security,
                blending governance with meme culture and playful engagement.
              </p>
              <p className={`${styles.text}`}>
                Get ready to blast off with Kutte Ai-the cutest and most
                thrilling new meme coin in the crypto universe! Join the Kutte
                Ai mission today and secure your seat for a wild ride to the
                moon. Don't miss out on the excitement_ your Kutte Ai
                adventure starts now!
              </p>

              <p className={`${styles.text}`}>
                A blockchain watchdog ensuring transparency and security,
                blending governance with meme culture and playful engagement.
                Get ready to blast off with Kutte Ai-the cutest and most
                thrilling new meme coin in the crypto universe! Join the Kutte
                Ai mission today and secure your seat for a wild ride to the
                moon.
                <span className={`text-[#3A3A3A] font-bold`}>
                 {"Don't miss out on the excitement_ your Kutte Ai adventure starts now! "}
                </span>
              </p>
            </div>
          </div>

          <div
            className={`${styles.secondCol} flex items-center justify-between`}
          >
            <div className={`flex gap-3 `}>
              <Button colored text={`How to buy`} />

              <Button text={`Staking`} />
            </div>

            <div className="">
              <img src={communityImage.src} className={`w-[85%]`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
