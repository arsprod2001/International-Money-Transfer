import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Authentification = () => {
    return (
        <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginLeft: 24, marginRight: 24 }}>
                        <Text className='text-white text-4xl mt-5 font-bold italic'>Protect your notes by enabling 2FA</Text>
                        <Text className='text-white text-2xl'>Choose how you want to receive your authentification codes.</Text>

                        <TouchableOpacity className='flex flex-row items-center bg-[#2a2a2a] p-3 rounded-xl mt-8'>
                            <Image source={require('../../assets/images/password.png')} style = {{width : 30, height : 30, marginRight : 10}} />
                            <View>
                                <Text className='text-white font-bold text-xl italic'>Set up using an Authenticator app</Text>
                                <Text className='text-white w-[290]'>Use an authenticator app to get the authentification codes.</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row items-center bg-[#2a2a2a] p-3 rounded-xl mt-8'>
                            <Image source={require('../../assets/images/sms.png')} style = {{width : 30, height : 30, marginRight : 10}} />
                            <View>
                                <Text className='text-white font-bold text-xl italic'>Set up using SMS</Text>
                                <Text className='text-white w-[290]'>Notesnook will send you an SMS text with the 2FA code at login.</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row items-center bg-[#2a2a2a] p-3 rounded-xl mt-8'>
                            <Image source={require('../../assets/images/email.png')} style = {{width : 30, height : 30, marginRight : 10}} />
                            <View>
                                <Text className='text-white font-bold text-xl italic'>Set up using Email</Text>
                                <Text className='text-white w-[290]'>Notesnook will send you the 2FA code on your Email at login.</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Authentification
