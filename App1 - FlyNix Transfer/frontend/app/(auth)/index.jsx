import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'

const FirstRootAuth = () => {
  return <Redirect href={"sign-in"} />
}

export default FirstRootAuth
