import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

const songs = [
  {
    id: "1",
    title: "La cucharita",
    author: "Jorge Velosa",
    rhythm: "Carranga",
    tone: "G",
    lyrics: "Letra de ejemplo de La cucharita...",
  },
  {
    id: "2",
    title: "Julia Julia",
    author: "Los Carrangueros",
    rhythm: "Rumba criolla",
    tone: "C",
    lyrics: "Letra de ejemplo de Julia Julia...",
  },
];

export default function Repertorio() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginBottom: 30 }}
      >
        Repertorio 🎵
      </ThemedText>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {songs.map((song) => (
          <Pressable
            key={song.id}
            onPress={() => router.push(`/song/${song.id}`)}
            style={{
              width: "30%",
              padding: 12,
              borderRadius: 10,
              backgroundColor: "#1f1f1f",
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ textAlign: "center" }}>
              {song.title}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
