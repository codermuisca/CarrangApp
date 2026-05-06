import { ThemedText } from "@/components/themed-text";
import { db } from "@/services/firebase";
import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

type Song = {
  id: string;
  title: string;
  author?: string;
  rhythm?: string;
  tone?: string;
  lyrics?: string;
};

export default function Repertorio() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "songs"));

      const data: Song[] = querySnapshot.docs.map((document) => {
        const songData = document.data();

        return {
          id: document.id,
          title: String(songData.title ?? "Sin título"),
          author: String(songData.author ?? ""),
          rhythm: String(songData.rhythm ?? ""),
          tone: String(songData.tone ?? ""),
          lyrics: String(songData.lyrics ?? ""),
        };
      });

      setSongs(data);
    };

    fetchSongs();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: 90 }}
    >
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginBottom: 30 }}
      >
        Repertorio 🎵
      </ThemedText>

      <View style={{ gap: 12 }}>
        {/* 👇 Mensaje si no hay canciones */}
        {songs.length === 0 && (
          <ThemedText style={{ textAlign: "center" }}>
            No hay canciones cargadas todavía.
          </ThemedText>
        )}

        {/* Listado de canciones */}
        {songs.map((song) => (
          <Pressable
            key={song.id}
            onPress={() => router.push(`/song/${song.id}`)}
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 12,
              backgroundColor: "#1f1f1f",
            }}
          >
            <ThemedText type="defaultSemiBold">{song.title}</ThemedText>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
