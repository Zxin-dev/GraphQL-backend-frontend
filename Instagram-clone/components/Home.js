import { NavigationContainer } from "@react-navigation/native";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Home({ navigation }) {
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",

          padding: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Pressable onPress={() => navigation.navigate(`Camera`)}>
            <Ionicons name="camera" size={129} color="black" />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate(`Media`)}>
            <Ionicons å name="albums" size={129} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
