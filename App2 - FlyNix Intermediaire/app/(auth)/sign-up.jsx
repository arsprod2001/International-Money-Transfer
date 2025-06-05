import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InputText from "../components/InputText";

const SignUp = () => {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#1f1f1f" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            <Text className="text-center text-white text-4xl font-bold ">
              Get Started Now
            </Text>
            <Text
              className="text-center text-white text-2xl"
              style={{ marginBottom: 20 }}
            >
              Create an account or log in to explore about our app
            </Text>

            <View className="flex flex-row items-center justify-between">
              <View className="mt-4" style={{ width: 160 }}>
                <Text className="text-2xl text-white font-semibold">
                  Prenom
                </Text>
                <TextInput
                  className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                  placeholder="Votre Prenom"
                  placeholderTextColor="#999"
                />
              </View>

              <View className="mt-4" style={{ width: 160 }}>
                <Text className="text-2xl text-white font-semibold">Nom</Text>
                <TextInput
                  className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                  placeholder="Votre Nom"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            <InputText Titre={"Email"} placeholder={"Votre Email"} />
            <InputText
              Titre={"Telephone"}
              placeholder={"Votre Numero Telephone"}
            />
            <InputText Titre={"Date de Naissance"} placeholder={"MM/DD/AAAA"} />

            <View className="flex flex-row items-center justify-between">
              <View className="mt-4" style={{ width: 160 }}>
                <Text className="text-2xl text-white font-semibold">
                  Numero et Rue
                </Text>
                <TextInput
                  className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                  placeholder="Votre Prenom"
                  placeholderTextColor="#999"
                />
              </View>

              <View className="mt-4" style={{ width: 160 }}>
                <Text className="text-2xl text-white font-semibold">
                  Code Postal
                </Text>
                <TextInput
                  className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                  placeholder="Votre Nom"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View className="flex flex-row items-center justify-between">
              <View className="mt-4" style={{ width: 160 }}>
                <Text className="text-2xl text-white font-semibold">Ville</Text>
                <TextInput
                  className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                  placeholder="Votre Prenom"
                  placeholderTextColor="#999"
                />
              </View>

              <View className="mt-4" style={{ width: 160 }}>
                <Text className="text-2xl text-white font-semibold">
                  Region
                </Text>
                <TextInput
                  className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                  placeholder="Votre Nom"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <InputText Titre={"Pays"} placeholder={"Pays"} />
            <InputText Titre={"Password"} placeholder={"Password"} />
            <InputText
              Titre={"Repeter Password"}
              placeholder={"Repeter Password"}
            />

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
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignUp;
