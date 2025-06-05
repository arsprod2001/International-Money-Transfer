import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { BarChart } from 'react-native-chart-kit';



const Dashboard = () => {

  // Dimensions de l'écran pour adapter le graphique
  const screenWidth = Dimensions.get('window').width;

  // Données du graphique
  const data = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'], // Jours de la semaine
    datasets: [
      {
        data: [200, 450, 300, 600, 500, 800, 700], // Montants gagnés par jour
      },
    ],
  };

  // Configuration du graphique
  const chartConfig = {

    backgroundGradientFrom: '#1f1f1f',
    backgroundGradientTo: '#1f1f1f',
    fillShadowGradient: '#007bff', // Couleur des barres
    fillShadowGradientOpacity: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Couleur des étiquettes
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0, // Nombre de décimales pour les valeurs
    propsForLabels: {
      fontSize: 12,
    },
  };


  return (
    <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
             <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                          Dashboard
                        </Text>
            <View className='flex flex-row items-center justify-between'>
              <View className='flex flex-row items-center gap-[10]'>
                <Image source={require("../../assets/images/profileImg.png")} className=' w-14 h-14 rounded-full' />
                <View>
                  <Text className=' text-white text-xl'>Welcome Back</Text>
                  <Text className='text-white font-bold italic'>Amadou Sow</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Image source={require('../../assets/images/parametres.png')} className='w-[28] h-[28]'
                />
              </TouchableOpacity>

            </View>

            <Text className='text-white text-2xl mt-3'>Current Balance</Text>
            <Text className='text-white font-bold' style={{ fontSize: 60 }}>$340.00</Text>


            <BarChart
              data={data}
              width={screenWidth - 32} // Largeur du graphique (écran - padding)
              height={220}
              yAxisLabel="€"
              yAxisSuffix="" // Suffixe pour l'axe Y (optionnel)
              chartConfig={chartConfig}
              verticalLabelRotation={0} // Rotation des étiquettes verticales
              fromZero // Commence l'axe Y à zéro
              showBarTops={true} // Affiche les sommets des barres
              style={{ marginLeft: -15 }}
            />

            <Text className='text-white text-2xl mt-3'>Statistique</Text>


            <View className="flex flex-row flex-wrap justify-between mt-3">
              <View className="w-1/2 items-center mb-3">
                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                  <Text className='text-white font-bold' style={{ fontSize: 40 }}>25%</Text>
                </TouchableOpacity>
                <Text className="text-center text-white italic font-bold text-xl">Satisfaction</Text>
              </View>

              <View className="w-1/2 items-center mb-3">
                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                  <Text className='text-white font-bold' style={{ fontSize: 40 }}>5%</Text>
                </TouchableOpacity>
                <Text className="text-center text-white italic font-bold text-xl">Taux d'acceptation</Text>
              </View>

              <View className="w-1/2 items-center mb-3">
                <TouchableOpacity className="bg-[#2a2a2a] p-9 rounded-xl">
                  <Text className='text-white font-bold' style={{ fontSize: 40 }}>15%</Text>
                </TouchableOpacity>
                <Text className="text-center text-white italic font-bold text-xl">Taux d'annulation</Text>
              </View>

            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Dashboard

// Styles
const styles = StyleSheet.create({
});
