import { StyleSheet, View } from 'react-native';

import { Badge, BulletList, ScreenContainer, SectionCard } from '@/components/planner-ui';
import { ThemedText } from '@/components/themed-text';
import { checklistItems } from '@/constants/planner-data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MyScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <ScreenContainer
      title="마이"
      subtitle="내 프로필, 저장한 특기, 알림 설정, 체크리스트를 한곳에서 관리합니다.">
      <SectionCard title="내 프로필" right={<Badge label="목업 데이터" tone="warning" />}>
        <View style={styles.profileCard}>
          <ThemedText type="defaultSemiBold">희망 군: 육군, 공군</ThemedText>
          <ThemedText style={{ color: palette.mutedText }}>희망 입영: 2026년 6월~8월</ThemedText>
          <ThemedText style={{ color: palette.mutedText }}>우선 기준: 전공 살리기</ThemedText>
        </View>
      </SectionCard>

      <SectionCard title="체크리스트">
        <BulletList items={checklistItems} />
      </SectionCard>

      <SectionCard title="알림 설정">
        <BulletList
          items={[
            '마감 임박 알림 켜짐',
            '추가모집 감시 켜짐',
            '관심 특기 모집 시작 알림 켜짐',
            '자격증 취득 기한 위험 알림 켜짐',
          ]}
        />
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    gap: 6,
  },
});
