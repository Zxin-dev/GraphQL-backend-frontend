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
const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth * 0.33;
const imageGap = windowWidth * 0.005;
export default function Album({ navigation }) {
  const [permissionResponse, requestPermissions] =
    MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  async function loadPhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: [`creationTime`],
      first: 30,
    });
    setPhotos(media.assets);
  }

  async function uploadHander({ navigation }) {
    for (let i = 0; i < selectedPhotos.length + 1; i++) {
      const photo = selectedPhotos[i];
      const info = await MediaLibrary.getAssetInfoAsync(photo);

      const data = new FormData();
      data.append(`file`, { uri: info.localUri, name: info.filename });
      data.append(`upload_preset`, `tvcxjkpn`);
      data.append(`cloud_name`, `dimxug1xj`);
      fetch(`https://api.cloudinary.com/v1_1/dimxug1xj/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUploadedImages([...uploadedImages, data.secure_url]);
          console.log("ynzga" + uploadedImages);
        })
        .catch((error) => {
          alert("An error occurred while uploading");
        });
    }
  }
  useEffect(() => {
    if (permissionResponse && permissionResponse.granted) {
      loadPhotos();
    }
  }, [permissionResponse]);
  if (!permissionResponse) {
    return <View></View>;
  }
  const { granted, canAskAgain } = permissionResponse;
  if (!granted && canAskAgain) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{ backgroundColor: "black", padding: 20, borderRadius: 10 }}
          onPress={requestPermissions}
        >
          <Text style={{ color: "white" }}>requestPermission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (!granted && !canAskAgain) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 23 }}>
          Settings {`>`} permission {`>`} storage
        </Text>
      </View>
    );
  }
  function loadMore() {}
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <FlatList
        onEndReached={loadMore}
        numColumns={3}
        data={photos}
        renderItem={({ item, index }) => (
          <ImageItem
            onSelect={() => setSelectedPhotos([...selectedPhotos, item])}
            onRemove={() =>
              setSelectedPhotos(
                selectedPhotos.filter((selected) => selected.id !== item.id)
              )
            }
            selected={
              selectedPhotos.findIndex((selected) => selected.id === item.id) +
              1
            }
            photo={item}
            index={index}
          />
        )}
        keyExtractor={(item) => item.uri}
      ></FlatList>

      {selectedPhotos.length > 0 && (
        <Pressable
          onPress={() => uploadHander({ navigation })}
          style={{
            backgroundColor: "black",
            position: "absolute",
            flex: 1,
            width: 250,
            height: 60,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            bottom: 20,
          }}
        >
          <Text style={{ color: "white" }}>Upload image on internet</Text>
        </Pressable>
      )}
    </View>
  );
}

function ImageItem({ photo, index, onSelect, onRemove, selected }) {
  const marginHorizontal = index % 3 === 1 ? imageGap : 0;

  return (
    <TouchableOpacity onPress={() => (selected ? onRemove() : onSelect())}>
      <View
        style={{
          width: imageWidth,
          height: imageWidth,
          marginBottom: imageGap,
          marginHorizontal,
          position: "relative",
        }}
      >
        <Image
          source={{ uri: photo.uri }}
          style={{
            width: imageWidth,
            height: imageWidth,
            backgroundColor: "#ccc",
          }}
        />
        {!!selected && (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              backgroundColor: "rgba(255,255,255,0.6)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "blue",
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>{selected}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
