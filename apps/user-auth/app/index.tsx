import { useRouter } from "expo-router";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { ActivityIndicator } from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Index() {
  const [fontsLoaded] = useFonts({
    PoppinsSemibold: Poppins_600SemiBold,
    PoppinsRegular: Poppins_400Regular,
    PoppinsMedium: Poppins_500Medium
  });
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(authenticated)/Home");
      } else {
        router.replace("/authentication-flow/SignUpScreen");
      }
    }
  }, [user, loading]);

  if (!fontsLoaded || loading) {
    return <ActivityIndicator />;
  }

  return null;
}
