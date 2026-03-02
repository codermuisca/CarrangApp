// types/song.ts
export interface Song {
  id: string;
  title: string;
  artist: string;
  tone: string;
  rhythm: string;
  lyrics?: string; // ahora opcional
}
