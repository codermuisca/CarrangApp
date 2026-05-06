import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

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

export default function SongDetail() {
  const { id } = useLocalSearchParams();

  const song = songs.find((item) => item.id === id);

  if (!song) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ThemedText>Canción no encontrada</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <ThemedText type="title" style={{ textAlign: "center" }}>
        {song.title}
      </ThemedText>

      <ThemedText style={{ marginTop: 20 }}>Autor: {song.author}</ThemedText>

      <ThemedText>Ritmo: {song.rhythm}</ThemedText>

      <ThemedText>Tono: {song.tone}</ThemedText>

      <ThemedText
        type="defaultSemiBold"
        style={{ marginTop: 30, marginBottom: 10 }}
      >
        Letra
      </ThemedText>

      <ThemedText>{song.lyrics}</ThemedText>
    </ScrollView>
  );
}
