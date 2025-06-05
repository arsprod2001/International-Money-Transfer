import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation, router } from 'expo-router';


const SecuriteEtVerification = () => {
    return (
        <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginLeft: 24, marginRight: 24 }}>
                        <View className="flex flex-row flex-wrap justify-between mt-3">
                            <View className="w-1/2 items-center mb-3">
                                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl" onPress={() => router.push('/securiteEtVerification/authentification')}>
                                    <Image source={require('../../assets/images/2fa.png')} style = {{width : 80, height : 80}} />
                                </TouchableOpacity>
                                <Text className="text-center text-white italic font-bold text-xl">Activation 2FA</Text>
                            </View>

                            <View className="w-1/2 items-center mb-3">
                                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                                    <Image source={require('../../assets/images/password.png')} style = {{width : 80, height : 80}} />
                                </TouchableOpacity>
                                <Text className="text-center text-white italic font-bold text-xl">Changer de mot de passe</Text>
                            </View>

                            <View className="w-1/2 items-center mb-3">
                                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                                    <Image source={require('../../assets/images/history.png')} style = {{width : 80, height : 80}} />
                                </TouchableOpacity>
                                <Text className="text-center text-white italic font-bold text-xl">Historique de connexion</Text>
                            </View>

                            <View className="w-1/2 items-center mb-3">
                                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                                    <Image source={require('../../assets/images/face-id.png')} style = {{width : 80, height : 80}} />
                                </TouchableOpacity>
                                <Text className="text-center text-white italic font-bold text-xl">Face ID / Touch ID</Text>
                            </View>


                        </View>
                        <TouchableOpacity
                            className='p-3 mt-6 rounded-xl'
                            style={{ backgroundColor: '#a12323', marginLeft: 24, marginRight: 24, marginBottom: 20 }}

                        >
                            <Text className='text-center text-white text-xl font-bold'>Supprimer mon compte</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default SecuriteEtVerification
