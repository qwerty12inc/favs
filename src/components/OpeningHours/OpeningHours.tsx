import React from "react";
import PlaceFeatureItem from "../PlaceFeatureItem/PlaceFeatureItem";

const timeIcon = require("../../../assets/clock.png");

export default function OpeningHours() {
  return (
    <PlaceFeatureItem
      imageSource={timeIcon}
      content={[
        {
          text: "Wednesday 11:30 AM–11 PM",
          text90: true,
          $textDisabled: false,
        },
        {
          text: "Thursday 11:30 AM–11 PM",
          text90: true,
          $textDisabled: true,
        },
        {
          text: "Friday 11:30 AM–11 PM",
          text90: true,
          $textDisabled: true,
        },
        {
          text: "Sunday 11:30 AM–11 PM",
          text90: true,
          $textDisabled: true,
        },
        {
          text: "Monday 11:30 AM–11 PM",
          text90: true,
          $textDisabled: true,
        },
        {
          text: "Tuesday 11:30 AM–11 PM",
          text90: true,
          $textDisabled: true,
        },
      ]}
    />
  );
}
