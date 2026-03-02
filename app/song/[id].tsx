// app/song/[id].tsx
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import SongCard from "../../components/SongCard";

export default function SongDetail() {
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    artist: string;
    tone: string;
    rhythm: string;
    lyrics?: string;
  }>();

  const navigation = useNavigation();

  useEffect(() => {
    if (params.title) {
      navigation.setOptions({ title: params.title });
    }
  }, [params.title]);

  return <SongCard song={params as any} />;
}
