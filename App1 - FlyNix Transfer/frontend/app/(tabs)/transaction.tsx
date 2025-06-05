import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { authService } from '@/services/api';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
    'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  monthNamesShort: [
    'Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'
  ],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';



const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [originalTransactions, setOriginalTransactions] = useState([]);
  const [availableMethods, setAvailableMethods] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });



  const formatStatus = (status) => {
    const statusMap = {
      'completed': 'Complété',
      'in_progress': 'En cours',
      'waiting_intermediary': 'En attente'
    };
    return statusMap[status] || status.replace('_', ' ');
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };



  const handleDateChange = (event, selectedDate, type) => {
    setShowDatePicker(null);
    if (selectedDate) {
      if (type === 'start') {
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
      applyFilters(); 
    }
  };



  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await authService.getTransaction();
        const data = response.data.data;
        const sorted = data.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
        const methods = [...new Set(data.map(item => item.methode_reception))];

        setTransaction(sorted);
        setOriginalTransactions(sorted);
        setAvailableMethods(methods);
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions:", error);
        Alert.alert("Erreur", error.message);
      }
    };

    fetchTransaction();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    applyFilters(text, selectedMethods);
  };

  const toggleMethodFilter = (method) => {
    const newMethods = selectedMethods.includes(method)
      ? selectedMethods.filter(m => m !== method)
      : [...selectedMethods, method];

    setSelectedMethods(newMethods);
    applyFilters(searchQuery, newMethods, selectedStatus); 
  };

  const toggleStatusFilter = (status) => {
    setSelectedStatus(prev => {
      const newStatuses = prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status];
      applyFilters(searchQuery, selectedMethods, newStatuses); 
      return newStatuses;
    });
  };

  const DatePickerModal = ({ visible, onClose, onConfirm }) => {
    const [selectedDates, setSelectedDates] = useState({});
    const [startDate, setStartDate] = useState(dateRange.start || '');
    const [endDate, setEndDate] = useState(dateRange.end || '');

    const handleDayPress = (day) => {
      if (!startDate) {
        setStartDate(day.dateString);
        setSelectedDates({
          [day.dateString]: { startingDay: true, color: '#ffa800', textColor: 'white' }
        });
      } else {
        const end = day.dateString;
        let finalStart = startDate;
        let finalEnd = end;

        if (new Date(finalStart) > new Date(finalEnd)) {
          [finalStart, finalEnd] = [finalEnd, finalStart];
          setStartDate(finalStart);
          setEndDate(finalEnd);
        } else {
          setEndDate(finalEnd);
        }

        const range = getDateRange(finalStart, finalEnd);
        setSelectedDates(range);
      }
    };

    const getDateRange = (start, end) => {
      const range = {};
      const startDate = new Date(start);
      const endDate = new Date(end);
      const today = new Date();

      const finalEnd = end || today.toISOString().split('T')[0];

      for (let d = new Date(startDate); d <= new Date(finalEnd); d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().split('T')[0];
        range[date] = {
          color: '#ffa800',
          textColor: 'white',
          ...(date === start && { startingDay: true }),
          ...(date === finalEnd && { endingDay: true })
        };
      }
      return range;
    };

    const handleValidate = () => {
      let finalEnd = endDate;
      if (startDate && !endDate) {
        finalEnd = new Date().toISOString().split('T')[0]; 
      }
      onConfirm(startDate, finalEnd);
    };

    return (
      <Modal visible={visible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-[#2a2a2a] rounded-2xl p-4 w-11/12">
            <View className="flex-row justify-between mb-4">
              <Text className="text-white text-lg font-bold">Sélection de période</Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-[#ffa800] text-lg">×</Text>
              </TouchableOpacity>
            </View>

            <Calendar
              minDate={'2023-01-01'}
              maxDate={new Date()}
              onDayPress={handleDayPress}
              markingType={'period'}
              markedDates={selectedDates}
              theme={{
                backgroundColor: '#2a2a2a',
                calendarBackground: '#2a2a2a',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#ffa800',
                selectedDayTextColor: '#fff',
                todayTextColor: '#ffa800',
                dayTextColor: '#fff',
                textDisabledColor: '#555',
                arrowColor: '#ffa800',
                monthTextColor: '#fff',
                indicatorColor: '#ffa800',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '500'
              }}
            />

            <View className="flex-row gap-2 mt-4">
              <TouchableOpacity
                className="flex-1 bg-[#3a3a3a] p-3 rounded-lg"
                onPress={() => {
                  setSelectedDates({});
                  setStartDate('');
                  setEndDate('');
                }}
              >
                <Text className="text-white text-center">Effacer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-[#ffa800] p-3 rounded-lg"
                onPress={() => onConfirm(startDate, endDate)}
              >
                <Text className="text-black text-center">Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };



  const applyFilters = (
    searchText = searchQuery,
    methods = selectedMethods,
    statuses = selectedStatus,
    dateStart = dateRange.start,
    dateEnd = dateRange.end
  ) => {
    let filtered = [...originalTransactions];

    // Filtre par texte
    if (searchText) {
      filtered = filtered.filter(item =>
        item.destinataire.toLowerCase().includes(searchText.toLowerCase()) ||
        item.methode_reception.toLowerCase().includes(searchText.toLowerCase()) ||
        item.pays_destinataire.toLowerCase().includes(searchText.toLowerCase()) ||
        item.montant_envoye.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtre par méthode
    if (methods.length > 0) {
      filtered = filtered.filter(item => methods.includes(item.methode_reception));
    }

    // Filtre par statut
    if (statuses.length > 0) {
      filtered = filtered.filter(item => statuses.includes(item.status));
    }

    if (dateStart || dateEnd) {
      filtered = filtered.filter(item => {
        const transactionDate = new Date(item.date_creation);
        const start = dateStart ? new Date(dateStart) : null;
        const end = dateEnd ? new Date(dateEnd) : null;

        if (start) start.setHours(0, 0, 0, 0);
        if (end) end.setHours(23, 59, 59, 999);

        if (start && end) {
          return transactionDate >= start && transactionDate <= end;
        }
        if (start) {
          return transactionDate >= start;
        }
        if (end) {
          return transactionDate <= end;
        }
        return true;
      });
    }


    setTransaction(filtered);
  };


  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMethods([]);
    setSelectedStatus([]);
    setDateRange({ start: null, end: null }); 
    setTransaction(originalTransactions);
    setIsFilterModalVisible(false);
  };

  const RecentActivitie = ({ transaction, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View className='flex flex-row items-center justify-between mt-2'>
        <View className='flex flex-row items-center'>
          <Image
            source={{ uri: transaction.drapeau_pays }}
            className="w-14 h-14 rounded-full"
          />
          <View>
            <Text className='text-white'>{transaction.destinataire} / {transaction.pays_destinataire}</Text>
            <Text className='text-white font-bold italic'>{formatDate(transaction.date_creation)}</Text>
            <View className="flex-row items-center mt-1">
              <Text
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor:
                    transaction.status === 'completed' ? '#22c55e20' :
                      transaction.status === 'in_progress' ? '#f59e0b20' : '#ef444420',
                  color:
                    transaction.status === 'completed' ? '#22c55e' :
                      transaction.status === 'in_progress' ? '#f59e0b' : '#ef4444'
                }}
              >
                {formatStatus(transaction.status)}
              </Text>
            </View>
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
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, fontWeight: 'bold' }}>
              Transaction
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#333333',
                padding: 16,
                borderRadius: 12,
                marginTop: 24,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Image
                  source={require('../../assets/images/searchs.png')}
                  style={{ width: 25, height: 25, marginRight: 10 }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 18,
                    color: 'white',
                    minWidth: 100,
                  }}
                  placeholder="Rechercher une transaction"
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
              </View>

              {/*Button filtre*/}
              <TouchableOpacity
                onPress={() => setIsFilterModalVisible(true)}
              >
                <Image
                  source={require('../../assets/images/panel.png')}
                  style={{ width: 25, height: 25, marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>

            {transaction.map((item) => (
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

            {/* Modal de filtrage */}
            <Modal
              visible={isFilterModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setIsFilterModalVisible(false)}
            >
              <View className="flex-1 justify-end bg-black/50">
                <View className="bg-[#2a2a2a] p-6 rounded-t-3xl max-h-[80%]">
                  <Text className="text-white text-xl font-bold mb-6">Filtres</Text>

                  <ScrollView>
                    {/* Section Méthodes */}
                    <View className="mb-6">
                      <Text className="text-gray-400 text-sm mb-3">Méthodes</Text>
                      <View className="flex-row flex-wrap gap-2">
                        {availableMethods.map((method) => (
                          <TouchableOpacity
                            key={method}
                            onPress={() => toggleMethodFilter(method)}
                            className={`px-4 py-2 rounded-full ${selectedMethods.includes(method)
                              ? 'bg-[#ffa800]'
                              : 'bg-[#3a3a3a]'
                              }`}
                          >
                            <Text className={`${selectedMethods.includes(method)
                              ? 'text-black'
                              : 'text-white'
                              }`}>
                              {method}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    {/* Section Statut */}
                    <View className="mb-6">
                      <Text className="text-gray-400 text-sm mb-3">Statut</Text>
                      <View className="flex-row flex-wrap gap-2">
                        {['completed', 'in_progress', 'waiting_intermediary'].map(status => (
                          <TouchableOpacity
                            key={status}
                            onPress={() => toggleStatusFilter(status)}
                            className={`px-4 py-2 rounded-full ${selectedStatus.includes(status)
                              ? 'bg-[#ffa800]'
                              : 'bg-[#3a3a3a]'
                              }`}
                          >
                            <Text className={`${selectedStatus.includes(status)
                              ? 'text-black'
                              : 'text-white'
                              }`}>
                              {formatStatus(status)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>


                    <View className="mb-6">
                      <Text className="text-gray-400 text-sm mb-3">Période</Text>
                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          className="bg-[#3a3a3a] p-3 rounded-lg"
                          onPress={() => {
                            setIsFilterModalVisible(false);
                            setDateModalVisible(true);
                          }}
                        >
                          <Text className="text-white text-center">
                            {dateRange.start || dateRange.end
                              ? `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`
                              : 'Sélectionner une période'}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {(dateRange.start || dateRange.end) && (
                        <Text className="text-gray-400 text-xs mt-2">
                          Période sélectionnée : {dateRange.start ? formatDate(dateRange.start) : 'Début'} - {dateRange.end ? formatDate(dateRange.end) : 'Fin'}
                        </Text>
                      )}
                    </View>
                  </ScrollView>
                  <View className="flex-row gap-3 pt-4">
                    <TouchableOpacity
                      onPress={resetFilters}
                      className="flex-1 bg-[#3a3a3a] p-3 rounded-lg"
                    >
                      <Text className="text-white text-center">Réinitialiser</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setIsFilterModalVisible(false)}
                      className="flex-1 bg-[#ffa800] p-3 rounded-lg"
                    >
                      <Text className="text-black text-center">Appliquer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>


          </View>
        </ScrollView>

      </SafeAreaView>

      <DatePickerModal
        visible={dateModalVisible}
        onClose={() => setDateModalVisible(false)}
        onConfirm={(start, end) => {
          const finalEnd = end || new Date().toISOString().split('T')[0];
          const newStart = start || null;
          const newEnd = finalEnd || null;

          setDateRange({
            start: newStart,
            end: newEnd
          });

          applyFilters(searchQuery, selectedMethods, selectedStatus, newStart, newEnd);
          setDateModalVisible(false);
        }}
      />
    </SafeAreaProvider>
  );
};

export default Transaction;