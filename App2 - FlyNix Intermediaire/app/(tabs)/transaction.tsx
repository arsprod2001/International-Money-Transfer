import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';

const TransactionList = ({Date, icon, title, describTitle, montant, onPress}) => (
  <View className='mt-3'>
    <Text className='text-2xl text-white' style = {{marginBottom : 10}}>{Date}</Text>
    <TouchableOpacity className='flex flex-row items-center justify-between' onPress={onPress}>
      <View className='flex flex-row items-center justify-between'>
        <Image style = {{width : 60, height : 60}} source={icon} />
        <View>
          <Text className='font-bold text-white text-xl'>{title}</Text>
          <Text className='text-white'>{describTitle}</Text>
        </View>
      </View>
      <Text className='text-white font-bold text-2xl'>{montant}</Text>
    </TouchableOpacity>
  </View>
);

const Transaction = () => {
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
              {/* Conteneur pour l'icône de recherche et le TextInput */}
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
                    minWidth: 100, // Largeur minimale pour éviter que le TextInput ne disparaisse
                  }}
                  placeholder="Montant à convertir"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Image de droite (panel.png) */}
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/panel.png')}
                  style={{ width: 25, height: 25, marginLeft: 10 }} // Marge à gauche pour l'espace
                />
              </TouchableOpacity>
            </View>


            <TransactionList 
              Date={"Yesterday"}
              icon={require("../../assets/images/wave.png")}
              title={"Transaction"}
              describTitle={"Vous avez effectuez ..."}
              montant={"$500.00"}
              onPress={() => router.push('/transactions/transactionDetails')}
            />
            <TransactionList 
              Date={"Yesterday"}
              icon={require("../../assets/images/deposit.png")}
              title={"Depot"}
              describTitle={"Un depot a été effec..."}
              montant={"$1000.00"}
              onPress={() => router.push('/transactions/transactionDetails')}
            />
            <TransactionList 
              Date={"Yesterday"}
              icon={require("../../assets/images/wave.png")}
              title={"Transaction"}
              describTitle={"Vous avez effectuez ..."}
              montant={"$200.00"}
              onPress={() => router.push('/transactions/transactionDetails')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Transaction

