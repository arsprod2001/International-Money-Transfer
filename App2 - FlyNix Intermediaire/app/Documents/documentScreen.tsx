import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation, router } from 'expo-router';

const Document = ({Logo, Nom, Status}) => (
    <TouchableOpacity className='flex flex-row items-center bg-[#2a2a2a] p-3 rounded-xl mt-8'>
        <Image source={Logo} style={{ width: 40, height: 40, marginRight: 10 }} />
        <View className='flex-1 flex-row items-center justify-between'>
            <Text className='text-white font-bold text-xl '>{Nom}</Text>
            <View
            >
              <Image source={Status} style={{ width: 30, height: 30}} />
            </View>
        </View>
    </TouchableOpacity>
);

const DocumentScreen = () => {


  return (
    <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            <Text className='text-white text-3xl mt-5 font-bold italic '>Verification Documents</Text>
            <Document Logo={require("../../assets/images/ID.png")} Nom={'Photo ID'} Status={require("../../assets/images/succes.png")}/>
            <Document Logo={require("../../assets/images/selfie.png")} Nom={'Selfie'} Status={require("../../assets/images/pending.png")}/>
            <Document Logo={require("../../assets/images/Residence.png")} Nom={'Justificatif de Residence'} Status={require("../../assets/images/cancel.png")}/>
          </View>
        </ScrollView>


      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default DocumentScreen