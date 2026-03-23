import { StyleSheet, View } from 'react-native';

import { Badge, BulletList, ScreenContainer, SectionCard } from '@/components/planner-ui';
import { ThemedText } from '@/components/themed-text';
import { recommendations } from '@/constants/planner-data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RecommendScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <ScreenContainer
      title="추천"
      subtitle="사용자 조건으로 지원 가능, 조건부 가능, 현재 불가를 바로 분류합니다.">
      <SectionCard
        title="상단 요약"
        subtitle="설명형 정보보다 판단형 결과를 먼저 보여줍니다."
        right={<Badge label="추천 엔진 1차" tone="success" />}>
        <BulletList
          items={[
            '지금 지원 가능 3개',
            '조건부 가능 5개',
            '신체조건 또는 어학 때문에 현재 불가 2개',
            '전공 활용도가 높은 분야 우선 정렬',
          ]}
        />
      </SectionCard>

      <SectionCard title="추천 결과 카드">
        <View style={styles.list}>
          {recommendations.map((item) => (
            <View
              key={item.name}
              style={[
                styles.resultCard,
                { borderColor: palette.border, backgroundColor: palette.card },
              ]}>
              <View style={styles.resultHeader}>
                <View style={styles.resultTitleGroup}>
                  <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                  <ThemedText style={{ color: palette.mutedText }}>{item.branch}</ThemedText>
                </View>
                <Badge label={item.status} tone={item.tone} />
              </View>
              <BulletList
                items={[
                  item.majorMatch,
                  item.certificateMatch,
                  item.physical,
                  `다음 일정: ${item.nextSchedule}`,
                  `필요 서류: ${item.documents}`,
                ]}
              />
            </View>
          ))}
        </View>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  resultCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  resultTitleGroup: {
    flex: 1,
    gap: 4,
  },
});
