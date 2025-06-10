import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { scaleFontSize } from "@/utils/scaling";

export const fontsStyles = StyleSheet.create({
  title: {
    fontSize: scaleFontSize(32),
    fontFamily: "PoppinsSemibold",
    color: Colors.primaryDark,
    textAlign: "center"
  },
  subtitle: {
    fontSize: scaleFontSize(14),
    fontFamily: "PoppinsRegular",
    color: Colors.darkGray,
    textAlign: "center"
  },
  button: {
    fontSize: scaleFontSize(16),
    fontFamily: "PoppinsSemibold",
    textAlign: "center"
  }
});
