import { ThemedText } from "@/components/themed-text";
import { db } from "@/services/firebase";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

type Song = {
  title: string;
  author?: string;
  rhythm?: string;
  tone?: string;
  lyrics?: string;
};

export default function SongDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      if (!id) return;

      const songRef = doc(db, "songs", id);
      const songSnap = await getDoc(songRef);

      if (songSnap.exists()) {
        setSong(songSnap.data() as Song);
      }
    };

    fetchSong();
  }, [id]);

  if (!song) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ThemedText>Cargando canción...</ThemedText>
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
      ></ThemedText>

      <ThemedText>{song.lyrics}</ThemedText>
    </ScrollView>
  );
}
