import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapScreen: React.FC = () => {
  const [showRoute, setShowRoute] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const deliveryLocation = {
    latitude: 33.3064101,
    longitude: 44.3823656,
  };

  const destinationLocation = {
    latitude: 33.3020626,
    longitude: 44.4967532,
  };

  const handleStartDelivery = () => {
    setShowRoute(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.productInfoContainer}>
        <TouchableOpacity style={styles.productInfo} onPress={() => setModalVisible(true)}>
          <View>
            <Text style={styles.productName}>اسم المنتج</Text>
            <Text style={styles.productAddress}> بغداد - كرادة داخل </Text>
          </View>
          <Image source={require('../images/b.jpg')} style={styles.productImage} />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.3042364,
          longitude: 44.4395594,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={deliveryLocation} title="السائق">
          <View style={styles.markerContainer}>
            <Image source={require('../images/r.jpg')} style={styles.markerImage} />
            <Text style={styles.markerText}> ياسين مثنى </Text>
          </View>
        </Marker>

        <Marker coordinate={destinationLocation} title="الزبون">
          <View style={styles.markerContainer}>
            <Image source={require('../images/b.jpg')} style={styles.markerImage} />
            <Text style={styles.markerText}>اسم الزبون</Text>
          </View>
        </Marker>

        {showRoute && (
          <Polyline
            coordinates={[deliveryLocation, destinationLocation]}
            strokeColor="blue"
            strokeWidth={4}
          />
        )}
      </MapView>

      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>معلومات الطلب</Text>
          
          <View style={styles.userInfoContainer}>
            <Text style={styles.sectionTitle}>معلومات الزبون</Text>
            <Text>اسم الزبون: محمد علي</Text>
            <Text>رقم الهاتف: 07712345678</Text>
          </View>

          <View style={styles.orderInfoContainer}>
            <Text style={styles.sectionTitle}>معلومات الطلبية</Text>
            <Text>معلومات الطلبية: طلب بيتزا</Text>
            
            <ScrollView style={styles.orderI} horizontal showsHorizontalScrollIndicator={false}>
              <Image source={require ('../images/b.jpg')} style={styles.orderImage} />
              <Image source={require ('../images/d.jpg')} style={styles.orderImage} />
              <Image source={require ('../images/p.jpg')} style={styles.orderImage} />
              <Image source={require ('../images/e.jpg')} style={styles.orderImage} />
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStartDelivery}>
            <Text style={styles.startButtonText}>بدء التوصيل</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productInfoContainer: {
    position: 'absolute',
    top: 45,
    right: 10,
    padding: 1,
    zIndex: 1000,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    gap: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productName: {
    direction: 'rtl',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productAddress: {
    direction: 'rtl',
    fontSize: 14,
    color: '#666',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 50,
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5, 
  },
  markerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    position: 'absolute',
    top: 45, 
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    direction: 'rtl',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 2,
    paddingBottom: 5,
    borderBottomColor: 'red',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  orderInfoContainer: {
    marginBottom: 20,
  },
  orderI: {
    marginTop: 20,
    direction: 'ltr',
  },
  orderImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
