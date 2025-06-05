import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InputText from "../components/InputText";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";

const SignIn = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIdChecked] = useState(false);

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
                <InputText Titre={"Email"} placeholder={"Votre Email"} />

                <InputText
                  Titre={"Mot de Passe"}
                  placeholder={"Votre Prénom"}
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
                  onPress={() => router.replace("(tabs)")}
                >
                  <Text className="text-center text-white text-xl font-bold">
                    Log In
                  </Text>
                </TouchableOpacity>

                <View className="flex-1 items-center">
                  <View className="flex flex-row items-center">
                    <Text className="text-center text-white text-lg">Don't have an account?</Text>
                    <TouchableOpacity  onPress={() => router.push("sign-up")}>
                      <Text className="text-center text-lg ml-2 font-bold" style = {{color : "#007BFF"}} >Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              // Connexion par Téléphone
              <>

                <InputText Titre={"Téléphone"} placeholder={"Votre Numero Telephone"} />

                <TouchableOpacity
                  className="p-3 mt-6 rounded-xl"
                  style={{
                    backgroundColor: "#007BFF",
                    marginLeft: 24,
                    marginRight: 24,
                    marginBottom: 20,
                  }}

                >
                  <Text className="text-center text-white text-xl font-bold">
                    Log In
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignIn;
