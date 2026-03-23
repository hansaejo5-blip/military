import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Tone = 'default' | 'success' | 'warning' | 'danger' | 'info';

export function ScreenContainer({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.content}>
      <View
        style={[
          styles.hero,
          {
            backgroundColor: palette.card,
            borderColor: palette.border,
          },
        ]}>
        <ThemedText type="title" style={styles.heroTitle}>
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText style={[styles.heroSubtitle, { color: palette.mutedText }]}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {children}
    </ScrollView>
  );
}

export function SectionCard({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderText}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText style={{ color: palette.mutedText }}>{subtitle}</ThemedText>
          ) : null}
        </View>
        {right}
      </View>
      {children}
    </View>
  );
}

export function Badge({ label, tone = 'default' }: { label: string; tone?: Tone }) {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const tones = {
    default: { bg: palette.chip, text: palette.text },
    success: { bg: withAlpha(palette.success, 0.14), text: palette.success },
    warning: { bg: withAlpha(palette.warning, 0.16), text: palette.warning },
    danger: { bg: withAlpha(palette.danger, 0.14), text: palette.danger },
    info: { bg: withAlpha(palette.info, 0.14), text: palette.info },
  };

  return (
    <View style={[styles.badge, { backgroundColor: tones[tone].bg }]}>
      <ThemedText style={[styles.badgeText, { color: tones[tone].text }]}>{label}</ThemedText>
    </View>
  );
}

export function StatGrid({ items }: { items: { label: string; value: string; hint: string }[] }) {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <View
          key={item.label}
          style={[
            styles.gridCard,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}>
          <ThemedText style={[styles.gridLabel, { color: palette.mutedText }]}>{item.label}</ThemedText>
          <ThemedText type="title" style={styles.gridValue}>
            {item.value}
          </ThemedText>
          <ThemedText style={{ color: palette.mutedText }}>{item.hint}</ThemedText>
        </View>
      ))}
    </View>
  );
}

export function BulletList({ items }: { items: string[] }) {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item} style={styles.listItem}>
          <View style={[styles.dot, { backgroundColor: palette.tint }]} />
          <ThemedText style={styles.listText}>{item}</ThemedText>
        </View>
      ))}
    </View>
  );
}

function withAlpha(hex: string, alpha: number) {
  const normalized = hex.replace('#', '');

  if (normalized.length !== 6) {
    return hex;
  }

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 36,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    gap: 10,
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: Fonts.sans,
  },
  heroSubtitle: {
    lineHeight: 22,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  sectionHeaderText: {
    flex: 1,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 18,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  gridLabel: {
    fontSize: 13,
  },
  gridValue: {
    fontSize: 24,
    lineHeight: 28,
  },
  list: {
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginTop: 8,
  },
  listText: {
    flex: 1,
  },
});
