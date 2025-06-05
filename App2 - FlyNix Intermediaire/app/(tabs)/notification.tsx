import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation, router } from 'expo-router';

const Notification = () => {
  const Notificationbar = ({icon, titre, description, date, onPress }) => (
    <TouchableOpacity className='bg-[#2a2a2a] p-3 rounded-xl mt-3' onPress={onPress}>
      <View className='relative flex flex-row items-center '>
        <Image style = {{width : 40, height : 40}} source={icon} />
        <View>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-white font-bold italic' style = {{fontSize : 15}} >{titre}</Text>
            <Text className='text-white'>{date}</Text>
          </View>
          <Text className='text-white w-[290]' numberOfLines={2} ellipsizeMode='tail'>{description}</Text>
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
                  Notification
                </Text>
                <Notificationbar
                icon={require('../../assets/images/initie.png')}
                titre={'Nouvelle transaction initiée'}
                description={"Votre transaction de 2000€ vers le Sénégal a bien été enregistrée et est en attente d'un intermédiaire."}
                date={'Dec16, 2023'}
                />

                <Notificationbar
                icon={require('../../assets/images/inter.png')}
                titre={'Intermédiaire trouvé'}
                description={"Votre transaction de 2000€ vers le Sénégal a bien été enregistrée et est en attente d'un intermédiaire."}
                date={'Dec16, 2023'}
                />

                <Notificationbar
                icon={require('../../assets/images/correct.png')}
                titre={'Transaction terminée'}
                description={"Le transfert de 2000€ a été complété avec succès."}
                date={'Dec16, 2023'}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
  )
}

export default Notification