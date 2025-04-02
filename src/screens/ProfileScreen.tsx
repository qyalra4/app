// screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, 
  Image, TouchableWithoutFeedback, Dimensions 
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const getChartData = (type: string) => {
  switch (type) {
    case 'يوم واحد':
      return {
        labels: ['08', '10', '12', '14', '16', '18', '20'],
        datasets: [
          {
            data: [5, 10, 7, 12, 8, 15, 10],
          },
        ],
      };
    case 'أسبوع':
      return {
        labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        datasets: [
          {
            data: [20, 25, 18, 30, 22, 27, 35],
          },
        ],
      };
    case 'شهر':
      return {
        labels: ['1', '5', '10', '15', '20', '25', '30'],
        datasets: [
          {
            data: [50, 60, 55, 70, 65, 80, 75],
          },
        ],
      };
    case 'الجميع':
      return {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        datasets: [
          {
            data: [200, 180, 210, 240, 220, 230, 250, 260, 240, 230, 220, 210],
          },
        ],
      };
    default:
      return { labels: [], datasets: [] };
  }
};

const ProfileScreen: React.FC = () => {
  // متغيرات الإحصائيات
  const [statsType, setStatsType] = useState('يوم واحد');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const statsOptions = ['يوم واحد', 'أسبوع', 'شهر', 'الجميع'];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'ياسين مثنى',
    username: '123456789000',
    profileImage: require('../images/r.jpg'),
  });

  const handleEdit = (field: string) => {
    setSelectedField(field);
    setModalVisible(true);
    setSidebarVisible(false); 
  };

  const handleSave = (newValue: string) => {
    setUserInfo((prev) => ({ ...prev, [selectedField]: newValue }));
    setModalVisible(false);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  // بيانات الرسم البياني والإحصائيات
  const chartData = getChartData(statsType);
  const totalOrders = chartData.datasets[0].data.reduce((sum, value) => sum + value, 0);
  const overallOrders = 1000; 

  return (
    <TouchableWithoutFeedback onPress={closeSidebar}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
        <Text style={styles.appName}>تطبيقي</Text>

          <TouchableOpacity onPress={toggleSidebar}>
            <Text style={styles.menuButton}>☰</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* معلومات المستخدم */}
          <View style={styles.userInfo}>
            <Image source={userInfo.profileImage} style={styles.profileImage} />
            <View style={styles.heading}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.username}>ID: {userInfo.username}</Text>
            </View>
            <View style={styles.allPro}>
              <Text style={styles.ProCODE}>2025/4/1</Text>
              <Text style={styles.ProTITLE}>تاريخ</Text>
            </View>
          </View>

          {/* قسم الإحصائيات */}
          <View style={styles.statistics}>
            <View style={styles.optionsRow}>
                  {statsOptions.map((option, index) => (
                   <TouchableOpacity
                   key={index}
                   style={[
                   styles.optionButton,
                   statsType === option && styles.activeOption,
              ]}
                  onPress={() => setStatsType(option)}
                >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
                  ))}
            </View>


            <LineChart
              data={chartData}
              width={screenWidth - 20}
              height={280}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 6,
                },
                propsForDots: {
                  r: '5',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              style={styles.chart}
            />

            <View style={styles.dataSummary}>
              <Text style={styles.dataText}> الطلبات الحالية : {totalOrders}</Text>
              <Text style={styles.dataText}>العدد الكلي: {overallOrders}</Text>
            </View>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>تعديل {selectedField}</Text>
              <TextInput
                style={styles.input}
                placeholder={`أدخل ${selectedField}`}
                onChangeText={(text) => handleSave(text)}
              />
              <TouchableOpacity style={styles.saveButton} onPress={() => handleSave(selectedField)}>
                <Text style={styles.saveButtonText}>حفظ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>إغلاق</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* القائمة الجانبية */}
        {sidebarVisible && (
          <View style={styles.sidebar}>
            <TouchableOpacity style={styles.sidebarButton} onPress={() => handleEdit('name')}>
              <Text style={styles.sidebarButtonText}>تغيير الاسم</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton} onPress={() => handleEdit('username')}>
              <Text style={styles.sidebarButtonText}>تغيير معرف المستخدم</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton} onPress={() => handleEdit('profileImage')}>
              <Text style={styles.sidebarButtonText}>تغيير الصورة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton} onPress={() => handleEdit('symbol')}>
              <Text style={styles.sidebarButtonText}>تغيير الرمز</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    direction: 'rtl',

    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    fontSize: 26,
    padding: 5,
  },
  content: {
    
  },
  userInfo: {
    direction: 'rtl',
    gap: 15,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 25,
    paddingInline: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  heading: {
    gap: 12,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'serif',
  },
  allPro: {
    marginLeft: 10, 
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  ProCODE: {
    fontSize: 15,
    fontWeight: '400',
  },
  ProTITLE: {
    fontSize: 17,
    fontWeight: '600',
  },

  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBlock: 6,
    borderWidth: 1,
    borderColor: '#e26a00',

  },
  optionButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  activeOption: {
    backgroundColor: '#e26a00',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  }, 

  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#e26a00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 40,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    padding: 10,
    paddingTop: 28,
    direction: 'rtl',
    gap: 14,
  },
  sidebarButton: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
  },
  sidebarButtonText: {
    fontSize: 16,
    color: 'black',
  },
  statistics: {
    paddingInline: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownOption: {
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  dataSummary: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  dataText: {
    fontSize: 16,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
});
