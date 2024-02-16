import { StyleSheet } from "react-native";

export const globalTokens = {
  colors: {
    lightGrey: "#D2D2D7",
    grey: "#aaabab",
    darkGrey: "#6F6F6F",
    black: "#222222",
    white: "#ffffff",
  },
};

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 16,
    marginBottom: 4,
  },
});
