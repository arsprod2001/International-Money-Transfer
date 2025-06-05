import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'

const TransactionDetails = () => {

  const { transaction } = useLocalSearchParams();
  const data = JSON.parse(transaction); // On récupère l'objet

  const generatePDF = async () => {
    try {
      const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reçu de transaction</title>
          <style>
            body { 
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
              padding: 30px; 
              background-color: #f8f9fa;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 25px;
              border-bottom: 2px solid #e9ecef;
              margin-bottom: 30px;
            }
            .success-icon {
              color: #28a745;
              font-size: 48px;
              margin-bottom: 15px;
            }
            .title {
              color: #2c3e50;
              font-size: 26px;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .amount {
              color: #2c3e50;
              font-size: 38px;
              font-weight: 700;
              margin: 25px 0;
            }
            .details-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              margin-bottom: 30px;
            }
            .detail-item {
              padding: 18px;
              background: #f8f9fa;
              border-radius: 8px;
              border: 1px solid #e9ecef;
            }
            .label {
              color: #6c757d;
              font-size: 14px;
              margin-bottom: 6px;
            }
            .value {
              color: #495057;
              font-size: 16px;
              font-weight: 500;
            }
            .footer {
              text-align: center;
              margin-top: 35px;
              color: #6c757d;
              font-size: 13px;
              line-height: 1.6;
              border-top: 2px solid #e9ecef;
              padding-top: 25px;
            }
            .company-name {
              color: #2c3e50;
              font-weight: 600;
              margin-bottom: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="success-icon">✓</div>
              <h1 class="title">Paiement Réussi</h1>
              <div class="amount">\$${data.montant_envoye.split(" ")[0]}</div>
            </div>
            
            <div class="details-grid">
              <div class="detail-item">
                <span class="label">Référence</span>
                <div class="value">${data.reference.split("-")[0]}</div>
              </div>
              <div class="detail-item">
                <span class="label">Destinataire</span>
                <div class="value">${data.destinataire}</div>
              </div>
              <div class="detail-item">
                <span class="label">Montant Reçu</span>
                <div class="value">${data.montant_recu}</div>
              </div>
              <div class="detail-item">
                <span class="label">Pays</span>
                <div class="value">${data.pays_destinataire}</div>
              </div>
              <div class="detail-item">
                <span class="label">Date</span>
                <div class="value">${new Date(data.date_creation).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
              </div>
              <div class="detail-item">
                <span class="label">Statut</span>
                <div class="value">Complété</div>
              </div>
            </div>
            
            <div class="footer">
              <div class="company-name">FlyNix Inc</div>
              <div>Contact : support@flynix.ca</div>
              <div>Tél : +1 (437) 298-1700</div>
              <div style="margin-top: 15px;">© 2025 FlyNix. Tous droits réservés.</div>
            </div>
          </div>
        </body>
      </html>
    `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Télécharger le reçu',
          UTI: 'com.adobe.pdf'
        });
      } else {
        Alert.alert('Téléchargement disponible seulement sur mobile');
      }
      
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la génération du PDF');
      console.error('Erreur génération PDF:', error);
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: '#1f1f1f' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginLeft: 24, marginRight: 24 }}>
            <View className='flex items-center justify-center mt-12'>
              <Image source={require("../../assets/images/succes.png")} className='w-28 h-28 mb-4' />
              <Text className='text-2xl text-white'>Payement Reussi</Text>
            </View>
            <Text className='text-white font-bold text-6xl mt-5 border-b-hairline border-b-[#8e8e8e] mb-9 pb-4'>
              ${data.montant_envoye.split(" ")[0]}
              </Text>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>References</Text>
              <Text className='text-white text-xl font-bold'>{data.reference.split("-")[0]}</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Destinataire</Text>
              <Text className='text-white text-xl font-bold'>{data.destinataire}</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Montant Reçu</Text>
              <Text className='text-white text-xl font-bold'>{data.montant_recu}</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Pays</Text>
              <Text className='text-white text-xl font-bold'>{data.pays_destinataire}</Text>
            </View>
            <View className='flex flex-row items-center justify-between mb-3'>
              <Text className='text-white text-xl'>Date</Text>
              <Text className='text-white text-xl font-bold'>{data.date_creation}</Text>
            </View>
           
         

            <TouchableOpacity
              className='p-3 mt-6 rounded-xl flex flex-row items-center justify-center border-hairline border-white'
              style={{ marginLeft: 24, marginRight: 24, marginBottom: 20 }}
              onPress={generatePDF}
            >
              <Text className='text-center text-white text-xl font-bold flex items-center'>
                Download
              </Text>
              <Image source={require('../../assets/images/telecharger.png')} className=' ml-2 w-5 h-5'/>
            </TouchableOpacity>

            <TouchableOpacity
              className='p-3 rounded-xl'
              style={{ backgroundColor: '#a12323', marginLeft: 24, marginRight: 24, marginBottom: 20 }}
              onPress={() => router.replace('(tabs)')}
            >
              <Text className='text-center text-white text-xl font-bold'>Retour</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default TransactionDetails