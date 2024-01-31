import React, { useState, useEffect } from "react";

const ProgressBar = ({ duration, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId;
    const incrementPerMillisecond = (100 / duration) * (1000 / 100);

    const startProgressBar = () => {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + incrementPerMillisecond;

          if (newProgress < 100) {
            return newProgress;
          } else {
            clearInterval(intervalId);
            onComplete();
            return 100;
          }
        });
      }, 10);
    };

    startProgressBar();

    return () => clearInterval(intervalId);
  }, [duration, onComplete]);

  return (
    <div
      style={{
        height: "20px",
        backgroundColor: "#6895D2",
        transition: `width 0.1s linear`,
        width: `${progress}%`,
        border: "1px solid #ccc",
        marginTop: "10px",
      }}
    ></div>
  );
};

export default ProgressBar;
