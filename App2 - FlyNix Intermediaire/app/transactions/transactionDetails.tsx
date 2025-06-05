import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const TransactionDetails = () => {
  return (
    <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            <View className='flex-1 items-center mt-6'>
              <Image source={require("../../assets/images/deposits.png")} style={{ width: 80, height: 80 }} />
              <Text className='bg-sky-700 text-white p-2 rounded-xl text-xl font-bold'>Deposit</Text>
              <Text className='text-white text-6xl font-bold mt-4'>$349.48</Text>

            </View>
            <View className='flex-1 items-center'>
              <View className='flex-1 flex-row items-center justify-between'>
                <View className='flex flex-row items-center justify-between mr-6 gap-2'>
                  <Image source={require("../../assets/images/date.png")} style={{ width: 20, height: 20 }} />
                  <Text className='text-xl text-white'>Jan 23, 2025</Text>
                </View>
                <View className='flex flex-row items-center justify-between gap-2'>
                  <Image source={require("../../assets/images/succes.png")} style={{ width: 20, height: 20 }} />
                  <Text className='text-xl text-grey'>Completed</Text>
                </View>

              </View>
            </View>
            <Text className='border-b-hairline border-b-[#8e8e8e] mb-9 pb-4'></Text>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>No References</Text>
              <Text className='text-white text-xl font-bold'>12398358025384</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>No References</Text>
              <Text className='text-white text-xl font-bold'>12398358025384</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Payement Code</Text>
              <Text className='text-white text-xl font-bold'>12398358025384</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Mercant Name</Text>
              <Text className='text-white text-xl font-bold'>12398358025384</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Date</Text>
              <Text className='text-white text-xl font-bold'>12398358025384</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Time</Text>
              <Text className='text-white text-xl font-bold'>12398358025384</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Sender</Text>
              <Text className='text-white text-xl font-bold'>12398358025384</Text>
            </View>

            <TouchableOpacity
              className='p-3 mt-6 rounded-xl flex flex-row items-center justify-center border-hairline border-white'
              style={{ marginLeft: 24, marginRight: 24, marginBottom: 20 }}
            >
              <Text className='text-center text-white text-xl font-bold flex items-center'>
                Download
              </Text>
              <Image source={require('../../assets/images/telecharger.png')} className=' ml-2 w-5 h-5'/>
            </TouchableOpacity>

          </View>
        </ScrollView>


      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default TransactionDetails

const styles = StyleSheet.create({})