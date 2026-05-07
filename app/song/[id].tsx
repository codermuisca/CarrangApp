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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <ThemedText>Cargando canción...</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 100,
      }}
    >
      <ThemedText
        type="title"
        style={{
          textAlign: "center",
          marginBottom: 20,
          lineHeight: 38,
        }}
      >
        {song.title}
      </ThemedText>

      <View
        style={{
          backgroundColor: "#1f1f1f",
          padding: 16,
          borderRadius: 14,
          marginBottom: 24,
        }}
      >
        <ThemedText
          style={{
            color: "white",
            marginBottom: 8,
            lineHeight: 22,
          }}
        >
          Autor: {song.author || "Desconocido"}
        </ThemedText>

        <ThemedText
          style={{
            color: "white",
            marginBottom: 8,
            lineHeight: 22,
          }}
        >
          Ritmo: {song.rhythm || "No definido"}
        </ThemedText>

        <ThemedText
          style={{
            color: "white",
            lineHeight: 22,
          }}
        >
          Tono: {song.tone || "No definido"}
        </ThemedText>
      </View>

      <View
        style={{
          backgroundColor: "#1f1f1f",
          padding: 18,
          borderRadius: 14,
        }}
      >
        <ThemedText
          style={{
            color: "white",
            fontSize: 16,
            lineHeight: 28,
            flexShrink: 1,
          }}
        >
          {song.lyrics || "No hay letra disponible."}
        </ThemedText>
      </View>
    </ScrollView>
  );
}
