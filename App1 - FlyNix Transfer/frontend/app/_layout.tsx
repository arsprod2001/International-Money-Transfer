import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import "../global.css"
import { StripeProvider } from '@stripe/stripe-react-native'

const RootLayout = () => {
    return (
        <StripeProvider
            publishableKey='pk_test_51RKlbvRbTvq56aJy8TFe2K6o87uWxyU33dWHaSiLP4kGAJSm1qZbEKquYiFpHfZyvopflCM9Xq9AGgfkM21MafB200hlTPUJDd'
            urlScheme='flynix'
        >
            <Stack>
                <Stack.Screen
                    name='(auth)'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='index'
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name='(tabs)'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='transactions/transactionDetails'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='notification/notificationDetails'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='parametre/parametre'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='CentreAideEtSupport/centreAideEtSupport'
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name='PreferenceEtParametre/preferenceEtParametre'
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name='ProfileEdition/profileEdition'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='securiteEtVerification/securiteEtVerification'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='securiteEtVerification/authentification'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='SuiviTransaction/suiviTransaction'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='OtpScreen/Otp'
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack>
        </StripeProvider>
    )
}

export default RootLayout