import { Image } from 'react-native';
import { Tabs } from 'expo-router';

const screens = [
  { name: 'index', icon: require('../../assets/images/homepage.png') },
  { name: 'transaction', icon: require('../../assets/images/transaction.png') },
  { name: 'transfert', icon: require('../../assets/images/plus.png') },
  { name: 'notification', icon: require('../../assets/images/notification.png') },
  { name: 'profile', icon: require('../../assets/images/profile.png') },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffa800", 
        tabBarInactiveTintColor: "white",  
        tabBarStyle: {
          backgroundColor: '#1b1b1b', 
          borderTopWidth: 0, 
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
                  tintColor: focused ? "#ffa800" : "white", 
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
