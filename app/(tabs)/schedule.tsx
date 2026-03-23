import { StyleSheet, View } from 'react-native';

import { Badge, BulletList, ScreenContainer, SectionCard } from '@/components/planner-ui';
import { ThemedText } from '@/components/themed-text';
import { scheduleItems } from '@/constants/planner-data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ScheduleScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <ScreenContainer
      title="일정"
      subtitle="모집 시작, 마감, 서류, 발표, 추가모집을 한 화면에서 확인합니다.">
      <SectionCard title="보기 방식" right={<Badge label="캘린더 + 리스트" tone="info" />}>
        <BulletList
          items={[
            '캘린더 보기',
            '리스트 보기',
            '마감 임박만 보기',
            '선착순/추가모집 전용 보기',
          ]}
        />
      </SectionCard>

      <SectionCard title="다가오는 일정">
        <View style={styles.timeline}>
          {scheduleItems.map((item) => (
            <View
              key={item.title}
              style={[
                styles.timelineRow,
                { borderColor: palette.border, backgroundColor: palette.card },
              ]}>
              <View style={styles.timelineMeta}>
                <Badge label={item.type} tone={item.type === '추가모집' ? 'warning' : 'default'} />
                <ThemedText style={{ color: palette.mutedText }}>{item.date}</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText style={{ color: palette.mutedText }}>{item.urgency}</ThemedText>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  timeline: {
    gap: 12,
  },
  timelineRow: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 8,
  },
  timelineMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
});
