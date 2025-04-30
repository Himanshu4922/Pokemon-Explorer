import React from "react";
import styles from "./CardShimmer.module.css";

function CardShimmer() {
  return Array.from({ length: 8 }).map((el,i) => (
    <div className={styles["skeleton-card"]} key={i}>
      <div className="image"></div>
      <div className="content">
        <div className="heading"></div>
        <div className="text"></div>
        <div className="text"></div>
        <div className="text"></div>
      </div>
    </div>
  ));
}

export default CardShimmer;
