import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Comunidad() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Comunidad 📻
        </ThemedText>

        <Pressable
          onPress={() => router.push("/community/groups")}
          style={styles.card}
        >
          <ThemedText style={styles.cardText}>Grupos</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => router.push("/community/events")}
          style={styles.card}
        >
          <ThemedText style={styles.cardText}>Eventos</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 20,
  },

  content: {
    width: "100%",
    maxWidth: 500,
  },

  title: {
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    marginBottom: 20,
  },

  cardText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
});
