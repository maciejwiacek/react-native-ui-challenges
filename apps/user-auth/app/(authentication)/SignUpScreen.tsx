import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { fontsStyles } from "@/constants/Fonts";
import CustomButton from "@/components/CustomButton";
import { Control, Controller, useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import Divider from "@/components/Divider";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Checkbox from "@/components/Checkbox";
import { horizontalScale, scale, scaleFontSize, verticalScale } from "@/utils/scaling";
import { auth } from "@/utils/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { useState } from "react";
import AlertSuccessModal from "@/components/AlertSuccessModal";

const FormContainer = ({ control }: { control: Control<any> }) => {
  return (
    <View style={styles.inputContainer}>
      <FormInput
        name="name"
        control={control}
        placeholder="Name"
        rules={{ required: "Name is required" }}
      />
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

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false
    }
  });
  const agreed = watch("terms");

  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredentials.user;

      await updateProfile(user, { displayName: data.name });

      setShowAlert(true);
    } catch (error) {
      console.error("Signup error: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={fontsStyles.title}>Sign Up</Text>
            <Text style={fontsStyles.subtitle}>
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum.
            </Text>
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

          <Controller
            control={control}
            name="terms"
            rules={{ required: "You must accept the terms and privacy policy" }}
            render={() => (
              <TouchableOpacity
                style={styles.privacyContainer}
                onPress={() => setValue("terms", !agreed, { shouldValidate: true })}
              >
                <Checkbox checked={agreed} />
                <Text style={styles.privacyText}>I agree to the Terms of Use and Privacy Policy</Text>
              </TouchableOpacity>
            )}
          />
          {errors.terms && (
            <Text style={styles.errorText}>{errors.terms.message}</Text>
          )}

          <View style={styles.mainButton}>
            <CustomButton title="Create Account" variant="primary" onPress={handleSubmit(onSubmit)} />
          </View>
          <Text style={styles.signInText}>
            Do you have an account?{" "}
            <Link replace={true} href={"/(authentication)/SignInScreen"} style={{ color: Colors.primaryLight }}>
              Sign In
            </Link>
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {showAlert &&
        <AlertSuccessModal onClose={() => router.replace("/authentication-flow/SignInScreen")} visible={showAlert} />}
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
    marginBottom: verticalScale(16)
  },
  privacyContainer: {
    flexDirection: "row",
    gap: scale(8),
    alignItems: "center"
  },
  privacyText: {
    fontSize: scaleFontSize(12),
    fontFamily: "PoppinsRegular",
    color: Colors.darkGray
  },
  errorText: {
    color: "red",
    fontSize: scaleFontSize(12),
    marginTop: scale(4),
    fontFamily: "PoppinsRegular"
  },
  mainButton: {
    marginVertical: scale(16)
  },
  signInText: {
    fontSize: scaleFontSize(14),
    fontFamily: "PoppinsRegular"
  }
});
