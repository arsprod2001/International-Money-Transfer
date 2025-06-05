import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';

const months = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12'
];

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

const DateInput = ({ Titre, value, onChange }) => {
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: ''
  });
  
  const [modalVisible, setModalVisible] = useState(false);
  const [activePicker, setActivePicker] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split('/');
      setDate({
        year,
        month,
        day
      });
    }
  }, [value]);

  useEffect(() => {
    if (date.month && date.year) {
      const monthNum = parseInt(date.month);
      const yearNum = parseInt(date.year);
      const daysInMonth = getDaysInMonth(monthNum, yearNum);
      
      const newDays = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));
      setAvailableDays(newDays);
      
      if (date.day && parseInt(date.day) > daysInMonth) {
        setDate(prev => ({
          ...prev,
          day: daysInMonth.toString().padStart(2, '0')
        }));
      }
    } else {
      setAvailableDays([]);
    }
  }, [date.month, date.year]);

  useEffect(() => {
    if (date.year && date.month && date.day) {
      const monthNum = parseInt(date.month);
      const yearNum = parseInt(date.year);
      const daysInMonth = getDaysInMonth(monthNum, yearNum);
      
      if (parseInt(date.day) > daysInMonth) {
        Alert.alert('Date invalide', 'Le jour sélectionné est invalide pour ce mois');
        return;
      }

      const formattedDay = date.day.padStart(2, '0');
      const formattedMonth = date.month.padStart(2, '0');
      onChange(`${date.year}/${formattedMonth}/${formattedDay}`);
    }
  }, [date]);

  const handleSelect = (type, item) => {
    const newDate = {
      ...date,
      [type]: item
    };
    
    if ((type === 'month' || type === 'year') && newDate.day) {
      const monthNum = parseInt(newDate.month);
      const yearNum = parseInt(newDate.year);
      const daysInMonth = getDaysInMonth(monthNum, yearNum);
      
      if (parseInt(newDate.day) > daysInMonth) {
        newDate.day = daysInMonth.toString().padStart(2, '0');
      }
    }
    
    setDate(newDate);
    setModalVisible(false);
  };

  const renderPicker = () => {
    let data = [];
    switch (activePicker) {
      case 'day': data = availableDays; break;
      case 'month': data = months; break;
      case 'year': data = years; break;
      default: data = [];
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pickerItem}
            onPress={() => handleSelect(activePicker, item)}
          >
            <Text style={styles.pickerItemText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.pickerList}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Titre}</Text>
      
      <View style={styles.dateContainer}>
        {/* Année */}
        <TouchableOpacity 
          style={styles.datePart}
          onPress={() => {
            setActivePicker('year');
            setModalVisible(true);
          }}
        >
          <Text style={date.year ? styles.dateText : styles.placeholderText}>
            {date.year || 'AAAA'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.separator}>/</Text>
        
        {/* Mois */}
        <TouchableOpacity 
          style={styles.datePart}
          onPress={() => {
            setActivePicker('month');
            setModalVisible(true);
          }}
        >
          <Text style={date.month ? styles.dateText : styles.placeholderText}>
            {date.month || 'MM'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.separator}>/</Text>
        
        <TouchableOpacity 
          style={styles.datePart}
          onPress={() => {
            if (!date.month || !date.year) {
              Alert.alert('Sélectionnez d\'abord le mois et l\'année');
              return;
            }
            setActivePicker('day');
            setModalVisible(true);
          }}
        >
          <Text style={date.day ? styles.dateText : styles.placeholderText}>
            {date.day || 'JJ'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal de sélection */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <BlurView 
              style={StyleSheet.absoluteFill} 
              intensity={30} 
              tint="dark" 
            />
            
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.pickerHeader}>
                  <Text style={styles.pickerTitle}>
                    {activePicker === 'day' ? 'Jour' : 
                     activePicker === 'month' ? 'Mois' : 'Année'}
                  </Text>
                </View>
                {renderPicker()}
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  datePart: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dateText: {
    color: 'white',
    fontSize: 20,
  },
  placeholderText: {
    color: '#999',
    fontSize: 20,
  },
  separator: {
    color: '#666',
    fontSize: 20,
    marginHorizontal: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    marginHorizontal: 24,
    backgroundColor: '#333333',
    borderRadius: 12,
    maxHeight: '60%',
    overflow: 'hidden',
  },
  pickerHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  pickerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  pickerList: {
    paddingBottom: 16,
  },
  pickerItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  pickerItemText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DateInput;