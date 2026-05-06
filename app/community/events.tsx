import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function Events() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ThemedText type="title">Eventos</ThemedText>

      <ThemedText style={{ marginTop: 20 }}>
        Actividad Pro restauración Templo Parroquial - 16 y 17 de Mayo - Barrio
        Bonanza, Bogotá DC
      </ThemedText>
      <ThemedText>
        Inauguración Templo Parroquial - Julio - Guacamayas Boyacá
      </ThemedText>

      <ThemedText>
        Festival Frailejón de Oro - Noviembre - Guicán Boyacá
      </ThemedText>
    </View>
  );
}
