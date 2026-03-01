import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Song } from "../types/song";

interface Props {
  song: Song;
  onPress?: () => void;
}

export default function SongCard({ song, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      <View style={styles.row}>
        <Text style={styles.meta}>🎼 {song.tone}</Text>
        <Text style={styles.meta}>🥁 {song.rhythm}</Text>
      </View>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  artist: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    fontSize: 13,
    color: "#777",
  },
});
