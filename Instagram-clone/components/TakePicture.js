import React, { createContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import { SafeAreaView, ScrollView, FlatList, Dimensions } from "react-native";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";
export default function TakePicture() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  async function takePicture() {
    const result = await cameraRef.current.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(result.uri);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons
              style={{ right: 40, bottom: 20 }}
              name="camera"
              size={52}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.takePicture}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            flashMode="torch"
            onPress={takePicture}
          >
            <Ionicons
              name="flashlight"
              size={52}
              color="white"
              style={{ left: 40, bottom: 20 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  takePicture: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: "white",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
