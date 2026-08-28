import { ThemedText } from "@/components/themed-text";
import { auth, db } from "@/services/firebase";
import { router } from "expo-router";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Ingresa tu correo y contraseña.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email.trim(), password);

      router.replace("/");
    } catch (error: any) {
      console.error(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setMessage("Correo o contraseña incorrectos.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("Escribe un correo electrónico válido.");
      } else if (error.code === "auth/too-many-requests") {
        setMessage(
          "Demasiados intentos. Espera un momento e inténtalo nuevamente.",
        );
      } else {
        setMessage("No se pudo iniciar sesión. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");

    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userRef = doc(db, "users", user.uid);

      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          name: user.displayName ?? "",
          email: user.email ?? "",
          role: "user",
          photoURL: user.photoURL ?? "",
          createdAt: serverTimestamp(),
        });
      }

      router.replace("/");
    } catch (error: any) {
      console.error(error);

      if (error.code === "auth/popup-closed-by-user") {
        setMessage("Cerraste la ventana de Google antes de terminar.");
      } else if (error.code === "auth/popup-blocked") {
        setMessage(
          "El navegador bloqueó la ventana de Google. Permite ventanas emergentes e inténtalo nuevamente.",
        );
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        setMessage(
          "Ya existe una cuenta con este correo usando otro método de inicio de sesión.",
        );
      } else if (error.code === "permission-denied") {
        setMessage(
          "Iniciaste sesión con Google, pero no se pudo crear tu perfil.",
        );
      } else {
        setMessage("No se pudo iniciar sesión con Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        CarrangApp 🎵
      </ThemedText>

      <ThemedText style={styles.subtitle}>Iniciar sesión</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {message !== "" && (
        <ThemedText style={styles.message}>{message}</ThemedText>
      )}

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </ThemedText>
      </Pressable>

      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />

        <ThemedText style={styles.separatorText}>o</ThemedText>

        <View style={styles.separatorLine} />
      </View>

      <Pressable
        style={[styles.googleButton, loading && styles.buttonDisabled]}
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <ThemedText style={styles.googleButtonText}>
          Continuar con Google
        </ThemedText>
      </Pressable>

      <Pressable onPress={() => router.push("/register")} disabled={loading}>
        <ThemedText style={styles.register}>
          ¿No tienes cuenta? Crear cuenta
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 20,
    marginBottom: 25,
  },

  input: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#1f1f1f",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  message: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 15,
    textAlign: "center",
    color: "#d32f2f",
  },

  button: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  separatorContainer: {
    width: "100%",
    maxWidth: 400,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#777",
  },

  separatorText: {
    marginHorizontal: 12,
  },

  googleButton: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  googleButtonText: {
    color: "#222",
    fontWeight: "bold",
  },

  register: {
    marginTop: 20,
    textAlign: "center",
  },
});
