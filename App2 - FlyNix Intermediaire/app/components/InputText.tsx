import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const InputText = ({Titre, placeholder}) => {
    return (
        <View className='mt-4'>
            <Text className='text-2xl text-white font-semibold'>{Titre}</Text>
            <TextInput
                className='bg-[#333333] p-4 text-xl rounded-xl text-white'
                placeholder={placeholder}
                placeholderTextColor="#999"
            />
        </View>
    )
}

export default InputText