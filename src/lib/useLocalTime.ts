"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kathmandu",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export function useLocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);

  return time;
}
