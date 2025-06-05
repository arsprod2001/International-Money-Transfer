import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation, router } from 'expo-router';

const SuiviTransaction = () => {

  return (
    <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ marginLeft: 24, marginRight: 24 }}>
                
              </View>
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
  )
}

export default SuiviTransaction