import { View, Text, ImageSourcePropType, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-ui-lib";
// import { styles as ImportedStyles } from "../";
import { Link } from "expo-router";
import PlaceFeatureItem from "../PlaceFeatureItem/PlaceFeatureItem";
const linkIcon = require("../../../assets/link.png");
const instIcon = require("../../../assets/icon--instagram.png");

type TProps = {
  instagram?: string;
  website?: string;
  phone?: string;
};

interface IProps {
  contacts: TProps;
}

export default function ContactsList(props: IProps) {
  function getContactIcon(contact: string): ImageSourcePropType {
    switch (contact) {
      case "instagram":
        return instIcon;
        break;
      case "website":
        return linkIcon;
        break;
      case "phone":
        return instIcon;
        break;
      default:
        return linkIcon;
    }
  }

  function getContactLink(contact: string): string {
    switch (contact) {
      case "instagram":
        return `https://www.instagram.com/${props.contacts.instagram}`;
      case "website":
        return `https://${props.contacts.website}`;
      case "phone":
        return `tel:${props.contacts.phone}`;
      default:
        return "";
    }
  }
  if (Object.keys(props.contacts).length > 0)
    return (
      <View>
        {Object.keys(props.contacts).map((contact) => {
          return (
            <PlaceFeatureItem
              key={contact}
              imageSource={getContactIcon(contact)}
              link={getContactLink(contact)}
              content={[
                {
                  text: contact,
                  text90: true,
                  $textDisabled: false,
                },
                {
                  text: props.contacts[contact],
                  text90: true,
                  $textDisabled: true,
                },
              ]}
            />
          );
        })}
      </View>
    );
}

const styles = StyleSheet.create({});
