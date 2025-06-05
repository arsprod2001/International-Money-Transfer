import React, { useState, useRef, useEffect } from "react";
import { View, Button, StyleSheet, Animated, Easing, Modal, Text, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Progress from 'react-native-progress';
import { Audio } from 'expo-av';
import { router, Redirect } from "expo-router";



const RadarMap = () => {
  const [isRadarActive, setIsRadarActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [isLineAnimating, setIsLineAnimating] = useState(false);
  const [showFranceMarker, setShowFranceMarker] = useState(false);
  const [modalTimer, setModalTimer] = useState(60);
  const [progress, setProgress] = useState(1);
  const soundRef = useRef();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/sound/sound.mp3'));
    soundRef.current = sound; // Stockez l'instance du son dans la référence
    soundRef.current.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        await soundRef.current.replayAsync(); // Rejoue le son automatiquement
      }
    });
    await soundRef.current.playAsync(); // Joue le son
  }

   // Fonction pour arrêter le son proprement
   const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync(); // Arrête le son
      await soundRef.current.unloadAsync(); // Décharge le son
      soundRef.current = null; // Réinitialise la référence
    }
  };

 


  
  const radarAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0.2),
    new Animated.Value(0.4),
  ]).current;
  const lineAnimation = useRef(new Animated.Value(0)).current;

  const mauritaniaCoordinates = { latitude: 21.0079, longitude: -10.9408 };
  const targetCoordinates = { latitude: 48.8566, longitude: 2.3522 };

  const mapViewRef = useRef(null);
  const timeoutRef = useRef(null); // Référence pour le setTimeout

  const startRadar = () => {
    setIsRadarActive(true);
    setModalTimer(60);
    setProgress(1);

    radarAnimations.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        { delay: index * 600 }
      ).start();
    });

    // Stocker le setTimeout dans une référence
    timeoutRef.current = setTimeout(() => {
      setIsModalVisible(true);
      setIsLineVisible(true);
      animateLine();
    }, 5000);
  };

  const animateLine = () => {
    setIsLineAnimating(true);
    Animated.timing(lineAnimation, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setShowFranceMarker(true);
    setTimeout(() => fitRegion(), 1000);
  };

  const stopRadar = () => {
    setIsRadarActive(false);
    setIsModalVisible(false);
    radarAnimations.forEach(anim => anim.setValue(0));
    lineAnimation.setValue(0);
    setIsLineVisible(false);
    setShowFranceMarker(false);

    // Annuler le setTimeout s'il existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleAccept = () => {
    setIsModalVisible(false);
    setIsLineVisible(false);
    setShowFranceMarker(false);
    clearInterval(timerInterval.current);
    stopSound();
    router.replace("/transactions/transactionDetails")
  };

  const handleReject = () => {
    setIsModalVisible(false);
    setIsLineVisible(false);
    setShowFranceMarker(false);
    clearInterval(timerInterval.current);
    stopSound();
  };

  const fitRegion = () => {
    if (mapViewRef.current) {
      const deltaLat = Math.abs(mauritaniaCoordinates.latitude - targetCoordinates.latitude);
      const deltaLng = Math.abs(mauritaniaCoordinates.longitude - targetCoordinates.longitude);

      const region = {
        latitude: (mauritaniaCoordinates.latitude + targetCoordinates.latitude) / 2,
        longitude: (mauritaniaCoordinates.longitude + targetCoordinates.longitude) / 2,
        latitudeDelta: deltaLat + 5,
        longitudeDelta: deltaLng + 5,
      };

      mapViewRef.current.animateToRegion(region, 1000);
    }
  };

  const timerInterval = useRef(null);
  useEffect(() => {
    if (isModalVisible && modalTimer > 0) {
      timerInterval.current = setInterval(() => {
        setModalTimer(prevTimer => {
          const newTimer = prevTimer - 1;
          setProgress(newTimer / 60);
         

          if (newTimer <= 0) {
            clearInterval(timerInterval.current);
            setIsModalVisible(false);
            setIsLineVisible(false); // Masquer la ligne
            setShowFranceMarker(false); // Masquer le marqueur
            stopSound();
          }
          
          return newTimer;
        });

      }, 1000);

      playSound();

    }

    return () => {
      clearInterval(timerInterval.current);
      stopSound();
    } 
  }, [isModalVisible]);

  const lineTranslateX = lineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, targetCoordinates.longitude - mauritaniaCoordinates.longitude],
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        mapType="terrain"
        initialRegion={{
          latitude: mauritaniaCoordinates.latitude,
          longitude: mauritaniaCoordinates.longitude,
          latitudeDelta: 15,
          longitudeDelta: 15,
        }}
      >
        <Marker coordinate={mauritaniaCoordinates} title="Mauritanie" />
        {showFranceMarker && <Marker coordinate={targetCoordinates} title="Paris" />}

        {isLineVisible && isLineAnimating && (
          <Polyline
            coordinates={[mauritaniaCoordinates, targetCoordinates]}
            strokeColor="blue"
            strokeWidth={2}
          />
        )}
      </MapView>

      {isRadarActive &&
        radarAnimations.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.radarCircle,
              {
                transform: [{ scale: anim }],
                opacity: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ]}
          />
        ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        {/*
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Accepter ou Rejeter?</Text>
            <Text style={styles.modalTimer}>{modalTimer} secondes restantes</Text>
            <Progress.Bar
              progress={progress}
              width={200}
              color="green"
              style={styles.progressBar}
            />
            <Button title="Accepter" onPress={handleAccept} color="green" />
            <Button title="Rejeter"  color="red" />
          </View>
        </View>
        */}

        <View className="flex-1 justify-center items-center">
          <View className="w-96 h-80 bg-white rounded-2xl">

            <TouchableOpacity onPress={handleReject}>

              <Image source={require("../../assets/images/cancel.png")} className="absolute" style={{ width: 30, height: 30, marginLeft : 309, marginTop : -4}} />

            </TouchableOpacity>

            <View className="flex-1 items-center">
              <Image source={require("../../assets/images/send-money.png")} className="w-24 h-24" />
              <Text className="font-bold italic text-2xl relative -top-4 mt-2">Transaction</Text>
            </View>

            <View className="relative -top-4">
              <View className="flex items-center justify-center">
                <View className="flex flex-row items-center gap-8">
                  <Text className="font-bold text-2xl">Montant</Text>
                  <Text className="text-2xl">400 MRU</Text>
                </View>
                <View className="flex flex-row items-center gap-8">
                  <Text className="font-bold text-2xl">Gain</Text>
                  <Text className="text-2xl">100 MRU</Text>
                </View>
                <View className="flex flex-row items-center gap-8">
                  <Text className="font-bold text-2xl">Payment</Text>
                  <Text className="text-2xl">Bankily</Text>
                </View>
              </View>



            </View>

            <TouchableOpacity onPress={handleAccept}>
              <Text className="z-50 text-black font-bold text-center text-xl relative top-8" >{modalTimer}</Text>
              <Progress.Bar
                progress={progress}
                width={336}
                height={50}
                color="green"
                style={{ marginTop: -9 }}
              />
            </TouchableOpacity>



          </View>
        </View>


      </Modal>

      <View style={styles.buttonContainer}>
        {!isRadarActive ? (
          <TouchableOpacity
            className='p-3 mt-6 rounded-xl'
            style={{ backgroundColor: '#ffa800', marginLeft: 24, marginRight: 24, marginBottom: 20 }}
            onPress={startRadar}
          >
            <Text className='text-center text-white text-xl font-bold'>Mettre en ligne</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className='p-3 mt-6 rounded-xl'
            style={{ backgroundColor: '#a12323', marginLeft: 24, marginRight: 24, marginBottom: 20 }}
            onPress={stopRadar}
          >
            <Text className='text-center text-white text-xl font-bold'>Mettre hors ligne</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  radarCircle: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center",
    top: "40%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 18, marginBottom: 10 },
  modalTimer: { marginBottom: 10, fontSize: 16 },
  progressBar: { marginVertical: 10 },
});

export default RadarMap;