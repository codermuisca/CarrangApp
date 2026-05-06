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
    </ScrollView>
  );
}
