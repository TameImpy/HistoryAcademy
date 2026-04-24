import { useState, useRef, useCallback } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

interface VideoPlayerProps {
  uri: string;
  onProgress?: (positionSeconds: number) => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function VideoPlayer({ uri, onProgress }: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(2); // 1x default
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;
      setIsPlaying(status.isPlaying);
      setPositionMs(status.positionMillis);
      setDurationMs(status.durationMillis ?? 0);
      if (onProgress && status.positionMillis % 10000 < 1000) {
        onProgress(Math.floor(status.positionMillis / 1000));
      }
    },
    [onProgress],
  );

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pauseAsync();
    } else {
      videoRef.current?.playAsync();
    }
  };

  const skip = (seconds: number) => {
    videoRef.current?.setPositionAsync(positionMs + seconds * 1000);
  };

  const cycleSpeed = () => {
    const next = (speedIndex + 1) % SPEED_OPTIONS.length;
    setSpeedIndex(next);
    videoRef.current?.setRateAsync(SPEED_OPTIONS[next], true);
  };

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        useNativeControls={false}
      />
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
        <Text style={styles.timeText}>
          {formatTime(positionMs)} / {formatTime(durationMs)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#111",
  },
  controlBtn: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  playBtn: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    minWidth: 32,
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
  },
});
