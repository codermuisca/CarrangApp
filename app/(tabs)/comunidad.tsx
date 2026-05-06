import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export default function Comunidad() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginBottom: 30 }}
      >
        Comunidad 🌎
      </ThemedText>

      <Pressable
        onPress={() => router.push("/community/groups")}
        style={{
          padding: 20,
          backgroundColor: "#1f1f1f",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <ThemedText style={{ textAlign: "center", fontSize: 18 }}>
          Grupos
        </ThemedText>
      </Pressable>

      <Pressable
        onPress={() => router.push("/community/events")}
        style={{
          padding: 20,
          backgroundColor: "#1f1f1f",
          borderRadius: 10,
        }}
      >
        <ThemedText style={{ textAlign: "center", fontSize: 18 }}>
          Eventos
        </ThemedText>
      </Pressable>
    </View>
  );
}
