import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { auth } from "@/services/firebase";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();

  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Escucha permanentemente el estado de la sesión de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  // Decide a qué pantalla debe ir el usuario
  useEffect(() => {
    if (loadingAuth) {
      return;
    }

    const currentRoute = segments[0];

    const isAuthScreen =
      currentRoute === "login" || currentRoute === "register";

    // Si NO está conectado, lo enviamos al login
    if (!user && !isAuthScreen) {
      router.replace("/login");
      return;
    }

    // Si YA está conectado y entra a login/register,
    // lo enviamos al inicio de CarrangApp
    if (user && isAuthScreen) {
      router.replace("/");
    }
  }, [user, loadingAuth, segments]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
