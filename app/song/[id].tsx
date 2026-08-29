import { ThemedText } from "@/components/themed-text";
import { auth, db } from "@/services/firebase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

type Song = {
  title: string;
  author?: string;
  rhythm?: string;
  tone?: string;
  lyrics?: string;
};

export default function SongDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [song, setSong] = useState<Song | null>(null);
  const [note, setNote] = useState("");
  const [noteExists, setNoteExists] = useState(false);
  const [loadingNote, setLoadingNote] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Cargar canción
  useEffect(() => {
    const fetchSong = async () => {
      if (!id) return;

      try {
        const songRef = doc(db, "songs", id);
        const songSnap = await getDoc(songRef);

        if (songSnap.exists()) {
          setSong(songSnap.data() as Song);
        }
      } catch (error) {
        console.error("Error cargando canción:", error);
      }
    };

    fetchSong();
  }, [id]);

  // Cargar nota del usuario
  useEffect(() => {
    const fetchNote = async () => {
      const user = auth.currentUser;

      if (!user || !id) {
        setLoadingNote(false);
        return;
      }

      try {
        const noteRef = doc(db, "users", user.uid, "notes", id);

        const noteSnap = await getDoc(noteRef);

        if (noteSnap.exists()) {
          const data = noteSnap.data();

          setNote(String(data.text ?? ""));
          setNoteExists(true);
        } else {
          setNote("");
          setNoteExists(false);
        }
      } catch (error) {
        console.error("Error cargando nota:", error);
      } finally {
        setLoadingNote(false);
      }
    };

    fetchNote();
  }, [id]);

  // SAVE
  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user || !id) {
      setMessage("Debes iniciar sesión.");
      return;
    }

    if (!note.trim()) {
      setMessage("Escribe una nota antes de guardarla.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const noteRef = doc(db, "users", user.uid, "notes", id);

      await setDoc(noteRef, {
        text: note.trim(),
        songId: id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setNoteExists(true);
      setMessage("Nota guardada.");
    } catch (error) {
      console.error("Error guardando nota:", error);
      setMessage("No se pudo guardar la nota.");
    } finally {
      setSaving(false);
    }
  };

  // EDIT
  const handleEdit = async () => {
    const user = auth.currentUser;

    if (!user || !id) {
      setMessage("Debes iniciar sesión.");
      return;
    }

    if (!note.trim()) {
      setMessage("La nota no puede quedar vacía.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const noteRef = doc(db, "users", user.uid, "notes", id);

      await updateDoc(noteRef, {
        text: note.trim(),
        updatedAt: serverTimestamp(),
      });

      setMessage("Nota actualizada.");
    } catch (error) {
      console.error("Error editando nota:", error);
      setMessage("No se pudo editar la nota.");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    const user = auth.currentUser;

    if (!user || !id) {
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const noteRef = doc(db, "users", user.uid, "notes", id);

      await deleteDoc(noteRef);

      setNote("");
      setNoteExists(false);
      setMessage("Nota eliminada.");
    } catch (error) {
      console.error("Error eliminando nota:", error);
      setMessage("No se pudo eliminar la nota.");
    } finally {
      setSaving(false);
    }
  };

  if (!song) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Cargando canción...</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          {song.title}
        </ThemedText>

        {/* Información */}
        <View style={styles.card}>
          <ThemedText style={styles.infoText}>
            Autor: {song.author || "Desconocido"}
          </ThemedText>

          <ThemedText style={styles.infoText}>
            Ritmo: {song.rhythm || "No definido"}
          </ThemedText>

          <ThemedText style={styles.infoTextLast}>
            Tono: {song.tone || "No definido"}
          </ThemedText>
        </View>

        {/* Letra */}
        <View style={styles.card}>
          <ThemedText style={styles.lyrics}>
            {song.lyrics || "No hay letra disponible."}
          </ThemedText>
        </View>

        {/* Notas */}
        <View style={styles.notesCard}>
          <ThemedText type="subtitle" style={styles.notesTitle}>
            Notas
          </ThemedText>

          {loadingNote ? (
            <ThemedText style={styles.loadingNote}>Cargando nota...</ThemedText>
          ) : (
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={(text) => {
                setNote(text);
                setMessage("");
              }}
              placeholder="Escribe tus notas aquí..."
              placeholderTextColor="#888"
              multiline
              textAlignVertical="top"
            />
          )}

          {message !== "" && (
            <ThemedText style={styles.message}>{message}</ThemedText>
          )}

          <View style={styles.actions}>
            {!noteExists ? (
              <Pressable
                style={[styles.iconButton, saving && styles.disabledButton]}
                onPress={handleSave}
                disabled={saving || loadingNote}
                accessibilityLabel="Guardar nota"
                accessibilityRole="button"
              >
                <MaterialIcons name="save" size={24} color="#4CAF50" />
              </Pressable>
            ) : (
              <>
                <Pressable
                  style={[styles.iconButton, saving && styles.disabledButton]}
                  onPress={handleEdit}
                  disabled={saving}
                  accessibilityLabel="Editar nota"
                  accessibilityRole="button"
                >
                  <MaterialIcons name="edit" size={24} color="#4CAF50" />
                </Pressable>

                <Pressable
                  style={[styles.iconButton, saving && styles.disabledButton]}
                  onPress={handleDelete}
                  disabled={saving}
                  accessibilityLabel="Eliminar nota"
                  accessibilityRole="button"
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="#e35d55"
                  />
                </Pressable>
              </>
            )}
          </View>
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
    paddingBottom: 100,
    alignItems: "center",
  },

  content: {
    width: "100%",
    maxWidth: 900,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 38,
  },

  card: {
    width: "100%",
    backgroundColor: "#1f1f1f",
    padding: 18,
    borderRadius: 14,
    marginBottom: 24,
  },

  infoText: {
    color: "white",
    marginBottom: 8,
    lineHeight: 22,
  },

  infoTextLast: {
    color: "white",
    lineHeight: 22,
  },

  lyrics: {
    color: "white",
    fontSize: 16,
    lineHeight: 28,
  },

  notesCard: {
    width: "100%",
    backgroundColor: "#1f1f1f",
    padding: 18,
    borderRadius: 14,
  },

  notesTitle: {
    color: "white",
    marginBottom: 16,
  },

  loadingNote: {
    color: "#ccc",
    marginBottom: 16,
  },

  noteInput: {
    width: "100%",
    minHeight: 140,
    backgroundColor: "#2a2a2a",
    color: "white",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 10,
  },

  message: {
    textAlign: "center",
    marginBottom: 10,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
  },

  disabledButton: {
    opacity: 0.5,
  },
});
