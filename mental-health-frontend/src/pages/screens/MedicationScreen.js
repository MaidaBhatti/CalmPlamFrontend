import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const MedicationScreen = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    axios.get('https://api.fda.gov/drug/label.json?limit=150') // Adjust the endpoint as needed
      .then(response => {
        setMedications(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleToggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderMedications = () => {
    return medications.map((medication, index) => (
      <View key={index} style={styles.medicationContainer}>
        <TouchableOpacity onPress={() => handleToggleExpand(index)}>
          <View style={styles.medicationHeader}>
            {medication.openfda?.image_url ? (
              <Image source={{ uri: medication.openfda.image_url }} style={styles.medicationImage} />
            ) : (
              <View style={styles.medicationImagePlaceholder} />
            )}
            <Text style={styles.medicationName}>{medication.openfda.brand_name || 'Unknown Medication'}</Text>
          </View>
        </TouchableOpacity>
        {expandedIndex === index && (
          <View>
            <Text style={styles.medicationInfo}><Text style={styles.bold}>Benefits:</Text> {medication.indications_and_usage || 'No information available'}</Text>
            <Text style={styles.medicationInfo}><Text style={styles.bold}>Risks of Overdose:</Text> {medication.warnings || 'No information available'}</Text>
          </View>
        )}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medications for Mental Health</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6495ED" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {renderMedications()}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFE5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  medicationContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicationImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  medicationImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginRight: 15,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicationInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default MedicationScreen;
