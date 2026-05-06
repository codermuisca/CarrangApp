import { ThemedText } from "@/components/themed-text";
import { ScrollView, View } from "react-native";

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
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: 90 }}
    >
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        Eventos
      </ThemedText>

      <View style={{ gap: 14 }}>
        {events.map((event, index) => (
          <View
            key={index}
            style={{
              padding: 16,
              borderRadius: 14,
              backgroundColor: "#1f1f1f",
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ fontSize: 17 }}>
              {event.title}
            </ThemedText>

            <ThemedText style={{ marginTop: 8 }}>📅 {event.date}</ThemedText>

            <ThemedText style={{ marginTop: 4, opacity: 0.75 }}>
              📍 {event.place}
            </ThemedText>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
