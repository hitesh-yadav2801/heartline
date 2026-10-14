import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { C } from './components/heartline/tokens';
import { BottomNav, Tab } from './components/heartline/BottomNav';
import { HomeScreen } from './components/heartline/HomeScreen';
import { HeartFlow } from './components/heartline/HeartFlow';
import { HeartSent } from './components/heartline/HeartSent';
import { Resolution, WgState, CoolState } from './components/heartline/Resolution';
import { WeGood } from './components/heartline/WeGood';
import { MoodScreen } from './components/heartline/MoodScreen';
import { MemoryJar } from './components/heartline/MemoryJar';
import { MemoryDetail } from './components/heartline/MemoryDetail';
import { UsTime, Plan, initialPlans } from './components/heartline/UsTime';
import { PlanCreate, UsTimeIdeas, UsTimeReflect } from './components/heartline/UsTimeFlows';
import { ProfileScreen } from './components/heartline/ProfileScreen';
import { HeartItem } from './components/heartline/HeartCard';
import { Particles } from './components/heartline/Shared';
import { Auth, JoinWithCode, Linked, LinkCreate, LinkWaiting, Onboarding, ProfileSetup } from './components/heartline/Onboarding';
import { AppreciationCompose, GratitudeWall } from './components/heartline/Appreciation';
import { LoveLanguage } from './components/heartline/LoveLanguage';
import { PulsePast, PulseStage, WeeklyPulse } from './components/heartline/Pulse';
import { BucketList, MoodCalendar, Milestones, PalettePicker, Referral, WeeklySummary } from './components/heartline/Phase3';
import { ExportSheet, PaywallScreen, PaywallSheet } from './components/heartline/Paywall';
import { Toast, ToastData } from './components/heartline/Toast';
import { IndexGroup, ScreensIndex } from './components/heartline/ScreensIndex';

interface Route { name: string; p?: any }

const baseHearts: HeartItem[] = [
  { id: 'h1', feeling: 'lonely', note: "I felt invisible at dinner last night. I know you were tired — I just needed a soft moment with you.", time: '2h', status: 'in-resolution', by: 'M', messages: 4 },
  { id: 'h2', feeling: 'overwhelmed', note: "Work spilled into the evening again. I don't want to bring it home but I did.", time: '1d', status: 'open', by: 'M' },
  { id: 'r1', feeling: 'hurt', note: "When you laughed at the joke about my mom, it stung more than I let on.", time: 'Apr 3', status: 'resolved', by: 'M', resolvedDate: 'Apr 3', messages: 14 },
  { id: 'r2', feeling: 'anxious', note: "I was spiraling about the move and didn't know how to say it.", time: 'Mar 22', status: 'resolved', by: 'E', resolvedDate: 'Mar 22', messages: 9 },
  { id: 'r3', feeling: 'unheard', note: "I tried twice to talk about Sunday plans and it felt like neither landed.", time: 'Mar 11', status: 'resolved', by: 'M', resolvedDate: 'Mar 11', messages: 6 },
  { id: 'r4', feeling: 'ignored', note: "Your phone was between us all through dinner.", time: 'Feb 28', status: 'resolved', by: 'E', resolvedDate: 'Feb 28', messages: 11 },
];
const thirdHeart: HeartItem = { id: 'h3', feeling: 'anxious', note: 'I keep replaying our conversation about the trip.', time: '3h', status: 'open', by: 'E' };
const openOnly = baseHearts.filter((h) => h.status !== 'resolved');
const resolvedOnly = baseHearts.filter((h) => h.status === 'resolved');

type Scenario = 'default' | 'limit' | 'noOpen' | 'jarEmpty' | 'pending' | 'none';
const scenarios: Record<Scenario, HeartItem[]> = {
  default: baseHearts,
  limit: [thirdHeart, ...baseHearts],
  noOpen: resolvedOnly,
  jarEmpty: openOnly,
  pending: baseHearts.map((h) => (h.id === 'h1' ? { ...h, status: 'pending-good' as const } : h)),
  none: [],
};

export default function App() {
  const [stage, setStage] = useState<'splash' | 'app'>('splash');
  const [stack, setStack] = useState<Route[]>([{ name: 'onboarding' }]);
  const [tab, setTab] = useState<Tab>('home');
  const [hearts, setHearts] = useState<HeartItem[]>(baseHearts);
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [celebrate, setCelebrate] = useState(false);
  const [plus, setPlus] = useState(false);
  const [partnerMood, setPartnerMood] = useState(true);
  const [overlay, setOverlay] = useState<null | 'paywall' | 'export'>(null);
  const [toast, setToast] = useState<ToastData | null>(null);
  const activeRef = useRef<string | null>(null);
  const toastShown = useRef(false);

  const top = stack[stack.length - 1];
  const inTabs = stage === 'app' && !top;

  const push = useCallback((name: string, p?: any) => {
    if (name === 'resolution') activeRef.current = p?.id ?? null;
    setStack((s) => [...s, { name, p }]);
  }, []);
  const back = useCallback(() => setStack((s) => s.slice(0, -1)), []);
  const home = useCallback((t: Tab = 'home') => { setStack([]); setTab(t); }, []);
  const showToast = useCallback((t: Omit<ToastData, 'id'>) => setToast({ ...t, id: Date.now() }), []);
  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (stage !== 'splash') return;
    const t = setTimeout(() => setStage('app'), 2200);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (!inTabs || toastShown.current) return;
    const t = setTimeout(() => {
      toastShown.current = true;
      showToast({ title: 'Mira sent you a hug 🤗', body: "They're thinking of you.", from: 'M', action: () => push('resolution', { id: 'h1' }) });
    }, 6000);
    return () => clearTimeout(t);
  }, [inTabs, push, showToast]);

  const onWeGood = useCallback(() => setCelebrate(true), []);
  const onPending = useCallback((id: string) => setHearts((hs) => hs.map((h) => (h.id === id ? { ...h, status: 'pending-good' } : h))), []);
  const onCelebrateDone = useCallback(() => {
    const id = activeRef.current;
    setHearts((hs) => hs.map((h) => (h.id === id ? { ...h, status: 'resolved', resolvedDate: 'Today' } : h)));
    setCelebrate(false);
    home('hearts');
  }, [home]);

  const subscribe = () => {
    setPlus(true);
    setOverlay(null);
    showToast({ title: 'Heartline Plus is on 💛', body: 'Both of you are covered.', from: 'M' });
  };
  const exportJar = () => setOverlay(plus ? 'export' : 'paywall');

  const applyScenario = (s: Scenario) => setHearts(scenarios[s]);
  const find = (id?: string) => hearts.find((h) => h.id === id) ?? baseHearts.find((h) => h.id === id);

  /* Screens index */
  const jump = (name: string, p?: any, s?: Scenario) => () => { if (s) applyScenario(s); push(name, p); };
  const tabJump = (t: Tab, s: Scenario = 'default', mood = true, pl: Plan[] = initialPlans) => () => { applyScenario(s); setPartnerMood(mood); setPlans(pl); home(t); };
  const groups: IndexGroup[] = [
    { title: 'Onboarding & linking', items: [
      { label: 'Splash', run: () => setStage('splash') },
      { label: 'Onboarding · 3 slides', run: jump('onboarding') },
      { label: "Onboarding · Mira's 1-slide variant", run: jump('onboarding', { variant: 'b' }) },
      { label: 'Auth · sign in', run: jump('auth') },
      { label: 'Auth · sign up', run: jump('auth', { signup: true }) },
      { label: 'Profile setup', run: jump('profile-setup') },
      { label: 'Couple linking · create code', run: jump('link-create') },
      { label: 'Couple linking · waiting for partner', run: jump('link-waiting', { auto: false }) },
      { label: 'Couple linked · celebration', run: jump('linked') },
      { label: 'Join with code · Mira', note: 'Code filled from the invite link', run: jump('join') },
    ] },
    { title: 'Home', items: [
      { label: 'Home', run: tabJump('home') },
      { label: 'Home · no open Hearts', run: tabJump('home', 'noOpen') },
      { label: 'Home · 3 Hearts open', note: 'Open a Heart is disabled', run: tabJump('home', 'limit') },
      { label: "Home · waiting for Mira's We're Good", run: tabJump('home', 'pending') },
      { label: "Home · Mira hasn't checked in", run: tabJump('home', 'default', false) },
      { label: 'In-app notification toast', run: () => { home('home'); showToast({ title: 'Mira left you an Appreciation Drop 💌', body: '“You turned the worst Tuesday into something soft…”', from: 'M', action: () => push('gratitude') }); } },
    ] },
    { title: 'Hearts & Resolution Space', items: [
      { label: 'Heart flow', run: jump('heart') },
      { label: 'Heart sent', run: jump('sent') },
      { label: 'Resolution Space · Hug', run: jump('resolution', { id: 'h2', fixed: true }) },
      { label: 'Resolution Space · talking it through', run: jump('resolution', { id: 'h1', fixed: true }) },
      { label: "We're Good · step 1 sheet", run: jump('resolution', { id: 'h1', fixed: true, sheet: true }) },
      { label: "We're Good · step 2a waiting", run: jump('resolution', { id: 'h1', fixed: true, wg: 'waiting' }) },
      { label: "We're Good · step 2b say it back (Mira's view)", run: jump('resolution', { id: 'h1', fixed: true, wg: 'incoming', viewer: 'M', swap: true }) },
      { label: "We're Good · celebration", run: () => { activeRef.current = null; setCelebrate(true); } },
      { label: 'Cool-down · active', run: jump('resolution', { id: 'h1', fixed: true, cool: 'on' }) },
      { label: 'Cool-down · ready to continue', run: jump('resolution', { id: 'h1', fixed: true, cool: 'done' }) },
    ] },
    { title: 'Memory Jar', items: [
      { label: 'Memory Jar', run: tabJump('hearts') },
      { label: 'Memory Jar · empty', run: tabJump('hearts', 'jarEmpty') },
      { label: 'Memory Jar detail', run: jump('jar-detail', { id: 'r1' }) },
      { label: 'Export as PDF · Plus prompt', run: () => { setPlus(false); setOverlay('paywall'); } },
      { label: 'Export as PDF · options', run: () => { setPlus(true); setOverlay('export'); } },
    ] },
    { title: 'Mood', items: [
      { label: 'Mood check-in', run: tabJump('mood') },
      { label: 'Mood calendar', run: jump('mood-cal') },
      { label: 'Weekly summary', run: jump('summary') },
      { label: 'Weekly summary · empty', run: jump('summary', { empty: true }) },
    ] },
    { title: 'Appreciation & love language', items: [
      { label: 'Appreciation Drop · compose', run: jump('appreciation') },
      { label: 'Gratitude Wall', run: jump('gratitude') },
      { label: 'Gratitude Wall · empty', run: jump('gratitude', { empty: true }) },
      { label: 'Love language', run: jump('love') },
      { label: 'Love language · Mira not set yet', run: jump('love', { partnerSet: false }) },
    ] },
    { title: 'Weekly Pulse', items: [
      { label: 'Pulse · intro', run: jump('pulse', { stage: 'intro' }) },
      { label: 'Pulse · question', run: jump('pulse', { stage: 'q0' }) },
      { label: 'Pulse · waiting for Mira', run: jump('pulse', { stage: 'waiting' }) },
      { label: 'Pulse · reveal', run: jump('pulse', { stage: 'reveal' }) },
      { label: 'Past pulses', run: jump('pulse-past') },
      { label: 'Past pulses · empty', run: jump('pulse-past', { empty: true }) },
    ] },
    { title: 'Us Time', items: [
      { label: 'Us Time', run: tabJump('us') },
      { label: 'Us Time · nothing planned', run: tabJump('us', 'default', true, []) },
      { label: 'Plan something', run: jump('plan-create') },
      { label: 'Get Ideas', run: jump('ideas') },
      { label: 'How was your Us Time?', run: jump('reflect', { id: 'p0' }) },
      { label: 'Bucket list', run: jump('bucket') },
      { label: 'Bucket list · empty', run: jump('bucket', { empty: true }) },
      { label: 'Milestones', run: jump('milestones') },
    ] },
    { title: 'Profile, palette & Plus', items: [
      { label: 'Profile & settings · Free', run: () => { setPlus(false); home('profile'); } },
      { label: 'Profile & settings · Plus', run: () => { setPlus(true); home('profile'); } },
      { label: 'Your palette', run: jump('palette') },
      { label: 'Invite friends', run: jump('referral') },
      { label: 'Heartline Plus · full screen', run: () => { setPlus(false); push('paywall'); } },
      { label: 'Heartline Plus · bottom sheet', run: () => { setPlus(false); setOverlay('paywall'); } },
      { label: 'Heartline Plus · subscribed', run: () => { setPlus(true); push('paywall'); } },
    ] },
  ];

  const renderRoute = (r: Route) => {
    const p = r.p ?? {};
    switch (r.name) {
      case 'onboarding':
        return <Onboarding variant={p.variant} onSkip={() => push('auth')} onDone={() => push('auth', { signup: true, b: p.variant === 'b' })} />;
      case 'auth':
        return <Auth partnerInvite={p.signup} onDone={() => push('profile-setup', { b: p.b })} />;
      case 'profile-setup':
        return <ProfileSetup partnerName={p.b ? 'Elena' : 'Mira'} initialName={p.b ? 'Mira' : 'Elena'} onBack={back} onDone={() => (p.b ? push('join') : push('link-create'))} />;
      case 'link-create':
        return <LinkCreate onBack={back} onShare={() => push('link-waiting')} />;
      case 'link-waiting':
        return <LinkWaiting auto={p.auto !== false} onAgain={back} onLinked={() => push('linked')} />;
      case 'linked':
        return <Linked partnerName={p.b ? 'Elena' : 'Mira'} onDone={() => home('home')} />;
      case 'join':
        return <JoinWithCode onBack={back} onJoin={() => push('linked', { b: true })} />;
      case 'heart':
        return (
          <HeartFlow
            onBack={back}
            onSent={(feeling, note) => {
              setHearts((hs) => [{ id: 'h' + Date.now(), feeling, note, time: 'now', status: 'open', by: 'E' }, ...hs]);
              setStack((s) => [...s.slice(0, -1), { name: 'sent' }]);
            }}
          />
        );
      case 'sent':
        return <HeartSent onHome={() => home('home')} />;
      case 'resolution': {
        const base = find(p.id);
        if (!base) return null;
        const heart = p.swap ? { ...base, by: 'E' } : base;
        return (
          <Resolution
            heart={heart}
            viewer={p.viewer}
            initialWg={p.wg as WgState | undefined}
            initialCool={p.cool as CoolState | undefined}
            initialSheet={p.sheet}
            fixed={p.fixed}
            onBack={back}
            onWeGood={onWeGood}
            onPending={onPending}
          />
        );
      }
      case 'jar-detail': {
        const h = find(p.id);
        return h ? <MemoryDetail heart={h} onBack={back} /> : null;
      }
      case 'appreciation':
        return <AppreciationCompose onBack={back} onSent={() => setStack((s) => [...s.slice(0, -1), { name: 'gratitude' }])} />;
      case 'gratitude':
        return <GratitudeWall empty={p.empty} onBack={back} onCompose={() => push('appreciation')} />;
      case 'love':
        return <LoveLanguage partnerSet={p.partnerSet} onBack={back} />;
      case 'pulse':
        return <WeeklyPulse initial={p.stage as PulseStage} onBack={back} onPast={() => push('pulse-past')} />;
      case 'pulse-past':
        return <PulsePast empty={p.empty} onBack={back} />;
      case 'plan-create':
        return (
          <PlanCreate
            prefill={p.prefill}
            onBack={back}
            onSave={(pl) => {
              setPlans((x) => [pl, ...x]);
              back();
              showToast({ title: 'Plan saved 🍷', body: 'Mira will see it right away.', from: 'E' });
            }}
          />
        );
      case 'ideas':
        return <UsTimeIdeas onBack={back} onPlan={(prefill) => push('plan-create', { prefill })} />;
      case 'reflect': {
        const pl = plans.find((x) => x.id === p.id) ?? initialPlans[3];
        return <UsTimeReflect plan={pl} onBack={back} onDone={() => { setPlans((x) => x.filter((k) => k.id !== pl.id)); home('us'); }} />;
      }
      case 'bucket':
        return <BucketList empty={p.empty} onBack={back} />;
      case 'milestones':
        return <Milestones onBack={back} />;
      case 'mood-cal':
        return <MoodCalendar onBack={back} onSummary={() => push('summary')} />;
      case 'summary':
        return <WeeklySummary empty={p.empty} onBack={back} />;
      case 'palette':
        return <PalettePicker onBack={back} />;
      case 'referral':
        return <Referral onBack={back} />;
      case 'paywall':
        return <PaywallScreen plus={plus} onBack={back} onSubscribe={subscribe} />;
      case 'index':
        return <ScreensIndex groups={groups} onBack={back} />;
      default:
        return null;
    }
  };

  return (
    <div className="size-full flex items-center justify-center" style={{ background: C.deepPlum, padding: 16 }}>
      <div
        className="relative overflow-hidden hl-bg hl-noise"
        style={{
          width: 'min(100%, 400px)',
          height: 'min(100vh, 860px)',
          maxHeight: '95vh',
          borderRadius: 44,
          border: '1px solid rgba(196,104,122,0.15)',
          boxShadow: '0 40px 100px rgba(26,10,46,0.6), 0 0 0 8px rgba(26,10,46,0.9)',
          color: C.warmCream,
        }}
      >
        <Particles />

        {stage === 'splash' && <Splash />}

        {stage === 'app' && (
          <div className="absolute inset-0 overflow-y-auto hl-scroll-hide" style={{ display: top ? 'none' : 'block' }}>
            {tab === 'home' && (
              <HomeScreen
                hearts={hearts}
                partnerMood={partnerMood}
                onOpenHeart={() => push('heart')}
                onOpenResolution={(id) => push('resolution', { id })}
                onGoto={(t) => setTab(t as Tab)}
                onAppreciation={() => push('appreciation')}
                onPulse={() => push('pulse', { stage: 'intro' })}
              />
            )}
            {tab === 'hearts' && <MemoryJar hearts={hearts} plus={plus} onOpen={(id) => push('jar-detail', { id })} onExport={exportJar} />}
            {tab === 'mood' && <MoodScreen onCalendar={() => push('mood-cal')} />}
            {tab === 'us' && (
              <UsTime
                plans={plans}
                onCreate={() => push('plan-create')}
                onIdeas={() => push('ideas')}
                onReflect={(id) => push('reflect', { id })}
                onBucket={() => push('bucket')}
                onMilestones={() => push('milestones')}
              />
            )}
            {tab === 'profile' && (
              <ProfileScreen
                plus={plus}
                onSubscription={() => push('paywall')}
                onPalette={() => push('palette')}
                onReferral={() => push('referral')}
                onLoveLanguage={() => push('love')}
                onIndex={() => push('index')}
              />
            )}
          </div>
        )}

        {stage === 'app' && top && (
          <motion.div
            key={`${stack.length}-${top.name}-${JSON.stringify(top.p ?? {})}`}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
          >
            {renderRoute(top)}
          </motion.div>
        )}

        {celebrate && <WeGood onDone={onCelebrateDone} />}

        {inTabs && <BottomNav active={tab} onChange={setTab} />}

        <PaywallSheet open={overlay === 'paywall'} plus={plus} onClose={() => setOverlay(null)} onSubscribe={subscribe} />
        <ExportSheet open={overlay === 'export'} onClose={() => setOverlay(null)} />
        <Toast toast={toast} onDismiss={dismissToast} />
      </div>
    </div>
  );
}

function Splash() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute" style={{ width: 200, height: 200 }}>
        <span className="hl-spin-slow absolute inset-0 rounded-full" style={{ border: `1px solid ${C.dustyRose}`, opacity: 0.12 }} />
      </div>
      <div className="absolute" style={{ width: 320, height: 320 }}>
        <span className="hl-spin-rev absolute inset-0 rounded-full" style={{ border: `1px solid ${C.dustyRose}`, opacity: 0.06 }} />
      </div>
      <div className="flex flex-col items-center hl-fade-up">
        <h1 className="hl-display" style={{ fontSize: 44, color: C.warmCream, letterSpacing: -1 }}>
          Heartline
        </h1>
        <span className="block my-3" style={{ width: 48, height: 1, background: C.dustyRose, opacity: 0.6 }} />
        <p className="hl-sans" style={{ fontSize: 11, color: C.textSecondary, letterSpacing: 1.8, textTransform: 'uppercase' }}>
          Your relationship, in one place
        </p>
      </div>
    </div>
  );
}
