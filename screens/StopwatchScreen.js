import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

export default function StopwatchScreen() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const accumulatedRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setElapsed(accumulatedRef.current + (Date.now() - startTimeRef.current));
      }, 10);
    } else {
      clearInterval(intervalRef.current);
      accumulatedRef.current = elapsed;
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const handleStop = () => {
    setIsRunning(false);
    setElapsed(0);
    accumulatedRef.current = 0;
  };

  const handleLap = () => {
    if (elapsed === 0) return;
    setLaps(prev => [{ id: Date.now(), time: elapsed, number: prev.length + 1 }, ...prev]);
  };

  const handleRemoveLap = (id) => {
    setLaps(prev => {
      const filtered = prev.filter(l => l.id !== id);
      return filtered.map((lap, i) => ({ ...lap, number: filtered.length - i }));
    });
  };

  const handleClearLaps = () => setLaps([]);

  const lapTimes = laps.map(l => l.time);
  const fastest = laps.length > 1 ? Math.min(...lapTimes) : null;
  const slowest = laps.length > 1 ? Math.max(...lapTimes) : null;

  const startDisabled = isRunning === true;
  const pauseDisabled = isRunning === false;
  const stopDisabled = elapsed === 0 && isRunning === false;
  const lapDisabled = elapsed === 0;

  const dotColor = isRunning === true ? '#00F5C4' : elapsed > 0 ? '#F5A623' : '#333355';
  const statusLabel = isRunning === true ? 'RUNNING' : elapsed > 0 ? 'PAUSED' : 'READY';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>CHRONO</Text>
          <View style={[styles.statusDot, { backgroundColor: dotColor }]} />
        </View>

        <View style={styles.timerSection}>
          <View style={styles.timerRing}>
            <View style={styles.timerInner}>
              <Text style={styles.timerText}>{formatTime(elapsed)}</Text>
              <Text style={styles.statusText}>{statusLabel}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonsSection}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.btn, styles.btnStart, startDisabled ? styles.btnDisabled : null]}
              onPress={handleStart}
              disabled={startDisabled}
              activeOpacity={0.75}
            >
              <Text style={styles.btnIcon}>▶</Text>
              <Text style={styles.btnLabel}>START</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnPause, pauseDisabled ? styles.btnDisabled : null]}
              onPress={handlePause}
              disabled={pauseDisabled}
              activeOpacity={0.75}
            >
              <Text style={styles.btnIcon}>⏸</Text>
              <Text style={styles.btnLabel}>PAUSE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.btn, styles.btnStop, stopDisabled ? styles.btnDisabled : null]}
              onPress={handleStop}
              disabled={stopDisabled}
              activeOpacity={0.75}
            >
              <Text style={styles.btnIcon}>⏹</Text>
              <Text style={styles.btnLabel}>STOP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnLap, lapDisabled ? styles.btnDisabled : null]}
              onPress={handleLap}
              disabled={lapDisabled}
              activeOpacity={0.75}
            >
              <Text style={styles.btnIcon}>🏁</Text>
              <Text style={styles.btnLabel}>LAP</Text>
            </TouchableOpacity>
          </View>
        </View>

        {laps.length > 0 && (
          <View style={styles.lapsSection}>
            <View style={styles.lapsHeader}>
              <Text style={styles.lapsSectionTitle}>LAP TIMES</Text>
              <TouchableOpacity onPress={handleClearLaps} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>CLEAR ALL</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.lapsList} showsVerticalScrollIndicator={false}>
              {laps.map((lap) => {
                const isFastest = lap.time === fastest;
                const isSlowest = lap.time === slowest;
                return (
                  <View
                    key={lap.id}
                    style={[
                      styles.lapRow,
                      isFastest ? styles.lapFastest : null,
                      isSlowest ? styles.lapSlowest : null,
                    ]}
                  >
                    <Text style={[styles.lapNumber, isFastest ? styles.lapFastestText : null, isSlowest ? styles.lapSlowestText : null]}>
                      #{String(lap.number).padStart(2, '0')}
                    </Text>
                    <Text style={[styles.lapTime, isFastest ? styles.lapFastestText : null, isSlowest ? styles.lapSlowestText : null]}>
                      {formatTime(lap.time)}
                    </Text>
                    {isFastest ? <Text style={styles.lapBadge}>⚡ BEST</Text> : null}
                    {isSlowest ? <Text style={[styles.lapBadge, styles.lapBadgeSlow]}>🐢 SLOW</Text> : null}
                    <TouchableOpacity onPress={() => handleRemoveLap(lap.id)} style={styles.removeLapBtn}>
                      <Text style={styles.removeLapText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0A0F' },
  container: { flex: 1, backgroundColor: '#0A0A0F', paddingHorizontal: 20 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#00F5C4',
    fontFamily: 'monospace',
    fontSize: 13,
    letterSpacing: 6,
    fontWeight: '700',
  },
  statusDot: { width: 10, height: 10, borderRadius: 5 },

  timerSection: { alignItems: 'center', paddingVertical: 20 },
  timerRing: {
    width: width * 0.72,
    height: width * 0.72,
    borderRadius: width * 0.36,
    borderWidth: 2,
    borderColor: '#1A1A2E',
    backgroundColor: '#0D0D1A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00F5C4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },
  timerInner: { alignItems: 'center' },
  timerText: {
    color: '#EEEEFF',
    fontFamily: 'monospace',
    fontSize: 46,
    fontWeight: '200',
    letterSpacing: 2,
  },
  statusText: {
    color: '#444466',
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 4,
    marginTop: 6,
  },

  buttonsSection: { gap: 12, marginBottom: 20 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  btn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 4,
  },
  btnIcon: { fontSize: 20 },
  btnLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '700',
    color: '#CCCCEE',
  },
  btnStart: { backgroundColor: '#0D2A20', borderColor: '#00F5C4' },
  btnPause: { backgroundColor: '#2A2010', borderColor: '#F5A623' },
  btnStop: { backgroundColor: '#2A0D10', borderColor: '#F54040' },
  btnLap: { backgroundColor: '#0D1A2A', borderColor: '#4080FF' },
  btnDisabled: { opacity: 0.3 },

  lapsSection: { flex: 1, borderTopWidth: 1, borderTopColor: '#1A1A2E', paddingTop: 14 },
  lapsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  lapsSectionTitle: { color: '#444466', fontFamily: 'monospace', fontSize: 11, letterSpacing: 4 },
  clearBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2A1A1A',
    backgroundColor: '#1A0D0D',
  },
  clearBtnText: { color: '#F54040', fontFamily: 'monospace', fontSize: 9, letterSpacing: 2 },
  lapsList: { flex: 1 },
  lapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 6,
    borderRadius: 10,
    backgroundColor: '#0D0D1A',
    borderWidth: 1,
    borderColor: '#1A1A2E',
  },
  lapFastest: { borderColor: '#00F5C4', backgroundColor: '#091A14' },
  lapSlowest: { borderColor: '#F54040', backgroundColor: '#1A0909' },
  lapNumber: { color: '#444466', fontFamily: 'monospace', fontSize: 12, width: 36 },
  lapTime: { color: '#AAAACC', fontFamily: 'monospace', fontSize: 16, flex: 1, letterSpacing: 1 },
  lapFastestText: { color: '#00F5C4' },
  lapSlowestText: { color: '#F54040' },
  lapBadge: { fontFamily: 'monospace', fontSize: 9, color: '#00F5C4', letterSpacing: 1, marginRight: 8 },
  lapBadgeSlow: { color: '#F54040' },
  removeLapBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeLapText: { color: '#666688', fontSize: 11, fontWeight: '700' },
});
