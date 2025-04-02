// navigation/MainTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // استيراد مكتبة الأيقونات
import { StyleSheet } from 'react-native'; // استيراد StyleSheet
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type MainTabParamList = {
  Map: undefined;
  Orders: undefined;
  Profile: undefined;
}; 

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar, // تخصيص شريط التبويب
        tabBarActiveTintColor: '#e91e63', // لون التبويب النشط
        tabBarInactiveTintColor: '#b0bec5', // لون التبويب غير النشط
      }}
    >
      <Tab.Screen 
        name="الخريطة" 
        component={MapScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" color={color} size={size} style={styles.tabIcon} />
          ),
        }} 
      />
      <Tab.Screen 
        name="الطلبات" 
        component={OrdersScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-border" color={color} size={size} style={styles.tabIcon}/>
          ),
        }} 
      />
      <Tab.Screen 
        name="ملف شخصي" 
        component={ProfileScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} style={styles.tabIcon} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

// أنماط CSS
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff', // لون خلفية شريط التبويب
    borderTopWidth: 0, // إزالة الحد العلوي
    elevation: 5, // إضافة ظل
  },
  tabIcon: {
    marginBottom: 5, // مسافة بين الأيقونة والعنوان
  },
});

export default MainTabs;
