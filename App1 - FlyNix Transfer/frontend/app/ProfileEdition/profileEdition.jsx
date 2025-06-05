import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InputText from "../components/InputText";
import { useEffect } from "react";
import { useState } from "react";
import { authService } from "@/services/api";
import DateInput from "../components/DateInput";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const profileEdition = () => {
  const [user, setUser] = useState({});

  const countryList = [
    { name: { common: "France" }, cca2: "FR", cca3: "FRA", flag: "🇫🇷" },
    { name: { common: "United States" }, cca2: "US", cca3: "USA", flag: "🇺🇸" },
    { name: { common: "Canada" }, cca2: "CA", cca3: "CAN", flag: "🇨🇦" },
    { name: { common: "Germany" }, cca2: "DE", cca3: "DEU", flag: "🇩🇪" },
    { name: { common: "Spain" }, cca2: "ES", cca3: "ESP", flag: "🇪🇸" },
    { name: { common: "Italy" }, cca2: "IT", cca3: "ITA", flag: "🇮🇹" },
    { name: { common: "Japan" }, cca2: "JP", cca3: "JPN", flag: "🇯🇵" },
    { name: { common: "India" }, cca2: "IN", cca3: "IND", flag: "🇮🇳" },
    { name: { common: "China" }, cca2: "CN", cca3: "CHN", flag: "🇨🇳" },
    { name: { common: "Philippines" }, cca2: "PH", cca3: "PHL", flag: "🇵🇭" },
    { name: { common: "Nigeria" }, cca2: "NG", cca3: "NGA", flag: "🇳🇬" },
    { name: { common: "Pakistan" }, cca2: "PK", cca3: "PAK", flag: "🇵🇰" },
    { name: { common: "Iran" }, cca2: "IR", cca3: "IRN", flag: "🇮🇷" },
    { name: { common: "Syria" }, cca2: "SY", cca3: "SYR", flag: "🇸🇾" },
    { name: { common: "United Kingdom" }, cca2: "GB", cca3: "GBR", flag: "🇬🇧" },
    { name: { common: "Afghanistan" }, cca2: "AF", cca3: "AFG", flag: "🇦🇫" },
    { name: { common: "Vietnam" }, cca2: "VN", cca3: "VNM", flag: "🇻🇳" },
    { name: { common: "Mexico" }, cca2: "MX", cca3: "MEX", flag: "🇲🇽" },
    { name: { common: "Bangladesh" }, cca2: "BD", cca3: "BGD", flag: "🇧🇩" },
    { name: { common: "Egypt" }, cca2: "EG", cca3: "EGY", flag: "🇪🇬" },
    { name: { common: "Colombia" }, cca2: "CO", cca3: "COL", flag: "🇨🇴" },
    { name: { common: "South Korea" }, cca2: "KR", cca3: "KOR", flag: "🇰🇷" },
    { name: { common: "Jamaica" }, cca2: "JM", cca3: "JAM", flag: "🇯🇲" },
    { name: { common: "Sri Lanka" }, cca2: "LK", cca3: "LKA", flag: "🇱🇰" },
    { name: { common: "Lebanon" }, cca2: "LB", cca3: "LBN", flag: "🇱🇧" },
    { name: { common: "Morocco" }, cca2: "MA", cca3: "MAR", flag: "🇲🇦" },
    { name: { common: "Algeria" }, cca2: "DZ", cca3: "DZA", flag: "🇩🇿" },
    { name: { common: "Congo" }, cca2: "CG", cca3: "COG", flag: "🇨🇬" },
    { name: { common: "Cameroon" }, cca2: "CM", cca3: "CMR", flag: "🇨🇲" },
    { name: { common: "Haiti" }, cca2: "HT", cca3: "HTI", flag: "🇭🇹" },
    { name: { common: "Tunisia" }, cca2: "TN", cca3: "TUN", flag: "🇹🇳" },
    { name: { common: "Ivory Coast" }, cca2: "CI", cca3: "CIV", flag: "🇨🇮" },
    { name: { common: "Mauritania" }, cca2: "MR", cca3: "MRT", flag: "🇲🇷" },
    { name: { common: "Senegal" }, cca2: "SN", cca3: "SEN", flag: "🇸🇳" },
  ];

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [street, setStreet] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [region, setRegion] = useState("");
  const [pays, setPays] = useState("");

    const [selectedCountry, setSelectedCountry] = useState(null);
  

  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response.data.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du profil utilisateur:",
          error
        );
        Alert.alert("Erreur", error.message);
      }
    };

    fetchUserProfile();
  }, []);

   const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
      setSearchQuery(""); 
    };
  
    const selectCountry = (country) => {
      setSelectedCountry(country);
      closeModal();
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.currencyItem}
        onPress={() => selectCountry(item)}
      >
        <Text style={styles.flag}>{item.flag}</Text>
        <View style={styles.currencyInfo}>
          <Text style={styles.currencyCode}>{item.name.common}</Text>
          <Text style={styles.currencyName}>{item.cca2}</Text>
        </View>
      </TouchableOpacity>
    );
  
    useEffect(() => {
      if (searchQuery) {
        const filtered = countryList.filter((country) =>
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCountries(filtered);
      } else {
        setFilteredCountries(countryList);
      }
    }, [searchQuery]);

  return (
    <SafeAreaProvider style={{ backgroundColor: "#1f1f1f" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={150}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View style={{ marginLeft: 24, marginRight: 24 }}>
              <TouchableOpacity className="flex items-center justify-center mt-3">
                <Image
                  source={require("../../assets/images/profileImg.png")}
                  className="w-40 h-40 rounded-full"
                />
                <Image
                  source={require("../../assets/images/televerser.png")}
                  style={{ width: 50, height: 50 }}
                  className="absolute"
                />
              </TouchableOpacity>

              <InputText
                Titre={"Prénom"}
                placeholder={"Votre Prénom"}
                value={user.prenom}
              />
              <InputText
                Titre={"Nom"}
                placeholder={"Votre Nom"}
                value={user.nom}
              />
              <InputText
                Titre={"Email"}
                placeholder={"Votre adresse Email"}
                value={user.email}
              />
              <InputText
                Titre={"phone"}
                placeholder={"Votre Numero phone"}
                value={user.phone}
                onChangeText={setphone}
                keyboardType="phone-pad"
                isNumber={true}
              />
              <DateInput
                Titre="Date de naissance"
                value={user.birthday}
                onChange={setBirthday}
              />
              <TouchableOpacity
                onPress={openModal}
                className="bg-[#2a2a2a] mt-4 rounded-xl p-4"
              >
                <Text className="text-center text-white text-2xl font-bold">
                  {selectedCountry
                    ? `${selectedCountry.flag} ${selectedCountry.name.common}`
                    : "Sélectionner un pays"}
                </Text>
              </TouchableOpacity>

              <View className="flex flex-row items-center justify-between">
                <View className="mt-4" style={{ width: 160 }}>
                  <Text className="text-2xl text-white font-semibold">
                    Numero et Rue
                  </Text>
                  <TextInput
                    className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                    placeholder="Votre Prenom"
                    placeholderTextColor="#999"
                    value={street}
                    onChangeText={setStreet}
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
                    value={codePostal}
                    onChangeText={setCodePostal}
                  />
                </View>
              </View>

              <View className="flex flex-row items-center justify-between">
                <View className="mt-4" style={{ width: 160 }}>
                  <Text className="text-2xl text-white font-semibold">
                    Ville
                  </Text>
                  <TextInput
                    className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                    placeholder="Votre Prenom"
                    placeholderTextColor="#999"
                    value={ville}
                    onChangeText={setVille}
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
                    value={region}
                    onChangeText={setRegion}
                  />
                </View>
              </View>

              <TouchableOpacity
                className="p-3 mt-6 rounded-xl"
                style={{
                  backgroundColor: "#a12323",
                  marginLeft: 24,
                  marginRight: 24,
                  marginBottom: 20,
                }}
              >
                <Text className="text-center text-white text-xl font-bold">
                  Enregistrer
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={isModalVisible}
                onBackdropPress={closeModal}
                backdropOpacity={0.7}
                avoidKeyboard
                useNativeDriverForBackdrop
                style={styles.modal}
              >
                <Animated.View
                  style={styles.modalContent}
                  entering={SlideInDown.springify().damping(15)}
                  exiting={SlideOutDown.duration(200)}
                >
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher un pays..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <FlatList
                    data={filteredCountries}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.cca3}
                    keyboardShouldPersistTaps="handled"
                    initialNumToRender={20}
                  />
                </Animated.View>
              </Modal>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: Dimensions.get("window").height * 0.7,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  flag: {
    fontSize: 28,
    marginRight: 15,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3436",
  },
  currencyName: {
    fontSize: 14,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default profileEdition;
