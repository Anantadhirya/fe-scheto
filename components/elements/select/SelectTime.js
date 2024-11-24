"use client";
import { useMemo, useState } from "react";
import { Select } from "./Select";
import { format, isAfter, set } from "date-fns";

export function SelectTime({
  className = "",
  placeholder = "",
  date = new Date(),
  minimum,
  ...props
}) {
  const [input, setInput] = useState("");
  const options = useMemo(() => {
    const getCustomRecommendations = (input) => {
      const s = input.split(":");
      const h = s[0] ? parseInt(s[0]) : s[0];
      if (h && 0 <= h && h < 24) {
        if (s[1] && s[1].length !== 0) {
          return [
            ...Array(60)
              .fill()
              .map((_, idx) => 60 * h + idx),
          ];
        } else {
          return [
            ...Array(6)
              .fill()
              .map((_, idx) => 60 * h + 10 * idx),
          ];
        }
      }
      return [];
    };
    return Array.from(
      new Set([
        ...Array(4 * 24)
          .fill()
          .map((_, idx) => {
            const hours = Math.floor(idx / 4);
            const minutes = 15 * (idx % 4);
            return 60 * hours + minutes;
          }),
        ...getCustomRecommendations(input),
      ]),
    )
      .sort((a, b) => a - b)
      .map((minute) => {
        const hours = Math.floor(minute / 60);
        const minutes = minute % 60;
        const time = set(date, { hours, minutes });
        return {
          label: format(time, "HH:mm"),
          value: time,
        };
      })
      .filter(({ value }) => !minimum || isAfter(value, minimum));
  }, [date, input, minimum]);
  return (
    <Select
      className={className}
      placeholder={placeholder}
      onInputChange={setInput}
      options={options}
      {...props}
    />
  );
}
