import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { horizontalScale, scale, scaleFontSize, verticalScale } from "@/utils/scaling";

interface CustomTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
}

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry, error }: CustomTextInputProps) => {
  return (
    <View>
      <TextInput style={[styles.textInput, error && { borderWidth: 1, borderColor: "red" }]}
                 placeholder={placeholder} placeholderTextColor={Colors.gray}
                 value={value}
                 onChangeText={onChangeText} secureTextEntry={secureTextEntry || false} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: verticalScale(18),
    paddingHorizontal: horizontalScale(24),
    height: verticalScale(60),
    borderRadius: scale(14),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    fontSize: scaleFontSize(16),
    fontFamily: "PoppinsRegular",
    color: "black"
  },
  error: {
    fontSize: scaleFontSize(14),
    color: "red",
    marginTop: verticalScale(3),
    marginLeft: horizontalScale(14),
    fontFamily: "PoppinsRegular"
  }
});