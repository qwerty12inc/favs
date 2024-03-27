import React from "react";
import PlaceFeatureItem from "../PlaceFeatureItem/PlaceFeatureItem";

const timeIcon = require("../../../assets/clock.png");

type TProps = {
  openingHours: string[]
}

type TTimetable = {
  text: string;
  text90: boolean;
  $textDisabled: boolean;
}

export default function OpeningHours(props: TProps) {

  const {openingHours} = props

  let currentDayIndex = new Date().getDay()

  const content: TTimetable[] = openingHours.map((day, index) => {
    return {
      text: day,
      text90: true,
      $textDisabled: !(currentDayIndex - 1  === index),
    }
  })

  return (
    <PlaceFeatureItem
      imageSource={timeIcon}
      content={content}
    />
  );
}
