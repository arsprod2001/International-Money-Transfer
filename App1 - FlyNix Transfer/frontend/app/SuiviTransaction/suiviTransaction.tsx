import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation, router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';


const SuiviTransaction = () => {

  const [steps, setSteps] = useState([
    { id: 1, title: 'Envoyé', completed: true, date: '2023-10-01 10:00', details: 'Montant : 100€, Destinataire : Jean Dupont', showDetails: false },
    { id: 2, title: 'Recherche d\'intermédiaire', completed: true, date: '2023-10-01 12:30', details: 'Intermediaire : Société XYZ', showDetails: false },
    { id: 3, title: 'Intermédiaire trouvé', completed: true, date: '2023-10-01 14:15', details: 'Contact : contact@xyz.com', showDetails: false },
    { id: 4, title: 'Intermédiaire a envoyé l\'argent', completed: false, date: null, details: 'En attente de confirmation', showDetails: false },
    { id: 5, title: 'Destinataire final reçu', completed: false, date: null, details: 'En attente de confirmation', showDetails: false },
  ]);

  const toggleDetails = (stepId) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, showDetails: !step.showDetails } : step
      )
    );
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            <Text className='text-white text-4xl mt-5 font-bold italic mb-11'>Suivi de Transaction</Text>
            <Text className='text-sky-500 font-bold text-6xl mt-5 border-b-hairline border-b-[#8e8e8e] mb-9 pb-4 text-center'>$120.00</Text>

            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Envoyer à</Text>
              <Text className='text-white text-xl font-bold'>Maimouna Diallo</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Moyenne de reception</Text>
              <Text className='text-white text-xl font-bold'>Wave</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>No References</Text>
              <Text className='text-white text-xl font-bold'>12398358025384</Text>
            </View>

            <Text className='border-b-hairline border-b-[#8e8e8e] mb-9 pb-4 text-center'></Text>


            {steps.map((step, index) => (
              <View key={step.id}>
                <TouchableOpacity onPress={() => toggleDetails(step.id)}>
                  <View style={styles.stepContainer}>
                    <View style={styles.stepIndicator}>
                      {step.completed ? (
                        <Icon name="check" size={20} color="green" />
                      ) : (
                        <Text className='font-bold'>{index + 1}</Text>
                      )}
                    </View>
                    <View style={styles.stepTextContainer}>
                      <Text className='text-white '>{step.title}</Text>
                      {step.date && <Text className='text-[#888]'>{step.date}</Text>}
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Affichage des détails */}
                {step.showDetails && (
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>{step.details}</Text>
                  </View>
                )}

                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.verticalLine,
                      { backgroundColor: step.completed ? 'green' : '#e0e0e0' },
                    ]}
                  />
                )}
              </View>
            ))}

          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumber: {
    fontSize: 16,
    color: '#000',
  },
  stepTextContainer: {
    flex: 1,
  },

  verticalLine: {
    width: 2,
    height: 20,
    marginLeft: 14,
    marginBottom: 10,
  },
  detailsContainer: {
    marginLeft: 40,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  detailsText: {
    fontSize: 14,
    color: '#333',
  },
});


export default SuiviTransaction