import { StyleSheet, View } from 'react-native';

import { Badge, BulletList, ScreenContainer, SectionCard } from '@/components/planner-ui';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { onboardingFields } from '@/constants/planner-data';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function OnboardingScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <ScreenContainer
      title="온보딩 설계"
      subtitle="첫 버전에서는 입력 정확도보다 빠른 판단이 중요합니다. 필수값만 받아 추천과 일정 알림으로 바로 연결합니다.">
      <SectionCard
        title="입력 우선순위"
        subtitle="신체조건과 일정이 먼저, 전공·자격증은 추천 정밀도 개선에 사용합니다."
        right={<Badge label="MVP" tone="success" />}>
        <BulletList items={onboardingFields} />
      </SectionCard>

      <SectionCard title="입력 후 즉시 보여줄 결과">
        <View style={styles.resultList}>
          {[
            '지금 지원 가능한 분야 수',
            '조건부 가능 분야와 필요한 준비',
            '가장 가까운 마감 일정',
            '추가모집 감시 알림 설정',
          ].map((item) => (
            <View
              key={item}
              style={[
                styles.resultRow,
                { borderColor: palette.border, backgroundColor: palette.card },
              ]}>
              <ThemedText>{item}</ThemedText>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  resultList: {
    gap: 10,
  },
  resultRow: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
});
