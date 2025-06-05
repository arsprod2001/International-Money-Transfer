import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ErrorModal = ({ 
  visible, 
  onClose,
  iconName = "error-outline",
  iconSize = 48,
  iconColor = "#FF3B30",
  title = "Numéro incorrect ou non enregistré",
  message = "Veuillez réessayez.",
  buttonText = "OK",
  buttonColor = "#FF3B30"
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Icône personnalisable */}
          <View style={styles.iconContainer}>
            <MaterialIcons 
              name={iconName} 
              size={iconSize} 
              color={iconColor} 
            />
          </View>
          
          {/* Titre et message personnalisables */}
          <Text style={[styles.title, { color: iconColor }]}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          {/* Bouton personnalisable */}
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorModal;