import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation, router } from 'expo-router';



const Profile = () => {
  const ButtonProfile = ({ icon, titre, onPress }) => (
    <TouchableOpacity className='bg-[#2a2a2a] p-3 rounded-xl mt-4' onPress={onPress}>
      <View className='flex flex-row items-center justify-between'>
        <View className='flex flex-row items-center'>
          <Image style={{ width: 30, height: 30, marginRight: 10 }} source={icon} />
          <Text className='text-white text-xl'>{titre}</Text>
        </View>
        <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/sup.png')} />
      </View>
    </TouchableOpacity>
  );



  return (
    <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, fontWeight: 'bold' }}>
              Profile
            </Text>
            <View className='flex items-center justify-center mt-3'>
              <Image source={require("../../assets/images/profileImg.png")} className='w-40 h-40 rounded-full' />
            </View>
            <Text className='text-center font-bold text-white text-3xl italic'>Amadou Sow</Text>


            <ButtonProfile icon={require("../../assets/images/secure.png")}
              titre={'Sécurité'}
              onPress={() => router.push('/securiteEtVerification/securiteEtVerification')}
            />
            <ButtonProfile icon={require("../../assets/images/carte.png")}
              titre={'Account'}
              onPress={() => router.push('/MyCards/mycardscreen')}
            />

            <ButtonProfile icon={require("../../assets/images/document.png")}
              titre={'Documents'}
              onPress={() => router.push('/Documents/documentScreen')}
            />

            <ButtonProfile icon={require("../../assets/images/parametres.png")}
              titre={'Parametres'}
              onPress={() => router.push('/parametre/parametre')}
            />



            <ButtonProfile icon={require("../../assets/images/supports.png")}
              titre={"Centre d'aide et support"}
              onPress={() => router.push('/CentreAideEtSupport/centreAideEtSupport')}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          className='p-3 mt-6 rounded-xl'
          style={{ backgroundColor: '#a12323', marginLeft: 24, marginRight: 24, marginBottom: 20 }}
          onPress={() => router.replace('(auth)/sign-in')}
        >
          <Text className='text-center text-white text-xl font-bold'>Deconnexion</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Profile