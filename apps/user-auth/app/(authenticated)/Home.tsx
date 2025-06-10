import { Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fontsStyles } from "@/constants/Fonts";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

const Home = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={fontsStyles.title}>Hello, {user?.displayName || "User"}!</Text>
      <CustomButton title={"Sign Out"} variant={"primary"} onPress={handleSignOut} />
    </View>
  );
};

export default Home;