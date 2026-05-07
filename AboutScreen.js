import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';

const Feature = ({ icon, title, desc }) => (
  <View style={styles.featureRow}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  </View>
);

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>CHRONO</Text>
          <Text style={styles.heroTagline}>Precision timing,{'\n'}beautifully minimal.</Text>
          <View style={styles.heroDivider} />
          <Text style={styles.version}>v1.0.0 · React Native / Expo</Text>
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ABOUT THIS APP</Text>
          <Text style={styles.cardBody}>
            Chrono is a clean, high-precision stopwatch built with React Native and Expo. Designed for athletes, developers, students, or anyone who needs to track time with accuracy and style.{'\n\n'}
            The app uses JavaScript's <Text style={styles.mono}>Date.now()</Text> for precision timing (updates every 10ms), with accumulated time stored between pause/resume cycles — so you never lose a millisecond.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>FEATURES</Text>
          <Feature icon="▶" title="Start" desc="Begin timing from zero or resume from a paused state." />
          <Feature icon="⏸" title="Pause" desc="Freeze the timer without losing your current time." />
          <Feature icon="⏹" title="Stop" desc="Halt the timer and reset everything back to zero." />
          <Feature icon="🏁" title="Lap" desc="Record the current time as a lap snapshot while the timer keeps running." />
          <Feature icon="⚡" title="Best / Slow Highlighting" desc="Fastest and slowest laps are automatically color-coded for quick analysis." />
          <Feature icon="✕" title="Remove Individual Laps" desc="Swipe away a single lap without clearing your entire history." />
          <Feature icon="🗑" title="Clear All Laps" desc="Remove all recorded lap times in one tap." />
        </View>

        {/* Tech */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>TECH STACK</Text>
          <View style={styles.techGrid}>
            {['React Native', 'Expo SDK 52', 'React Navigation', 'Animated API', 'Hooks'].map(t => (
              <View key={t} style={styles.techChip}>
                <Text style={styles.techChipText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Built with ❤️ for CS class · 2025</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0A0F' },
  container: { padding: 20, paddingBottom: 40 },

  hero: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  heroLabel: {
    color: '#00F5C4',
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 8,
    fontWeight: '700',
    marginBottom: 14,
  },
  heroTagline: {
    color: '#EEEEFF',
    fontSize: 30,
    fontWeight: '200',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 40,
  },
  heroDivider: {
    width: 40,
    height: 1,
    backgroundColor: '#00F5C4',
    marginVertical: 18,
    opacity: 0.6,
  },
  version: {
    color: '#444466',
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 2,
  },

  card: {
    backgroundColor: '#0D0D1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A1A2E',
    padding: 20,
    marginBottom: 14,
  },
  cardTitle: {
    color: '#444466',
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 4,
    marginBottom: 14,
  },
  cardBody: {
    color: '#8888AA',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '300',
  },
  mono: {
    fontFamily: 'monospace',
    color: '#00F5C4',
    fontSize: 13,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 14,
  },
  featureIcon: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
    marginTop: 1,
  },
  featureText: { flex: 1 },
  featureTitle: {
    color: '#CCCCEE',
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  featureDesc: {
    color: '#666688',
    fontSize: 12,
    lineHeight: 18,
  },

  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#0D1A2A',
    borderWidth: 1,
    borderColor: '#4080FF40',
  },
  techChipText: {
    color: '#4080FF',
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1,
  },

  footer: {
    textAlign: 'center',
    color: '#333355',
    fontFamily: 'monospace',
    fontSize: 11,
    marginTop: 10,
    letterSpacing: 1,
  },
});
