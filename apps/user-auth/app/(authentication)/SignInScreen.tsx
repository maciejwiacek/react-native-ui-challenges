import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontsStyles } from "@/constants/Fonts";
import { horizontalScale, scale, scaleFontSize, verticalScale } from "@/utils/scaling";
import CustomButton from "@/components/CustomButton";
import Divider from "@/components/Divider";
import { Control, useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { auth } from "@/utils/firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";

const FormContainer = ({ control }: { control: Control<any> }) => {
  return (
    <View style={styles.inputContainer}>
      <FormInput
        name="email"
        control={control}
        placeholder="Email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Invalid email format"
          }
        }}
      />
      <FormInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{ required: "Password is required" }}
      />
    </View>
  );
};

const SignInScreen = () => {
  const {
    control,
    handleSubmit
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredentials.user;
      router.replace("/(authenticated)/Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={fontsStyles.title}>Sign In</Text>
          <Text style={fontsStyles.subtitle}>It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum.</Text>
        </View>

        <View style={styles.topButtonsContainer}>
          <View style={{ flex: 1 }}>
            <CustomButton title="Facebook" variant="secondary" />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton title="Google" variant="secondary" />
          </View>
        </View>

        <Divider />

        <FormContainer control={control} />

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.mainButton}>
          <CustomButton title={"Log In"} variant={"primary"} onPress={handleSubmit(onSubmit)} />
        </View>
        <Text style={styles.signUpText}>
          Don&#39;t have an account?{" "}
          <Link replace={true} href={"/(authentication)/SignUpScreen"} style={{ color: Colors.primaryLight }}>
            Sign Up
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    flex: 1,
    marginHorizontal: horizontalScale(24),
    marginVertical: verticalScale(80),
    justifyContent: "center",
    alignItems: "stretch"
  },
  header: {
    gap: scale(16),
    marginBottom: verticalScale(16)
  },
  topButtonsContainer: {
    flexDirection: "row",
    gap: scale(16)
  },
  inputContainer: {
    width: "100%",
    gap: scale(16),
    marginBottom: verticalScale(8)
  },
  forgotPasswordContainer: {
    justifyContent: "center",
    alignItems: "flex-end"
  },
  forgotPasswordText: {
    fontFamily: "PoppinsRegular",
    fontSize: scaleFontSize(12),
    color: Colors.gray
  },
  mainButton: {
    marginVertical: scale(16)
  },
  signUpText: {
    fontSize: scaleFontSize(14),
    fontFamily: "PoppinsRegular"
  }
});