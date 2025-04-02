import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Image } from 'react-native';

const OrdersScreen: React.FC = () => {
  const [currentOrders, setCurrentOrders] = useState([
    { id: '1', name: 'بيتزا', address: 'بغداد - الكرادة', time: 'قبل 10 دقائق', image: require('../images/b.jpg'), customer: 'محمد علي', phone: '07712345678', rain: 'جاري التوصيل', },
    { id: '2', name: 'برغر', address: 'بغداد - المنصور', time: 'قبل 20 دقيقة', image: require('../images/b.jpg'), customer: 'علي حسن', phone: '07712345678', rain: 'بانتضار التوصيل', },
    { id: '3', name: 'بيتزا', address: 'بغداد - الكرادة', time: 'قبل 10 دقائق', image: require('../images/b.jpg'), customer: 'محمد علي', phone: '07712345678', rain: 'جاري التوصيل', },
    { id: '4', name: 'بيتزا', address: 'بغداد - الكرادة', time: 'قبل 10 دقائق', image: require('../images/b.jpg'), customer: 'محمد علي', phone: '07712345678', rain: 'جاري التوصيل', },
    { id: '5', name: 'بيتزا', address: 'بغداد - الكرادة', time: 'قبل 10 دقائق', image: require('../images/b.jpg'), customer: 'محمد علي', phone: '07712345678', rain: 'جاري التوصيل', },

  ]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('current');
  const [searchText, setSearchText] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCompleteOrder = (order) => {
    setCurrentOrders(currentOrders.filter(o => o.id !== order.id));
    setCompletedOrders([...completedOrders, order]);
    setSelectedOrder(null);
  };

  const filteredOrders = (activeTab === 'current' ? currentOrders : completedOrders).filter(order =>
    order.name.includes(searchText) || order.address.includes(searchText) || order.customer.includes(searchText)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Text> الطلبات الحالية                           </Text>
        <Text style={styles.headertext}>({currentOrders.length})</Text>
      </Text>
      
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, activeTab === 'current' && styles.activeTab]} onPress={() => setActiveTab('current')}>
          <Text style={styles.tabText}>الطلبات الحالية</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'completed' && styles.activeTab]} onPress={() => setActiveTab('completed')}>
          <Text style={styles.tabText}>الطلبات المكتملة</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="بحث عن طلب..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderItem} onPress={() => setSelectedOrder(item)}>
            <Image source={item.image} style={styles.orderImage} />
            <View>
              <Text style={styles.orderName}>{item.name}</Text>
              <Text style={styles.orderAddress}>{item.address}</Text>
              
            </View>
            <View style={styles.orderTime}>
              <Text style={styles.orderTimeRain}>{item.rain}</Text>
              <Text style={styles.orderTimeItem}>{item.time}</Text>
              </View>
            
          </TouchableOpacity>
        )}
      />

      {selectedOrder && (
        <Modal animationType="slide" transparent={true} visible={!!selectedOrder}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>

            <TouchableOpacity style={styles.consol} onPress={() => setSelectedOrder(null)}>
                <Text style={styles.consolbtn}>X</Text>
              </TouchableOpacity>


              <Text style={styles.modalTitle}>تفاصيل الطلب</Text>

              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>معلومات الزبون</Text>
                <Text>الزبون: {selectedOrder.customer}</Text>
                <Text>رقم الهاتف: {selectedOrder.phone}</Text>
                <Text>العنوان: {selectedOrder.address}</Text>
                <Text>الطلب: {selectedOrder.name}</Text>
              </View>

             
             
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedOrder(null)}>
                <Text style={styles.buttonText}>بدء التوصيل</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => handleCompleteOrder(selectedOrder)}>
                <Text style={styles.buttonText}>تم التوصيل</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { flexDirection: 'row', marginTop: 40,fontSize: 24, fontWeight: 'bold', textAlign: 'right', marginVertical: 10, gap: 50,},
  headertext: {
    color: 'red',
    margin: 'auto',
    marginLeft: 10,
  },
  tabs: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  tab: { padding: 10, marginHorizontal: 5, borderBottomWidth: 2, borderColor: 'transparent' },
  activeTab: { borderColor: 'blue' },
  tabText: { fontSize: 16 },
  searchBar: { padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 10 },
  orderItem: {
     flexDirection: 'row',
     direction: 'rtl',
     alignItems: 'center',
     padding: 10,
     backgroundColor: '#f9f9f9',
     marginBottom: 5,
     borderRadius: 10,
     marginBottom: 10,
   },
  orderImage: { width: 50, height: 50, borderRadius: 10, marginLeft: 10 },
  orderName: { fontSize: 16, fontWeight: 'bold' },
  orderAddress: { fontSize: 14, color: 'gray' },
  orderTime: { 
    
    margin: 'auto',
    marginLeft: 10,
    gap: 8,
    },
    orderTimeRain: {
      fontSize: 13,
      color: 'blue',
    },
    orderTimeItem: {
      fontSize: 12,
      color: 'red',
    },
    userInfoContainer: {
      marginBottom: 20,
      gap: 8,
      fontSize: 18,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },

  modalContainer: {  flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { 
    direction: 'rtl',
     backgroundColor: '#fff',
      padding: 20,
       borderRadius: 10,
        width: 300,
        
        },
  modalTitle: { 
    textAlign: 'center',
    width: '100%',
    fontSize: 18,
     fontWeight: 'bold',
      marginBottom: 10,
      marginBottom: 10,
      borderBottomWidth: 2,
      paddingBottom: 10,
      borderBottomColor: 'red',
     },
  button: { 
    backgroundColor: 'black',
     padding: 10,
      borderRadius: 5,
      marginTop: 10,
      color: 'white',
      width: '100%',
      alignItems: 'center',
     },
  closeButton: { 
    backgroundColor: 'red',
     padding: 10,
      borderRadius: 5,
      marginTop: 10,
      color: 'white',
      width: '100%',
      alignItems: 'center',
     },

  consol: {
    backgroundColor: 'red',
     borderRadius: 5,
      position: 'absolute',
      top: 10,
      left: 18,
      color: 'white',

  },
  consolbtn: {
      color: 'white',
      width: 36,
      height: 36,
      textAlign: 'center',
      alignItems: 'center',
      fontSize: 18,
  },
  buttonText: { 
    color: '#fff',
     fontWeight: 'bold',
     
     },
});

export default OrdersScreen;