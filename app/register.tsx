import { ThemedText } from "@/components/themed-text";
import { auth, db } from "@/services/firebase";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("");

    if (!name.trim() || !email.trim() || !password) {
      setMessage("Ingresa tu nombre, correo y contraseña.");
      return;
    }

    if (name.trim().length < 2) {
      setMessage("Escribe un nombre válido.");
      return;
    }

    if (password.length < 6) {
      setMessage("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    try {
      setLoading(true);

      // 1. Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = userCredential.user;

      // 2. Guardar el nombre también en Firebase Authentication
      await updateProfile(user, {
        displayName: name.trim(),
      });

      // 3. Crear perfil en Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email ?? "",
        role: "user",
        photoURL: "",
        createdAt: serverTimestamp(),
      });

      // 4. Entrar a CarrangApp
      router.replace("/");
    } catch (error: any) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setMessage("Este correo ya está registrado. Intenta iniciar sesión.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("Escribe un correo electrónico válido.");
      } else if (error.code === "auth/weak-password") {
        setMessage("La contraseña debe tener mínimo 6 caracteres.");
      } else if (error.code === "permission-denied") {
        setMessage("La cuenta fue creada, pero no se pudo crear el perfil.");
      } else {
        setMessage("No se pudo crear la cuenta. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Crear cuenta 🎵
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

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
        onPress={handleRegister}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </ThemedText>
      </Pressable>

      <Pressable onPress={() => router.push("/login")} disabled={loading}>
        <ThemedText style={styles.login}>
          ¿Ya tienes cuenta? Iniciar sesión
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
    marginBottom: 25,
    textAlign: "center",
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

  login: {
    marginTop: 20,
    textAlign: "center",
  },
});
