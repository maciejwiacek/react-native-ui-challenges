import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { horizontalScale, scaleFontSize, verticalScale } from "@/utils/scaling";

const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>Or</Text>
      <View style={styles.line} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(16)
  },
  text: {
    fontSize: scaleFontSize(14),
    fontFamily: "PoppinsRegular",
    color: Colors.darkGray,
    marginHorizontal: horizontalScale(10)
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray
  }
});