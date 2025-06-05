import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import InputText from '../components/InputText'

const profileEdition = () => {
    return (
        <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginLeft: 24, marginRight: 24 }}>
                        <TouchableOpacity className='flex items-center justify-center mt-3'>
                            <Image source={require("../../assets/images/profileImg.png")} className='w-40 h-40 rounded-full' />
                            <Image source={require('../../assets/images/televerser.png')} style={{ width: 50, height: 50 }} className='absolute' />
                        </TouchableOpacity>

                        <InputText Titre={'Prénom'} placeholder={'Votre Prénom'} />
                        <InputText Titre={'Nom'} placeholder={'Votre Nom'} />
                        <InputText Titre={'Email'} placeholder={'Votre adresse Email'} />
                        <InputText Titre={'Téléphone'} placeholder={'Votre numéro de téléphone'} />
                        <InputText Titre={'Adresse'} placeholder={'Votre Adresse'} />
                        <InputText Titre={'Postal Code'} placeholder={'Voyre code Postal'} />

                        <TouchableOpacity
                            className='p-3 mt-6 rounded-xl'
                            style={{ backgroundColor: '#a12323', marginLeft: 24, marginRight: 24, marginBottom: 20 }}
                            
                        >
                            <Text className='text-center text-white text-xl font-bold'>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default profileEdition
