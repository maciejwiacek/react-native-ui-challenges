import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { fontsStyles } from "@/constants/Fonts";
import { Image } from "expo-image";
import { horizontalScale, scale, verticalScale } from "@/utils/scaling";

interface CustomButtonProps {
  title: string;
  variant: "primary" | "secondary";
  onPress?: () => void;
}

const getImage = ({ title }: { title: string }) => {
  if (title === "Facebook") {
    return <Image style={styles.image} source={require("../assets/logos/facebook.png")} placeholder={"Facebook"} />;
  } else if (title === "Google") {
    return <Image style={styles.image} source={require("../assets/logos/google.png")} placeholder={"Google"} />;
  }
  return null;
};

const CustomButton = ({ title, variant, onPress }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: variant === "primary" ? Colors.primaryLight : Colors.lightGray }]}
      onPress={onPress}>
      <View style={styles.content}>
        {getImage({ title })}
        <Text
          style={[fontsStyles.button, { color: variant === "primary" ? "white" : Colors.darkGray }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(14),
    paddingHorizontal: horizontalScale(18)
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(16)
  },
  image: {
    width: horizontalScale(24),
    height: verticalScale(24)
  }
});
