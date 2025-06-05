import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'

const FirstRoot = () => {
  return <Redirect href={"(auth)"} />
}

export default FirstRoot
