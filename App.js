import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import StopwatchScreen from './screens/StopwatchScreen';
import AboutScreen from './screens/AboutScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0A0A0F',
            borderTopColor: '#1A1A2E',
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 12,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#00F5C4',
          tabBarInactiveTintColor: '#444466',
          tabBarLabelStyle: {
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
          },
        }}
      >
        <Tab.Screen
          name="Stopwatch"
          component={StopwatchScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>⏱</Text>
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>ℹ️</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
