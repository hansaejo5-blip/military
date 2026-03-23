import { Badge, BulletList, ScreenContainer, SectionCard } from '@/components/planner-ui';

export default function ModalScreen() {
  return (
    <ScreenContainer
      title="알림 설정"
      subtitle="놓치기 쉬운 회차를 놓치지 않도록 행동 가능한 짧은 푸시 문구를 우선합니다.">
      <SectionCard title="활성 알림" right={<Badge label="기본 세트" tone="success" />}>
        <BulletList
          items={[
            '육군 기술행정병 추가모집이 열렸습니다.',
            '전기기능사 발급 일정이 접수마감 이후여서 인정이 어려울 수 있습니다.',
            '관심 특기 접수가 3일 뒤 시작됩니다.',
          ]}
        />
      </SectionCard>
    </ScreenContainer>
  );
}
