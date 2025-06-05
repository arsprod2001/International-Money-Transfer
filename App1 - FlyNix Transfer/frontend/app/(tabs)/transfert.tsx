import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, FlatList, ActivityIndicator, StyleSheet, Dimensions, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import Modal from 'react-native-modal';
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import InputText from '../components/InputText';
import { router } from 'expo-router';
import { authService } from "../../services/api";
import { useStripe } from "@stripe/stripe-react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



const countryList = [
  { name: { common: 'France' }, cca2: 'FR', cca3: 'FRA', flag: '🇫🇷' },
  { name: { common: 'United States' }, cca2: 'US', cca3: 'USA', flag: '🇺🇸' },
  { name: { common: 'Canada' }, cca2: 'CA', cca3: 'CAN', flag: '🇨🇦' },
  { name: { common: 'Germany' }, cca2: 'DE', cca3: 'DEU', flag: '🇩🇪' },
  { name: { common: 'Spain' }, cca2: 'ES', cca3: 'ESP', flag: '🇪🇸' },
  { name: { common: 'Italy' }, cca2: 'IT', cca3: 'ITA', flag: '🇮🇹' },
  { name: { common: 'Japan' }, cca2: 'JP', cca3: 'JPN', flag: '🇯🇵' },
  { name: { common: 'India' }, cca2: 'IN', cca3: 'IND', flag: '🇮🇳' },
  { name: { common: 'China' }, cca2: 'CN', cca3: 'CHN', flag: '🇨🇳' },
  { name: { common: 'Philippines' }, cca2: 'PH', cca3: 'PHL', flag: '🇵🇭' },
  { name: { common: 'Nigeria' }, cca2: 'NG', cca3: 'NGA', flag: '🇳🇬' },
  { name: { common: 'Pakistan' }, cca2: 'PK', cca3: 'PAK', flag: '🇵🇰' },
  { name: { common: 'Iran' }, cca2: 'IR', cca3: 'IRN', flag: '🇮🇷' },
  { name: { common: 'Syria' }, cca2: 'SY', cca3: 'SYR', flag: '🇸🇾' },
  { name: { common: 'United Kingdom' }, cca2: 'GB', cca3: 'GBR', flag: '🇬🇧' },
  { name: { common: 'Afghanistan' }, cca2: 'AF', cca3: 'AFG', flag: '🇦🇫' },
  { name: { common: 'Vietnam' }, cca2: 'VN', cca3: 'VNM', flag: '🇻🇳' },
  { name: { common: 'Mexico' }, cca2: 'MX', cca3: 'MEX', flag: '🇲🇽' },
  { name: { common: 'Bangladesh' }, cca2: 'BD', cca3: 'BGD', flag: '🇧🇩' },
  { name: { common: 'Egypt' }, cca2: 'EG', cca3: 'EGY', flag: '🇪🇬' },
  { name: { common: 'Colombia' }, cca2: 'CO', cca3: 'COL', flag: '🇨🇴' },
  { name: { common: 'South Korea' }, cca2: 'KR', cca3: 'KOR', flag: '🇰🇷' },
  { name: { common: 'Jamaica' }, cca2: 'JM', cca3: 'JAM', flag: '🇯🇲' },
  { name: { common: 'Sri Lanka' }, cca2: 'LK', cca3: 'LKA', flag: '🇱🇰' },
  { name: { common: 'Lebanon' }, cca2: 'LB', cca3: 'LBN', flag: '🇱🇧' },
  { name: { common: 'Morocco' }, cca2: 'MA', cca3: 'MAR', flag: '🇲🇦' },
  { name: { common: 'Algeria' }, cca2: 'DZ', cca3: 'DZA', flag: '🇩🇿' },
  { name: { common: 'Congo' }, cca2: 'CG', cca3: 'COG', flag: '🇨🇬' },
  { name: { common: 'Cameroon' }, cca2: 'CM', cca3: 'CMR', flag: '🇨🇲' },
  { name: { common: 'Haiti' }, cca2: 'HT', cca3: 'HTI', flag: '🇭🇹' },
  { name: { common: 'Tunisia' }, cca2: 'TN', cca3: 'TUN', flag: '🇹🇳' },
  { name: { common: 'Ivory Coast' }, cca2: 'CI', cca3: 'CIV', flag: '🇨🇮' },
  { name: { common: 'Mauritania' }, cca2: 'MR', cca3: 'MRT', flag: '🇲🇷' },
  { name: { common: 'Senegal' }, cca2: 'SN', cca3: 'SEN', flag: '🇸🇳' },
];


const receptionMethods = {
  "India": [
    { id: 1, name: "UPI", image: require("../../assets/images/UPI.png") }
  ],
  "China": [
    { id: 1, name: "WeChat Pay", image: require("../../assets/images/wechat.png") },
    { id: 2, name: "Ali Pay", image: require("../../assets/images/alipay.png") }
  ],
  "Philippines": [
    { id: 1, name: "GCash", image: require("../../assets/images/gcash.png") },
    { id: 2, name: "PayMaya", image: require("../../assets/images/paymaya.png") }
  ],
  "Nigeria": [
    { id: 1, name: "MTN", image: require("../../assets/images/MTN.png") },
    { id: 2, name: "Airtel", image: require("../../assets/images/airtel.png") }
  ],
  "Pakistan": [
    { id: 1, name: "JazzCash", image: require("../../assets/images/jazzcash.png") },
    { id: 2, name: "Easypaisa", image: require("../../assets/images/Easypaisa.png") }
  ],
  "United States": [
    { id: 1, name: "Paypal", image: require("../../assets/images/paypal.png") },
  ],
  "France": [
    { id: 1, name: "Paylib", image: require("../../assets/images/Paylib.png") },
    { id: 2, name: "Lydia", image: require("../../assets/images/Lydia.png") }
  ],
  "Iran": [
    { id: 1, name: "Bale Messenger", image: require("../../assets/images/Bale-Messenger.png") },
    { id: 2, name: "Asan Pardakht", image: require("../../assets/images/Asan-Pardakht.png") }
  ],
  "Syria": [
    { id: 1, name: "Syriatel Wallet", image: require("../../assets/images/Syriatel-Wallet.png") },
    { id: 2, name: "MTN Syria", image: require("../../assets/images/MTN.png") }
  ],
  "United Kingdom": [
    { id: 1, name: "Monzo", image: require("../../assets/images/Monzo.png") },
  ],
  "Afghanistan": [
    { id: 1, name: "M-Pesa", image: require("../../assets/images/M-pesa.png") },
    { id: 2, name: "AWCC My Money", image: require("../../assets/images/AWCC-My-Money.png") }
  ],
  "Vietnam": [
    { id: 1, name: "Momo", image: require("../../assets/images/Momo.png") },
    { id: 2, name: "ZaloPay", image: require("../../assets/images/ZaloPay.png") }
  ],
  "Mexico": [
    { id: 1, name: "Mercado Pago", image: require("../../assets/images/Mercado-Pago.png") },
    { id: 2, name: "BBVA México", image: require("../../assets/images/BBVA-Mexico.png") }
  ],
  "Bangladesh": [
    { id: 1, name: "bKash", image: require("../../assets/images/bKash.png") }
  ],
  "Egypt": [
    { id: 1, name: "Fawry", image: require("../../assets/images/Fawry.png") },
    { id: 2, name: "InstaPay Egypt", image: require("../../assets/images/InstaPay-Egypt.png") }
  ],
  "Colombia": [
    { id: 1, name: "Nequi", image: require("../../assets/images/Nequi.png") },
    { id: 2, name: "Daviplata", image: require("../../assets/images/Daviplata.png") }
  ],
  "South Korea": [
    { id: 1, name: "KakaoBank", image: require("../../assets/images/KakaoBank.png") },
    { id: 2, name: "KakaoPay", image: require("../../assets/images/KakaoPay.png") }
  ],
  "Jamaica": [
    { id: 1, name: "NCB Mobile", image: require("../../assets/images/NCB-Mobile.png") },
    { id: 2, name: "Sagicor Bank Mobile", image: require("../../assets/images/Sagicor-Bank-Mobile-Banking.png") }
  ],
  "Sri Lanka": [
    { id: 1, name: "Bank of Ceylon", image: require("../../assets/images/Bank-of-Ceylon-Mobile-Banking.png") },
    { id: 2, name: "Upay", image: require("../../assets/images/Upay.png") }
  ],
  "Lebanon": [
    { id: 1, name: "Credit Libanais", image: require("../../assets/images/Credit-Libanais.png") },
    { id: 2, name: "eBLOM Lebanon", image: require("../../assets/images/eBLOM-Lebanon.png") }
  ],
  "Morocco": [
    { id: 1, name: "Orange Money", image: require("../../assets/images/OM.png") },
    { id: 2, name: "CASH PLUS", image: require("../../assets/images/CASH-PLUS-Mobile-Wallet.png") }
  ],
  "Algeria": [
    { id: 1, name: "BaridiMob", image: require("../../assets/images/BaridiMob.png") },
    { id: 2, name: "Banxy", image: require("../../assets/images/Banxy.png") }
  ],
  "Congo": [
    { id: 1, name: "M-Pesa", image: require("../../assets/images/M-pesa.png") },
    { id: 2, name: "Orange Money", image: require("../../assets/images/OM.png") }
  ],
  "Cameroon": [
    { id: 1, name: "Orange Money", image: require("../../assets/images/OM.png") },
    { id: 2, name: "MTN Mobile Money", image: require("../../assets/images/MTN.png") }
  ],
  "Haiti": [
    { id: 1, name: "MonCash", image: require("../../assets/images/MonCash.png") },
    { id: 2, name: "UniMobile", image: require("../../assets/images/UniMobile.png") }
  ],
  "Tunisia": [
    { id: 1, name: "Flouci", image: require("../../assets/images/Flouci.png") },
    { id: 2, name: "myPoste", image: require("../../assets/images/myPoste.png") }
  ],
  "Ivory Coast": [
    { id: 1, name: "Orange Money", image: require("../../assets/images/OM.png") },
    { id: 2, name: "MTN Mobile Money", image: require("../../assets/images/MTN.png") }
  ],
  "Mauritania": [
    { id: 1, name: "Bankily", image: require("../../assets/images/bankily.png") },
    { id: 2, name: "Masrvi", image: require("../../assets/images/masrvi.png") }
  ],
  "Senegal": [
    { id: 1, name: "Wave", image: require("../../assets/images/wave.png") },
    { id: 2, name: "Orange Money", image: require("../../assets/images/OM.png") }
  ]
};



const Transfert = () => {

  const [selected, setSelected] = useState(null);
  const [selectedReception, setSelectedReception] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleConfirmation, setModalVisibleConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [etape, setEtape] = useState(1);
  const [montant, setMontant] = useState("");

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const { initPaymentSheet, presentPaymentSheet } = useStripe();


  const scrollViewRef = useRef(null);

  const handlePress = (value) => {
    setMontant((prevMontant) => prevMontant + value);
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  const handleDelete = () => {
    setMontant((prevMontant) => prevMontant.slice(0, -1));
  };


  const nextStep = () => {
    setEtape((prevEtape) => prevEtape + 1);
  };

  const previousStep = () => {
    setEtape((prevEtape) => prevEtape - 1);
  };

  const handleSelect = (option) => {
    setSelected(selected === option ? null : option);
  };

  const handleSelectReception = (option) => {
    setSelectedReception(selectedReception === option ? null : option); 
  };


  useEffect(() => {
    if (searchQuery) {
      const filtered = countryList.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countryList);
    }
  }, [searchQuery]);

  const openModal = () => {
    setModalVisible(true);
  };

  const openModalConfirmation = () => {
    setModalVisibleConfirmation(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery(''); 
  };

  const closeModalConfirmation = () => {
    setModalVisibleConfirmation(false);
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

  const handlePayment = async () => {
    try {
      const montantNum = parseFloat(montant).toFixed(2);
      const timeout = 800
      const { data } = await authService.Payment(montantNum, timeout);

      if (!data?.clientSecret) {
        throw new Error('Réponse invalide du serveur');
      }

      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Simulation de Paiement",
        returnURL: "your-app://payment-complete"
      });

      if (initError) throw initError;

      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) throw paymentError;

      Alert.alert("Succès", `Paiement de ${montant}€ simulé`);
      setMontant("");

    } catch (err) {
      let errorMessage = "Erreur inconnue";

      if (err.message.includes("-1009")) {
        errorMessage = "Pas de connexion internet";
      } else if (err.code === "resource_missing") {
        errorMessage = "Session de paiement invalide";
      } else {
        errorMessage = err.message || "Échec du paiement";
      }

    }
  }



  return (
    <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            {etape === 1 && (
              <View>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                  Transfert
                </Text>
                {/*Section choix du moyen de Transfert*/}
                <Text className='text-white text-center mt-2 text-xl italic'>Choisir le moyen de Transfert</Text>
                <View className='flex flex-row items-center justify-between mt-3'>
                  <View>
                    <TouchableOpacity className='bg-[#2a2a2a] p-9 rounded-xl'
                      onPress={() => handleSelect(1)}
                    >
                      {selected === 1 && <Image source={require('../../assets/images/succes.png')} style={{ position: 'absolute', top: 5, right: 5 }} className='w-8 h-8' />}
                      <Image source={require('../../assets/images/card.png')} className='w-[100] h-[100] ' />
                    </TouchableOpacity>
                    <Text className='text-center text-white italic font-bold text-xl'>Card</Text>
                  </View>

                  <View>
                    <TouchableOpacity className='bg-[#2a2a2a] p-9 rounded-xl'
                      onPress={() => handleSelect(2)}
                    >
                      {selected === 2 && <Image source={require('../../assets/images/succes.png')} style={{ position: 'absolute', top: 5, right: 5 }} className='w-8 h-8' />}
                      <Image source={require('../../assets/images/interact.png')} className='w-[100] h-[100] ' />
                    </TouchableOpacity>
                    <Text className='text-center text-white italic font-bold text-xl'>E-Transfert</Text>
                  </View>

                </View>


                {/*Section choix du pays de transferer*/}
                <Text className='text-white text-center mt-2 text-xl italic'>Choisir le pays du distinataire</Text>
                <TouchableOpacity onPress={openModal} className='bg-[#2a2a2a] mt-4 rounded-xl p-4'>
                  <Text className='text-center text-white text-2xl font-bold'>
                    {selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name.common}` : "Sélectionner un pays"}
                  </Text>
                </TouchableOpacity>



                {selectedCountry && (
                  <>
                    {/* Section choix du moyen de réception */}
                    <Text className='text-white text-center mt-2 text-xl italic'>Choisir le moyen de Réception</Text>

                    <View className='flex flex-row items-center justify-between mt-3'>
                      {receptionMethods[selectedCountry.name.common] ? (
                        receptionMethods[selectedCountry.name.common].map((method, index) => (
                          <View key={index}>
                            <TouchableOpacity
                              className='bg-[#2a2a2a] p-9 rounded-xl'
                              onPress={() => handleSelectReception(index)}
                            >
                              {selectedReception === index && (
                                <Image source={require('../../assets/images/succes.png')}
                                  style={{ position: 'absolute', top: 5, right: 5 }}
                                  className='w-8 h-8'
                                />
                              )}
                              <Image source={method.image} className='w-[100] h-[100]' />
                            </TouchableOpacity>
                            <Text className='text-center text-white italic font-bold text-xl'>{method.name}</Text>
                          </View>
                        ))
                      ) : (
                        <Text className='text-center text-white mt-4 text-lg italic'>
                          Aucun moyen de réception disponible pour ce pays.
                        </Text>
                      )}
                    </View>

                    <TouchableOpacity
                      className={`bg-[#a12323] p-3 mt-6 rounded-xl ${!selected || selectedReception === null ? "opacity-50" : ""}`}
                      onPress={nextStep}
                      disabled={!selected || selectedReception === null}
                    >
                      <Text className="text-center text-white text-xl">
                        Suivant
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                {/* Modal pour afficher la liste des pays */}
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
            )}

            {etape === 2 && (
              <View>
                <ScrollView ref={scrollViewRef}
                  horizontal
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  showsHorizontalScrollIndicator={false} >
                  <Text className='text-white font-bold' style={{ fontSize: 80, marginTop: 60 }}>{montant || '0'}</Text>
                </ScrollView>

                <View className='flex flex-row flex-wrap justify-between mt-3 mr-6 ml-6'>
                  <View className='w-1/3 items-center'>
                    <TouchableOpacity onPress={() => handlePress('1')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>1</Text>
                    </TouchableOpacity>
                  </View>

                  <View className='w-1/3 items-center'>
                    <TouchableOpacity onPress={() => handlePress('2')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>2</Text>
                    </TouchableOpacity>
                  </View>

                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={() => handlePress('3')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>3</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={() => handlePress('4')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>4</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={() => handlePress('5')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>5</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={() => handlePress('6')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>6</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={() => handlePress('7')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>7</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={() => handlePress('8')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>8</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={() => handlePress('9')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>9</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={() => handlePress('.')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>.</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={() => handlePress('0')} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Text className='text-white text-3xl' style={{ marginLeft: 8, marginRight: 8 }}>0</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='w-1/3 items-center mb-5'>
                    <TouchableOpacity onPress={handleDelete} className='bg-[#333333]' style={{ padding: 30, borderRadius: 9 }}>
                      <Image source={require("../../assets/images/delete.png")} style={{ width: 31, height: 31 }} />
                    </TouchableOpacity>
                  </View>

                </View>






                <View className='flex flex-row items-center justify-between  mr-6 ml-6'>
                  <TouchableOpacity
                    className='bg-[#a12323] p-3 mt-6 rounded-xl'
                    onPress={previousStep}
                    style={{ width: 140 }}
                  >

                    <Text className='text-center text-white text-xl'>Precedent</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`bg-[#a12323] p-3 mt-6 rounded-xl ${montant <= 100 ? "opacity-50" : ""
                      }`}
                    onPress={nextStep}
                    disabled={montant <= 100}
                    style={{ width: 140 }}
                  >
                    <Text className="text-center text-white text-xl">
                      Suivant
                    </Text>
                  </TouchableOpacity>
                </View>


              </View>
            )}

            {/*

           {etape === 3 && (
              <View>
                <Text className='text-white text-4xl mt-5 font-bold italic text-center'>Paiement</Text>
                <View>
                  <Text className='text-white text-2xl italic mt-4'>Mode de paiement</Text>
                  <View className='flex flex-row items-center'>
                    <Image source={require("../../assets/images/Mastercard.png")} style={{ width: 50, height: 40, marginRight: 8 }} />
                    <Image source={require("../../assets/images/Visa.png")} style={{ width: 50, height: 30, marginRight: 8 }} />
                    <Image source={require("../../assets/images/UCB.png")} style={{ width: 40, height: 30, marginRight: 8 }} />
                    <Image source={require("../../assets/images/AmericanExpress.png")} style={{ width: 40, height: 30, marginRight: 8 }} />
                  </View>
                </View>


                <InputText Titre={"Nom du titulaire de la carte"} placeholder={"Votre Nom"} />
                <InputText Titre={"Numéro de la carte"} placeholder={"Votre Numero"} />

                <View className="flex flex-row items-center justify-between">
                  <View className="mt-4" style={{ width: 160 }}>
                    <Text className="text-2xl text-white font-semibold">
                      MMAA
                    </Text>
                    <TextInput
                      className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                      placeholder="01/33"
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View className="mt-4" style={{ width: 160 }}>
                    <Text className="text-2xl text-white font-semibold">
                      CVC
                    </Text>
                    <TextInput
                      className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                      placeholder="123"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                <Text className='text-white text-2xl italic mt-4 border-b-hairline border-b-[#8e8e8e] pb-4'>Adresse de facturation</Text>
                <InputText Titre={"Ligne d'adresse 1"} placeholder={"Votre Email"} />
                <InputText Titre={"Ligne d'adresse 2 (optionnel)"} placeholder={"Votre Numero Telephone"} />
                <InputText Titre={"Ville"} placeholder={"MM/DD/AAAA"} />
                <InputText Titre={"Pays"} placeholder={"MM/DD/AAAA"} />

                <View className="flex flex-row items-center justify-between">
                  <View className="mt-4" style={{ width: 160 }}>
                    <Text className="text-2xl text-white font-semibold">
                      Province
                    </Text>
                    <TextInput
                      className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                      placeholder="01/33"
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View className="mt-4" style={{ width: 160 }}>
                    <Text className="text-2xl text-white font-semibold">
                      Code postal
                    </Text>
                    <TextInput
                      className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                      placeholder="123"
                      placeholderTextColor="#999"
                    />
                  </View>


                </View>

                <View className='flex flex-row items-center justify-between  mr-6 ml-6'>
                  <TouchableOpacity
                    className='bg-[#a12323] p-3 mt-6 rounded-xl'
                    onPress={previousStep}
                    style={{ width: 140 }}
                  >

                    <Text className='text-center text-white text-xl'>Precedent</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className='bg-[#a12323] p-3 mt-6 rounded-xl'
                    onPress={nextStep}
                    style={{ width: 140 }}
                  >

                    <Text className='text-center text-white text-xl'>Suivant</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            */}

            {etape === 3 && (
              <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraHeight={150} 
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 100 }}
              >
                <View>
                  <Text className='text-white text-4xl mt-5 font-bold italic text-center'>Information du destinataire</Text>

                  {selectedCountry && selectedReception !== null && (
                    <View className='flex-1 items-center mt-4'>
                      <Image
                        source={receptionMethods[selectedCountry.name.common][selectedReception].image}
                        style={{ width: 150, height: 150 }}
                        resizeMode="contain"
                      />
                    </View>
                  )}

                  <View className="flex flex-row items-center justify-between">
                    <View className="mt-4" style={{ width: 160 }}>
                      <Text className="text-2xl text-white font-semibold">
                        Prenom
                      </Text>
                      <TextInput
                        className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                        placeholder="Votre Prenom"
                        placeholderTextColor="#999"
                        value={prenom}
                        onChangeText={setPrenom}
                      />
                    </View>

                    <View className="mt-4" style={{ width: 160 }}>
                      <Text className="text-2xl text-white font-semibold">
                        Nom
                      </Text>
                      <TextInput
                        className="bg-[#333333] p-4 text-xl rounded-xl text-white"
                        placeholder="Votre Nom"
                        placeholderTextColor="#999"
                        value={nom}
                        onChangeText={setNom}
                      />
                    </View>
                  </View>

                  <InputText
                    Titre={"Email"}
                    placeholder={"Votre Email"}
                    value={email}
                    onChangeText={setEmail}
                  />

                  <InputText
                    Titre={"Telephone"}
                    placeholder={"Votre Numero Telephone"}
                    value={telephone}
                    onChangeText={setTelephone}
                  />

                  <View className='flex flex-row items-center justify-between mr-6 ml-6'>
                    <TouchableOpacity
                      className='bg-[#a12323] p-3 mt-6 rounded-xl'
                      onPress={previousStep}
                      style={{ width: 140 }}
                    >
                      <Text className='text-center text-white text-xl'>Precedent</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className={`bg-[#a12323] p-3 mt-6 rounded-xl ${!prenom.trim() || !nom.trim() || !email.trim() || !telephone.trim()
                        ? "opacity-50"
                        : ""
                        }`}
                      style={{ width: 140 }}
                      onPress={openModalConfirmation}
                      disabled={!prenom.trim() || !nom.trim() || !email.trim() || !telephone.trim()}
                    >
                      <Text className='text-center text-white text-xl'>Envoyer</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </KeyboardAwareScrollView>

            )}

            <Modal
              isVisible={isModalVisibleConfirmation}
              onBackdropPress={closeModalConfirmation}
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
                <Text className='text-center font-bold text-3xl' style={{ marginBottom: 20 }}>Order Confirmation</Text>
                <Text className='font-bold text-6xl border-b-hairline border-b-[#8e8e8e] mb-9 pb-4 text-center'>$120.00</Text>

                <View className='flex flex-row items-center justify-between mb-3'>
                  <Text className='text-xl'>Prenom</Text>
                  <Text className='text-xl font-bold'>Amadou</Text>
                </View>

                <View className='flex flex-row items-center justify-between mb-3'>
                  <Text className='text-xl'>Nom</Text>
                  <Text className='text-xl font-bold'>Sow</Text>
                </View>

                <View className='flex flex-row items-center justify-between mb-3'>
                  <Text className='text-xl'>Email</Text>
                  <Text className='text-xl font-bold'>amadou.sow@monboreal.ca</Text>
                </View>

                <View className='flex flex-row items-center justify-between mb-3'>
                  <Text className='text-xl'>Numero Telephone</Text>
                  <Text className='text-xl font-bold'>4372981800</Text>
                </View>

                <View className='flex flex-row items-center justify-between mb-3'>
                  <Text className='text-xl'>Montant reçu</Text>
                  <Text className='text-xl font-bold'>3400</Text>
                </View>


                <View className='flex flex-row items-center justify-between  mr-6 ml-6'>
                  <TouchableOpacity
                    className='bg-[#a12323] p-3 mt-6 rounded-xl'
                    onPress={closeModalConfirmation}
                    style={{ width: 140 }}
                  >

                    <Text className='text-center text-white text-xl'>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className='bg-[#a12323] p-3 mt-6 rounded-xl'
                    style={{ width: 140 }}
                    onPress={handlePayment}
                  >


                    <Text className='text-center text-white text-xl'>Confirmer</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>


            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '50%',
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: Dimensions.get('window').height * 0.7,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    fontWeight: '600',
    color: '#2d3436',
  },
  currencyName: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Transfert