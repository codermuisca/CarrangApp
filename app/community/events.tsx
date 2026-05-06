import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function Events() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ThemedText type="title">Eventos</ThemedText>

      <ThemedText style={{ marginTop: 20 }}>
        Festival Carranguero - Noviembre
      </ThemedText>

      <ThemedText>Concurso en Duitama</ThemedText>
    </View>
  );
}
