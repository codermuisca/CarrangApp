import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { auth, db } from "@/services/firebase";
import { Image } from "expo-image";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function Home() {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadUserName = async () => {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setName(String(data.name ?? ""));
        }
      } catch (error) {
        console.error("Error cargando nombre:", error);
      }
    };

    loadUserName();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#AED6F1", dark: "#1B4F72" }}
      headerImage={
        <Image
          source={require("@/assets/images/cc_foto1.jpg")}
          style={{
            width: "100%",
            height: 400,
            position: "absolute",
            bottom: 0,
          }}
          contentFit="cover"
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.centerText}>
          CarrangApp 🎵
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Repertorio carranguero digital
        </ThemedText>

        <ThemedText style={styles.author}>By: Coder Muisca</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  centerText: {
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
  },

  author: {
    marginTop: 10,
    textAlign: "center",
  },
});
