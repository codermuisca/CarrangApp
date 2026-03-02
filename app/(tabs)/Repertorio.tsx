import { useRouter } from "expo-router"; // 👈 importamos router
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import SongCard from "../../components/SongCard";
import { songConverter } from "../../services/converters/SongConverter";
import { db } from "../../services/firebase";
import { Song } from "../../types/song";

export default function Repertorio() {
  const [songs, setSongs] = useState<(Song & { id: string })[]>([]);
  const router = useRouter(); // 👈 inicializamos router

  useEffect(() => {
    const fetchSongs = async (): Promise<void> => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "Songs").withConverter(songConverter),
        );

        console.log("Número de documentos:", querySnapshot.size);

        const songsData = querySnapshot.docs.map((doc) => {
          console.log("Documento leído:", doc.id, doc.data());
          return doc.data();
        });

        console.log("Canciones obtenidas:", songsData);

        setSongs(songsData);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <ScreenContainer>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SongCard
            song={item}
            compact
            onPress={() =>
              router.push({ pathname: "/song/[id]", params: { ...item } })
            }
          />
        )}
        ListEmptyComponent={<Text>No hay canciones disponibles</Text>}
      />
    </ScreenContainer>
  );
}
