import { ThemedText } from "@/components/themed-text";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, View } from "react-native";

const groups = [
  {
    id: "1",
    name: "Cagajón Carranguero",
    city: "Guacamayas, Boyacá",
    image: require("@/assets/images/cc_logo.png"),
    contactPhone: "322 416 3309",
    redes_sociales: "@cagajon",
  },
  {
    id: "2",
    name: "Velosa y los Carrangueros del 25",
    city: "Tinjacá, Boyacá",
    image: require("@/assets/images/grupo1.jpeg"),
    contactPhone: "311 111 1111",
    redes_sociales: "carranguerosdel25",
  },
  {
    id: "3",
    name: "Heredero",
    city: "Bucaramanga, Santander",
    image: require("@/assets/images/grupo2.jpeg"),
    contactPhone: "311 111 1111",
    redes_sociales: "@heredero",
  },
];

export default function Groups() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Grupos Carrangueros 🪕
        </ThemedText>

        <View style={styles.groupsContainer}>
          {groups.map((group) => (
            <View key={group.id} style={styles.card}>
              <Image
                source={group.image}
                style={styles.image}
                contentFit="contain"
              />

              <ThemedText type="defaultSemiBold" style={styles.groupName}>
                {group.name}
              </ThemedText>

              <ThemedText style={styles.info}>📍 {group.city}</ThemedText>

              <ThemedText style={styles.info}>
                📞 {group.contactPhone}
              </ThemedText>

              <ThemedText style={styles.info}>
                🌐 {group.redes_sociales}
              </ThemedText>
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

  groupsContainer: {
    width: "100%",
    gap: 20,
  },

  card: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
  },

  image: {
    width: 250,
    height: 250,
    maxWidth: "100%",
    borderRadius: 12,
    marginBottom: 14,
  },

  groupName: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },

  info: {
    textAlign: "center",
    marginTop: 4,
  },
});
