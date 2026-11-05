"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const getServerDate = () => "";

export default function CurrentDate() {
  const date = useSyncExternalStore(subscribe, getDate, getServerDate);

  return <p className="text-xs">{date}</p>;
}
