import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InputText from "../components/InputText";
import ErrorModal from "../components/ErrorModal";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { authService } from "../../services/api";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIdChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [telephone, setTelephone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleSendOTP = async () => {
    const cleanedPhone = telephone.replace(/\D/g, ""); 

    if (!cleanedPhone || cleanedPhone.length < 8) {
      Alert.alert(
        "Erreur",
        "Veuillez entrer un numéro valide (au moins 8 chiffres)"
      );
      return;
    }

    setIsLoading(true);

    try {
      
      const phone = cleanedPhone;
      const response = await authService.sendOTPToPhone(phone);

      if (response.data?.success) {
        router.replace({
          pathname: "/OtpScreen/Otp",
          params: {
            phone: phone,
          },
        });
      } else {
        throw new Error(response.data?.message || "Échec de l'envoi du code");
      }
    } catch (error) {
      let errorMessage = "Erreur inconnue";
      if (error.response?.status === 429) {
        errorMessage = "Trop de tentatives. Veuillez réessayer plus tard";
      } else if (error.message.includes("network")) {
        errorMessage = "Problème de connexion";
      } else {
        errorMessage = error.message || "Échec de l'envoi du code OTP";
      }

      setModalVisibleError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    if (!validator.isEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    //if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await authService.signIn(email, password);
      if (response.data.data.token) {
        await AsyncStorage.setItem("authToken", response.data.data.token);
        router.replace("/(tabs)"); 
      }
    } catch (error) {
      setLoginError(true)
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#1f1f1f" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            <Text className="text-center text-white text-4xl font-bold mt-14">
              Welcome Back
            </Text>
            <Text className="text-center text-white text-2xl">
              Login to access your account
            </Text>

            <View className="flex flex-row items-center justify-between bg-[#333333] mt-10 rounded-[10]">
              <TouchableOpacity
                onPress={() => setIsEmailLogin(true)}
                style={{
                  padding: 15,
                  backgroundColor: isEmailLogin ? "#007BFF" : "#333333",
                  borderRadius: 10,
                  paddingLeft: 60,
                  paddingRight: 60,
                }}
              >
                <Text style={{ color: "white" }} className="font-bold">
                  Email
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsEmailLogin(false)}
                style={{
                  padding: 15,
                  backgroundColor: !isEmailLogin ? "#007BFF" : "#333333",
                  borderRadius: 10,
                  paddingLeft: 60,
                  paddingRight: 60,
                }}
              >
                <Text style={{ color: "white" }} className="font-bold">
                  Téléphone
                </Text>
              </TouchableOpacity>
            </View>

            {/* Connexion par Email */}
            {isEmailLogin ? (
              <>
                <InputText
                  Titre={"Email"}
                  placeholder={"Votre Email"}
                  value={email}
                  onChangeText={setEmail}
                />

                <InputText
                  Titre={"Mot de Passe"}
                  placeholder={"Votre mot de passe"}
                  value={password}
                  onChangeText={setPassword}
                  bool={true}
                />

                <View className="flex flex-row items-center justify-between">
                  <View className="flex flex-row items-center mt-6">
                    <Checkbox
                      value={isChecked}
                      onValueChange={setIdChecked}
                      style={{ borderRadius: 6 }}
                    />
                    <Text className="text-white text-xl ml-3">Remember me</Text>
                  </View>
                  <TouchableOpacity>
                    <Text className="text-white text-xl mt-5">
                      Forget Password
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className="p-3 mt-14 rounded-xl"
                  style={{
                    backgroundColor: "#007BFF",
                    marginLeft: 24,
                    marginRight: 24,
                    marginBottom: 20,
                  }}
                  onPress={handleSignIn}
                >
                  <Text className="text-center text-white text-xl font-bold">
                    Log In
                  </Text>
                </TouchableOpacity>

                <View className="flex-1 items-center">
                  <View className="flex flex-row items-center">
                    <Text className="text-center text-white text-lg">
                      Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => router.push("sign-up")}>
                      <Text
                        className="text-center text-lg ml-2 font-bold"
                        style={{ color: "#007BFF" }}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <ErrorModal
                  visible={loginError}
                  onClose={() => setLoginError(false)}
                  iconName="warning" 
                  title="Identifiants incorrects"
                  message="L'adresse email ou le mot de passe saisi est invalide. Veuillez réessayer."
                  buttonText="Compris"
                />
              </>
            ) : (
              // Connexion par Téléphone
              <>
                <InputText
                  Titre={"Téléphone"}
                  placeholder={"Votre Numero Telephone"}
                  value={telephone}
                  onChangeText={setTelephone}
                  keyboardType="phone-pad"
                  isNumber={true}
                />

                <TouchableOpacity
                  className={`p-3 mt-6 rounded-xl flex-row justify-center items-center ${
                    isLoading ? "opacity-70" : ""
                  }`}
                  style={{
                    backgroundColor: isLoading ? "#0055AA" : "#007BFF",
                    marginHorizontal: 24,
                    marginBottom: 20,
                  }}
                  onPress={handleSendOTP}
                  disabled={isLoading || !telephone?.trim()}
                >
                  {isLoading ? (
                    <>
                      <ActivityIndicator
                        color="#FFFFFF"
                        style={{ marginRight: 8 }}
                      />
                      <Text className="text-center text-white text-xl font-bold">
                        Envoi...
                      </Text>
                    </>
                  ) : (
                    <Text className="text-center text-white text-xl font-bold">
                      Log In
                    </Text>
                  )}
                </TouchableOpacity>

                <ErrorModal
                  visible={modalVisibleError}
                  onClose={() => setModalVisibleError(false)}
                />

               
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignIn;
