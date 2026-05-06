import { ThemedText } from "@/components/themed-text";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";

const groups = [
  {
    id: "1",
    name: "Cagajón Carranguero",
    city: "Guacamayas, Boyacá",
    image: require("@/assets/images/cc_logo.png"),
    contactPhone: "322 416 3309 - 317 460 1398",
    redes_sociales: "@cagajon",
  },
  {
    id: "2",
    name: "Velosa y los Carrangueros del 25",
    city: "Tinjacá, Boyacá",
    image: require("@/assets/images/grupo1.jpeg"),
    contactPhone: "311 111 1111",
    redes_sociales: "@heredero",
  },
  {
    id: "3",
    name: "Heredero",
    city: "Bucaramanga, Santander",
    image: require("@/assets/images/grupo2.jpeg"),
    contactPhone: "311 111 1111",
    redes_sociales: "@carranguerosdel25",
  },
];

export default function Groups() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        Grupos carrangueros
      </ThemedText>

      {groups.map((group) => (
        <View
          key={group.id}
          style={{
            marginBottom: 24,
            padding: 16,
            borderRadius: 14,
            backgroundColor: "#1f1f1f",
            alignItems: "center",
          }}
        >
          <Image
            source={group.image}
            style={{
              width: 250,
              height: 250,
              maxWidth: "100%",
              borderRadius: 12,
              marginBottom: 12,
            }}
            contentFit="contain"
          />

          <ThemedText type="defaultSemiBold" style={{ fontSize: 20 }}>
            {group.name}
          </ThemedText>

          <ThemedText>Ciudad: {group.city}</ThemedText>
          <ThemedText>Contacto: {group.contactPhone}</ThemedText>
          <ThemedText>Redes Sociales: {group.redes_sociales}</ThemedText>
        </View>
      ))}
    </ScrollView>
  );
}
