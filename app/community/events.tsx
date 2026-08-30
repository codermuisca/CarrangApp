import { ThemedText } from "@/components/themed-text";
import { ScrollView, StyleSheet, View } from "react-native";

const events = [
  {
    title: "Actividad Pro restauración Templo Parroquial",
    date: "16 y 17 de mayo",
    place: "Barrio Bonanza, Bogotá D.C.",
  },
  {
    title: "Inauguración Templo Parroquial",
    date: "Julio",
    place: "Guacamayas, Boyacá",
  },
  {
    title: "Festival Frailejón de Oro",
    date: "Noviembre",
    place: "Güicán, Boyacá",
  },
];

export default function Events() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Eventos 📅
        </ThemedText>

        <View style={styles.eventsContainer}>
          {events.map((event, index) => (
            <View key={index} style={styles.card}>
              <ThemedText type="defaultSemiBold" style={styles.eventTitle}>
                {event.title}
              </ThemedText>

              <ThemedText style={styles.date}>📅 {event.date}</ThemedText>

              <ThemedText style={styles.place}>📍 {event.place}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 90,
    alignItems: "center",
  },

  content: {
    width: "100%",
    maxWidth: 500,
  },

  title: {
    textAlign: "center",
    marginBottom: 30,
  },

  eventsContainer: {
    width: "100%",
    gap: 14,
  },

  card: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#1f1f1f",
  },

  eventTitle: {
    fontSize: 17,
  },

  date: {
    marginTop: 8,
  },

  place: {
    marginTop: 4,
    opacity: 0.75,
  },
});
