import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { auth, db } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

type UserProfile = {
  name: string;
  email: string;
  role: string;
  photoURL: string;
};

export default function Perfil() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          const userProfile: UserProfile = {
            name: String(data.name ?? ""),
            email: String(data.email ?? user.email ?? ""),
            role: String(data.role ?? "user"),
            photoURL: String(data.photoURL ?? ""),
          };

          setProfile(userProfile);
          setName(userProfile.name);
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
        setMessage("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    if (!name.trim()) {
      setMessage("El nombre no puede estar vacío.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        name: name.trim(),
      });

      setProfile((current) =>
        current
          ? {
              ...current,
              name: name.trim(),
            }
          : current,
      );

      setMessage("Perfil actualizado correctamente.");
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      setMessage("No se pudo actualizar el perfil.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      setMessage("No se pudo cerrar la sesión.");
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Cargando perfil...</ThemedText>
      </ThemedView>
    );
  }

  if (!profile) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No se encontró el perfil.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Mi perfil
      </ThemedText>

      {profile.photoURL ? (
        <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <ThemedText style={styles.avatarLetter}>
            {(profile.name || profile.email).charAt(0).toUpperCase()}
          </ThemedText>
        </View>
      )}

      <ThemedText style={styles.label}>Nombre</ThemedText>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Tu nombre"
        placeholderTextColor="#888"
      />

      <ThemedText style={styles.label}>Correo</ThemedText>

      <View style={styles.readOnlyField}>
        <ThemedText>{profile.email}</ThemedText>
      </View>

      {message !== "" && (
        <ThemedText style={styles.message}>{message}</ThemedText>
      )}

      <Pressable
        style={[styles.saveButton, saving && styles.disabledButton]}
        onPress={handleSave}
        disabled={saving}
      >
        <ThemedText style={styles.buttonText}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </ThemedText>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.buttonText}>Cerrar sesión</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },

  title: {
    marginBottom: 25,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 25,
  },

  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  avatarLetter: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
  },

  label: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 6,
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#1f1f1f",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 18,
  },

  readOnlyField: {
    width: "100%",
    maxWidth: 400,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#2a2a2a",
    marginBottom: 18,
  },

  message: {
    width: "100%",
    maxWidth: 400,
    textAlign: "center",
    marginBottom: 15,
  },

  saveButton: {
    width: "100%",
    maxWidth: 150,
    backgroundColor: "#628f64",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  logoutButton: {
    width: "100%",
    maxWidth: 150,
    backgroundColor: "#be625e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
