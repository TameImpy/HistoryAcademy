import { useState, useRef, useCallback } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";

interface AudioPlayerProps {
  uri: string;
  title: string;
  onProgress?: (positionSeconds: number) => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function AudioPlayer({ uri, title, onProgress }: AudioPlayerProps) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(2);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;
      setLoaded(true);
      setIsPlaying(status.isPlaying);
      setPositionMs(status.positionMillis);
      setDurationMs(status.durationMillis ?? 0);
      if (onProgress && status.positionMillis % 10000 < 1000) {
        onProgress(Math.floor(status.positionMillis / 1000));
      }
    },
    [onProgress],
  );

  const loadAndPlay = async () => {
    if (!soundRef.current) {
      await Audio.setAudioModeAsync({ staysActiveInBackground: true });
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true },
        onPlaybackStatusUpdate,
      );
      soundRef.current = sound;
    } else {
      await soundRef.current.playAsync();
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      await soundRef.current?.pauseAsync();
    } else {
      await loadAndPlay();
    }
  };

  const skip = async (seconds: number) => {
    await soundRef.current?.setPositionAsync(Math.max(0, positionMs + seconds * 1000));
  };

  const cycleSpeed = async () => {
    const next = (speedIndex + 1) % SPEED_OPTIONS.length;
    setSpeedIndex(next);
    await soundRef.current?.setRateAsync(SPEED_OPTIONS[next], true);
  };

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.artwork}>
        <Text style={styles.artworkIcon}>A</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {!loaded && <Text style={styles.loadingText}>Loading audio...</Text>}
      <View style={styles.controls}>
        <Pressable onPress={() => skip(-15)}>
          <Text style={styles.controlBtn}>-15s</Text>
        </Pressable>
        <Pressable onPress={togglePlay}>
          <Text style={styles.playBtn}>{isPlaying ? "||" : ">"}</Text>
        </Pressable>
        <Pressable onPress={() => skip(15)}>
          <Text style={styles.controlBtn}>+15s</Text>
        </Pressable>
        <Pressable onPress={cycleSpeed}>
          <Text style={styles.speedBtn}>{SPEED_OPTIONS[speedIndex]}x</Text>
        </Pressable>
      </View>
      <Text style={styles.timeText}>
        {formatTime(positionMs)} / {formatTime(durationMs)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#1a1a2e",
  },
  artwork: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2a2a4e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  artworkIcon: {
    fontSize: 40,
    color: "#fff",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  loadingText: {
    color: "#888",
    fontSize: 14,
    marginBottom: 8,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 16,
  },
  controlBtn: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  playBtn: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    minWidth: 40,
    textAlign: "center",
  },
  speedBtn: {
    color: "#aaa",
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 4,
  },
  timeText: {
    color: "#888",
    fontSize: 12,
    marginTop: 12,
  },
});
