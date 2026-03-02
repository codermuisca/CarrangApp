import { DocumentData, FirestoreDataConverter } from "firebase/firestore";
import { Song } from "../../types/song";

export const songConverter: FirestoreDataConverter<Song> = {
  toFirestore(song: Song): DocumentData {
    return {
      title: song.title,
      artist: song.artist,
      tone: song.tone,
      rhythm: song.rhythm,
      lyrics: song.lyrics ?? null,
    };
  },
  fromFirestore(snapshot, options): Song {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      title: data.title,
      artist: data.artist,
      tone: data.tone,
      rhythm: data.rhythm,
      lyrics: data.lyrics ?? null,
    };
  },
};
