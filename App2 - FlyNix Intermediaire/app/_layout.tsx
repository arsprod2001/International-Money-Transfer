import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import "../global.css"

const RootLayout = () => {
  return (
    <Stack>
    <Stack.Screen 
          name='(tabs)'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='transactions/transactionDetails'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='notification/notificationDetails'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='parametre/parametre'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='CentreAideEtSupport/centreAideEtSupport'
          options={{
              headerShown : false,
          }}
      />

    <Stack.Screen 
          name='PreferenceEtParametre/preferenceEtParametre'
          options={{
              headerShown : false,
          }}
      />

    <Stack.Screen 
          name='profileEditions/profileEdition'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='securiteEtVerification/securiteEtVerification'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='securiteEtVerification/authentification'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='SuiviTransaction/suiviTransaction'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='(auth)'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='MyCards/mycardscreen'
          options={{
              headerShown : false,
          }}
      />
    <Stack.Screen 
          name='Documents/documentScreen'
          options={{
              headerShown : false,
          }}
      />
  </Stack>
  )
}

export default RootLayout