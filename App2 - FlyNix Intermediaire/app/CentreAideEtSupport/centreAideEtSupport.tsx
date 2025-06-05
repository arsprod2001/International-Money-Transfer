import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const CentreAideEtSupport = () => {
    const ButtonProfile = ({ icon, titre, onPress }) => (
        <TouchableOpacity className='bg-[#2a2a2a] p-3 rounded-xl mt-4' onPress={onPress}>
          <View className='flex flex-row items-center justify-between'>
            <View className='flex flex-row items-center'>
              <Image style={{ width: 30, height: 30, marginRight : 10 }} source={icon} />
              <Text className='text-white text-xl'>{titre}</Text>
            </View>
            <Image style={{ width: 20, height: 20}} source={require('../../assets/images/sup.png')} />
          </View>
        </TouchableOpacity>
      );



    return (
        <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginLeft: 24, marginRight: 24 }}>
                        <View className='flex-1 items-center mt-6'>
                            <Image source={require('../../assets/images/supp.png')} style={{ width: 150, height: 150 }} />
                            <Text className='text-white w-[270] text-center text-4xl font-bold'>Salut, Comment pouvons nous vous aidez</Text>
                        </View>
                        <ButtonProfile icon={require("../../assets/images/live-chat.png")}
                            titre={'Contact Live Chat'}
                            onPress={() => {}}
                        />
                        <ButtonProfile icon={require("../../assets/images/email.png")}
                            titre={'Sent us an E-mail'}
                            onPress={() => {}}
                        />
                        <ButtonProfile icon={require("../../assets/images/whatsapp.png")}
                            titre={'Contat in Whatsapp'}
                            onPress={() => {let url = 'https://wa.me/+22241263893';
                            Linking.openURL(url).catch((err) => console.error("Impossible d'ouvrir WhatsApp", err));}}
                        />

                        <ButtonProfile icon={require("../../assets/images/question.png")}
                            titre={'FAQs'}
                            onPress={() => {}}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default CentreAideEtSupport
