import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Modal, 
    FlatList,
    TouchableWithoutFeedback
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { BlurView } from 'expo-blur';
  
  const countryList = [
    { name: { common: 'Canada' }, flag: '🇨🇦', code: '+1' },
    { name: { common: 'Senegal' }, flag: '🇸🇳', code: '+221' },
    { name: { common: 'Mauritania' }, flag: '🇲🇷', code: '+222' },
    { name: { common: 'France' }, flag: '🇫🇷', code: '+33' },
    { name: { common: 'United States' }, flag: '🇺🇸', code: '+1' },
    { name: { common: 'Ghana' }, flag: '🇬🇭', code: '+233' },
    { name: { common: 'Nigeria' }, flag: '🇳🇬', code: '+234' },
    { name: { common: 'Kenya' }, flag: '🇰🇪', code: '+254' },
    { name: { common: 'Ivory Coast' }, flag: '🇨🇮', code: '+225' },
    { name: { common: 'Morocco' }, flag: '🇲🇦', code: '+212' },
    { name: { common: 'Egypt' }, flag: '🇪🇬', code: '+20' },
    { name: { common: 'India' }, flag: '🇮🇳', code: '+91' },
    { name: { common: 'United Kingdom' }, flag: '🇬🇧', code: '+44' },
    { name: { common: 'Turkey' }, flag: '🇹🇷', code: '+90' },
    { name: { common: 'Russia' }, flag: '🇷🇺', code: '+7' },
    { name: { common: 'Brazil' }, flag: '🇧🇷', code: '+55' },
    { name: { common: 'Mexico' }, flag: '🇲🇽', code: '+52' },
    { name: { common: 'Australia' }, flag: '🇦🇺', code: '+61' },
    { name: { common: 'South Africa' }, flag: '🇿🇦', code: '+27' },
    { name: { common: 'Algeria' }, flag: '🇩🇿', code: '+213' },
    { name: { common: 'Tunisia' }, flag: '🇹🇳', code: '+216' },
    { name: { common: 'Guinea' }, flag: '🇬🇳', code: '+224' },
    { name: { common: 'Rwanda' }, flag: '🇷🇼', code: '+250' },
    { name: { common: 'Sierra Leone' }, flag: '🇸🇱', code: '+232' },
    { name: { common: 'Libya' }, flag: '🇱🇾', code: '+218' },
    { name: { common: 'Sudan' }, flag: '🇸🇩', code: '+249' },
    { name: { common: 'DR Congo' }, flag: '🇨🇩', code: '+243' },
    { name: { common: 'Benin' }, flag: '🇧🇯', code: '+229' },
    { name: { common: 'Burkina Faso' }, flag: '🇧🇫', code: '+226' },
    { name: { common: 'Mali' }, flag: '🇲🇱', code: '+223' },
    { name: { common: 'Niger' }, flag: '🇳🇪', code: '+227' },
    { name: { common: 'Togo' }, flag: '🇹🇬', code: '+228' },
    { name: { common: 'Chad' }, flag: '🇹🇩', code: '+235' },
    { name: { common: 'Cameroon' }, flag: '🇨🇲', code: '+237' },
    { name: { common: 'Gabon' }, flag: '🇬🇦', code: '+241' },
    { name: { common: 'Equatorial Guinea' }, flag: '🇬🇶', code: '+240' }
];
  
  const InputText = ({ Titre, placeholder, value, onChangeText, bool = false, keyboardType, isNumber = false }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
    const [searchText, setSearchText] = useState('');
    const [filteredCountries, setFilteredCountries] = useState(countryList);
    const [lastSelectedCountry, setLastSelectedCountry] = useState(countryList[0]);
  
    useEffect(() => {
      if (isNumber && value) {
        const findCountryByCode = () => {
          if (selectedCountry && value.startsWith(selectedCountry.code)) {
            return selectedCountry;
          }
          
          const sortedCountries = [...countryList].sort((a, b) => b.code.length - a.code.length);
          for (const country of sortedCountries) {
            if (value.startsWith(country.code)) {
              return country;
            }
          }
          return lastSelectedCountry || countryList[0];
        };
        
        const country = findCountryByCode();
        setSelectedCountry(country);
        setLastSelectedCountry(country);
        setPhoneNumber(value.replace(country.code, ''));
      }
    }, [value, isNumber]);
  
    useEffect(() => {
      const filtered = countryList.filter(country => 
        country.name.common.toLowerCase().includes(searchText.toLowerCase()) ||
        country.code.includes(searchText)
      );
      setFilteredCountries(filtered);
    }, [searchText]);
  
    const handleCountrySelect = (country) => {
      setSelectedCountry(country);
      setLastSelectedCountry(country);
      setModalVisible(false);
      onChangeText(country.code + phoneNumber);
      setSearchText('');
    };
  
    const handleNumberChange = (number) => {
      setPhoneNumber(number);
      onChangeText(selectedCountry.code + number);
    };
  
    const handleModalClose = () => {
      setModalVisible(false);
      setSearchText('');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{Titre}</Text>
        
        {isNumber ? (
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity 
              style={styles.countrySelector}
              onPress={() => {
                setModalVisible(true);
                setFilteredCountries(countryList);
              }}
            >
              <Text style={styles.flag}>{selectedCountry.flag}</Text>
              <Text style={styles.code}>{selectedCountry.code}</Text>
            </TouchableOpacity>
            
            <TextInput
              style={styles.phoneInput}
              placeholder={placeholder}
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={handleNumberChange}
              keyboardType="phone-pad"
            />
          </View>
        ) : (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#999"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={bool}
            keyboardType={keyboardType}
          />
        )}
  
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={styles.modalOverlay}>
              <BlurView
                style={StyleSheet.absoluteFill}
                intensity={30}
                tint="dark"
              />
              
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.searchContainer}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Rechercher un pays..."
                      placeholderTextColor="#999"
                      value={searchText}
                      onChangeText={setSearchText}
                      autoFocus={true}
                    />
                  </View>
                  
                  <FlatList
                    data={filteredCountries}
                    keyExtractor={(item) => item.name.common + item.code}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.countryItem}
                        onPress={() => handleCountrySelect(item)}
                      >
                        <Text style={styles.itemFlag}>{item.flag}</Text>
                        <Text style={styles.itemName}>{item.name.common}</Text>
                        <Text style={styles.itemCode}>{item.code}</Text>
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                      <Text style={styles.emptyText}>Aucun pays trouvé</Text>
                    }
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
    },
    title: {
      fontSize: 24,
      color: 'white',
      fontWeight: '600',
      marginBottom: 8,
    },
    input: {
      backgroundColor: '#333333',
      padding: 16,
      fontSize: 20,
      borderRadius: 12,
      color: 'white',
    },
    phoneInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#333333',
      borderRadius: 12,
    },
    countrySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRightWidth: 1,
      borderRightColor: '#555555',
    },
    flag: {
      color: 'white',
      fontSize: 20,
      marginRight: 8,
    },
    code: {
      color: 'white',
      fontSize: 20,
    },
    phoneInput: {
      flex: 1,
      padding: 16,
      fontSize: 20,
      color: 'white',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
    },
    modalContent: {
      marginHorizontal: 24,
      backgroundColor: '#333333',
      borderRadius: 12,
      maxHeight: '80%',
      overflow: 'hidden',
    },
    searchContainer: {
      padding: 16,
      backgroundColor: '#444444',
    },
    searchInput: {
      backgroundColor: '#555555',
      borderRadius: 8,
      padding: 12,
      color: 'white',
    },
    countryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#555555',
    },
    itemFlag: {
      fontSize: 24,
      marginRight: 16,
    },
    itemName: {
      flex: 1,
      fontSize: 20,
      color: 'white',
    },
    itemCode: {
      fontSize: 20,
      color: '#999999',
    },
    emptyText: {
      color: 'white',
      textAlign: 'center',
      padding: 24,
      fontSize: 18,
    },
  });
  
  export default InputText;