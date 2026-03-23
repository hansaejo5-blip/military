import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Badge, BulletList, ScreenContainer, SectionCard } from '@/components/planner-ui';
import { ThemedText } from '@/components/themed-text';
import { onboardingFields, plannerPrinciples } from '@/constants/planner-data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LandingScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <ScreenContainer
      title="군지원 플래너"
      subtitle="지원 가능한 분야, 필요한 준비, 자격증 마감 리스크를 빠르게 판단하는 비공식 군지원 도구">
      <SectionCard
        title="첫 진입 안내"
        subtitle="정부 공식 앱이 아니며, 최종 지원 전 병무청과 각 군 공식 공지를 다시 확인해야 합니다."
        right={<Badge label="비공식 서비스" tone="warning" />}>
        <View style={styles.ctaGroup}>
          <Link href="/onboarding" asChild>
            <Pressable style={[styles.primaryButton, { backgroundColor: palette.tint }]}>
              <ThemedText style={styles.primaryText}>온보딩 시작</ThemedText>
            </Pressable>
          </Link>
          <Link href="/(tabs)" asChild>
            <Pressable
              style={[
                styles.secondaryButton,
                { borderColor: palette.border, backgroundColor: palette.card },
              ]}>
              <ThemedText>바로 둘러보기</ThemedText>
            </Pressable>
          </Link>
        </View>
      </SectionCard>

      <SectionCard title="이 앱이 바로 해결하는 것">
        <BulletList
          items={[
            '나는 어떤 방식으로 군대에 갈 수 있나',
            '지금 어디 지원 가능한가',
            '무엇을 더 준비해야 하나',
            '언제까지 해야 하나',
          ]}
        />
      </SectionCard>

      <SectionCard title="온보딩 입력 항목" right={<Badge label="3분 이내" tone="info" />}>
        <BulletList items={onboardingFields} />
      </SectionCard>

      <SectionCard title="제품 원칙">
        <BulletList items={plannerPrinciples} />
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  ctaGroup: {
    gap: 10,
  },
  primaryButton: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  secondaryButton: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
