const stats = [
  { label: '지금 지원 가능', value: '3개', hint: '육군 2, 공군 1' },
  { label: '조건부 가능', value: '5개', hint: '자격증 보완 필요' },
  { label: '다음 마감', value: '5일', hint: '기술행정병 접수 마감' },
  { label: '위험 알림', value: '2건', hint: '서류·발급 일정 확인 필요' },
];

const recommendations = [
  {
    title: '육군 기술행정병 전기정비',
    badge: '지금 지원 가능',
    tone: 'success',
    items: ['전공 직접 일치', '전기기능사 보유 시 매우 유리', '신체조건 충족', '다음 일정: 3월 29일 접수 마감'],
  },
  {
    title: '공군 일반기계',
    badge: '조건부 가능',
    tone: 'warning',
    items: ['전공 간접 일치', '관련 자격증 추가 시 점수 상승', '시력 기준 재확인 필요', '다음 일정: 4월 8일 모집 시작'],
  },
  {
    title: '카투사',
    badge: '현재 불가',
    tone: 'danger',
    items: ['전공 무관', '어학점수 부족', '신체조건은 충족', '하반기 공고 대기'],
  },
];

const docs = [
  '와이어프레임 문서',
  'Firebase Studio용 마스터 생성 프롬프트',
  'Firestore 컬렉션/보안 규칙 초안',
  '추천 로직 의사코드',
  'MVP 화면별 개발 체크리스트',
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <span className="badge warning">비공식 서비스</span>
        <h1>군지원 플래너</h1>
        <p>
          병무청, 육군, 해군, 공군, 카투사 관련 정보를 한곳에 정리하고 사용자의 전공, 자격증,
          신체조건, 희망 입영 시기를 바탕으로 지금 지원 가능한 분야와 필요한 준비를 빠르게
          판단하는 실용형 웹앱입니다.
        </p>
        <div className="actions">
          <a className="button primary" href="#recommend">
            추천 결과 보기
          </a>
          <a className="button" href="#docs">
            문서 확인
          </a>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>핵심 상태</h2>
            <p>사용자가 가장 먼저 알아야 할 지원 가능 여부와 마감 리스크를 한 화면에 모읍니다.</p>
          </div>
          <span className="badge info">판단형 정보</span>
        </div>
        <div className="stats">
          {stats.map((stat) => (
            <article className="stat" key={stat.label}>
              <small>{stat.label}</small>
              <strong>{stat.value}</strong>
              <div className="meta">{stat.hint}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="recommend">
        <div className="sectionHeader">
          <div>
            <h2>추천 결과</h2>
            <p>지금 지원 가능, 조건부 가능, 현재 불가를 즉시 구분합니다.</p>
          </div>
          <span className="badge success">추천 엔진 1차</span>
        </div>
        <div className="cards">
          {recommendations.map((item) => (
            <article className="card" key={item.title}>
              <div className="cardHeader">
                <h3>{item.title}</h3>
                <span className={`badge ${item.tone}`}>{item.badge}</span>
              </div>
              <ul>
                {item.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section gridTwo">
        <article className="card">
          <div className="sectionHeader">
            <div>
              <h2>온보딩 입력 항목</h2>
              <p>처음 보는 사용자도 3분 안에 추천 결과로 진입할 수 있게 설계합니다.</p>
            </div>
            <span className="badge info">MVP</span>
          </div>
          <ul>
            <li>출생연도</li>
            <li>희망 군 복수선택</li>
            <li>희망 입영 시기</li>
            <li>전공명과 학교 유형</li>
            <li>보유 자격증과 어학점수</li>
            <li>신체등급, 시력, 색약 여부</li>
            <li>중요 기준 선택</li>
          </ul>
        </article>

        <article className="card">
          <div className="sectionHeader">
            <div>
              <h2>오늘 할 일</h2>
              <p>설명보다 행동을 유도하는 체크리스트 중심 구조입니다.</p>
            </div>
            <span className="badge warning">우선순위</span>
          </div>
          <ul>
            <li>전공명과 학적 상태를 공식 서류 기준으로 다시 확인하기</li>
            <li>자격증 발급 가능일이 접수 마감 전인지 점검하기</li>
            <li>어학성적 유효기간과 제출 방식을 확인하기</li>
            <li>관심 특기와 추가모집 알림을 모두 켜기</li>
          </ul>
        </article>
      </section>

      <section className="section" id="docs">
        <div className="sectionHeader">
          <div>
            <h2>Firebase Studio 연동 준비물</h2>
            <p>저장소 루트 문서와 함께 Firebase Studio에서 바로 이어서 설계할 수 있도록 정리했습니다.</p>
          </div>
          <span className="badge">문서 세트</span>
        </div>
        <div className="docs">
          <article className="docCard">
            <h3>포함 문서</h3>
            <ul>
              {docs.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
