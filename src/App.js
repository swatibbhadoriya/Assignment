import React, { useState, useEffect } from "react";

const ProgressBar = ({ progress }) => (
  <div style={{ height: "20px", background: "#eee", margin: "10px" }}>
    <div
      style={{ width: `${progress}%`, height: "100%", background: "#40A2D8" }}
    ></div>
  </div>
);

const ProgressManager = () => {
  const [progressList, setProgressList] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const initiateProgress = () => {
    setProgressList((prevList) => [...prevList, 0]);
  };

  function updateProgress() {
    let indexToUpdate = -1;

    for (let index = 0; index < progressList.length; index++) {
      const currentProgress = progressList[index];

      if (currentProgress < 100) {
        indexToUpdate = index;
        break;
      }
    }

    if (indexToUpdate !== -1) {
      setIsTimerActive(true);

      setTimeout(() => {
        setProgressList((prevList) => {
          const updatedList = [...prevList];
          updatedList[indexToUpdate] += 10;

          // Make sure the progress doesn't exceed 100
          if (updatedList[indexToUpdate] > 100) {
            updatedList[indexToUpdate] = 100;
          }

          return updatedList;
        });

        setIsTimerActive(false);
      }, 1000);
    }
  }

  useEffect(() => {
    if (!isTimerActive && progressList.length >= 1) {
      updateProgress();
    }
  }, [isTimerActive, progressList]);

  return (
    <div>
      <button onClick={initiateProgress}>Start Progress Bar</button>
      {progressList.map((progress, index) => (
        <ProgressBar key={index} progress={progress} />
      ))}
    </div>
  );
};

export default ProgressManager;
