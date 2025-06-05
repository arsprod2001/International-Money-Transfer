import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InputText from "../components/InputText";
import { authService } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import OTPInput from "../components/OTPInput";
import ErrorModal from "../components/ErrorModal";

const Parametre = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { phone } = useLocalSearchParams();
  const [otpError, setOtpError] = useState("");
  const [emptyOtpError, setEmptyOtpError] = useState("");

  const maskPhoneNumber = (phone) => {
    if (!phone) return "********";
    const phoneStr = String(phone);
    if (phoneStr.length <= 4) return phoneStr;
    const visibleDigits = phoneStr.slice(-4);
    return "*".repeat(phoneStr.length - 4) + visibleDigits;
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setEmptyOtpError(true)
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOTP(phone, otp);
      if (response.data.success) {
        await AsyncStorage.setItem("authToken", response.data.token);
        console.log("Success", "OTP verified successfully!");
        router.replace("/(tabs)");
      }
    } catch (error) {
      setOtpError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#1f1f1f" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            <View
              className="flex-1 items-center mt-14"
              style={{ marginLeft: 70 }}
            >
              <Image
                source={require("../../assets/images/OTP.png")}
                style={{ width: 150, height: 150 }}
              />
            </View>

            <Text className="text-white text-center font-bold text-2xl mt-4">
              Enter Verification code
            </Text>
            <Text className="text-white text-center text-xl ">
              We are automatically detecting a SMS send to your number{" "}
              {maskPhoneNumber(phone)}
            </Text>

            <OTPInput
              length={6}
              value={otp} 
              onChangeText={(code) => setOtp(code)} 
              onComplete={(code) => setOtp(code)}
            />

            <TouchableOpacity
              className="p-3 mt-6 rounded-xl"
              style={{
                backgroundColor: "#007BFF",
                marginLeft: 24,
                marginRight: 24,
                
              }}
              onPress={handleVerifyOTP}
              disabled={loading}
            >
              <Text className="text-center text-white text-xl font-bold">
                {loading ? "Verifying..." : "Verify"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 mt-6 rounded-xl"
              style={{
                backgroundColor: "#007BFF",
                marginLeft: 24,
                marginRight: 24,
                marginBottom: 20,
              }}
              onPress={() => router.push('sign-in')}
            >
              <Text className="text-center text-white text-xl font-bold">
               Back
              </Text>
            </TouchableOpacity>

            <ErrorModal
              visible={otpError}
              onClose={() => setOtpError(false)}
              iconName="timer-off" 
              title="Code OTP invalide"
              message="Le code de vérification saisi est incorrect ou a expiré. Veuillez demander un nouveau code ou réessayer."
              buttonText="Compris"
              buttonColor="#FF7043" 
            />

            <ErrorModal
              visible={emptyOtpError}
              onClose={() => setEmptyOtpError(false)}
              iconName="sms-failed" 
              title="Champ requis"
              message="Veuillez entrer le code de vérification que vous avez reçu par SMS ou email."
              buttonText="Compris"
              buttonColor="#FFA000" 
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Parametre;
