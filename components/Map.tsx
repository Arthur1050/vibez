import { DarkMapStyle } from "@/constants/DarkMapStyle";
import { useGlobalStore } from "@/store";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const { setIsUpcomingEventsOpened } = useGlobalStore();

  useEffect(() => {
    (async () => {
      // Solicitar permissão de localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada");
        Alert.alert(
          "Erro",
          "Permissão de localização é necessária para usar o app"
        );
        return;
      }

      // Obter localização atual
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Observar mudanças de localização (sem animar automaticamente)
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Atualizar a cada 5 segundos
          distanceInterval: 10, // Ou quando mover 10 metros
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    })();
  }, []);

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  let text = "Aguardando localização...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Lat: ${location.coords.latitude.toFixed(
      6
    )}, Long: ${location.coords.longitude.toFixed(6)}`;
  }
  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || -23.5505,
          longitude: location?.coords.longitude || -46.6333,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        userLocationAnnotationTitle="Você está aqui"
        customMapStyle={DarkMapStyle}
        onPanDrag={() => {
          setIsUpcomingEventsOpened(false);
        }}
      />

      <Text style={styles.text}>{text}</Text>

      <TouchableOpacity
        style={styles.centerButton}
        onPress={centerOnUser}
        disabled={!location}
      >
        <Text style={styles.buttonText}>📍</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  text: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 5,
    fontSize: 12,
    textAlign: 'center',
    maxWidth: '90%',
  },
  centerButton: {
    position: 'absolute',
    bottom: 125,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});