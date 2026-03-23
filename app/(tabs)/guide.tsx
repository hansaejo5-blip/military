import { Badge, BulletList, ScreenContainer, SectionCard } from '@/components/planner-ui';
import { guideTopics } from '@/constants/planner-data';

export default function GuideScreen() {
  return (
    <ScreenContainer
      title="군별 가이드"
      subtitle="처음 보는 사용자도 모집병, 징집, 기술행정병의 차이를 빠르게 이해하도록 구성합니다.">
      {guideTopics.map((topic) => (
        <SectionCard
          key={topic.title}
          title={topic.title}
          right={<Badge label="개념 정리" tone="info" />}>
          <BulletList items={topic.points} />
        </SectionCard>
      ))}

      <SectionCard title="군별 공통 템플릿" right={<Badge label="확장 예정" />}>
        <BulletList
          items={[
            '이 군은 어떤 방식으로 지원하는가',
            '주요 지원 대상',
            '평가 기준 핵심',
            '자주 필요한 준비',
            '자주 놓치는 포인트',
          ]}
        />
      </SectionCard>
    </ScreenContainer>
  );
}
