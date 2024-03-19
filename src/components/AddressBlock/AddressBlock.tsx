import React from "react";
import PlaceFeatureItem from "../PlaceFeatureItem/PlaceFeatureItem";

const mapIcon = require("../../../assets/map.png");

export default function AddressBlock(props: { link: string }) {
  return (
    <PlaceFeatureItem
      imageSource={mapIcon}
      link={props.link}
      content={[
        {
          text: "Berlin, Fasanenstrasse 40",
          text80: true,
          $textDefault: true,
        },
        {
          text: "Get directions",
          text90: true,
          $textDisabled: true,
        },
      ]}
    />
  );
}
