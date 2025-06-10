import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { horizontalScale, scale, verticalScale } from "@/utils/scaling";

interface CheckboxProps {
  checked: boolean;
}

const Checkbox = ({ checked }: CheckboxProps) => {

  return (
    <View style={[styles.container, { backgroundColor: checked ? Colors.primaryLight : Colors.lightGray }]}>
      {checked && <FontAwesome name={"check"} color={"white"} size={12} />}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(18),
    height: verticalScale(18),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center"
  }
});