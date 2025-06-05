import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  // Nouvelle fonction pour gérer le collage
  const handlePaste = (event) => {
    const pastedText = event.nativeEvent.text;
    if (/^\d+$/.test(pastedText) && pastedText.length === length) {
      const newOtp = pastedText.split('');
      setOtp(newOtp);
      onComplete(newOtp.join(''));
      
      // Focus sur le dernier champ après collage
      inputs.current[length - 1].focus();
    }
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);

    // Passe à la case suivante
    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    // Vérifie si toutes les cases sont remplies
    if (newOtp.every((digit) => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill()
        .map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            ref={(ref) => (inputs.current[index] = ref)}
            onPaste={handlePaste} // Ajout de la gestion du collage
            contextMenuHidden={true} // Cache le menu contextuel
            selectTextOnFocus={true} // Sélectionne le texte quand on focus
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 30
  },
  input: {
    width: 50,
    height: 50,
    color: "white",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OTPInput;