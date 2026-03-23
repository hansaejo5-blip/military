import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Badge, BulletList, ScreenContainer, SectionCard, StatGrid } from '@/components/planner-ui';
import { ThemedText } from '@/components/themed-text';
import { checklistItems, homeStatusCards, summaryStats } from '@/constants/planner-data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <ScreenContainer
      title="홈"
      subtitle="오늘 해야 할 일과 가장 가까운 마감을 먼저 보여주는 실용형 대시보드">
      <StatGrid items={summaryStats} />

      <SectionCard
        title="내 상태 요약"
        subtitle="지원 가능 여부와 리스크를 카드 단위로 바로 확인합니다."
        right={<Badge label="실시간 요약" tone="info" />}>
        <View style={styles.cardStack}>
          {homeStatusCards.map((item) => (
            <View
              key={item.title}
              style={[
                styles.statusCard,
                { borderColor: palette.border, backgroundColor: palette.card },
              ]}>
              <Badge label={item.title} tone={item.tone} />
              <ThemedText type="defaultSemiBold">{item.value}</ThemedText>
              <ThemedText style={{ color: palette.mutedText }}>{item.detail}</ThemedText>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="오늘 할 일" right={<Badge label="우선순위" tone="warning" />}>
        <BulletList items={checklistItems.slice(0, 3)} />
        <Link href="/modal" asChild>
          <Pressable style={[styles.linkButton, { borderColor: palette.border }]}>
            <ThemedText>알림 설정 요약 보기</ThemedText>
          </Pressable>
        </Link>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cardStack: {
    gap: 12,
  },
  statusCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 8,
  },
  linkButton: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
});
