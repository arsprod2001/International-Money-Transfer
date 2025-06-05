import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation, router } from 'expo-router';

const Methode = ({Logo, Nom}) => (
    <View className='flex flex-row items-center bg-[#2a2a2a] p-3 rounded-xl mt-8'>
        <Image source={Logo} style={{ width: 40, height: 40, marginRight: 10 }} />
        <View className='flex-1 flex-row items-center justify-between'>
            <Text className='text-white font-bold text-xl '>{Nom}</Text>
            <TouchableOpacity
                className='p-1 rounded-xl'
                style={{ backgroundColor: '#a12323'}}
            >
                <Text className='text-white text-xl font-bold'>Supprimer</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const MyCardScreen = () => {


    return (
        <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginLeft: 24, marginRight: 24 }}>

                        <Text className='text-white text-4xl mt-5 font-bold italic'>Ajout de methode de reception de paiement</Text>
                        <View className='mt-6'>
                            <Text className='text-white text-2xl mb-3'>Choisir le methode versement</Text>
                            <TouchableOpacity className='flex items-center bg-[#2a2a2a] p-3 rounded-xl'>
                                <Image source={require('../../assets/images/add.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <Methode Logo={require('../../assets/images/money.png')} Nom={'USDT'} />
                        <Methode Logo={require('../../assets/images/Mastercard.png')} Nom={'Mastercard'} />


                    </View>
                </ScrollView>


            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default MyCardScreen