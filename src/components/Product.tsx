import React from "react";
import { Pressable } from "react-native";
import { Card } from "react-native-ui-lib";

const coffeePhoto = require("../../assets/coffee_cup.png");

type TProps = {
  name: string;
  description: string;
  actionFn: any
  icon?: string;
  size?: string;
  value?: string;
}

export default function Product(props: TProps) {
  return (
    <Pressable onPress={props.actionFn}>
      <Card row>
        <Card.Section
          imageSource={props.icon ? props.icon : coffeePhoto}
          imageStyle={{
            marginVertical: 16,
            marginLeft: 16,
            width: 48,
            height: 48,
          }}
        />
        <Card.Section
          content={[
            {
              text: props.name,
              text80: true,
              $textDefault: true,
            },
            {
              text: props.description,
              text90: true,
              $textDisabled: true,
            },
          ]}
          style={{ padding: 20, flex: 1 }}
        />
      </Card>
    </Pressable>
  );
}
