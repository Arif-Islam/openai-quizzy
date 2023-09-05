"use client";
import { useTheme } from "next-themes";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {};

const data = [
  {
    text: "Hey There",
    value: 10,
  },
  { text: "Hey", value: 1 },
  { text: "lol", value: 3 },
  { text: "first impression", value: 2 },
  { text: "very cool", value: 5 },
  { text: "duck", value: 4 },
];

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const WordCloud = (props: Props) => {
  const theme = useTheme();
  return (
    <>
      <D3WordCloud
        data={data}
        height={550}
        font="Times"
        // fontStyle="italic"
        // fontWeight="bold"
        fontSize={fontSizeMapper}
        // spiral="rectangular"
        rotate={0}
        padding={10}
        fill={theme.theme == "dark" ? "white" : "black"}
      />
    </>
  );
};

export default WordCloud;
