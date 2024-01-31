import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const ProgressBarManager = () => {
  const [progressBars, setProgressBars] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [generateProgressBar, setGenerateProgressBar] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);

  const createProgressBar = () => {
    if (generatedCount < 5) {
      const newProgressBar = (
        <ProgressBar
          key={progressBars.length}
          duration={10000}
          onComplete={() => setGenerateProgressBar(true)}
        />
      );
      setProgressBars((prevProgressBars) => [...prevProgressBars, newProgressBar]);
      setGeneratedCount((prevCount) => prevCount + 1);
      setIsButtonDisabled(true);
    }
  };

  const handleProgressBarComplete = () => {
    setTimeout(() => {
      setGenerateProgressBar(true);
    }, 0);
  };

  useEffect(() => {
    if (generateProgressBar) {
      createProgressBar();
      setGenerateProgressBar(false);
    }
  }, [generateProgressBar]);

  return (
    <div>
      <button onClick={createProgressBar} disabled={isButtonDisabled}>
        Create Progress Bar
      </button>
      <br />
      {progressBars.map((progressBar) => (
        <div key={progressBar.key}>
          {progressBar}
          <br />
        </div>
      ))}
    </div>
  );
};

export default ProgressBarManager;
