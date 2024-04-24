import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const taskQueue = useRef([]);

  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
        executeTasks();
      }, 10);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const executeTasks = () => {
    const now = Date.now();
    while (taskQueue.current.length && taskQueue.current[0].time <= now) {
      const task = taskQueue.current.shift().task;
      task();
    }
  };

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const addTaskToQueue = (task, delay = 5000) => {
    const time = Date.now() + delay;
    taskQueue.current.push({ task, time });
    taskQueue.current.sort((a, b) => a.time - b.time);
  };

  return (
    <div>
      <p>{time}s</p>
      <button onClick={startStop}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
