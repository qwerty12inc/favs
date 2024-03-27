import React from "react";
import PlaceFeatureItem from "../PlaceFeatureItem/PlaceFeatureItem";

const mapIcon = require("../../../assets/map.png");

export default function AddressBlock(props: { link: string, address: string }) {
  return (
    <PlaceFeatureItem
      imageSource={mapIcon}
      link={props.link}
      content={[
        {
          text: props.address,
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
