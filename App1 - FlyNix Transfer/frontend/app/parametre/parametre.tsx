import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Parametre = () => {
    return (
        <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginLeft: 24, marginRight: 24 }}>
                        <View className="flex flex-row flex-wrap justify-between mt-3">
                            <View className="w-1/2 items-center mb-3">
                                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                                    <Image source={require('../../assets/images/notif.png')} style={{ width: 80, height: 80 }} />
                                </TouchableOpacity>
                                <Text className="text-center text-white italic font-bold text-xl">Notifications</Text>
                            </View>

                            <View className="w-1/2 items-center mb-3">
                                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                                    <Image source={require('../../assets/images/langue.png')} style={{ width: 80, height: 80 }} />
                                </TouchableOpacity>
                                <Text className="text-center text-white italic font-bold text-xl">Langues</Text>
                            </View>

                            <View className="w-1/2 items-center mb-3">
                                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                                    <Image source={require('../../assets/images/devises.png')} style={{ width: 80, height: 80 }} />
                                </TouchableOpacity>
                                <Text className="text-center text-white italic font-bold text-xl">Devise par défaut</Text>
                            </View>

                            <View className="w-1/2 items-center mb-3">
                                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                                    <Image source={require('../../assets/images/payement.png')} style={{ width: 80, height: 80 }} />
                                </TouchableOpacity>
                                <Text className="text-center text-white italic font-bold text-xl">Moyen de Paiement par défaut</Text>
                            </View>


                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Parametre
