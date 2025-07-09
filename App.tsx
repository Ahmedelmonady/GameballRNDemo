import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { GameballSDK, GameballWidget } from 'react-native-gameball';

const SimpleGameballApp = () => {
  const widgetRef = useRef<GameballWidget>(null);
  const [playerUniqueId, setPlayerUniqueId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize Gameball SDK with default API key on app start
    // Replace 'YOUR_API_KEY' with your actual Gameball API key
    GameballWidget.init({
      api: 'YOUR_API_KEY',
      lang: 'en'
    });
    setIsInitialized(true);
  }, []);

  const showProfile = () => {
    // Update API key if provided
    if (apiKey.trim()) {
      try {
        GameballWidget.init({
          api: apiKey.trim(),
          lang: 'en'
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to update API key');
        console.error('Gameball initialization error:', error);
        return;
      }
    }

    if (!playerUniqueId.trim()) {
      Alert.alert('Error', 'Please enter a player ID');
      return;
    }

    try {
      GameballWidget.initialize_player(playerUniqueId.trim());

      if (widgetRef.current) {
        widgetRef.current.showProfile();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to show profile');
      console.error('Show profile error:', error);
    }
  };

  const resetApp = () => {
    setPlayerUniqueId('');
    setApiKey('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Gameball Profile Demo</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>API Key *</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your Gameball API key"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Player ID *</Text>
          <TextInput
            style={styles.input}
            value={playerUniqueId}
            onChangeText={setPlayerUniqueId}
            placeholder="Enter unique player ID"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.profileSection}>
          <TouchableOpacity
            style={[styles.button, styles.profileButton]}
            onPress={showProfile}
          >
            <Text style={styles.buttonText}>Show Gameball Profile</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetApp}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Gameball Widget */}
      <GameballWidget
        ref={widgetRef}
        modal={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  profileButton: {
    backgroundColor: '#34C759',
  },
  resetButton: {
    backgroundColor: '#FF9500',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
});

export default SimpleGameballApp;