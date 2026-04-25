const { useState, useEffect, useRef, useMemo } = React;

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onS = () => setY(window.scrollY);
    window.addEventListener('scroll', onS, { passive: true });
    return () => window.removeEventListener('scroll', onS);
  }, []);
  return y;
}

// ─── Inline icons ────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, className = '' }) => {
  const p = {
    arrowDown: <><path d="M12 5v14M19 12l-7 7-7-7"/></>,
    arrowRight: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    arrowUpRight: <><path d="M7 17L17 7M7 7h10v10"/></>,
    github: <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></>,
    notion: <><rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M8 7v10M8 7l8 10V7"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <><path d="M5 12h14"/></>,
    googlePlay: <><path d="M3.5 3.2l13 8.8-13 8.8z"/><path d="M3.5 3.2l8.7 8.8-8.7 8.8"/><path d="M12.2 12l4.3 0"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {p[name]}
    </svg>
  );
};

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const y = useScrollY();
  const links = [
    { href: '#about', label: 'About' },
    { href: '#work', label: 'Work' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${y > 30 ? 'scrolled py-4' : 'py-6'}`}>
      <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2 group">
          <span className="font-serif text-xl text-ink tracking-tight">Eunju Kim</span>
          <span className="kor text-mute text-xs">김은주</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} className="ulink ulink-hover text-sm text-ink2 hover:text-ink transition-colors">
              <span className="text-mute font-mono text-[10px] mr-1.5">0{i + 1}</span>{l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" data-screen-label="01 Hero" className="min-h-screen flex flex-col justify-end pb-20 pt-40 px-8">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="reveal grid md:grid-cols-12 gap-8 mb-20 items-end">
          <div className="md:col-span-5">
            <div className="num-label mb-3">Portfolio · 2026</div>
            <p className="text-ink2 text-sm leading-relaxed kor max-w-sm">
              안녕하세요. 프론트엔드 개발자 김은주입니다.<br />
              키오스크 웹앱 유지보수부터 1인 모바일 앱 출시까지, 사용자가 헷갈리지 않는 안정적인 화면을 만드는 데 집중하고 있습니다.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex md:justify-end">
            <div className="text-right">
              <div className="num-label mb-2">Currently</div>
              <div className="text-sm text-ink kor flex items-center gap-2 justify-end">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                </span>
                ㈜영인터내셔널 · Frontend
              </div>
            </div>
          </div>
        </div>

        <h1 className="display-h text-[clamp(2.25rem,7vw,5rem)] text-ink mb-2">
          {'Eunju'.split('').map((c, i) => (
            <span key={i} className="letter" style={{ animationDelay: `${0.05 + i * 0.06}s` }}>{c}</span>
          ))}
          <span className="letter inline-block" style={{ animationDelay: '0.45s' }}>&nbsp;</span>
          <span className="serif-italic text-accent">
            {'Kim'.split('').map((c, i) => (
              <span key={i} className="letter inline-block" style={{ animationDelay: `${0.5 + i * 0.06}s` }}>{c}</span>
            ))}
          </span>
        </h1>

        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <div className="reveal flex flex-wrap items-baseline gap-x-4 gap-y-2 text-ink2" style={{ transitionDelay: '0.3s' }}>
              <span className="font-serif text-2xl md:text-3xl text-ink kor-serif">프론트엔드 개발자</span>
              <span className="text-mute font-mono text-xs">/</span>
              <span className="text-sm kor">React · TypeScript · Next.js</span>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <div className="reveal text-sm text-ink2 leading-relaxed kor max-w-sm" style={{ transitionDelay: '0.5s' }}>
              Claude Code · Cursor 같은 AI 도구로 빠르게 만들고, 실서비스 운영 경험을 바탕으로 작은 디테일까지 꾸준히 다듬어 갑니다.
            </div>
          </div>
        </div>

        <div className="reveal mt-24 pt-8 border-t border-line flex flex-col md:flex-row items-start md:items-end justify-between gap-6" style={{ transitionDelay: '0.7s' }}>
          <div className="flex items-baseline gap-12">
            <Stat n="05" label="Selected Works" />
            <Stat n="01" label="App Released" />
            <Stat n="02" label="Awards" />
          </div>
          <a href="#about" className="flex items-center gap-3 text-sm text-ink2 hover:text-ink transition-colors group">
            <span className="kor">더 알아보기</span>
            <span className="w-10 h-px bg-ink2 group-hover:w-16 transition-all"></span>
            <Icon name="arrowDown" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div>
      <div className="font-serif text-3xl md:text-4xl text-ink leading-none">{n}</div>
      <div className="num-label mt-2">{label}</div>
    </div>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" data-screen-label="02 About" className="py-32 md:py-44 px-8 border-t border-line">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="num-label sticky top-24">— About</div>
        </div>
        <div className="md:col-span-9 max-w-3xl">
          <h2 className="reveal font-serif text-xl md:text-2xl text-ink kor-serif tracking-tight mb-10">
            소개
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-10 text-ink2 leading-loose kor text-[15px]" style={{ transitionDelay: '0.15s' }}>
            <p>
              3년 7개월의 재무회계 경력 끝에 개발자로 전향했습니다. 포스코 X 코딩온 부트캠프에서 <span className="text-ink">우수상·대상</span>을 수상하며
              풀스택 기반을 다졌고, 현재는 ㈜영인터내셔널에서 React · Next.js 기반 키오스크 웹앱을 유지보수하고 있습니다.
            </p>
            <p>
              직관적이고 효율적인 UI/UX 구현을 추구하며, <span className="text-ink">Claude Code · Cursor</span> 같은 AI 도구로 더 빠른 문제 해결을 시도합니다.
              1인 모바일 앱 <span className="text-ink">‘루나운세’</span>를 Google Play에 출시했고, OCR 전표 자동화 사이트 ReceiptFlow를 개발 중입니다.
            </p>
          </div>

          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 mt-20 pt-10 border-t border-line" style={{ transitionDelay: '0.3s' }}>
            <Meta label="Born" value="1997" />
            <Meta label="Education" value="강남대 법학" sub="경영학 부전공" />
            <Meta label="Languages" value="HSK 6급" sub="TOEIC 740" />
            <Meta label="Based in" value="Seoul, KR" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value, sub }) {
  return (
    <div>
      <div className="num-label mb-2">{label}</div>
      <div className="text-ink kor text-base font-medium">{value}</div>
      {sub && <div className="text-mute kor text-xs mt-0.5">{sub}</div>}
    </div>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────
function Skills() {
  const groups = [
    { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Vue.js', 'React Native', 'HTML5 & CSS3', 'Tailwind', 'antd', 'Bootstrap'] },
    { label: 'State & Data', items: ['Redux', 'Zustand', 'React Query', 'Context API', 'REST API'] },
    { label: 'Backend & Infra', items: ['Node.js', 'Nest.js', 'MySQL', 'AWS EC2', 'Supabase'] },
    { label: 'Tools & AI', items: ['Git & GitHub', 'Claude Code', 'Cursor', 'Figma', 'Notion', 'Slack'] },
  ];
  return (
    <section id="skills" data-screen-label="03 Skills" className="py-32 md:py-44 px-8 border-t border-line">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="num-label sticky top-24">— Skills</div>
        </div>
        <div className="md:col-span-9">
          <h2 className="reveal font-serif text-xl md:text-2xl text-ink mb-12 kor-serif tracking-tight">
            기술
          </h2>
          <div className="space-y-12">
            {groups.map((g, gi) => (
              <div key={g.label} className="reveal grid md:grid-cols-12 gap-6 pb-10 border-b border-line last:border-b-0" style={{ transitionDelay: `${gi * 0.08}s` }}>
                <div className="md:col-span-3">
                  <div className="num-label mb-1">0{gi + 1}</div>
                  <div className="font-serif text-xl text-ink">{g.label}</div>
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-x-2 gap-y-3">
                  {g.items.map((it, ii) => (
                    <React.Fragment key={it}>
                      <span className="kor text-base md:text-lg text-ink2 hover:text-accent transition-colors">{it}</span>
                      {ii < g.items.length - 1 && <span className="text-mute text-base md:text-lg">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Work / Projects ─────────────────────────────────────────────────────────
function Work({ onOpen }) {
  const projects = [
    {
      n: '01', year: '2026',
      title: '루나운세', en: 'LunaFortune',
      kind: '1인 개발 · Mobile + Web',
      desc: 'AI 기반 타로 · 사주 · 점성술 종합 운세 앱. 기획부터 디자인, 개발, AdMob 위치 최적화, Google Play 비공개 테스트, 프로덕션 출시까지 1인으로 진행했습니다. Next.js + Supabase 웹 버전도 함께 운영합니다.',
      stack: ['Android Studio', 'Next.js', 'Supabase', 'Gemini · Groq', 'AdMob'],
      links: [
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.lunafortune.app', icon: 'googlePlay' },
        { label: 'Web Demo', href: 'https://tarot-destiny-app.vercel.app' },
      ],
      cover: 'luna',
      image: '/assets/img/Luna.webp',
      gallery: [
        '/assets/img/Luna.webp',
        '/assets/img/Luna2.jpeg', '/assets/img/Luna3.jpeg', '/assets/img/Luna4.jpeg',
        '/assets/img/Luna5.jpeg', '/assets/img/Luna6.jpeg', '/assets/img/Luna7.jpeg',
        '/assets/img/Luna8.jpeg', '/assets/img/Luna9.jpeg', '/assets/img/Luna10.jpeg',
      ],
      highlights: [
        '기획·디자인·개발·출시·운영까지 1인 진행',
        'Google Play 비공개 테스트 후 프로덕션 출시 · AdMob 위치 최적화',
        'iOS App Store 출시 준비 중',
        'Next.js + Supabase 웹 버전 동시 운영',
      ],
      features: [
        { title: '운세 카테고리', desc: '연애 · 커플 · 우정 · 시험 · 적성 · 학업 · 이직 · 건강 · 전생운 등' },
        { title: '부채꼴 카드 뽑기', desc: '20장 중 6장을 선택하는 인터랙티브 UI' },
        { title: '카드 뒤집기 애니메이션', desc: '6장을 뽑은 후 한 장씩 순차적으로 공개' },
        { title: 'AI 타로 해석', desc: 'Gemini AI를 활용한 카드 조합 기반 맞춤형 리딩' },
        { title: '운세 점수', desc: '카테고리별 운세 점수(%) 제공' },
        { title: '카테고리별 스프레드', desc: '연애운은 하트 배치, 나머지는 2×3 그리드' },
        { title: '모바일 앱뷰', desc: '모바일 최적화 반응형 UI' },
      ],
      featured: true,
    },
    {
      n: '02', year: '2025—',
      title: '키오스크 웹앱', en: 'Kiosk Web Apps',
      kind: '회사 · 영인터내셔널 (재직 중)',
      live: true,
      desc: '키오스크 웹 애플리케이션 프론트엔드 유지보수 및 기능 개선을 담당하고 있습니다. 기존 코드 구조 분석을 바탕으로 안정성을 유지하며 사용자 흐름과 UI를 개선하고, 거래처 요청서·동영상 통합 관리 웹 시스템을 신규 구축했습니다.',
      stack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Axios'],
      links: [],
      cover: 'kiosk',
      image: '/assets/img/키오스크.webp',
      gallery: ['/assets/img/키오스크.webp'],
      highlights: [
        '스티커메이커 · 폴라폴라 · 컬러네임스티커 · 카드메이커 · 스튜디오 5개 제품 유지보수',
        '기존 코드 구조 분석 후 안정성을 유지하며 신규 기능 추가 · 버그 수정',
        '사용자 흐름 개선 · 인터페이스 수정 · 오류 수정 및 기능 안정성 향상',
        '다양한 디바이스·사용 환경을 고려한 UI 보완 및 반응형 처리',
        '거래처 요청서·동영상 통합 관리 웹 시스템 신규 구축',
      ],
      troubleshooting: [
        {
          title: '출력 상태 기반 진행률 UI 로직 개선',
          problem: '비동기 상태 처리로 인해 실제 출력 상태와 UI 진행률이 일치하지 않는 문제가 발생함',
          solution: '출력 상태 흐름을 분석해 진행률 계산 로직을 개선하고, 상태 중복 처리 방지 로직을 추가, UI 상태와 실제 상태 간 동기화를 보강',
          result: '출력 진행률 UI 정확도 향상 · 사용자 경험 개선',
        },
      ],
    },
    {
      n: '03', year: '2025—',
      title: 'ReceiptFlow', en: 'LedgerFlow ERP',
      kind: '개인 · AI 페어 코딩 · 진행 중',
      live: true,
      desc: '재무회계 실무에서 겪은 영수증 전표 입력 비효율을 OCR로 자동화하는 ERP 사이트. Claude Code로 설계와 구조 개선을 반복하며 개발 중입니다.',
      stack: ['Next.js', 'Nest.js', 'TypeScript', 'OCR', 'Claude Code'],
      links: [{ label: 'GitHub', href: 'https://github.com/ounjuu/ReceiptFlow' }],
      cover: 'receipt',
      image: '/assets/img/LedgerFlow ERP.webp',
      gallery: ['/assets/img/LedgerFlow ERP.webp', '/assets/img/LedgerFlow ERP2.webp'],
      highlights: [
        '재무회계 실무에서 반복하던 영수증 전표 입력 작업을 OCR로 자동화',
        'Next.js + Nest.js + TypeScript 풀스택 직접 설계',
        'Claude Code 페어 코딩으로 구조 개선 반복',
        '진행 중',
      ],
    },
    {
      n: '04', year: '2025.05',
      title: '코코월드', en: 'cocoworld',
      kind: '팀 프로젝트 · 풀스택 · 2025.04.28 — 05.21',
      desc: '추억 속 미니홈피를 현대 기술로 재해석. 다이어리(react-calendar), 미니룸 커스터마이징(react-dnd), JWT 인증, 결제 연동, AWS EC2 배포까지 구현한 부트캠프 대상 수상작.',
      stack: ['Next.js', 'Nest.js', 'TypeScript', 'react-dnd', 'JWT', 'MySQL', 'AWS EC2'],
      award: '대상 · 포스코 X 코딩온',
      links: [],
      cover: 'coco',
      image: '/assets/img/Cocoworld.webp',
      gallery: [
        '/assets/img/Cocoworld.webp', '/assets/img/Cocoworld_개발자소개.webp',
        '/assets/img/Cocoworld1.webp', '/assets/img/Cocoworld2.webp', '/assets/img/Cocoworld3.webp',
        '/assets/img/Cocoworld4.webp', '/assets/img/Cocoworld5.webp', '/assets/img/Cocoworld6.webp',
        '/assets/img/Cocoworld7.webp', '/assets/img/Cocoworld7.gif', '/assets/img/Cocoworld8.gif',
        '/assets/img/Cocoworld9.webp', '/assets/img/Cocoworld10.webp', '/assets/img/Cocoworld11.webp',
        '/assets/img/Cocoworld12.webp', '/assets/img/Cocoworld12.gif', '/assets/img/Cocoworld13.gif',
        '/assets/img/미니룸_설정.gif',
      ],
      highlights: [
        '싸이월드 미니홈피를 현대 기술 스택으로 재해석한 SNS 프로젝트',
        '다이어리(react-calendar), 미니룸 커스터마이징(react-dnd) 직접 구현',
        'JWT 인증 · 소셜 로그인 · 결제 API 연동 · 채팅 · 게시물·팔로우',
        'AWS EC2 배포 · 포스코 X 코딩온 3차 팀 프로젝트 대상 수상',
      ],
      troubleshooting: [
        {
          title: '미니룸 드래그 + 반응형 대응',
          problem: '미니룸·미니미 캐릭터의 자유 배치를 위한 드래그 앤 드롭에서, px·% 단위로 위치를 저장·렌더링할 때 모바일·태블릿 등 반응형 환경에 따라 저장 위치와 렌더링 위치가 달라지는 문제 발생',
          solution: '미니룸 배치는 px로 고정하고 작은 화면에서는 x축 스크롤로 대응. 저장 시 부모 요소 크기 기준 상대 위치를 계산해 저장하고 렌더링 시 % 단위로 다시 변환. 모바일 터치 이벤트(onTouchStart · Move · End)를 추가해 모바일 드래그 지원',
          result: 'PC · 태블릿 · 모바일 환경 모두에서 동일한 위치에 정확한 배치 구현',
        },
        {
          title: '꾸미기 상태 관리 최적화',
          problem: '미니홈피 배경색·탭 색·언어 설정을 페이지별 개별 axios 요청으로 처리하면서, 페이지 이동 시 초기 색이 보인 뒤 변경된 색이 적용되는 UI 깜빡임(flash) 현상 발생',
          solution: 'React Context를 활용해 꾸미기 상태(배경색·탭 색·언어)를 전역 관리하도록 구조 변경. 초기 렌더링과 변경 시 Context 상태를 참조해 UI 일관성을 유지하고, 불필요한 API 호출 감소',
          result: '페이지 간 전환 시 깜빡임 최소화 · 렌더링 최적화 · 코드 유지보수성 향상',
        },
        {
          title: '음악 전역 상태 관리',
          problem: '탭을 라우터 페이지 이동으로 변경하면서, 사용자가 페이지를 이동할 때마다 음악이 다시 재생되거나 끊기는 UX 이슈 발생',
          solution: 'App 최상단에서 Context API로 음악의 재생 상태·볼륨·현재 BGM을 전역 관리. 음악 컴포넌트를 최상위 레벨에 한 번만 렌더링하도록 변경하고, controller.tsx로 메인 페이지에서는 음악이 재생되지 않도록 분기 처리',
          result: '페이지 이동 시에도 음악이 자연스럽게 유지 · 하나의 오디오 인스턴스를 공유해 불필요한 리렌더링과 리소스 낭비 감소',
        },
      ],
    },
    {
      n: '05', year: '2025.04',
      title: '소개팅 앱', en: 'Pet Friends',
      kind: '팀 프로젝트 · 풀스택 · 기여도 80%',
      desc: 'GPS · AI 기반 반려동물 친구 매칭 서비스. 2025.03.31 — 04.25 협업, AWS 배포 완료.',
      stack: ['Next.js', 'Nest.js', 'React Query', 'TypeScript', 'MySQL', 'AWS'],
      links: [],
      cover: 'pet',
      image: '/assets/img/소개팅_표지.webp',
      gallery: [
        '/assets/img/소개팅_표지.webp', '/assets/img/소개팅_로그인.webp', '/assets/img/소개팅_mbti.webp',
        '/assets/img/소개팅1.webp', '/assets/img/소개팅2.webp', '/assets/img/소개팅3.webp',
        '/assets/img/소개팅4.webp', '/assets/img/소개팅5.webp', '/assets/img/소개팅6.webp',
        '/assets/img/소개팅_관리자페이지.webp', '/assets/img/소개팅_기능정의서.webp',
      ],
      highlights: [
        'GPS · AI 기반 반려동물 친구 매칭 서비스',
        'Next.js + Nest.js + React Query 풀스택 협업',
        'JWT 인증 · MBTI 기반 추천 · 관리자 페이지 구현',
        'AWS 배포 · 기여도 80%',
      ],
    },
  ];

  return (
    <section id="work" data-screen-label="04 Work" className="py-32 md:py-44 px-8 border-t border-line">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-3">
            <div className="num-label sticky top-24">— Selected Work</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="reveal font-serif text-xl md:text-2xl text-ink kor-serif tracking-tight">
              프로젝트 내역
            </h2>
          </div>
        </div>

        <div className="space-y-20 md:space-y-28">
          {projects.map((p, i) => (
            <ProjectRow key={p.n} p={p} flip={i % 2 === 1} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ p, flip, onOpen }) {
  return (
    <article className="reveal proj-card grid md:grid-cols-12 gap-8 md:gap-12 items-center">
      <button type="button" onClick={() => onOpen(p)}
         className={`proj-cover block md:col-span-7 aspect-[4/3] md:aspect-video rounded-sm bg-paper2 overflow-hidden text-left ${flip ? 'md:order-2' : ''}`}
         aria-label={`${p.title} 자세히 보기`}>
        <div className={`proj-cover-inner relative w-full h-full ${p.image ? '' : `cover-${p.cover}`}`}>
          {p.image ? (
            <img src={p.image} alt={p.title} className="w-full h-full object-contain" loading="lazy" />
          ) : (
            <Cover name={p.cover} />
          )}
          <div className="absolute top-5 left-5 num-label z-10 inline-flex items-center gap-2"
               style={{ color: p.image ? '#1A1A1A' : 'inherit', opacity: 0.85 }}>
            <span>{p.n} / {p.year}</span>
            {p.live && <span className="accent-dot"></span>}
          </div>
        </div>
      </button>

      <div className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <div className="num-label mb-3">{p.kind}</div>
        <h3 className="font-serif text-3xl md:text-4xl text-ink mb-1 kor-serif tracking-tight">
          {p.title}
        </h3>
        <div className="font-serif serif-italic text-mute text-lg mb-5">{p.en}</div>
        <p className="text-ink2 leading-relaxed kor mb-6 max-w-md">{p.desc}</p>

        {p.award && (
          <div className="mb-6 inline-flex items-center gap-2 text-accent text-sm kor">
            <span className="accent-dot"></span> {p.award}
          </div>
        )}

        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-7 text-sm text-mute font-mono">
          {p.stack.map((s, i) => (
            <React.Fragment key={s}>
              <span>{s}</span>
              {i < p.stack.length - 1 && <span>·</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap gap-6">
          <button type="button" onClick={() => onOpen(p)}
                  className="ulink ulink-hover inline-flex items-center gap-1.5 text-ink text-sm">
            자세히 보기 <Icon name="arrowRight" size={12} />
          </button>
          {p.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
               className="ulink ulink-hover inline-flex items-center gap-1.5 text-ink text-sm">
              {l.icon && <Icon name={l.icon} size={14} />}
              {l.label} <Icon name="arrowUpRight" size={12} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Cover visuals ───────────────────────────────────────────────────────────
function Cover({ name }) {
  if (name === 'luna') {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-paper to-[#D8D2F5]"></div>
          <div className="absolute top-1 left-2 w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#1A1530]"></div>
          <div className="absolute -top-3 -right-6 w-1.5 h-1.5 rounded-full bg-paper"></div>
          <div className="absolute top-12 -right-12 w-1 h-1 rounded-full bg-paper opacity-70"></div>
          <div className="absolute -bottom-4 -left-10 w-1.5 h-1.5 rounded-full bg-paper opacity-80"></div>
          <div className="absolute -top-10 left-8 w-0.5 h-0.5 rounded-full bg-paper opacity-60"></div>
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div className="font-serif serif-italic text-paper text-2xl">Luna,</div>
          <div className="font-mono text-[10px] text-paper opacity-60 tracking-widest">FORTUNE.APP</div>
        </div>
      </div>
    );
  }
  if (name === 'receipt') {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-28 md:w-36 bg-paper shadow-[0_2px_24px_rgba(0,0,0,0.06)] py-4 px-3">
          <div className="font-mono text-[8px] text-ink2 text-center mb-2 tracking-widest">RECEIPT</div>
          <div className="space-y-1 mb-3">
            <div className="h-px bg-line"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between font-mono text-[8px] text-ink2">
                <div className="h-1 w-10 bg-ink2 opacity-30 rounded"></div>
                <div className="h-1 w-6 bg-ink2 opacity-30 rounded"></div>
              </div>
            ))}
            <div className="h-px bg-line"></div>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-ink">
            <span>TOTAL</span><span>₩—</span>
          </div>
          <svg className="absolute -bottom-2 left-0 right-0 w-full h-2" viewBox="0 0 100 8" preserveAspectRatio="none">
            <polygon points="0,0 5,8 10,0 15,8 20,0 25,8 30,0 35,8 40,0 45,8 50,0 55,8 60,0 65,8 70,0 75,8 80,0 85,8 90,0 95,8 100,0 100,0" fill="#FAF8F5"/>
          </svg>
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div className="font-serif serif-italic text-ink text-2xl">Receipt,</div>
          <div className="font-mono text-[10px] text-mute tracking-widest">FLOW</div>
        </div>
      </div>
    );
  }
  if (name === 'coco') {
    return (
      <div className="absolute inset-0 p-8 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
          {[1,2,3,4,5,6,7,8,9].map((i) => (
            <div key={i} className={`aspect-square ${[1,5,9].includes(i) ? 'bg-accent' : i % 2 === 0 ? 'bg-paper' : 'bg-[#D6CCFA]'} rounded-sm`}
                 style={{ opacity: i === 5 ? 1 : 0.5 + (i / 18) }}></div>
          ))}
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div className="font-serif serif-italic text-ink text-2xl">Cocoworld,</div>
          <div className="font-mono text-[10px] text-ink opacity-60 tracking-widest">MINI · HOMEPY</div>
        </div>
      </div>
    );
  }
  if (name === 'pet') {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-3/5 h-3/5 opacity-90">
          {[40, 70, 100].map((r, i) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#FAF8F5" strokeWidth="0.6" strokeDasharray="2 4" opacity={0.4 - i * 0.08}/>
          ))}
          <circle cx="100" cy="100" r="4" fill="#6B4FE8"/>
          <circle cx="60" cy="80" r="2.5" fill="#FAF8F5"/>
          <circle cx="140" cy="120" r="2.5" fill="#FAF8F5"/>
          <circle cx="130" cy="60" r="2" fill="#FAF8F5"/>
        </svg>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div className="font-serif serif-italic text-paper text-2xl">Nearby,</div>
          <div className="font-mono text-[10px] text-paper opacity-60 tracking-widest">PET · MATCH</div>
        </div>
      </div>
    );
  }
  return null;
}

// ─── Experience ──────────────────────────────────────────────────────────────
function Experience() {
  const items = [
    {
      year: '2025—', period: '2025.11 — 재직 중',
      role: '프론트엔드 개발자', org: '㈜영인터내셔널',
      points: [
        '키오스크 웹앱 유지보수 및 기능 개선',
        'Payme 결제 모듈 연동 / 프린터 상태 UI 개선',
        '서비스: 스티커메이커 · 폴라폴라 · 컬러네임스티커 · 카드메이커 · 스튜디오',
      ],
      live: true,
    },
    {
      year: '2025', period: '2024.12 — 2025.06',
      role: '풀스택 부트캠프 (수상)', org: '포스코 X 코딩온',
      points: [
        '1차 프로젝트 · 우수상 (2025.04)',
        '3차 팀 프로젝트 · 대상 (2025.05)',
        'Next.js · Nest.js · MySQL · AWS EC2 풀스택 협업',
      ],
    },
    {
      year: '2021—24', period: '2021.06 — 2024.12',
      role: '재무회계', org: '에임시스템㈜',
      points: [
        '3년 7개월간 결산 · 세무 · 자금 등 회계 전반',
        '데이터의 정확성을 다루는 감각을 다진 시기',
        '커리어 전환을 위해 부트캠프 수료 후 개발자로 전향',
      ],
    },
  ];

  return (
    <section id="experience" data-screen-label="05 Experience" className="py-32 md:py-44 px-8 border-t border-line">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="num-label sticky top-24">— Experience</div>
        </div>
        <div className="md:col-span-9">
          <h2 className="reveal font-serif text-xl md:text-2xl text-ink mb-12 kor-serif tracking-tight">
            경력
          </h2>

          <div>
            {items.map((it, i) => (
              <ExpItem key={i} it={it} idx={i} last={i === items.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpItem({ it, idx, last }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className={`reveal exp-row border-t border-ink py-7 md:py-9 ${last ? 'border-b' : ''} cursor-pointer group`}
         onClick={() => setOpen(!open)}>
      <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-start">
        <div className="md:col-span-2 font-mono text-mute text-sm">{it.year}</div>
        <div className="md:col-span-7">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-serif text-2xl md:text-3xl text-ink kor-serif tracking-tight">{it.role}</h3>
            {it.live && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-accent">
                <span className="accent-dot"></span> Now
              </span>
            )}
          </div>
          <div className="text-ink2 kor mt-1 text-base">{it.org}</div>
        </div>
        <div className="md:col-span-3 flex md:justify-end items-center gap-3 text-mute group-hover:text-ink transition-colors">
          <span className="font-mono text-xs">{open ? '닫기' : '자세히'}</span>
          <Icon name={open ? 'minus' : 'plus'} size={16} />
        </div>
      </div>

      <div
        className="overflow-hidden transition-[max-height,opacity,margin] duration-700 ease-out"
        style={{ maxHeight: open ? '400px' : '0px', opacity: open ? 1 : 0, marginTop: open ? '20px' : '0' }}
      >
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2 num-label">{it.period}</div>
          <ul className="md:col-span-7 md:col-start-3 space-y-2 text-ink2 kor leading-relaxed">
            {it.points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-mute mt-2 shrink-0">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Other Works ─────────────────────────────────────────────────────────────
function OtherWorks({ onOpen }) {
  const items = [
    {
      date: '2025', title: 'REDDIEE', kind: '개인 · 쇼핑몰 + 관리자 채팅',
      stack: ['Next.js', 'Nest.js', 'Socket.io', 'Zustand', 'Tailwind'],
      image: '/assets/img/Reddiee.webp',
      gallery: ['/assets/img/Reddiee.webp', '/assets/img/Reddiee2.webp', '/assets/img/Reddiee3.webp', '/assets/img/Reddiee4.webp'],
      highlights: [
        '쇼핑몰 + 관리자 실시간 채팅 시스템',
        'Socket.io 양방향 통신 · Zustand 상태 관리',
        'Next.js + Nest.js + MySQL 풀스택 구현',
      ],
    },
    {
      date: '2025.02', title: '상품 & 관리자 페이지', en: 'Kikipopo',
      kind: '개인 사이드 프로젝트 · UI UX',
      desc: '상품을 등록하고 관리할 수 있는 웹 사이트입니다. MySQL 데이터베이스와 JavaScript, Node.js를 사용하여 상품 정보를 저장하고 관리할 수 있는 시스템을 구축했습니다.',
      stack: ['HTML', 'CSS', 'EJS', 'Node.js', 'MySQL', 'MVC 패턴', 'JWT', 'OAuth (Kakao · Naver)'],
      image: '/assets/img/Kikipopo1.webp',
      gallery: [
        '/assets/img/Kikipopo1.webp', '/assets/img/Kikipopo2.webp', '/assets/img/Kikipopo3.webp',
        '/assets/img/Kikipopo4.webp', '/assets/img/Kikipopo5.webp', '/assets/img/Kikipopo6.gif',
        '/assets/img/Kikipopo7.webp', '/assets/img/Kikipopo8.webp', '/assets/img/Kikipopo9.webp',
        '/assets/img/Kikipopo10.webp', '/assets/img/Kikipopo11.webp',
      ],
      highlights: [
        '상품 등록·관리 풀스택 웹사이트 구현',
        'MySQL 데이터베이스 기반 상품 정보 저장·관리 시스템 구축',
        'Node.js · JavaScript · EJS · MVC 패턴 적용',
      ],
      links: [{ label: 'GitHub', href: 'https://github.com/ounjuu/admin_MY-SQL' }],
    },
    {
      date: '2025.03', title: 'BAKEZY', kind: '팀 · 게시판 (MVC) · 기여도 85%',
      stack: ['Node.js', 'MySQL', 'JavaScript', 'ejs', 'HTML/CSS'],
      image: '/assets/img/BAKEZY.webp',
      gallery: [
        '/assets/img/BAKEZY.webp', '/assets/img/BAKEZY2.webp', '/assets/img/BAKEZY3.webp',
        '/assets/img/BAKEZY_signup.webp', '/assets/img/BAKEZY_login.webp', '/assets/img/BAKEZY_db.webp',
      ],
      highlights: [
        'MVC 패턴 기반 게시판 풀스택 구현',
        '회원가입 / 로그인 / 게시글 CRUD / DB 설계 직접 작업',
        '팀 · 기여도 85%',
      ],
    },
    {
      date: '2025.03', title: 'VOG TREND', en: 'VogTrend',
      kind: '개인 사이드 프로젝트 · VOGUE 모티브',
      desc: 'VOG TREND는 React로 제작한 프로젝트로, 보그(VOGUE) 홈페이지를 모티브로 만들었습니다. Route를 사용하지 않고 useState만으로 메뉴 클릭 시 페이지가 이동되는 것처럼 구현했으며, 헤더도 메인/디테일 페이지에 따라 header / header2로 전환되도록 처리했습니다.',
      stack: ['React', 'JavaScript', 'HTML/CSS'],
      image: '/assets/img/VogTrend.webp',
      gallery: ['/assets/img/VogTrend.webp'],
      highlights: [
        'VOGUE 홈페이지를 모티브로 한 React 프로젝트',
        'Route 없이 useState만으로 페이지 전환 효과 구현',
        '메인 / 디테일 페이지에 따라 header · header2 동적 전환',
      ],
      links: [{ label: 'GitHub', href: 'https://github.com/ounjuu/VogTrend' }],
    },
    {
      date: '2025.03', title: 'Coupang', en: 'React Practice',
      kind: '개인 사이드 프로젝트 · UI 클론',
      desc: 'React를 사용하여 만든 Coupang 홈페이지입니다. 리액트 컴포넌트를 활용하였으며, 기존 홈페이지에 반응형이 적용되어 있지 않아서 반응형을 직접 적용해보았습니다.',
      stack: ['React', 'JavaScript'],
      image: '/assets/img/coupang.webp',
      gallery: ['/assets/img/coupang.webp'],
      highlights: [
        'Coupang 홈페이지를 React로 클론 구현',
        '리액트 컴포넌트를 활용한 구조화',
        '기존 홈페이지에 없던 반응형 레이아웃 직접 적용',
      ],
    },
    {
      date: '2025.02', title: '상품 등록 페이지', kind: '개인 · localStorage · axios',
      stack: ['Node.js', 'JavaScript', 'HTML/CSS'],
      image: '/assets/img/상품 등록 페이지.webp',
      gallery: ['/assets/img/상품 등록 페이지.webp'],
      highlights: ['localStorage 기반 상품 CRUD', 'axios로 Node.js 백엔드 연동'],
    },
    {
      date: '2025.02', title: '미니 장바구니', kind: '개인 · localStorage',
      stack: ['JavaScript', 'HTML/CSS'],
      image: '/assets/img/미니 장바구니.webp',
      gallery: [
        '/assets/img/미니 장바구니.webp', '/assets/img/미니 장바구니2.webp', '/assets/img/미니 장바구니3.webp',
        '/assets/img/미니 장바구니4.webp', '/assets/img/미니 장바구니5.webp',
      ],
      highlights: ['localStorage 기반 장바구니 구현', '수량 변경 · 합계 계산 · 영속성'],
    },
    {
      date: '2025.01', title: '클라이밍 정보 사이트', en: 'AllClimb',
      kind: '개인 사이드 프로젝트 · 첫 프로젝트',
      desc: 'HTML, CSS, JavaScript를 이용한 첫 프로젝트입니다. 캐러셀, 스티키(이미지 겹쳐지는 효과), 이미지 무한으로 흘러가게 하는 기능 등을 구현했습니다.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      image: '/assets/img/클라이밍 정보 사이트.gif',
      gallery: ['/assets/img/클라이밍 정보 사이트.gif', '/assets/img/클라이밍 정보 사이트2.webp'],
      highlights: [
        '캐러셀 구현',
        '스티키 효과 (이미지 겹쳐지는 효과) 구현',
        '이미지 무한 스크롤 기능 구현',
        'HTML · CSS · JavaScript로 만든 첫 프로젝트',
      ],
      links: [{ label: 'GitHub', href: 'https://github.com/ounjuu/AllClimb' }],
    },
    {
      date: '2024.12', title: '메뉴판 홈페이지', kind: '연습 · UI 구현',
      stack: ['HTML', 'CSS'],
      image: '/assets/img/메뉴판.webp',
      gallery: ['/assets/img/메뉴판.webp'],
      highlights: ['HTML/CSS 기반 메뉴판 페이지', 'Flexbox · Grid 레이아웃 연습'],
    },
  ];
  return (
    <section id="other" data-screen-label="05 Other Works" className="py-32 md:py-44 px-8 border-t border-line">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="num-label sticky top-24">— Other Works</div>
        </div>
        <div className="md:col-span-9">
          <h2 className="reveal font-serif text-xl md:text-2xl text-ink mb-12 kor-serif tracking-tight">
            기타 작업물
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {items.map((it, i) => (
              <article key={i} className="reveal proj-card group" style={{ transitionDelay: `${(i % 3) * 0.06}s` }}>
                <button type="button" onClick={() => onOpen(it)} className="block w-full text-left" aria-label={`${it.title} 자세히 보기`}>
                  <div className="aspect-[4/3] mb-4 bg-paper2 overflow-hidden rounded-sm proj-cover flex items-center justify-center">
                    <img src={it.image} alt={it.title} className="proj-cover-inner max-w-full max-h-full object-contain" loading="lazy" />
                  </div>
                  <div className="font-mono text-mute text-[11px] flex items-center gap-2 mb-1.5 tracking-wider uppercase">
                    <span>{it.date}</span>
                    {it.wip && <span className="accent-dot"></span>}
                  </div>
                  <h3 className="font-serif kor-serif text-lg text-ink tracking-tight mb-1 group-hover:text-accent transition-colors">{it.title}</h3>
                  <div className="text-ink2 kor text-sm mb-2">{it.kind}</div>
                  <div className="font-mono text-mute text-[11px] tracking-wider">{it.stack.join(' · ')}</div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Recognition ─────────────────────────────────────────────────────────────
function Recognition() {
  const list = [
    { y: '2025', label: '대상', sub: '3차 팀 프로젝트', org: '포스코 X 코딩온', accent: true },
    { y: '2025', label: '우수상', sub: '1차 프로젝트', org: '포스코 X 코딩온', accent: true },
    { y: '2024', label: '중국어 HSK', sub: '6급 (260점)', org: 'Certificate' },
    { y: '2024', label: '중국어 HSK', sub: '5급', org: 'Certificate' },
    { y: '2021', label: '전산세무', sub: '2급', org: 'Certificate' },
    { y: '2021', label: '전산회계', sub: '1급', org: 'Certificate' },
    { y: '2020', label: 'TOEIC Speaking', sub: 'Level 6 (130)', org: 'Certificate' },
    { y: '2020', label: 'TOEIC', sub: '740점', org: 'Certificate' },
    { y: '2020', label: '컴퓨터활용능력', sub: '2급', org: 'Certificate' },
  ];
  return (
    <section id="recognition" data-screen-label="06 Recognition" className="py-32 md:py-44 px-8 border-t border-line">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="num-label sticky top-24">— Recognition</div>
        </div>
        <div className="md:col-span-9">
          <h2 className="reveal font-serif text-xl md:text-2xl text-ink mb-12 kor-serif tracking-tight">
            수상 · 자격증
          </h2>
          <ul>
            {list.map((it, i) => (
              <li key={i} className="reveal border-t border-line py-5 grid md:grid-cols-12 gap-4 items-baseline group hover:bg-paper2 px-2 md:px-4 -mx-2 md:-mx-4 transition-colors" style={{ transitionDelay: `${i * 0.04}s` }}>
                <div className="md:col-span-2 font-mono text-mute text-sm">{it.y}</div>
                <div className="md:col-span-5 flex items-center gap-3">
                  <span className={`font-serif text-xl md:text-2xl kor-serif tracking-tight ${it.accent ? 'text-accent' : 'text-ink'}`}>{it.label}</span>
                  {it.accent && <span className="accent-dot"></span>}
                </div>
                <div className="md:col-span-3 text-ink2 kor text-sm">{it.sub}</div>
                <div className="md:col-span-2 text-mute text-xs font-mono uppercase tracking-wider md:text-right">{it.org}</div>
              </li>
            ))}
            <li className="border-t border-line"></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const channels = [
    { label: 'Email', value: 'koj1555@naver.com', href: 'mailto:koj1555@naver.com' },
    { label: 'Phone', value: '010-8783-1556', href: 'tel:01087831556' },
    { label: 'GitHub', value: 'github.com/ounjuu', href: 'https://github.com/ounjuu' },
    { label: 'Notion', value: 'lily-taxicab-89f.notion.site', href: 'https://lily-taxicab-89f.notion.site/1c31edc0c62781c9b3cbc487fac1bf26?pvs=4' },
  ];
  return (
    <section id="contact" data-screen-label="08 Contact" className="py-32 md:py-44 px-8 border-t border-line">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="num-label sticky top-24">— Contact</div>
        </div>
        <div className="md:col-span-9">
          <h2 className="reveal font-serif text-xl md:text-2xl text-ink mb-12 kor-serif tracking-tight">
            연락 방법
          </h2>

        <div className="reveal grid md:grid-cols-12 gap-12 items-center" style={{ transitionDelay: '0.15s' }}>
          <div className="md:col-span-5">
            <p className="text-ink2 leading-relaxed kor max-w-md">
              협업 제안이나 안부 인사 모두 환영합니다.<br />편하실 때 메일이나 전화로 연락주세요.
            </p>
            <a href="mailto:koj1555@naver.com"
               className="btn-quiet inline-flex items-center gap-3 px-7 py-4 mt-8 rounded-full text-sm">
              <Icon name="mail" size={14} /> 메일 보내기
              <Icon name="arrowUpRight" size={12} />
            </a>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ul>
              {channels.map((c, i) => (
                <li key={c.label} className="border-t border-line last:border-b py-5 group">
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                     className="flex items-baseline justify-between gap-4">
                    <span className="num-label">0{i + 1} · {c.label}</span>
                    <span className="ulink ulink-hover font-serif kor-serif text-lg md:text-xl text-ink truncate">{c.value}</span>
                    <Icon name="arrowUpRight" size={14} className="text-ink2 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-8 py-10 border-t border-line">
      <div className="max-w-[1280px] mx-auto text-xs font-mono text-mute text-center">
        © 2026 Eunju Kim · 김은주
      </div>
    </footer>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;
  const p = project;
  const heading = p.title || p.label;
  const sub = p.en || p.kind;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6" onClick={onClose} role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/60" style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}></div>
      <div className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl bg-paper md:rounded-sm shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-paper border-b border-line px-6 md:px-10 py-5 flex items-start justify-between gap-6 shrink-0">
          <div className="min-w-0">
            <div className="num-label mb-1.5 truncate">{p.kind}</div>
            <h2 className="font-serif kor-serif text-xl md:text-2xl text-ink tracking-tight">
              {heading}
              {p.en && <span className="serif-italic text-mute font-normal text-base ml-2">{p.en}</span>}
            </h2>
          </div>
          <button onClick={onClose} className="shrink-0 text-ink2 hover:text-ink transition-colors p-2 -m-2" aria-label="닫기">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18"/>
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto overscroll-contain flex-1 px-6 md:px-10 py-8 md:py-10 space-y-10">
            {p.desc && (
              <p className="text-ink2 leading-relaxed kor max-w-2xl text-[15px]">{p.desc}</p>
            )}

            {p.award && (
              <div className="inline-flex items-center gap-2 text-accent text-sm kor">
                <span className="accent-dot"></span> {p.award}
              </div>
            )}

            {p.highlights && p.highlights.length > 0 && (
              <div>
                <div className="num-label mb-4">— 주요 내용</div>
                <ul className="space-y-2.5 text-ink2 kor leading-relaxed text-[15px]">
                  {p.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-mute shrink-0 leading-relaxed">·</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.features && p.features.length > 0 && (
              <div>
                <div className="num-label mb-4">— 주요 기능</div>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  {p.features.map((f, i) => (
                    <li key={i} className="border-t border-line pt-3">
                      <div className="font-serif kor-serif text-ink text-base mb-1">{f.title}</div>
                      <div className="text-ink2 kor text-sm leading-relaxed">{f.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.troubleshooting && p.troubleshooting.length > 0 && (
              <div>
                <div className="num-label mb-4">— 트러블슈팅</div>
                <ul className="space-y-8">
                  {p.troubleshooting.map((t, i) => (
                    <li key={i} className="border-t border-line pt-5">
                      {t.title && <div className="font-serif kor-serif text-ink text-base mb-4">{t.title}</div>}
                      <div className="grid sm:grid-cols-[88px_1fr] gap-x-4 gap-y-2.5 text-[14px] kor">
                        <div className="num-label text-mute pt-1">Problem</div>
                        <div className="text-ink2 leading-relaxed">{t.problem}</div>
                        <div className="num-label text-accent pt-1">Solution</div>
                        <div className="text-ink2 leading-relaxed">{t.solution}</div>
                        <div className="num-label text-mute pt-1">Result</div>
                        <div className="text-ink2 leading-relaxed">{t.result}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.stack && p.stack.length > 0 && (
              <div>
                <div className="num-label mb-3">— 사용 기술</div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-mute font-mono text-sm">
                  {p.stack.map((s, i) => (
                    <React.Fragment key={s}>
                      <span>{s}</span>
                      {i < p.stack.length - 1 && <span className="text-line">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {p.links && p.links.length > 0 && (
              <div className="flex flex-wrap gap-6">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                     className="ulink ulink-hover inline-flex items-center gap-1.5 text-ink text-sm">
                    {l.icon && <Icon name={l.icon} size={14} />}
                    {l.label} <Icon name="arrowUpRight" size={12} />
                  </a>
                ))}
              </div>
            )}

            {p.gallery && p.gallery.length > 0 && (
              <div>
                <div className="num-label mb-4">— 스크린샷 ({p.gallery.length})</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.gallery.map((src, i) => (
                    <div key={i} className="bg-paper2 rounded-sm overflow-hidden flex items-center justify-center">
                      <img src={src} alt={`${heading} ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  useReveal();
  const [active, setActive] = useState(null);
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Work onOpen={setActive} />
      <OtherWorks onOpen={setActive} />
      <Experience />
      <Recognition />
      <Contact />
      <Footer />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
