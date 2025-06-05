import { View, Text, SafeAreaView, FlatList, Image, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useNavigation, router } from 'expo-router';
import { authService } from "../../services/api";



const ALPHA_VANTAGE_API_KEY = '293DG6OEUGLB8226';

const countryList = [
  { name: { common: 'France' }, cca2: 'FR', cca3: 'FRA', flag: '🇫🇷', currencies: { EUR: { name: 'Euro', symbol: '€' } } },
  { name: { common: 'United States' }, cca2: 'US', cca3: 'USA', flag: '🇺🇸', currencies: { USD: { name: 'United States Dollar', symbol: '$' } } },
  { name: { common: 'Canada' }, cca2: 'CA', cca3: 'CAN', flag: '🇨🇦', currencies: { CAD: { name: 'Canadian Dollar', symbol: '$' } } },
  { name: { common: 'Germany' }, cca2: 'DE', cca3: 'DEU', flag: '🇩🇪', currencies: { EUR: { name: 'Euro', symbol: '€' } } },
  { name: { common: 'Spain' }, cca2: 'ES', cca3: 'ESP', flag: '🇪🇸', currencies: { EUR: { name: 'Euro', symbol: '€' } } },
  { name: { common: 'Italy' }, cca2: 'IT', cca3: 'ITA', flag: '🇮🇹', currencies: { EUR: { name: 'Euro', symbol: '€' } } },
  { name: { common: 'Japan' }, cca2: 'JP', cca3: 'JPN', flag: '🇯🇵', currencies: { JPY: { name: 'Japanese Yen', symbol: '¥' } } },
  { name: { common: 'India' }, cca2: 'IN', cca3: 'IND', flag: '🇮🇳', currencies: { INR: { name: 'Indian Rupee', symbol: '₹' } } },
  { name: { common: 'China' }, cca2: 'CN', cca3: 'CHN', flag: '🇨🇳', currencies: { CNY: { name: 'Chinese Yuan', symbol: '¥' } } },
  { name: { common: 'Philippines' }, cca2: 'PH', cca3: 'PHL', flag: '🇵🇭', currencies: { PHP: { name: 'Philippine Peso', symbol: '₱' } } },
  { name: { common: 'Nigeria' }, cca2: 'NG', cca3: 'NGA', flag: '🇳🇬', currencies: { NGN: { name: 'Nigerian Naira', symbol: '₦' } } },
  { name: { common: 'Pakistan' }, cca2: 'PK', cca3: 'PAK', flag: '🇵🇰', currencies: { PKR: { name: 'Pakistani Rupee', symbol: '₨' } } },
  { name: { common: 'Iran' }, cca2: 'IR', cca3: 'IRN', flag: '🇮🇷', currencies: { IRR: { name: 'Iranian Rial', symbol: '﷼' } } },
  { name: { common: 'Syria' }, cca2: 'SY', cca3: 'SYR', flag: '🇸🇾', currencies: { SYP: { name: 'Syrian Pound', symbol: '£' } } },
  { name: { common: 'United Kingdom' }, cca2: 'GB', cca3: 'GBR', flag: '🇬🇧', currencies: { GBP: { name: 'British Pound', symbol: '£' } } },
  { name: { common: 'Afghanistan' }, cca2: 'AF', cca3: 'AFG', flag: '🇦🇫', currencies: { AFN: { name: 'Afghan Afghani', symbol: '؋' } } },
  { name: { common: 'Vietnam' }, cca2: 'VN', cca3: 'VNM', flag: '🇻🇳', currencies: { VND: { name: 'Vietnamese Dong', symbol: '₫' } } },
  { name: { common: 'Mexico' }, cca2: 'MX', cca3: 'MEX', flag: '🇲🇽', currencies: { MXN: { name: 'Mexican Peso', symbol: '$' } } },
  { name: { common: 'Bangladesh' }, cca2: 'BD', cca3: 'BGD', flag: '🇧🇩', currencies: { BDT: { name: 'Bangladeshi Taka', symbol: '৳' } } },
  { name: { common: 'Egypt' }, cca2: 'EG', cca3: 'EGY', flag: '🇪🇬', currencies: { EGP: { name: 'Egyptian Pound', symbol: '£' } } },
  { name: { common: 'Colombia' }, cca2: 'CO', cca3: 'COL', flag: '🇨🇴', currencies: { COP: { name: 'Colombian Peso', symbol: '$' } } },
  { name: { common: 'South Korea' }, cca2: 'KR', cca3: 'KOR', flag: '🇰🇷', currencies: { KRW: { name: 'South Korean Won', symbol: '₩' } } },
  { name: { common: 'Jamaica' }, cca2: 'JM', cca3: 'JAM', flag: '🇯🇲', currencies: { JMD: { name: 'Jamaican Dollar', symbol: '$' } } },
  { name: { common: 'Sri Lanka' }, cca2: 'LK', cca3: 'LKA', flag: '🇱🇰', currencies: { LKR: { name: 'Sri Lankan Rupee', symbol: '₨' } } },
  { name: { common: 'Lebanon' }, cca2: 'LB', cca3: 'LBN', flag: '🇱🇧', currencies: { LBP: { name: 'Lebanese Pound', symbol: '£' } } },
  { name: { common: 'Morocco' }, cca2: 'MA', cca3: 'MAR', flag: '🇲🇦', currencies: { MAD: { name: 'Moroccan Dirham', symbol: 'د.م.' } } },
  { name: { common: 'Algeria' }, cca2: 'DZ', cca3: 'DZA', flag: '🇩🇿', currencies: { DZD: { name: 'Algerian Dinar', symbol: 'د.ج' } } },
  { name: { common: 'Congo' }, cca2: 'CG', cca3: 'COG', flag: '🇨🇬', currencies: { XAF: { name: 'Central African CFA Franc', symbol: 'Fr' } } },
  { name: { common: 'Cameroon' }, cca2: 'CM', cca3: 'CMR', flag: '🇨🇲', currencies: { XAF: { name: 'Central African CFA Franc', symbol: 'Fr' } } },
  { name: { common: 'Haiti' }, cca2: 'HT', cca3: 'HTI', flag: '🇭🇹', currencies: { HTG: { name: 'Haitian Gourde', symbol: 'G' } } },
  { name: { common: 'Tunisia' }, cca2: 'TN', cca3: 'TUN', flag: '🇹🇳', currencies: { TND: { name: 'Tunisian Dinar', symbol: 'د.ت' } } },
  { name: { common: 'Ivory Coast' }, cca2: 'CI', cca3: 'CIV', flag: '🇨🇮', currencies: { XOF: { name: 'West African CFA Franc', symbol: 'Fr' } } },
  { name: { common: 'Mauritania' }, cca2: 'MR', cca3: 'MRT', flag: '🇲🇷', currencies: { MRU: { name: 'Mauritanian Ouguiya', symbol: 'UM' } } },
  { name: { common: 'Senegal' }, cca2: 'SN', cca3: 'SEN', flag: '🇸🇳', currencies: { XOF: { name: 'West African CFA Franc', symbol: 'Fr' } } },
];

const Home = () => {

  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isFromModalVisible, setIsFromModalVisible] = useState(false);
  const [isToModalVisible, setIsToModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countryList);
  const [user, setUser] = useState({});
  const [transaction, setTransaction] = useState([]);


  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authService.getProfile();
        // Les informations de l'utilisateur se trouvent dans response.data.data
        setUser(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur:", error);
        Alert.alert("Erreur", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);


  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await authService.getTransaction();
        const data = response.data.data;

        // Tri décroissant par date_creation
        const sorted = data.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));

        setTransaction(sorted);
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions:", error);
        Alert.alert("Erreur", error.message);
      }
    };

    fetchTransaction();
  }, []);

  // Chargement des devises
  useEffect(() => {
    const currencyMap = new Map();

    countryList.forEach(country => {
      if (country.currencies) {
        Object.entries(country.currencies).forEach(([code, details]) => {
          if (!currencyMap.has(code)) {
            currencyMap.set(code, {
              code,
              name: details.name,
              symbol: details.symbol || '¤',
              flag: country.flag,
              countries: [country.name.common]
            });
          } else {
            currencyMap.get(code).countries.push(country.name.common);
          }
        });
      }
    });

    const sortedCurrencies = Array.from(currencyMap.values()).sort((a, b) => a.code.localeCompare(b.code));
    setCurrencies(sortedCurrencies);
    setFromCurrency(sortedCurrencies.find(c => c.code === 'USD'));
    setToCurrency(sortedCurrencies.find(c => c.code === 'EUR'));
    setIsLoading(false);
  }, []);

  {/*
    
    */}
  // Filtrage des devises
  useEffect(() => {
    const filter = searchQuery.toLowerCase().trim();

    const filtered = currencies.filter(currency =>
      currency.code.toLowerCase().includes(filter) ||
      currency.name.toLowerCase().includes(filter) ||
      currency.countries.some(country => country.toLowerCase().includes(filter))
    );

    setFilteredCountries(filtered.length > 0 ? filtered : currencies);
  }, [searchQuery, currencies]);

  // Récupération des données historiques
  const fetchHistoricalData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency?.code}&to_symbol=${toCurrency?.code}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );

      if (response.data['Error Message'] || !response.data['Time Series FX (Daily)']) {
        throw new Error(response.data['Error Message'] || 'Données non disponibles');
      }

      const rawData = response.data['Time Series FX (Daily)'];
      const formattedData = Object.entries(rawData)
        .slice(0, 7)
        .map(([date, values]) => ({
          date,
          rate: parseFloat(values['4. close']),
        }))
        .reverse();

        

      setHistoricalData(formattedData);
    } catch (err) {
      setError(err.message.includes('5 calls per minute')
        ? 'Limite API atteinte - Réessayez plus tard'
        : err.message);
    }
  }, [fromCurrency, toCurrency]);

  // Récupération du taux actuel
  const fetchLiveRate = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency?.code}&to_currency=${toCurrency?.code}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const rate = response.data['Realtime Currency Exchange Rate']?.['5. Exchange Rate'];
      setExchangeRate(rate ? parseFloat(rate) : null);
    } catch (err) {
      setError(err.message);
    }
  }, [fromCurrency, toCurrency]);

  // Gestion des mises à jour
  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    const debounceTimer = setTimeout(() => {
      Promise.all([fetchLiveRate(), fetchHistoricalData()]);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [fromCurrency, toCurrency, fetchLiveRate, fetchHistoricalData]);

  const convertCurrency = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Erreur', 'Veuillez entrer un montant valide');
      return;
    }
    if (!exchangeRate) {
      Alert.alert('Erreur', 'Taux de change non disponible');
      return;
    }
    setConvertedAmount((amount * exchangeRate).toFixed(2));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const renderCurrencyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => {
        isFromModalVisible ? setFromCurrency(item) : setToCurrency(item);
        isFromModalVisible ? setIsFromModalVisible(false) : setIsToModalVisible(false);
      }}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <View style={styles.currencyInfo}>
        <Text style={styles.currencyCoden}>{item.code}</Text>
        <Text style={styles.currencyName}>{item.name}</Text>
        <Text style={styles.countryList}>
          {item.countries.slice(0, 2).join(', ')}
          {item.countries.length > 2 && '...'}
        </Text>
      </View>
      <Text style={styles.currencySymbol}>{item.symbol}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const CurrencySelector = ({ currency, onPress }) => (
    <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between bg-[#333333] pl-[20] pr-[20] rounded-xl'>
      {currency ? (
        <>
          <Text className='text-3xl pr-5'>{currency.flag}</Text>
          <Text className='text-white font-bold'>{currency.code}</Text>
        </>
      ) : (
        <Text >Sélectionner une devise</Text>
      )}
      <Icon name="arrow-drop-down" size={24} color="white" />
    </TouchableOpacity>
  );

  const CurrencyModal = ({ visible, onClose, searchQuery, setSearchQuery, data, renderItem }) => (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
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
          placeholder="Rechercher une devise..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.code}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={20}
        />
      </Animated.View>
    </Modal>
  );

  const RecentActivitie = ({ transaction, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View className='flex flex-row items-center justify-between mt-2'>
        <View className='flex flex-row items-center'>
          <Image
            source={{ uri: transaction.drapeau_pays }}
            className="w-14 h-14 rounded-full"
          />
          <View >
            <Text className='text-white'>Transaction / {transaction.methode_reception}</Text>
            <Text className='text-white font-bold italic'>{transaction.destinataire}</Text>
            <Text className='text-white text'>{new Date(transaction.date_creation).toLocaleDateString()}</Text>
          </View>
        </View>
        <View>
          <Text style={{ color: '#ffa800', fontSize: 20 }} className='font-bold'>${transaction.montant_envoye.split(" ")[0]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View className=' ml-6 mr-6'>
            <View className='flex flex-row items-center justify-between'>
              <View className='flex flex-row items-center gap-[10]'>
                {user.profil_url ? (
                  <Image source={{ uri: user.profil_url }} className="w-14 h-14 rounded-full" />
                ) : (
                  <View className="w-14 h-14 rounded-full bg-gray-500 items-center justify-center">
                    <Text className="text-white font-bold">
                      {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
                    </Text>
                  </View>
                )}
                <View>
                  <Text className=' text-white text-xl'>Welcome Back</Text>
                  <Text className='text-white font-bold italic'>{user.prenom}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => router.push('/parametre/parametre')}>
                <Image source={require('../../assets/images/parametres.png')} className='w-[28] h-[28]'
                />
              </TouchableOpacity>

            </View>

            <Animated.View entering={SlideInDown.duration(500)} className='mt-8 mb-5'>
              <View className='flex flex-row items-center justify-between'>
                <CurrencySelector
                  currency={fromCurrency}
                  onPress={() => setIsFromModalVisible(true)}
                />

                <TouchableOpacity
                  onPress={swapCurrencies}
                >
                  <Image source={require("../../assets/images/swap.png")} className=' w-9 h-9' />
                </TouchableOpacity>

                <CurrencySelector
                  currency={toCurrency}
                  onPress={() => setIsToModalVisible(true)}
                />
              </View>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(400)}>
              <TextInput
                className='bg-[#333333] p-4 text-xl rounded-xl font-bold text-white'
                placeholder="Montant à convertir"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </Animated.View>

            <Animated.View entering={FadeIn.delay(600)}>
              <TouchableOpacity
                className='bg-[#d58c00] p-3 mt-6 rounded-xl'
                onPress={convertCurrency}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className='text-center text-white text-xl'>Convertir</Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            {convertedAmount && (
              <Animated.Text
                style={styles.result}
                entering={FadeIn}
                exiting={FadeOut}
              >
                {amount} {fromCurrency.code} ={'\n'}
                <Text style={styles.convertedAmount}>
                  {convertedAmount} {toCurrency.code}
                </Text>
              </Animated.Text>
            )}

            {historicalData.length > 0 && (
              <Animated.View entering={FadeIn.delay(800)}>
                <LineChart
                  data={{
                    labels: historicalData.map((_, i) => `J-${7 - i}`),
                    datasets: [{ data: historicalData.map(d => d.rate) }]
                  }}
                  width={Dimensions.get('window').width - 40}
                  height={220}
                  chartConfig={{
                    backgroundColor: '#1f1f1f',
                    backgroundGradientFrom: '#1f1f1f',
                    backgroundGradientTo: '#1f1f1f',
                    decimalPlaces: 2,
                    color: () => '#ffa800',
                    labelColor: () => 'white',
                    propsForDots: { r: 4, strokeWidth: 2, stroke: '#ffa800' }
                  }}
                  bezier
                />
              </Animated.View>
            )}

            {error && (
              <Animated.View entering={FadeIn} style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={() => {
                    setError(null);
                    fetchHistoricalData();
                    fetchLiveRate();
                  }}
                >
                  <Text style={styles.retryText}>Réessayer</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            <CurrencyModal
              visible={isFromModalVisible}
              onClose={() => setIsFromModalVisible(false)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              data={filteredCountries}
              renderItem={renderCurrencyItem}
            />

            <CurrencyModal
              visible={isToModalVisible}
              onClose={() => setIsToModalVisible(false)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              data={filteredCountries}
              renderItem={renderCurrencyItem}
            />

            <View>
              <Text style={{ fontSize: 20, color: 'white' }}>Derniere Transaction</Text>
              <Text className='font-bold text-white' style={{ fontSize: 55 }}>${transaction[0]?.montant_envoye.split(" ")[0]}</Text>

            </View>



            <View>
              <View className='flex flex-row items-center justify-between'>
                <Text style={{ fontSize: 20, color: 'white' }}>Activité Recente</Text>
                <TouchableOpacity onPress={() => navigation.navigate('transaction')}>
                  <Text style={{ fontSize: 20, color: 'white' }} className='font-bold'>View All</Text>
                </TouchableOpacity>
              </View>

              {/*<Text className='text-center' style = {{color : '#4c4c4c', fontSize : 100, paddingTop :10}}>Empty</Text>*/}
              {transaction.slice(0, 4).map((item) => (
                <RecentActivitie
                  key={item.id.toString()}
                  transaction={item}
                  onPress={() =>
                    router.push({
                      pathname: '/transactions/transactionDetails',
                      params: {
                        transaction: JSON.stringify(item),
                      },
                    })
                  }
                />
              ))}

              {/*
              <RecentActivitie
                drapeau={require('../../assets/images/fr.png')}
                MoyenPaiement={'Wave'}
                Nom={'Justin Haley'}
                Date={'9-Décembre-2025'}
                Montant={'$300,18'}
                onPress={() => router.push('/transactions/transactionDetails')}
              />
              <RecentActivitie
                drapeau={require('../../assets/images/fr.png')}
                MoyenPaiement={'OM'}
                Nom={'Mamadou Diallo'}
                Date={'5-Décembre-2025'}
                Montant={'$100,95'}
                onPress={() => router.push('/transactions/transactionDetails')}
              />
              */}

            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1a1a1a',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  swapButton: {
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  convertButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  convertButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  result: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 15,
    color: '#2d3436',
    fontWeight: '600',
    lineHeight: 30,
  },
  convertedAmount: {
    color: '#007AFF',
    fontSize: 24,
    fontWeight: '700',
  },
  chartContainer: {
    borderRadius: 16,
    marginVertical: 15,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  errorContainer: {
    backgroundColor: '#ffe3e3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
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
  countryList: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default Home;