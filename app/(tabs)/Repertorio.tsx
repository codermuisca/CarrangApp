// Repertorio.tsx
import { collection, getDocs } from "firebase/firestore"; // sintaxis modular
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import SongCard from "../../components/SongCard";
import { db } from "../../services/firebase"; // tu archivo firebase.ts
import { Song } from "../../types/song";

export default function Repertorio() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "songs"));
        const songsData: Song[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Song),
        }));
        setSongs(songsData);
      } catch (error) {
        console.log("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <ScreenContainer>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <SongCard song={item} />}
      />
    </ScreenContainer>
  );
}
