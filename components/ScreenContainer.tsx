import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function ScreenContainer({ children }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6F8", // puedes cambiar el color
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
