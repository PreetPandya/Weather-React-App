import React from "react";
import { useState, useEffect } from "react";

export default function BGimage(props) {
  const [dayOrNight, setDayOrNight] = useState("");
  const [currTime, setCurrTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hours = currTime.getHours();
    if (hours >= 6 && hours < 18) {
      setDayOrNight("day-bg");
    } else {
      setDayOrNight("night-bg");
    }
  }, [currTime]);
  return <div className={`${dayOrNight}`}>{props.children}</div>;
}