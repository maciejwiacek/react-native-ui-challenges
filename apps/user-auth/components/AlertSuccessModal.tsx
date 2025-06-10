import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

interface AlertSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message?: string;
}

const AlertSuccessModal: React.FC<AlertSuccessModalProps> = ({
                                                               visible,
                                                               onClose,
                                                               message = "User successfully created! Now log in."
                                                             }) => {
  const router = useRouter();

  const handlePress = (event: GestureResponderEvent) => {
    onClose();
    router.push("/authentication-flow/SignInScreen");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalBackground}
        onPress={handlePress}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.subtext}>(Tap anywhere to log in)</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    backgroundColor: Colors.primaryLight,
    padding: 24,
    borderRadius: 12,
    minWidth: "70%",
    alignItems: "center"
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textAlign: "center"
  },
  subtext: {
    marginTop: 8,
    fontSize: 14,
    color: "white",
    opacity: 0.8
  }
});

export default AlertSuccessModal;
