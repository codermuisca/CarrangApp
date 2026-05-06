import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";

export default function Home() {
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
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <ThemedText type="title" style={{ textAlign: "center" }}>
          CarrangApp 🎵
        </ThemedText>

        <ThemedText style={{ marginTop: 10, textAlign: "center" }}>
          Repertorio carranguero digital
        </ThemedText>

        <ThemedText style={{ marginTop: 10, textAlign: "center" }}>
          By: Coder Muisca
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
