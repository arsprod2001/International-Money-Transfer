import { Image } from 'react-native';
import { Tabs } from 'expo-router';

const screens = [
  { name: 'index', icon: require('../../assets/images/homepage.png') },
  { name: 'transaction', icon: require('../../assets/images/transaction.png') },
  { name: 'dashboard', icon: require('../../assets/images/dashboard.png') },
  { name: 'notification', icon: require('../../assets/images/notification.png') },
  { name: 'profile', icon: require('../../assets/images/profile.png') },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffa800", // Couleur du texte et de l'icône actif
        tabBarInactiveTintColor: "white",  // Couleur du texte et de l'icône inactif
        tabBarStyle: {
          backgroundColor: '#1b1b1b', // Couleur de fond de la barre d'onglets
          borderTopWidth: 0, // Retirer la bordure en haut des onglets (optionnel)
        },
        headerShown: false,
      }}
    >
      {screens.map(screen => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={screen.icon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#ffa800" : "white", // Change la couleur de l'icône
                }}
              />
            ),
            title: screen.name === 'index' ? 'Home' : screen.name.charAt(0).toUpperCase() + screen.name.slice(1), // Modifier le nom affiché
          }}
        />
      ))}
    </Tabs>
  );
}
