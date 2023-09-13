"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {
  formattedTopic: { text: string; value: number }[];
};

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const WordCloud = ({ formattedTopic }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <D3WordCloud
        data={formattedTopic}
        height={550}
        font="Times"
        // fontStyle="italic"
        // fontWeight="bold"
        fontSize={fontSizeMapper}
        spiral="rectangular"
        rotate={0}
        padding={10}
        fill={theme.theme == "dark" ? "white" : "black"}
        onWordClick={(event, word) => {
          router.push(`/quiz?topic=${word.text}`);
        }}
      />
    </>
  );
};

export default WordCloud;
