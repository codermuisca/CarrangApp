// SongCard.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Song } from "../types/song";

interface Props {
  song: Song & { id: string };
  onPress?: () => void;
  compact?: boolean;
}

export default function SongCard({ song, onPress, compact }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, compact ? styles.cardCompact : styles.cardFull]}
      onPress={onPress}
    >
      <Text
        style={[styles.title, compact ? styles.titleCompact : styles.titleFull]}
      >
        {song.title}
      </Text>
      <Text
        style={[
          styles.artist,
          compact ? styles.artistCompact : styles.artistFull,
        ]}
      >
        {song.artist}
      </Text>

      {/* tono y ritmo siempre visibles */}
      <View style={styles.row}>
        <Text style={styles.meta}>🎼 {song.tone}</Text>
        <Text style={styles.meta}>🥁 {song.rhythm}</Text>
      </View>

      {/* letras solo en vista completa */}
      {!compact && song.lyrics && (
        <Text style={styles.lyrics}>{song.lyrics}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  cardCompact: {
    alignItems: "flex-start", // 👈 lista: alineado a la izquierda
  },
  cardFull: {
    alignItems: "center", // 👈 detalle: centrado
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleCompact: {
    textAlign: "left",
    width: "100%",
  },
  titleFull: {
    textAlign: "center",
    width: "100%",
  },
  artist: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  artistCompact: {
    textAlign: "left",
    width: "100%",
  },
  artistFull: {
    textAlign: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  meta: {
    fontSize: 13,
    color: "#777",
  },
  lyrics: {
    marginTop: 8,
    fontSize: 12,
    color: "#444",
    fontStyle: "italic",
    textAlign: "center",
  },
});
