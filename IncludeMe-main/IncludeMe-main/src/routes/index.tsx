import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from "react";
import {
  Heart,
  Home,
  Users,
  MapPin,
  Calendar,
  User,
  Settings,
  Search,
  Bell,
  Plus,
  ChevronRight,
  ChevronDown,
  Send,
  ArrowUp,
  Shield,
  Star,
  Coffee,
  ShoppingCart,
  Sparkles,
  ArrowLeft,
  ChevronLeft,
  LogOut,
  Apple,
  Mail,
  Lock,
  GraduationCap,
  Briefcase,
  Phone,
  LifeBuoy,
  Gamepad2,
  BarChart3,
  Vote,
  Filter,
  Utensils,
  Trees,
  Camera,
  BookOpen,
  PenLine,
  TrendingUp,
  History,
  ThumbsUp,
  ThumbsDown,
  UserPlus,
  BadgeCheck,
  Crown,
  Sprout,
  Lock as LockIcon,
  CheckCircle2,
  Clock,
  ExternalLink,
  Building2,
  Pencil,
  MessageCircle,
  Trash2,
  PartyPopper,
  Sun,
  Instagram,
  Copy,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GameScreen, GAME_TITLES, type GameId } from "@/components/include-me/games";
import {
  MOOD_EMOJI,
  MOOD_LABELS,
  initialDiary,
  initialEvents,
  initialCommunities,
  initialHousing,
  initialSpots,
  initialFriends,
  suggestedFriends,
  initialRoommatePosts,
  type AppEvent,
  type Community,
  type DiaryEntry,
  type EventCategory,
  type Housing,
  type Person,
  type Role,
  type Spot,
  type UserTag,
  type RoommatePost,
  type RoommateComment,
} from "@/lib/include-me";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Include Me — Acolhimento para universitários" },
      {
        name: "description",
        content:
          "Diário emocional, amizades verificadas, comunidades, moradia, mapa e eventos para estudantes recém-chegados na cidade.",
      },
      { property: "og:title", content: "Include Me — Acolhimento para universitários" },
      {
        property: "og:description",
        content:
          "Diário emocional, amizades verificadas, comunidades, moradia, mapa e eventos para quem acabou de chegar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

type Screen =
  | "splash"
  | "login"
  | "signup"
  | "home"
  | "diary"
  | "map"
  | "recommendations"
  | "invite"
  | "interact"
  | "help"
  | "profile"
  | "communities"
  | "community"
  | "housing"
  | "housingDetail"
  | "housingNew"
  | "roommateNew"
  | "roommateDetail"
  | "events"
  | "eventDetail"
  | "settings"
  | "verify"
  | "editProfile"
  | "friends"
  | "groupNew"
  | "game"
  | "eventNew";

type Me = {
  name: string;
  course: string;
  university: string;
  city: string;
  age: string;
  bio: string;
  interests: string[];
  verified: boolean;
  admin: boolean;
  isNew: boolean;
};

type AppContext = {
  go: (screen: Screen) => void;
  me: Me;
  setMe: Dispatch<SetStateAction<Me>>;
  role: Role;
  diary: DiaryEntry[];
  setDiary: Dispatch<SetStateAction<DiaryEntry[]>>;
  events: AppEvent[];
  setEvents: Dispatch<SetStateAction<AppEvent[]>>;
  going: string[];
  setGoing: Dispatch<SetStateAction<string[]>>;
  communities: Community[];
  setCommunities: Dispatch<SetStateAction<Community[]>>;
  housing: Housing[];
  setHousing: Dispatch<SetStateAction<Housing[]>>;
  spots: Spot[];
  setSpots: Dispatch<SetStateAction<Spot[]>>;
  friends: Person[];
  setFriends: Dispatch<SetStateAction<Person[]>>;
  sent: string[];
  setSent: Dispatch<SetStateAction<string[]>>;
  roommatePosts: RoommatePost[];
  setRoommatePosts: Dispatch<SetStateAction<RoommatePost[]>>;
  activeRoommatePost: RoommatePost | null;
  setActiveRoommatePost: Dispatch<SetStateAction<RoommatePost | null>>;
  activeEvent: AppEvent | null;
  setActiveEvent: Dispatch<SetStateAction<AppEvent | null>>;
  activeHouse: Housing | null;
  setActiveHouse: Dispatch<SetStateAction<Housing | null>>;
  activeCommunity: Community | null;
  setActiveCommunity: Dispatch<SetStateAction<Community | null>>;
  activeGame: GameId;
  setActiveGame: Dispatch<SetStateAction<GameId>>;
};

function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole] = useState<Role>("student");
  const [me, setMe] = useState<Me>({
    name: "Ana",
    course: "Medicina",
    university: "UVV",
    city: "Vila Velha",
    age: "19",
    bio: "Cheguei há 3 semanas e estou conhecendo a cidade aos poucos.",
    interests: ["Café", "Música", "Leitura"],
    verified: false,
    admin: false,
    isNew: true,
  });

  const [diary, setDiary] = useState<DiaryEntry[]>(initialDiary);
  const [events, setEvents] = useState<AppEvent[]>(initialEvents);
  const [going, setGoing] = useState<string[]>([]);
  const [communities, setCommunities] = useState<Community[]>(initialCommunities);
  const [housing, setHousing] = useState<Housing[]>(initialHousing);
  const [roommatePosts, setRoommatePosts] = useState<RoommatePost[]>(initialRoommatePosts);
  const [spots, setSpots] = useState<Spot[]>(initialSpots);
  const [friends, setFriends] = useState<Person[]>(initialFriends);
  const [sent, setSent] = useState<string[]>([]);

  const [activeEvent, setActiveEvent] = useState<AppEvent | null>(null);
  const [activeHouse, setActiveHouse] = useState<Housing | null>(null);
  const [activeRoommatePost, setActiveRoommatePost] = useState<RoommatePost | null>(null);
  const [activeCommunity, setActiveCommunity] = useState<Community | null>(null);
  const [activeGame, setActiveGame] = useState<GameId>("quizCity");

  const go = (s: Screen) => setScreen(s);

  const shell = !["splash", "login", "signup"].includes(screen);

  const ctx = {
    go,
    me,
    setMe,
    role,
    diary,
    setDiary,
    events,
    setEvents,
    going,
    setGoing,
    communities,
    setCommunities,
    housing,
    setHousing,
    spots,
    setSpots,
    friends,
    setFriends,
    sent,
    setSent,
    roommatePosts,
    setRoommatePosts,
    activeRoommatePost,
    setActiveRoommatePost,
    activeEvent,
    setActiveEvent,
    activeHouse,
    setActiveHouse,
    activeCommunity,
    setActiveCommunity,
    activeGame,
    setActiveGame,
  };

  return (
    <div className="min-h-screen w-full bg-[oklch(0.955_0.03_300)] flex justify-center">
      <div className="relative w-full max-w-md min-h-screen bg-gradient-to-b from-[oklch(0.975_0.025_305)] via-background to-[oklch(0.97_0.03_85)] shadow-xl overflow-hidden flex flex-col">
        {screen === "splash" && <Splash onContinue={() => go("login")} />}
        {screen === "login" && (
          <Login
            onLogin={(r) => {
              setRole(r);
              go("home");
            }}
            onSignup={() => go("signup")}
          />
        )}
        {screen === "signup" && (
          <Signup
            onDone={(n) => {
              setMe({ ...me, name: n || me.name });
              go("home");
            }}
            onBack={() => go("login")}
          />
        )}
        {shell && <MainShell screen={screen} ctx={ctx} />}
      </div>
    </div>
  );
}

/* ───────── Selos de usuário ───────── */
function UserTags({ tags, className = "" }: { tags: UserTag[]; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {tags.includes("admin") && (
        <Crown className="w-3.5 h-3.5 text-[oklch(0.72_0.14_85)]" aria-label="Administrador" />
      )}
      {tags.includes("verified") && (
        <BadgeCheck className="w-3.5 h-3.5 text-primary" aria-label="Verificado" />
      )}
      {tags.includes("new") && (
        <Sprout className="w-3.5 h-3.5 text-[oklch(0.65_0.12_150)]" aria-label="Novo no app" />
      )}
    </span>
  );
}

/* ───────── Splash ───────── */
function Splash({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
      <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-[oklch(0.82_0.08_85)] flex items-center justify-center shadow-lg mb-6 rotate-3">
        <Heart className="w-12 h-12 text-primary-foreground" fill="currentColor" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Include Me</h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Novas conexões, novos lugares, novas histórias. O Include Me te ajuda a viver a cidade do
        seu jeito, com segurança e gente que entende você.
      </p>
      <Button onClick={onContinue} className="mt-10 w-full h-12 rounded-2xl text-base">
        Começar
      </Button>
      <div className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground">
        <Shield className="w-3.5 h-3.5 text-primary" /> Ambiente verificado e moderado
      </div>
    </div>
  );
}

/* ───────── Login ───────── */
function Login({ onLogin, onSignup }: { onLogin: (r: Role) => void; onSignup: () => void }) {
  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-8 overflow-y-auto">
      <div className="mb-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
          <Heart className="w-7 h-7 text-primary" fill="currentColor" />
        </div>
        <h1 className="text-2xl font-bold">Bem-vindo</h1>
        <p className="text-muted-foreground text-sm mt-1">Escolha como deseja entrar.</p>
      </div>

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-12 rounded-2xl bg-secondary p-1">
          <TabsTrigger
            value="student"
            className="rounded-xl gap-2 data-[state=active]:bg-background"
          >
            <GraduationCap className="w-4 h-4" /> Estudante
          </TabsTrigger>
          <TabsTrigger
            value="professional"
            className="rounded-xl gap-2 data-[state=active]:bg-background"
          >
            <Briefcase className="w-4 h-4" /> Profissional
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="mt-5 space-y-3">
          <IconInput icon={Mail} placeholder="E-mail acadêmico" />
          <IconInput icon={GraduationCap} placeholder="Matrícula" />
          <IconInput icon={Lock} placeholder="Senha" type="password" />
          <Button onClick={() => onLogin("student")} className="w-full h-12 rounded-2xl">
            Entrar como estudante
          </Button>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 px-1">
            <Shield className="w-3 h-3 text-primary" /> Sua matrícula é conferida para manter o
            ambiente seguro.
          </p>
        </TabsContent>

        <TabsContent value="professional" className="mt-5 space-y-3">
          <IconInput icon={Mail} placeholder="E-mail profissional" />
          <IconInput icon={Briefcase} placeholder="Registro (CRP / CRM / OAB...)" />
          <IconInput icon={Lock} placeholder="Senha" type="password" />
          <Button onClick={() => onLogin("professional")} className="w-full h-12 rounded-2xl">
            Entrar como profissional
          </Button>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 px-1">
            <Shield className="w-3 h-3 text-primary" /> Registros passam por validação manual da
            moderação.
          </p>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">ou continue com</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={() => onLogin("student")}
          className="w-full h-12 rounded-2xl gap-2"
        >
          <GoogleIcon /> Google
        </Button>
        <Button
          variant="outline"
          onClick={() => onLogin("student")}
          className="w-full h-12 rounded-2xl gap-2"
        >
          <Apple className="w-4 h-4" fill="currentColor" /> Apple
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Novo por aqui?{" "}
        <button onClick={onSignup} className="text-primary font-semibold">
          Criar conta
        </button>
      </p>
    </div>
  );
}

function IconInput({ icon: Icon, ...props }: { icon: LucideIcon } & ComponentProps<typeof Input>) {
  return (
    <div className="relative">
      <Icon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input {...props} className="h-12 rounded-2xl pl-11" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.2 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.8 0 19.5-8.7 19.5-19.5 0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 16.4 4.5 9.8 8.7 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 43.5c5 0 9.6-1.9 13-5l-6-5.1c-1.9 1.3-4.3 2.1-7 2.1-5.1 0-9.5-3.1-11.3-7.5l-6.5 5C9.7 39.3 16.3 43.5 24 43.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.3 5.4l6 5.1c-.4.4 6.5-4.7 6.5-14.5 0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

/* ───────── Signup ───────── */
function Signup({ onDone, onBack }: { onDone: (n?: string) => void; onBack: () => void }) {
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const tags = [
    "Música",
    "Games",
    "Leitura",
    "Esportes",
    "Arte",
    "Cinema",
    "Tecnologia",
    "Viagens",
    "Dança",
    "Café",
  ];
  const toggle = (t: string) =>
    setInterests((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <div className="flex-1 flex flex-col px-6 pt-5 pb-8 overflow-y-auto">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-muted-foreground flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <h1 className="text-2xl font-bold">Vamos te conhecer</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-6">
        Isso ajuda a te aproximar de gente parecida com você.
      </p>

      <div className="space-y-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="h-12 rounded-2xl"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Idade" className="h-12 rounded-2xl" />
          <Input placeholder="Período" className="h-12 rounded-2xl" />
        </div>
        <Input placeholder="Curso (ex: Medicina)" className="h-12 rounded-2xl" />
        <Input placeholder="Universidade" className="h-12 rounded-2xl" />
        <Input placeholder="Cidade de origem" className="h-12 rounded-2xl" />
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold mb-3">Seus interesses</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => toggle(t)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                interests.includes(t)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={() => onDone(name)} className="w-full h-12 rounded-2xl mt-8">
        Criar minha conta
      </Button>
    </div>
  );
}

/* ───────── Shell ───────── */
function MainShell({ screen, ctx }: { screen: Screen; ctx: AppContext }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {screen === "home" && <HomeScreen ctx={ctx} />}
        {screen === "diary" && <DiaryScreen ctx={ctx} />}
        {screen === "map" && <MapScreen ctx={ctx} />}
        {screen === "recommendations" && <RecommendationsScreen ctx={ctx} />}
        {screen === "invite" && <InviteScreen ctx={ctx} />}
        {screen === "interact" && <InteractScreen ctx={ctx} />}
        {screen === "game" && <GameScreen id={ctx.activeGame} onBack={() => ctx.go("interact")} />}
        {screen === "help" && <HelpScreen ctx={ctx} />}
        {screen === "profile" && <ProfileScreen ctx={ctx} />}
        {screen === "editProfile" && <EditProfileScreen ctx={ctx} />}
        {screen === "friends" && <FriendsScreen ctx={ctx} />}
        {screen === "communities" && <CommunitiesScreen ctx={ctx} />}
        {screen === "community" && <CommunityScreen ctx={ctx} />}
        {screen === "groupNew" && <GroupNewScreen ctx={ctx} />}
        {screen === "events" && <EventsScreen ctx={ctx} />}
        {screen === "eventDetail" && <EventDetailScreen ctx={ctx} />}
        {screen === "eventNew" && <EventNewScreen ctx={ctx} />}
        {screen === "housing" && <HousingScreen ctx={ctx} />}
        {screen === "housingDetail" && <HousingDetailScreen ctx={ctx} />}
        {screen === "housingNew" && <HousingNewScreen ctx={ctx} />}
        {screen === "roommateNew" && <RoommateNewScreen ctx={ctx} />}
        {screen === "roommateDetail" && <RoommateDetailScreen ctx={ctx} />}
        {screen === "settings" && <SettingsScreen ctx={ctx} />}
        {screen === "verify" && <VerifyScreen ctx={ctx} />}
      </div>
      <BottomTabs screen={screen} go={ctx.go} />
    </div>
  );
}

function BottomTabs({ screen, go }: { screen: Screen; go: (s: Screen) => void }) {
  const items: { id: Screen; icon: LucideIcon }[] = [
    { id: "home", icon: Home },
    { id: "map", icon: MapPin },
    { id: "interact", icon: Gamepad2 },
    { id: "help", icon: LifeBuoy },
    { id: "profile", icon: User },
  ];
  return (
    <div className="fixed bottom-5 left-1/2 z-20 flex w-[90%] max-w-[380px] -translate-x-1/2 items-center rounded-[50px] border border-border/50 bg-[rgba(255,255,255,0.85)] p-[12px_24px] shadow-[0_4px_20px_oklch(0.2_0.02_300/0.12)] backdrop-blur-[15px] [-webkit-backdrop-filter:blur(15px)]">
      <div className="flex w-full items-center justify-between">
        {items.map(({ id, icon: Icon }) => {
          const active = screen === id;
          return (
            <button
              key={id}
              onClick={() => go(id)}
              aria-label={id}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                active ? "text-primary" : "text-foreground/70"
              }`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${active ? "bg-primary/10" : ""}`}>
                <Icon className="h-5 w-5" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-semibold text-base">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-xs text-primary font-medium">
          {action}
        </button>
      )}
    </div>
  );
}

function ScreenHeader({
  ctx,
  back,
  title,
  subtitle,
}: {
  ctx: AppContext;
  back: Screen;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <button
        onClick={() => ctx.go(back)}
        className="flex items-center gap-2 mb-3 -ml-1 -mt-6 pl-1 pr-3 py-1.5 rounded-full hover:bg-secondary transition text-sm text-muted-foreground"
      >
        <span className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-3.5 h-3.5" />
        </span>
        Voltar
      </button>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

/* ───────── Home ───────── */
function HomeScreen({ ctx }: { ctx: AppContext }) {
  const { me, go, diary } = ctx;
  const last = diary[diary.length - 1] as DiaryEntry | undefined;
  const generalGroups = ctx.communities.filter((c: Community) => c.general);

  return (
    <div className="px-5 pt-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm text-muted-foreground">Olá,</p>
          <h1 className="text-2xl font-bold flex items-center gap-1.5">
            {me.name}
            <UserTags
              tags={[
                ...(me.admin ? ["admin" as UserTag] : []),
                ...(me.verified ? ["verified" as UserTag] : []),
                ...(me.isNew ? ["new" as UserTag] : []),
              ]}
            />
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={() => go("settings")}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Card className="p-5 mb-5 rounded-3xl border-0 bg-gradient-to-br from-primary/15 to-accent/25">
        <Sun className="w-6 h-6 text-primary mb-3" />
        <h2 className="text-lg font-semibold">Que bom te ver por aqui hoje</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          Cidade nova tem muita coisa boa para descobrir. Comece por uma: um café, um grupo, um
          rolê.
        </p>
      </Card>

      <Card
        onClick={() => go("diary")}
        className="p-5 mb-5 cursor-pointer bg-gradient-to-br from-primary/15 to-[oklch(0.95_0.04_85)] border-0 rounded-3xl"
      >
        <div className="flex items-center justify-between">
          <div className="pr-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Diário emocional
            </p>
            <h3 className="text-lg font-semibold mt-1">Registrar o meu dia</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {last
                ? `Último registro: ${MOOD_EMOJI[last.mood - 1]} ${MOOD_LABELS[last.mood - 1]}`
                : "Escreva o que fez bem, o que pesou e o que você aprendeu."}
            </p>
          </div>
          <BookOpen className="w-8 h-8 text-primary shrink-0" />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-y-5 gap-x-3 mb-7">
        <QuickAction icon={MapPin} label="Mapa" onClick={() => go("map")} />
        <QuickAction icon={Users} label="Grupos" onClick={() => go("communities")} />
        <QuickAction icon={Building2} label="Moradia" onClick={() => go("housing")} />
        <QuickAction icon={Calendar} label="Eventos" onClick={() => go("events")} />
        <QuickAction icon={Sparkles} label="Indicações" onClick={() => go("recommendations")} />
        <QuickAction icon={UserPlus} label="Convidar" onClick={() => go("invite")} />
      </div>

      <SectionTitle title="Para você hoje" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card
          onClick={() => go("interact")}
          className="p-4 rounded-2xl cursor-pointer bg-gradient-to-br from-[oklch(0.95_0.04_85)] to-accent/20 border-0"
        >
          <Vote className="w-6 h-6 text-primary mb-2" />
          <p className="font-semibold text-sm">Enquetes & jogos</p>
          <p className="text-[11px] text-muted-foreground">Distraia a cabeça um pouco</p>
        </Card>
        <Card
          onClick={() => go("friends")}
          className="p-4 rounded-2xl cursor-pointer bg-gradient-to-br from-primary/18 to-primary/5 border-0"
        >
          <UserPlus className="w-6 h-6 text-primary mb-2" />
          <p className="font-semibold text-sm">Amizades</p>
          <p className="text-[11px] text-muted-foreground">{ctx.friends.length} amigos no app</p>
        </Card>
      </div>

      <SectionTitle
        title="Comunidades gerais"
        action="Ver tudo"
        onAction={() => go("communities")}
      />
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 mb-6">
        {generalGroups.map((g: Community) => (
          <Card
            key={g.id}
            onClick={() => {
              ctx.setActiveCommunity(g);
              go("community");
            }}
            className="min-w-[180px] p-4 cursor-pointer bg-gradient-to-br from-primary/15 to-accent/25 border-0 rounded-2xl"
          >
            <Users className="w-6 h-6 mb-3 text-primary" />
            <p className="font-semibold text-sm">{g.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{g.members} membros</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5">
      <div className="w-14 h-14 rounded-2xl bg-primary/12 text-primary flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}

function RecommendationsScreen({ ctx }: { ctx: AppContext }) {
  const { spots, setSpots, me } = ctx;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tudo");
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const categories = ["Tudo", "Beleza", "Serviços", "Aulas particulares", "Pet", "Alimentação"];
  const recommendations = [
    {
      id: "rec1",
      name: "Studio Rafa Hair",
      category: "Beleza",
      detail: "Cabeleireiro • Praia da Costa",
      note: "Cortou meu cabelo do jeito que pedi e cobrou justo. Atende com hora marcada.",
      by: "Marina S.",
      phone: "(27) 99000-1122",
      up: 38,
      down: 2,
    },
    {
      id: "rec2",
      name: "Marmitas da Tia Val",
      category: "Alimentação",
      detail: "Marmita caseira • Entrega no campus",
      note: "Entrega no campus, comida caseira de verdade e barata para o mês inteiro.",
      by: "Rafael L.",
      phone: "(27) 95555-2211",
      up: 52,
      down: 4,
    },
    {
      id: "rec3",
      name: "Prof. Helena",
      category: "Aulas particulares",
      detail: "Aulas de cálculo • Online / Centro",
      note: "Explica com calma e manda exercícios depois da aula. Salvou minha prova.",
      by: "Bruno T.",
      phone: "(27) 97777-3344",
      up: 44,
      down: 3,
    },
    {
      id: "rec4",
      name: "Carlos Obras & Reparos",
      category: "Serviços",
      detail: "Pedreiro • Praia da Costa",
      note: "Fez o reparo da parede e o assentamento dos azulejos com capricho, explicou tudo antes e entregou no prazo.",
      by: "Júlia A.",
      phone: "(27) 98888-4455",
      up: 29,
      down: 1,
    },
    {
      id: "rec5",
      name: "Pintura da Ana",
      category: "Serviços",
      detail: "Pintora • Itapuã e região",
      note: "Pintura muito bem feita, preço combinado sem surpresa e deixou o apartamento limpo depois do serviço.",
      by: "Marina S.",
      phone: "(27) 96666-7788",
      up: 35,
      down: 2,
    },
    {
      id: "rec6",
      name: "Diego Elétrica",
      category: "Serviços",
      detail: "Eletricista • Vila Velha",
      note: "Resolveu a instalação das tomadas com segurança e rapidez. Também atende emergências e explica o orçamento.",
      by: "Lucas M.",
      phone: "(27) 97777-8899",
      up: 41,
      down: 1,
    },
  ];
  const all = [
    ...recommendations,
    ...spots.map((spot) => ({
      id: spot.id,
      name: spot.name,
      category: spot.category,
      detail: `Indicação da comunidade • ${spot.by}`,
      note: spot.note,
      by: spot.by,
      phone: "",
      up: spot.up,
      down: spot.down,
    })),
  ];
  const visible = all.filter(
    (item) =>
      (category === "Tudo" || item.category === category) &&
      `${item.name} ${item.note}`.toLowerCase().includes(query.toLowerCase()),
  );

  const vote = (id: string, direction: "up" | "down") => {
    setSpots(
      spots.map((spot) => (spot.id === id ? { ...spot, [direction]: spot[direction] + 1 } : spot)),
    );
  };

  const addComment = (id: string) => {
    const text = commentDrafts[id]?.trim();
    if (!text) return;
    setComments((current) => ({
      ...current,
      [id]: [...(current[id] ?? []), `${me.name}: ${text}`],
    }));
    setCommentDrafts((current) => ({ ...current, [id]: "" }));
  };

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="home"
        title="Indicações"
        subtitle="Encontre serviços de confiança indicados por quem já usou."
      />
      <div className="relative mb-3">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cabeleireiro, aula de cálculo, marmita..."
          className="h-11 rounded-2xl pl-11"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap border ${
              category === item
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <Button onClick={() => ctx.go("map")} className="w-full h-11 rounded-2xl gap-2 mb-4">
        <Plus className="w-4 h-4" /> Indicar alguém que me atendeu bem
      </Button>
      <div className="space-y-3">
        {visible.map((item) => (
          <Card key={item.id} className="p-4 rounded-3xl">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <Badge variant="secondary" className="rounded-full text-[10px]">
                {item.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">"{item.note}"</p>
            <p className="text-[11px] text-muted-foreground mt-3">
              Indicado por {item.by}
              {item.phone ? ` • ${item.phone}` : ` • ${me.name}`}
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-8"
                onClick={() => vote(item.id, "up")}
              >
                <ThumbsUp className="w-3.5 h-3.5" /> {item.up}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-8"
                onClick={() => vote(item.id, "down")}
              >
                <ThumbsDown className="w-3.5 h-3.5" /> {item.down}
              </Button>
            </div>
            {(comments[item.id] ?? []).length > 0 && (
              <div className="mt-3">
                <button
                  onClick={() =>
                    setExpandedComments((current) => ({
                      ...current,
                      [item.id]: !current[item.id],
                    }))
                  }
                  className="text-xs text-muted-foreground"
                >
                  {expandedComments[item.id]
                    ? "Ocultar comentários"
                    : `Ver ${comments[item.id].length} comentário${
                        comments[item.id].length === 1 ? "" : "s"
                      }`}
                </button>
                {expandedComments[item.id] && (
                  <div className="mt-2 space-y-1.5">
                    {comments[item.id].map((comment, index) => {
                      const [author, ...text] = comment.split(": ");
                      return (
                        <p key={`${item.id}-comment-${index}`} className="text-xs">
                          <span className="font-semibold">{author}</span>{" "}
                          <span className="text-muted-foreground">{text.join(": ")}</span>
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/60">
              <Avatar className="w-7 h-7 shrink-0">
                <AvatarFallback className="text-[10px] bg-secondary">{me.name[0]}</AvatarFallback>
              </Avatar>
              <Input
                value={commentDrafts[item.id] ?? ""}
                onChange={(event) =>
                  setCommentDrafts((current) => ({ ...current, [item.id]: event.target.value }))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") addComment(item.id);
                }}
                placeholder="Adicione um comentário..."
                className="h-9 rounded-full text-xs border-0 bg-secondary/70"
              />
              <Button
                variant={commentDrafts[item.id]?.trim() ? "default" : "outline"}
                size="icon"
                onClick={() => addComment(item.id)}
                aria-label={`Comentar sobre ${item.name}`}
                disabled={!commentDrafts[item.id]?.trim()}
                className="rounded-full shrink-0"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-5">
        <Shield className="w-3 h-3 inline mr-1 text-primary" />
        Indicações são opiniões de outros usuários. O app não indica profissionais de saúde.
      </p>
    </div>
  );
}

function InviteScreen({ ctx }: { ctx: AppContext }) {
  const [presenter, setPresenter] = useState("Marina Souza");
  const [presented, setPresented] = useState("Lucas Martins");
  const [shareFeedback, setShareFeedback] = useState("");
  const inviteLink = "https://include.me/convite";
  const inviteMessage =
    "Vem para o Include Me comigo! Um app para conhecer pessoas, lugares e viver melhor uma cidade nova.";

  const copyInviteLink = async () => {
    await navigator.clipboard.writeText(`${inviteMessage} ${inviteLink}`);
    setShareFeedback("Link copiado!");
    setTimeout(() => setShareFeedback(""), 2500);
  };

  const shareInvite = async () => {
    if (!navigator.share) {
      await copyInviteLink();
      return;
    }

    await navigator.share({
      title: "Convite Include Me",
      text: inviteMessage,
      url: inviteLink,
    });
  };

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${inviteMessage} ${inviteLink}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const openInstagram = async () => {
    await copyInviteLink();
    window.open("https://www.instagram.com/direct/inbox/", "_blank", "noopener,noreferrer");
  };

  const openFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const openEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      "Convite para o Include Me",
    )}&body=${encodeURIComponent(`${inviteMessage}\n\n${inviteLink}`)}`;
  };

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="home"
        title="Indicar o app"
        subtitle="Chegar em cidade nova é bem melhor acompanhado."
      />
      <Card className="p-5 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/20 border-0 mb-6">
        <Sparkles className="w-6 h-6 text-primary mb-3" />
        <p className="text-sm leading-relaxed">
          Você já sabe como é começar do zero em uma cidade. Se conhece alguém vivendo isso agora,
          mande um convite: a pessoa entra já com você na lista de amizades.
        </p>
      </Card>
      <h2 className="font-semibold mb-2">Compartilhar convite</h2>
      <p className="text-xs text-muted-foreground mb-3">
        Escolha um aplicativo para enviar seu convite, como acontece nos apps de indicação.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={openWhatsApp} className="h-11 rounded-2xl justify-start">
          <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp
        </Button>
        <Button
          variant="outline"
          onClick={openInstagram}
          className="h-11 rounded-2xl justify-start"
        >
          <Instagram className="w-4 h-4 text-[#E1306C]" /> Instagram
        </Button>
        <Button variant="outline" onClick={openFacebook} className="h-11 rounded-2xl justify-start">
          <span className="w-4 h-4 rounded-full bg-[#1877F2] text-white text-[11px] font-bold flex items-end justify-center">
            f
          </span>
          Facebook
        </Button>
        <Button variant="outline" onClick={openEmail} className="h-11 rounded-2xl justify-start">
          <Mail className="w-4 h-4 text-primary" /> E-mail
        </Button>
        <Button
          variant="outline"
          onClick={copyInviteLink}
          className="h-11 rounded-2xl justify-start"
        >
          <Copy className="w-4 h-4 text-primary" /> Copiar link
        </Button>
        <Button variant="outline" onClick={shareInvite} className="h-11 rounded-2xl justify-start">
          <Share2 className="w-4 h-4 text-primary" /> Mais opções
        </Button>
      </div>
      {shareFeedback && <p className="text-xs text-primary text-center mt-3">{shareFeedback}</p>}
      <h2 className="font-semibold mt-7 mb-1">Indicar pessoas daqui uma para a outra</h2>
      <p className="text-xs text-muted-foreground mb-3">
        Apresente dois amigos seus que ainda não se conhecem — é assim que os grupos crescem.
      </p>
      <Card className="p-4 rounded-3xl space-y-3">
        <label className="text-xs text-muted-foreground">
          Apresentar
          <select
            value={presenter}
            onChange={(event) => setPresenter(event.target.value)}
            className="mt-1 w-full h-10 rounded-xl border border-border bg-background px-3 text-sm"
          >
            {ctx.friends.map((friend) => (
              <option key={friend.id}>{friend.name}</option>
            ))}
          </select>
        </label>
        <label className="text-xs text-muted-foreground">
          para
          <select
            value={presented}
            onChange={(event) => setPresented(event.target.value)}
            className="mt-1 w-full h-10 rounded-xl border border-border bg-background px-3 text-sm"
          >
            {ctx.friends.map((friend) => (
              <option key={friend.id}>{friend.name}</option>
            ))}
          </select>
        </label>
        <Button
          className="w-full h-11 rounded-2xl"
          disabled={ctx.friends.length < 2 || presenter === presented}
          onClick={() => window.alert(`${presenter} e ${presented} foram apresentados!`)}
        >
          Fazer a apresentação
        </Button>
      </Card>
    </div>
  );
}

/* ───────── Diário emocional ───────── */
function DiaryScreen({ ctx }: { ctx: AppContext }) {
  const { diary, setDiary } = ctx;
  const [mood, setMood] = useState(3);
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [learned, setLearned] = useState("");
  const [saved, setSaved] = useState(false);

  const save = () => {
    const entry: DiaryEntry = {
      id: `d${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      mood,
      good,
      bad,
      learned,
    };
    setDiary([...diary, entry]);
    setGood("");
    setBad("");
    setLearned("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const avg = diary.reduce((a: number, d: DiaryEntry) => a + d.mood, 0) / (diary.length || 1);
  const first =
    diary.slice(0, 3).reduce((a: number, d: DiaryEntry) => a + d.mood, 0) /
    Math.min(3, diary.length || 1);
  const recent =
    diary.slice(-3).reduce((a: number, d: DiaryEntry) => a + d.mood, 0) /
    Math.min(3, diary.length || 1);
  const delta = recent - first;

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="home"
        title="Diário emocional"
        subtitle="Só você vê o que escreve aqui."
      />

      <Tabs defaultValue="hoje">
        <TabsList className="w-full grid grid-cols-3 h-11 rounded-2xl bg-secondary p-1">
          <TabsTrigger
            value="hoje"
            className="rounded-xl text-xs data-[state=active]:bg-background"
          >
            Hoje
          </TabsTrigger>
          <TabsTrigger
            value="analise"
            className="rounded-xl text-xs data-[state=active]:bg-background"
          >
            Análise
          </TabsTrigger>
          <TabsTrigger
            value="historico"
            className="rounded-xl text-xs data-[state=active]:bg-background"
          >
            Histórico
          </TabsTrigger>
        </TabsList>

        {/* HOJE */}
        <TabsContent value="hoje" className="mt-5 space-y-4">
          <Card className="p-5 rounded-3xl border-0 bg-gradient-to-br from-primary/12 to-[oklch(0.95_0.04_85)]">
            <p className="font-semibold text-sm mb-3">Como você está se sentindo hoje?</p>
            <div className="flex justify-between">
              {MOOD_EMOJI.map((e, i) => (
                <button
                  key={e}
                  onClick={() => setMood(i + 1)}
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition ${
                    mood === i + 1 ? "bg-card ring-2 ring-primary scale-105" : "bg-card/50"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-3">
              {MOOD_LABELS[mood - 1]}
            </p>
          </Card>

          <DiaryField
            label="O que te fez bem hoje?"
            icon={Sun}
            value={good}
            onChange={setGood}
            placeholder="Um café, uma conversa, uma pequena vitória..."
          />
          <DiaryField
            label="O que te fez mal hoje?"
            icon={Clock}
            value={bad}
            onChange={setBad}
            placeholder="Algo que pesou, cansou ou machucou..."
          />
          <DiaryField
            label="O que você aprendeu hoje?"
            icon={Sparkles}
            value={learned}
            onChange={setLearned}
            placeholder="Sobre a cidade, sobre os outros, sobre você..."
          />

          <Button onClick={save} className="w-full h-12 rounded-2xl">
            Salvar registro de hoje
          </Button>
          {saved && (
            <p className="text-sm text-primary flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Registro salvo. Obrigado por cuidar de você.
            </p>
          )}
        </TabsContent>

        {/* ANÁLISE */}
        <TabsContent value="analise" className="mt-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="Registros" value={String(diary.length)} />
            <MiniStat label="Média" value={avg.toFixed(1)} />
            <MiniStat label="Evolução" value={`${delta >= 0 ? "+" : ""}${delta.toFixed(1)}`} />
          </div>

          <Card className="p-5 rounded-3xl">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-primary" />
              <p className="font-semibold text-sm">Humor ao longo do tempo</p>
            </div>
            <div className="flex items-end gap-1.5 h-36">
              {diary.map((d: DiaryEntry) => (
                <div
                  key={d.id}
                  className="flex-1 h-full flex flex-col items-center justify-end gap-1"
                >
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary transition-all"
                    style={{ height: `${(d.mood / 5) * 100}%` }}
                  />
                  <span className="text-[8px] text-muted-foreground">
                    {d.date.slice(8)}/{d.date.slice(5, 7)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 rounded-3xl">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <p className="font-semibold text-sm">Distribuição do humor</p>
            </div>
            {MOOD_LABELS.map((l, i) => {
              const count = diary.filter((d: DiaryEntry) => d.mood === i + 1).length;
              const pct = diary.length ? (count / diary.length) * 100 : 0;
              return (
                <div key={l} className="flex items-center gap-2 mb-2">
                  <span className="text-base w-6">{MOOD_EMOJI[i]}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[11px] text-muted-foreground w-6 text-right">{count}</span>
                </div>
              );
            })}
          </Card>

          <Card className="p-5 rounded-3xl border-0 bg-primary/10">
            <p className="font-semibold text-sm mb-1">Como era e como está</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {delta > 0
                ? `Nos seus primeiros registros a média era ${first.toFixed(1)}. Agora está ${recent.toFixed(1)}. Você melhorou — e boa parte disso foi construída por você mesmo, um dia de cada vez.`
                : delta === 0
                  ? "Seu humor está estável. Estabilidade também é progresso quando tudo ao redor mudou."
                  : `A média caiu de ${first.toFixed(1)} para ${recent.toFixed(1)}. Semanas assim acontecem. Tente registrar todos os dias — ver o padrão ajuda a entender o que está pesando.`}
            </p>
          </Card>
        </TabsContent>

        {/* HISTÓRICO */}
        <TabsContent value="historico" className="mt-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <History className="w-3.5 h-3.5" /> Do mais recente para o mais antigo
          </div>
          {[...diary].reverse().map((d: DiaryEntry) => (
            <Card key={d.id} className="p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">
                  {new Date(`${d.date}T12:00:00`).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                  })}
                </p>
                <span className="text-xl">{MOOD_EMOJI[d.mood - 1]}</span>
              </div>
              {d.good && (
                <p className="text-xs text-muted-foreground">
                  <span className="text-foreground font-medium">Fez bem:</span> {d.good}
                </p>
              )}
              {d.bad && (
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-foreground font-medium">Fez mal:</span> {d.bad}
                </p>
              )}
              {d.learned && (
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-foreground font-medium">Aprendi:</span> {d.learned}
                </p>
              )}
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DiaryField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <Card className="p-4 rounded-2xl">
      <p className="text-sm font-medium flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" /> {label}
      </p>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-2xl min-h-20 resize-none"
      />
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-3 rounded-2xl text-center">
      <p className="text-lg font-bold text-primary">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </Card>
  );
}

/* ───────── Mapa ───────── */
type MapCategory =
  "all" | "restaurant" | "cafe" | "tourist" | "park" | "market" | "pharmacy" | "safe";

function MapScreen({ ctx }: { ctx: AppContext }) {
  const { spots, setSpots, me, go } = ctx;
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Vila Velha, ES");
  const [category, setCategory] = useState<MapCategory>("all");
  const [newSpot, setNewSpot] = useState({ name: "", category: "Restaurantes", note: "" });
  const [showForm, setShowForm] = useState(false);
  const recRef = useRef<HTMLDivElement>(null);

  const categories: { id: MapCategory; label: string; icon: LucideIcon; q: string; rec: string }[] =
    [
      { id: "all", label: "Tudo", icon: Sparkles, q: "pontos turísticos", rec: "" },
      {
        id: "restaurant",
        label: "Restaurantes",
        icon: Utensils,
        q: "restaurantes",
        rec: "Restaurantes",
      },
      { id: "cafe", label: "Cafés", icon: Coffee, q: "melhores cafés", rec: "Cafés" },
      { id: "tourist", label: "Turismo", icon: Camera, q: "lugares para visitar", rec: "Turismo" },
      { id: "park", label: "Parques", icon: Trees, q: "parques", rec: "Parques" },
      { id: "market", label: "Mercados", icon: ShoppingCart, q: "supermercados", rec: "Mercados" },
      { id: "pharmacy", label: "Farmácias", icon: Heart, q: "farmácias", rec: "Farmácias" },
      {
        id: "safe",
        label: "Locais seguros",
        icon: Shield,
        q: "delegacia hospital",
        rec: "Seguros",
      },
    ];

  const activeCat = categories.find((c) => c.id === category)!;
  const searchTerm = query.trim() || activeCat.q;
  const mapSrc = useMemo(
    () =>
      `https://www.google.com/maps?q=${encodeURIComponent(`${searchTerm} em ${city}`)}&output=embed`,
    [searchTerm, city],
  );

  const visibleSpots = useMemo(() => {
    const list =
      category === "all" ? spots : spots.filter((s: Spot) => s.category === activeCat.rec);
    return [...list].sort((a, b) => b.up - b.down - (a.up - a.down));
  }, [spots, category, activeCat.rec]);

  const vote = (id: string, dir: "up" | "down") => {
    setSpots(
      spots.map((s: Spot) => {
        if (s.id !== id) return s;
        if (s.voted === dir) return { ...s, voted: null, [dir]: s[dir] - 1 };
        const base = { ...s };
        if (s.voted) base[s.voted] -= 1;
        base[dir] += 1;
        return { ...base, voted: dir };
      }),
    );
  };

  const addSpot = () => {
    if (!newSpot.name.trim()) return;
    setSpots([
      ...spots,
      {
        id: `s${Date.now()}`,
        name: newSpot.name,
        category: newSpot.category,
        by: me.name,
        note: newSpot.note,
        up: 1,
        down: 0,
        voted: "up",
      },
    ]);
    setNewSpot({ name: "", category: "Restaurantes", note: "" });
    setShowForm(false);
  };

  return (
    <div className="px-5 pt-12 pb-4">
      <button
        onClick={() => go("home")}
        className="flex items-center gap-2 mb-3 -ml-1 -mt-6 pl-1 pr-3 py-1.5 rounded-full hover:bg-secondary transition text-sm text-muted-foreground"
      >
        <span className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-3.5 h-3.5" />
        </span>
        Voltar
      </button>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Mapa da cidade</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Cafés, restaurantes e lugares seguros perto da universidade.
          </p>
        </div>
        <button
          onClick={() => recRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          aria-label="Ir para indicações e votação"
          className="shrink-0 w-11 h-11 rounded-2xl bg-primary/12 text-primary flex flex-col items-center justify-center"
        >
          <ChevronDown className="w-5 h-5" />
          <span className="text-[7px] font-semibold leading-none">Indicações</span>
        </button>
      </div>

      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar (ex: sushi, livraria...)"
            className="h-11 rounded-2xl pl-11"
          />
        </div>
        <Button
          size="icon"
          variant="outline"
          className="rounded-2xl h-11 w-11"
          onClick={() => setQuery("")}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="relative mb-4">
        <MapPin className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Cidade"
          className="h-10 rounded-2xl pl-11 text-sm"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 mb-3">
        {categories.map((c) => {
          const Icon = c.icon;
          const active = category === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border"
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {c.label}
            </button>
          );
        })}
      </div>

      <div className="relative h-72 rounded-3xl overflow-hidden mb-6 border border-border">
        <iframe
          key={mapSrc}
          title="Mapa Google"
          src={mapSrc}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div ref={recRef} className="scroll-mt-4">
        <SectionTitle
          title={`Indicações da comunidade${category === "all" ? "" : ` • ${activeCat.label}`}`}
        />
        <p className="text-xs text-muted-foreground -mt-2 mb-3">
          Lugares indicados por outros estudantes. Vote se a indicação foi boa ou não.
        </p>

        <Button
          onClick={() => setShowForm(!showForm)}
          variant="outline"
          className="w-full h-11 rounded-2xl gap-2 mb-3"
        >
          <Plus className="w-4 h-4" /> Indicar um lugar
        </Button>

        {showForm && (
          <Card className="p-4 rounded-2xl mb-4 space-y-3">
            <Input
              value={newSpot.name}
              onChange={(e) => setNewSpot({ ...newSpot, name: e.target.value })}
              placeholder="Nome do lugar"
              className="h-11 rounded-2xl"
            />
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                "Restaurantes",
                "Cafés",
                "Turismo",
                "Parques",
                "Mercados",
                "Farmácias",
                "Seguros",
              ].map((c) => (
                <button
                  key={c}
                  onClick={() => setNewSpot({ ...newSpot, category: c })}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap border ${
                    newSpot.category === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <Textarea
              value={newSpot.note}
              onChange={(e) => setNewSpot({ ...newSpot, note: e.target.value })}
              placeholder="Por que você indica?"
              className="rounded-2xl min-h-16 resize-none"
            />
            <Button onClick={addSpot} className="w-full h-11 rounded-2xl">
              Publicar indicação
            </Button>
          </Card>
        )}

        <div className="space-y-3 pb-4">
          {visibleSpots.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              Nenhuma indicação nessa categoria ainda. Seja a primeira pessoa.
            </p>
          )}
          {visibleSpots.map((s: Spot) => {
            const total = s.up + s.down;
            const pct = total ? Math.round((s.up / total) * 100) : 0;
            return (
              <Card key={s.id} className="p-4 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/12 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{s.name}</p>
                      <Badge variant="secondary" className="rounded-full text-[9px]">
                        {s.category}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Indicado por {s.by}</p>
                    {s.note && <p className="text-xs mt-1.5 leading-relaxed">{s.note}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => vote(s.id, "up")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border ${s.voted === "up" ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {s.up}
                  </button>
                  <button
                    onClick={() => vote(s.id, "down")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border ${s.voted === "down" ? "bg-destructive text-destructive-foreground border-destructive" : "border-border"}`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" /> {s.down}
                  </button>
                  <span className="text-[11px] text-muted-foreground">{pct}% recomendam</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name} ${city}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-xs text-primary font-medium flex items-center gap-1"
                  >
                    Abrir <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────── Interagir ───────── */
function InteractScreen({ ctx }: { ctx: AppContext }) {
  const { me, go, setActiveGame } = ctx;
  const [vote, setVote] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ who: string; text: string }[]>([
    { who: "Marina", text: "A vista do Convento da Penha no fim da tarde." },
    { who: "Bruno", text: "Uma padaria minúscula perto do campus." },
  ]);
  const [answer, setAnswer] = useState("");
  const [challenge, setChallenge] = useState(0);

  const pollOptions = [
    { id: "a", label: "Café da manhã na cantina", pct: 42 },
    { id: "b", label: "Piquenique no parque", pct: 35 },
    { id: "c", label: "Cinema no campus", pct: 23 },
  ];

  const games: { id: GameId; desc: string; color: string }[] = [
    {
      id: "quizCity",
      desc: "O quanto você já conhece a cidade.",
      color: "from-accent/40 to-accent/10",
    },
    {
      id: "quizUni",
      desc: "Como a vida universitária funciona.",
      color: "from-primary/18 to-primary/5",
    },
    {
      id: "truthDare",
      desc: "Quebra-gelo para o grupo.",
      color: "from-[oklch(0.93_0.05_320)] to-[oklch(0.97_0.02_320)]",
    },
    {
      id: "bingo",
      desc: "Ache alguém que...",
      color: "from-[oklch(0.93_0.05_200)] to-[oklch(0.97_0.02_200)]",
    },
    {
      id: "scramble",
      desc: "Descubra a palavra escondida.",
      color: "from-[oklch(0.95_0.05_85)] to-[oklch(0.98_0.02_85)]",
    },
  ];

  const open = (id: GameId) => {
    setActiveGame(id);
    go("game");
  };

  return (
    <div className="px-5 pt-12 pb-4">
      <button
        onClick={() => go("home")}
        className="flex items-center gap-2 mb-3 -ml-1 -mt-6 pl-1 pr-3 py-1.5 rounded-full hover:bg-secondary transition text-sm text-muted-foreground"
      >
        <span className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-3.5 h-3.5" />
        </span>
        Voltar
      </button>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Interagir</h1>
          <p className="text-sm text-muted-foreground mb-5">
            Enquetes, jogos e dinâmicas para desanuviar.
          </p>
        </div>
        {me.admin && (
          <Button size="icon" className="rounded-full shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      {!me.admin && (
        <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 mb-4">
          <LockIcon className="w-3 h-3" /> Enquetes, jogos e dinâmicas são criados pela moderação do
          app.
        </p>
      )}

      <Card className="p-5 rounded-3xl border-0 bg-gradient-to-br from-primary/12 to-accent/25 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Vote className="w-5 h-5 text-primary" />
          <p className="font-semibold text-sm">Enquete da semana</p>
        </div>
        <p className="text-base font-semibold mb-4">Qual evento de boas-vindas você prefere?</p>
        <div className="space-y-2">
          {pollOptions.map((o) => {
            const active = vote === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setVote(o.id)}
                className={`w-full text-left p-3 rounded-2xl border transition relative overflow-hidden ${
                  active ? "border-primary bg-card" : "border-border bg-card/70"
                }`}
              >
                {vote && (
                  <div
                    className="absolute inset-y-0 left-0 bg-primary/15"
                    style={{ width: `${o.pct}%` }}
                  />
                )}
                <div className="relative flex items-center justify-between">
                  <span className="text-sm">{o.label}</span>
                  {vote && <span className="text-xs font-semibold text-primary">{o.pct}%</span>}
                </div>
              </button>
            );
          })}
        </div>
        {vote && (
          <p className="text-[11px] text-muted-foreground mt-3">
            Voto registrado. Você pode mudar até domingo.
          </p>
        )}
      </Card>

      <SectionTitle title="Jogos" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        {games.map((g) => (
          <button key={g.id} onClick={() => open(g.id)} className="text-left">
            <Card className={`p-4 rounded-2xl border-0 bg-gradient-to-br ${g.color} h-full`}>
              <Gamepad2 className="w-6 h-6 mb-2 text-primary" />
              <p className="font-semibold text-sm">{GAME_TITLES[g.id]}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{g.desc}</p>
              <span className="text-[11px] text-primary font-medium mt-2 inline-block">
                Jogar →
              </span>
            </Card>
          </button>
        ))}
      </div>

      <SectionTitle title="Dinâmicas abertas" />
      <Card className="p-4 rounded-2xl mb-3">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold">Pergunta do dia</p>
        </div>
        <p className="text-sm mb-3">"Qual lugar da cidade te surpreendeu?"</p>
        <div className="flex gap-2">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && answer.trim()) {
                setAnswers([...answers, { who: me.name, text: answer }]);
                setAnswer("");
              }
            }}
            placeholder="Sua resposta..."
            className="h-10 rounded-2xl"
          />
          <Button
            size="icon"
            className="rounded-2xl h-10 w-10"
            onClick={() => {
              if (answer.trim()) {
                setAnswers([...answers, { who: me.name, text: answer }]);
                setAnswer("");
              }
            }}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-3 space-y-2">
          {answers.map((a, i) => (
            <div key={i} className="flex gap-2">
              <Avatar className="w-7 h-7">
                <AvatarFallback className="text-[10px] bg-accent/50">{a.who[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-secondary px-3 py-2 rounded-2xl rounded-tl-md text-xs flex-1">
                <span className="font-semibold">{a.who}: </span>
                {a.text}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 rounded-2xl mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold">Desafio da semana</p>
        </div>
        <p className="text-sm">Converse com 3 pessoas novas no campus.</p>
        <div className="flex items-center gap-2 mt-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`flex-1 h-2 rounded-full ${challenge >= n ? "bg-primary" : "bg-secondary"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Button
            size="sm"
            className="rounded-full h-8 text-xs"
            disabled={challenge >= 3}
            onClick={() => setChallenge((c) => Math.min(3, c + 1))}
          >
            {challenge >= 3 ? "Desafio concluído 🎉" : "Marcar uma conversa"}
          </Button>
          {challenge > 0 && (
            <button onClick={() => setChallenge(0)} className="text-xs text-muted-foreground">
              Reiniciar
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ───────── Ajuda (relatório e feedback) ───────── */
function HelpScreen({ ctx }: { ctx: AppContext }) {
  const { diary, go } = ctx;
  const [feedback, setFeedback] = useState("");
  const [sentFb, setSentFb] = useState(false);
  const avg = diary.reduce((a: number, d: DiaryEntry) => a + d.mood, 0) / (diary.length || 1);
  const best = [...diary].sort((a, b) => b.mood - a.mood)[0] as DiaryEntry | undefined;

  return (
    <div className="px-5 pt-12 pb-4">
      <button
        onClick={() => go("home")}
        className="flex items-center gap-2 mb-3 -ml-1 -mt-6 pl-1 pr-3 py-1.5 rounded-full hover:bg-secondary transition text-sm text-muted-foreground"
      >
        <span className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-3.5 h-3.5" />
        </span>
        Voltar
      </button>
      <h1 className="text-2xl font-bold">Ajuda</h1>
      <p className="text-sm text-muted-foreground mb-5">
        Seu relatório de bem-estar e o que o app entendeu sobre a sua adaptação.
      </p>

      <Card className="p-5 rounded-3xl border-0 bg-gradient-to-br from-primary/12 to-[oklch(0.95_0.04_85)] mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
          Como você está
        </p>
        <p className="text-3xl font-bold">
          {MOOD_EMOJI[Math.round(avg) - 1]} {avg.toFixed(1)}
          <span className="text-base font-normal text-muted-foreground">/5</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Baseado nos seus {diary.length} registros do diário emocional.{" "}
          {avg >= 3.5
            ? "Sua média está em um lugar saudável. Continue registrando."
            : "Sua média está mais baixa que o ideal. Tentar sair de casa uma vez por dia costuma ajudar."}
        </p>
      </Card>

      <SectionTitle title="Feedback do aplicativo para você" />
      <div className="space-y-3 mb-6">
        <FeedbackCard
          title="Frequência de registro"
          text={
            diary.length >= 5
              ? "Você tem registrado com constância. Isso é o que faz o gráfico virar informação útil."
              : "Registrar poucas vezes deixa a análise imprecisa. Tente 3x por semana."
          }
        />
        <FeedbackCard
          title="O que costuma te fazer bem"
          text={
            best?.good
              ? `Nos seus melhores dias apareceu: "${best.good}". Repetir esse tipo de situação tende a estabilizar seu humor.`
              : "Ainda não há registros suficientes para identificar um padrão."
          }
        />
        <FeedbackCard
          title="Vida social"
          text={`Você tem ${ctx.friends.length} amizades e participa de ${ctx.communities.filter((c: Community) => c.status === "member").length} comunidades. Grupos com propósito claro (turma, estudos) funcionam melhor no começo.`}
        />
      </div>

      <SectionTitle title="Seu feedback sobre o app" />
      <Card className="p-4 rounded-2xl mb-6">
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="O que está faltando? O que te incomodou?"
          className="rounded-2xl min-h-20 resize-none"
        />
        <Button
          className="w-full h-11 rounded-2xl mt-3"
          onClick={() => {
            if (feedback.trim()) {
              setFeedback("");
              setSentFb(true);
              setTimeout(() => setSentFb(false), 2500);
            }
          }}
        >
          Enviar feedback
        </Button>
        {sentFb && (
          <p className="text-sm text-primary mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Recebemos. Obrigado!
          </p>
        )}
      </Card>
    </div>
  );
}

function FeedbackCard({ title, text }: { title: string; text: string }) {
  return (
    <Card className="p-4 rounded-2xl">
      <p className="text-sm font-semibold mb-1">{title}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
    </Card>
  );
}

/* ───────── Comunidades ───────── */
function CommunitiesScreen({ ctx }: { ctx: AppContext }) {
  const { communities, setCommunities, me, go, friends } = ctx;
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"todos" | "geral" | "curso" | "trabalho">("todos");

  const list = communities.filter((c: Community) => {
    const okKind = kind === "todos" || (kind === "geral" ? c.general : c.kind === kind);
    const okQ = `${c.name} ${c.code} ${c.area}`.toLowerCase().includes(q.toLowerCase());
    return okKind && okQ;
  });

  const request = (id: string) =>
    setCommunities(
      communities.map((c: Community) => (c.id === id ? { ...c, status: "pending" } : c)),
    );

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="home"
        title="Comunidades"
        subtitle="A entrada é aprovada pelo administrador do grupo."
      />

      <div className="relative mb-3">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome, matrícula ou área..."
          className="h-11 rounded-2xl pl-11"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 mb-2">
        {(
          [
            ["todos", "Todos"],
            ["geral", "Gerais"],
            ["curso", "Matérias / turmas"],
            ["trabalho", "Áreas de trabalho"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setKind(id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border ${
              kind === id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3 mt-3">
        {list.map((g: Community) => (
          <Card key={g.id} className="p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{g.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {g.code} • {g.members} membros
                </p>
              </div>
              <Badge variant="secondary" className="rounded-full text-[10px] shrink-0">
                {g.area}
              </Badge>
            </div>
            <div className="mt-3">
              {g.status === "member" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full h-8 text-xs w-full"
                  onClick={() => {
                    ctx.setActiveCommunity(g);
                    go("community");
                  }}
                >
                  Abrir grupo
                </Button>
              )}
              {g.status === "pending" && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled
                  className="rounded-full h-8 text-xs w-full gap-1"
                >
                  <Clock className="w-3 h-3" /> Pedido enviado — aguardando aprovação
                </Button>
              )}
              {g.status === "none" && (
                <Button
                  size="sm"
                  className="rounded-full h-8 text-xs w-full"
                  onClick={() => request(g.id)}
                >
                  Pedir para entrar
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 rounded-2xl mt-5 bg-secondary/60 border-0">
        <p className="text-sm font-semibold mb-1">Quero criar um grupo</p>
        <p className="text-xs text-muted-foreground mb-3">
          Comunidades são criadas apenas por administradores. Você pode criar um grupo privado com
          pessoas que já são suas amigas no app.
        </p>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full h-8 text-xs"
          onClick={() => go("groupNew")}
          disabled={friends.length === 0}
        >
          {friends.length === 0 ? "Adicione amigos primeiro" : "Criar grupo com amigos"}
        </Button>
      </Card>
    </div>
  );
}

function CommunityScreen({ ctx }: { ctx: AppContext }) {
  const g: Community = ctx.activeCommunity ?? ctx.communities[0];
  const [msgs, setMsgs] = useState([
    {
      from: "Marina",
      tags: ["verified"] as UserTag[],
      text: "Pessoal, alguém quer estudar hoje à tarde?",
    },
    {
      from: "Lucas",
      tags: ["admin", "verified"] as UserTag[],
      text: "Tô dentro! Biblioteca central às 14h.",
    },
    { from: "Bruno", tags: ["new"] as UserTag[], text: "Posso ir junto? Cheguei essa semana." },
  ]);
  const [t, setT] = useState("");
  const send = () => {
    if (t.trim()) {
      setMsgs([...msgs, { from: "Você", tags: [], text: t }]);
      setT("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 border-b border-border bg-card/80">
        <button
          onClick={() => ctx.go("communities")}
          className="text-sm text-muted-foreground flex items-center gap-1 mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> Grupos
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-accent/30 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="font-bold">{g.name}</h1>
            <p className="text-xs text-muted-foreground">
              {g.members} membros • entrada aprovada por admin
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className="flex gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs bg-accent/50">{m.from[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                {m.from} <UserTags tags={m.tags} />
              </p>
              <div className="bg-secondary px-3 py-2 rounded-2xl rounded-tl-md text-sm max-w-[260px]">
                {m.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-border bg-card flex gap-2">
        <Input
          value={t}
          onChange={(e) => setT(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Mensagem..."
          className="rounded-full h-11"
        />
        <Button onClick={send} size="icon" className="rounded-full h-11 w-11">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function GroupNewScreen({ ctx }: { ctx: AppContext }) {
  const { friends, communities, setCommunities, go } = ctx;
  const [name, setName] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const canCreate = name.trim().length > 2 && picked.length > 0;

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="communities"
        title="Criar grupo"
        subtitle="Só é possível criar grupos com amigos já adicionados."
      />
      {friends.length === 0 ? (
        <Card className="p-5 rounded-3xl text-center">
          <UserPlus className="w-8 h-8 mx-auto text-primary mb-2" />
          <p className="text-sm">Você ainda não tem amizades no app.</p>
          <Button className="rounded-full mt-4" onClick={() => go("friends")}>
            Adicionar amigos
          </Button>
        </Card>
      ) : (
        <>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do grupo"
            className="h-12 rounded-2xl mb-4"
          />
          <p className="text-sm font-semibold mb-2">Escolha quem entra</p>
          <div className="space-y-2 mb-6">
            {friends.map((f: Person) => (
              <button key={f.id} onClick={() => toggle(f.id)} className="w-full">
                <Card
                  className={`p-3 rounded-2xl flex items-center gap-3 ${picked.includes(f.id) ? "border-primary bg-primary/5" : ""}`}
                >
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="text-xs bg-accent/50">{f.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium flex items-center gap-1">
                      {f.name} <UserTags tags={f.tags} />
                    </p>
                    <p className="text-[11px] text-muted-foreground">{f.course}</p>
                  </div>
                  {picked.includes(f.id) && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </Card>
              </button>
            ))}
          </div>
          <Button
            disabled={!canCreate}
            className="w-full h-12 rounded-2xl"
            onClick={() => {
              setCommunities([
                ...communities,
                {
                  id: `c${Date.now()}`,
                  name,
                  code: "PRIVADO",
                  area: "Amigos",
                  kind: "geral",
                  members: picked.length + 1,
                  general: false,
                  status: "member",
                },
              ]);
              go("communities");
            }}
          >
            Criar grupo com {picked.length} amigo{picked.length === 1 ? "" : "s"}
          </Button>
        </>
      )}
    </div>
  );
}

/* ───────── Amigos ───────── */
function FriendsScreen({ ctx }: { ctx: AppContext }) {
  const { friends, setFriends, sent, setSent, go } = ctx;
  const [q, setQ] = useState("");
  const available = suggestedFriends.filter((p) => !friends.some((f: Person) => f.id === p.id));
  const filtered = available.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="profile"
        title="Amizades"
        subtitle="Só saia com quem você já conhece aqui dentro."
      />

      <div className="relative mb-5">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar pessoas..."
          className="h-11 rounded-2xl pl-11"
        />
      </div>

      <SectionTitle title={`Meus amigos (${friends.length})`} />
      <div className="space-y-2 mb-6">
        {friends.length === 0 && (
          <p className="text-sm text-muted-foreground">Você ainda não adicionou ninguém.</p>
        )}
        {friends.map((f: Person) => (
          <Card key={f.id} className="p-3 rounded-2xl flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="text-xs bg-accent/50">{f.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium flex items-center gap-1">
                {f.name} <UserTags tags={f.tags} />
              </p>
              <p className="text-[11px] text-muted-foreground">{f.course}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full h-8 text-xs text-destructive"
              onClick={() => setFriends(friends.filter((x: Person) => x.id !== f.id))}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </Card>
        ))}
      </div>

      <SectionTitle title="Pessoas do seu campus" />
      <div className="space-y-2">
        {filtered.map((p) => {
          const isSent = sent.includes(p.id);
          return (
            <Card key={p.id} className="p-3 rounded-2xl flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="text-xs bg-secondary">{p.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium flex items-center gap-1">
                  {p.name} <UserTags tags={p.tags} />
                </p>
                <p className="text-[11px] text-muted-foreground">{p.course}</p>
              </div>
              {isSent ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full h-8 text-xs"
                  onClick={() => {
                    setFriends([...friends, p]);
                    setSent(sent.filter((x: string) => x !== p.id));
                  }}
                >
                  Aceitar
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="rounded-full h-8 text-xs gap-1"
                  onClick={() => setSent([...sent, p.id])}
                >
                  <UserPlus className="w-3.5 h-3.5" /> Adicionar
                </Button>
              )}
            </Card>
          );
        })}
      </div>
      <p className="text-[11px] text-muted-foreground mt-4">
        <Shield className="w-3 h-3 inline mr-1 text-primary" />
        Pedidos precisam ser aceitos pelos dois lados antes de vocês poderem conversar.
      </p>
      <Button
        variant="outline"
        className="w-full h-11 rounded-2xl mt-4"
        onClick={() => go("groupNew")}
      >
        Criar grupo com meus amigos
      </Button>
    </div>
  );
}

/* ───────── Eventos ───────── */
const CATEGORY_LABEL: Record<EventCategory, string> = {
  festa: "Festas e encontros",
  carreira: "Carreira e faculdade",
  estudos: "Estudos",
  bemestar: "Bem-estar",
};
const CATEGORY_ICON: Record<EventCategory, LucideIcon> = {
  festa: PartyPopper,
  carreira: Briefcase,
  estudos: BookOpen,
  bemestar: Heart,
};

function EventsScreen({ ctx }: { ctx: AppContext }) {
  const { events, me, go, setActiveEvent, going } = ctx;
  const [cat, setCat] = useState<EventCategory>("festa");
  const list = events.filter((e: AppEvent) => e.category === cat);

  return (
    <div className="px-5 pt-12 pb-28">
      <div className="flex items-start justify-between">
        <ScreenHeader
          ctx={ctx}
          back="home"
          title="Eventos"
          subtitle="Separados por tipo, para você escolher o clima certo."
        />
        {me.admin && (
          <Button size="icon" className="rounded-full shrink-0 mt-8" onClick={() => go("eventNew")}>
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      {!me.admin && (
        <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 mb-4 -mt-2">
          <LockIcon className="w-3 h-3" /> Apenas administradores e organizadores verificados criam
          eventos.
        </p>
      )}

      <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 mb-3">
        {(Object.keys(CATEGORY_LABEL) as EventCategory[]).map((c) => {
          const Icon = CATEGORY_ICON[c];
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border ${
                cat === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border"
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {CATEGORY_LABEL[c]}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {list.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum evento nessa categoria por enquanto.
          </p>
        )}
        {list.map((e: AppEvent) => (
          <Card
            key={e.id}
            className="p-5 rounded-3xl border-0 bg-gradient-to-br from-primary/10 to-accent/20"
          >
            <Badge variant="secondary" className="rounded-full text-[10px] mb-2">
              {e.host}
            </Badge>
            <h3 className="font-semibold">{e.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {e.date} • {e.time}
            </p>
            <p className="text-xs text-muted-foreground">📍 {e.place}</p>
            <div className="flex items-center gap-2 mt-3">
              <Button
                size="sm"
                className="rounded-full h-8 text-xs"
                onClick={() => {
                  setActiveEvent(e);
                  go("eventDetail");
                }}
              >
                Ver mais
              </Button>
              {going.includes(e.id) && (
                <span className="text-[11px] text-primary flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Presença confirmada
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EventDetailScreen({ ctx }: { ctx: AppContext }) {
  const e: AppEvent = ctx.activeEvent ?? ctx.events[0];
  const { going, setGoing } = ctx;
  const confirmed = going.includes(e.id);
  const Icon = CATEGORY_ICON[e.category];

  return (
    <div className="pb-28">
      <div className="relative h-40 bg-gradient-to-br from-primary/30 via-accent/30 to-[oklch(0.95_0.04_85)]">
        <button
          onClick={() => ctx.go("events")}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-card/90 flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Icon className="w-12 h-12 text-primary absolute bottom-4 right-5 opacity-60" />
      </div>

      <div className="px-5 pt-5">
        <Badge variant="secondary" className="rounded-full text-[10px] mb-2">
          {CATEGORY_LABEL[e.category]}
        </Badge>
        <h1 className="text-2xl font-bold leading-tight">{e.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">Organizado por {e.host}</p>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <Stat icon={Users} label="Confirmados" value={`${e.going + (confirmed ? 1 : 0)}`} />
          <Stat icon={Clock} label="Horário" value={e.time.split(" ")[0] ?? e.time} />
          <Stat icon={Calendar} label="Vagas" value={`${e.capacity}`} />
        </div>

        <Card className="p-4 rounded-2xl mt-4 space-y-2">
          <Row label="Data" value={e.date} />
          <Row label="Horário" value={e.time} />
          <Row label="Local" value={e.place} />
          <Row label="Endereço" value={e.address} />
        </Card>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.address)}`}
          target="_blank"
          rel="noreferrer"
          className="block mt-3"
        >
          <Button variant="outline" className="w-full h-11 rounded-2xl gap-2">
            <MapPin className="w-4 h-4" /> Abrir no Google Maps{" "}
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </a>

        <h3 className="font-semibold mt-6 mb-2">Sobre o evento</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{e.description}</p>

        <h3 className="font-semibold mt-5 mb-2">O que você precisa saber</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{e.requirements}</p>

        <h3 className="font-semibold mt-5 mb-2">Quem vai</h3>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {["M", "L", "B", "J"].map((n) => (
              <Avatar key={n} className="w-8 h-8 border-2 border-background">
                <AvatarFallback className="text-[10px] bg-accent/50">{n}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {e.going + (confirmed ? 1 : 0)} pessoas confirmadas de {e.capacity} vagas
          </p>
        </div>

        <Button
          onClick={() =>
            setGoing(confirmed ? going.filter((x: string) => x !== e.id) : [...going, e.id])
          }
          variant={confirmed ? "outline" : "default"}
          className="w-full h-12 rounded-2xl mt-6"
        >
          {confirmed ? "Cancelar presença" : "Confirmar presença"}
        </Button>
        {confirmed && (
          <p className="text-xs text-primary text-center mt-2">
            Presença confirmada. Você receberá um lembrete no dia.
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function EventNewScreen({ ctx }: { ctx: AppContext }) {
  const { events, setEvents, go } = ctx;
  const [f, setF] = useState({
    title: "",
    date: "",
    time: "",
    place: "",
    address: "",
    description: "",
    category: "festa" as EventCategory,
  });
  const ok = f.title.trim() && f.date.trim() && f.place.trim();
  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="events"
        title="Criar evento"
        subtitle="Disponível apenas para administradores."
      />
      <div className="flex gap-2 overflow-x-auto pb-3 mb-2">
        {(Object.keys(CATEGORY_LABEL) as EventCategory[]).map((c) => (
          <button
            key={c}
            onClick={() => setF({ ...f, category: c })}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap border ${f.category === c ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
          >
            {CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <Input
          value={f.title}
          onChange={(e) => setF({ ...f, title: e.target.value })}
          placeholder="Título do evento"
          className="h-12 rounded-2xl"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={f.date}
            onChange={(e) => setF({ ...f, date: e.target.value })}
            placeholder="Data (ex: Sex, 5 jun)"
            className="h-12 rounded-2xl"
          />
          <Input
            value={f.time}
            onChange={(e) => setF({ ...f, time: e.target.value })}
            placeholder="Horário"
            className="h-12 rounded-2xl"
          />
        </div>
        <Input
          value={f.place}
          onChange={(e) => setF({ ...f, place: e.target.value })}
          placeholder="Local"
          className="h-12 rounded-2xl"
        />
        <Input
          value={f.address}
          onChange={(e) => setF({ ...f, address: e.target.value })}
          placeholder="Endereço completo"
          className="h-12 rounded-2xl"
        />
        <Textarea
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          placeholder="Descrição detalhada"
          className="rounded-2xl min-h-24 resize-none"
        />
      </div>
      <Button
        disabled={!ok}
        className="w-full h-12 rounded-2xl mt-5"
        onClick={() => {
          setEvents([
            ...events,
            {
              id: `e${Date.now()}`,
              category: f.category,
              title: f.title,
              date: f.date,
              time: f.time || "A definir",
              place: f.place,
              address: f.address || f.place,
              host: "Administração",
              going: 0,
              capacity: 50,
              description: f.description || "Detalhes em breve.",
              requirements: "Aberto à comunidade do app.",
            },
          ]);
          go("events");
        }}
      >
        Publicar evento
      </Button>
    </div>
  );
}

/* ───────── Moradia ───────── */
function HousingScreen({ ctx }: { ctx: AppContext }) {
  const { housing, me, go, setActiveHouse } = ctx;
  const [type, setType] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [q, setQ] = useState("");

  const list = housing.filter((h: Housing) => {
    const okType = type === "Todos" || h.type === type;
    const okPrice = maxPrice === null || h.price <= maxPrice;
    const okQ = h.name.toLowerCase().includes(q.toLowerCase());
    const remaining = h.vacancies - (h.confirmedResidents ?? 0);
    return okType && okPrice && okQ && remaining > 0;
  });

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="home"
        title="Moradia"
        subtitle="Anúncios publicados apenas por usuários verificados."
      />

      <div className="relative mb-3">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar moradia..."
          className="h-11 rounded-2xl pl-11"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5">
        {["Todos", "República", "Kitnet", "Apartamento", "Pensionato"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border ${
              type === t
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 mb-2">
        {(
          [
            ["Qualquer preço", null],
            ["Até R$ 800", 800],
            ["Até R$ 1000", 1000],
            ["Até R$ 1300", 1300],
          ] as const
        ).map(([label, v]) => (
          <button
            key={label}
            onClick={() => setMaxPrice(v)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border ${
              maxPrice === v
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {(type !== "Todos" || maxPrice !== null || q.trim() !== "") && (
        <button
          onClick={() => {
            setType("Todos");
            setMaxPrice(null);
            setQ("");
          }}
          className="text-xs text-primary font-medium mb-2"
        >
          Limpar filtros
        </button>
      )}

      {me.verified ? (
        <Button className="w-full h-11 rounded-2xl gap-2 my-3" onClick={() => go("housingNew")}>
          <Plus className="w-4 h-4" /> Cadastrar minha moradia
        </Button>
      ) : (
        <Card className="p-4 rounded-2xl my-3 bg-secondary/60 border-0">
          <p className="text-sm font-semibold flex items-center gap-1.5">
            <LockIcon className="w-3.5 h-3.5" /> Cadastro restrito
          </p>
          <p className="text-xs text-muted-foreground mt-1 mb-3">
            Só usuários verificados podem anunciar. Você pode ver e entrar em contato com todos os
            anúncios normalmente.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-8 text-xs"
            onClick={() => go("verify")}
          >
            Quero me verificar
          </Button>
        </Card>
      )}

      <div className="space-y-3 mt-3">
        {list.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhuma moradia com esses filtros.
          </p>
        )}
        {list.map((p: Housing) => (
          <Card
            key={p.id}
            onClick={() => {
              setActiveHouse(p);
              go("housingDetail");
            }}
            className="overflow-hidden cursor-pointer rounded-3xl"
          >
            <div className="h-36 bg-gradient-to-br from-accent/40 via-primary/15 to-[oklch(0.95_0.04_85)] relative">
              {p.image && (
                <img
                  src={p.image}
                  alt={`Interior de ${p.name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              <Badge className="absolute top-3 left-3 bg-card/90 text-primary border-0 rounded-full text-[10px]">
                <BadgeCheck className="w-3 h-3 mr-1" /> Anunciante verificado
              </Badge>
              <span className="absolute bottom-3 right-3 bg-card/90 px-2 py-1 rounded-full text-xs font-semibold">
                R$ {p.price}/mês
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.type} • {p.dist} da faculdade
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-3.5 h-3.5 fill-current text-[oklch(0.8_0.15_85)]" /> {p.rate}
                </div>
              </div>
              <div className="flex gap-3 mt-2 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Segurança {p.safety}
                </span>
                <span>
                  {Math.max(0, p.vacancies - (p.confirmedResidents ?? 0))} vaga(s) restante(s)
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <SectionTitle
          title="Formar grupo para encontrar moradia"
          action={me.verified ? "+ Postar" : undefined}
          onAction={() => go("roommateNew")}
        />
        {!me.verified && (
          <p className="text-xs text-muted-foreground mb-3">
            Não encontrou um anúncio ideal? Reúna pessoas com preferências e orçamento parecidos
            para procurar um imóvel juntos.
          </p>
        )}
        <div className="space-y-3">
          {ctx.roommatePosts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              Ninguém publicando isso agora.
            </p>
          )}
          {ctx.roommatePosts.map((r: RoommatePost) => (
            <Card
              key={r.id}
              onClick={() => {
                ctx.setActiveRoommatePost(r);
                go("roommateDetail");
              }}
              className="p-4 rounded-2xl cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-sm flex items-center gap-1">
                    {r.authorName}
                    {r.authorVerified && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}
                  </p>
                  <p className="text-sm mt-1">{r.title}</p>
                </div>
                <Badge variant="secondary" className="rounded-full whitespace-nowrap">
                  {r.targetPeople ?? r.spotsNeeded} pessoas
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {r.groupProfile && (
                  <Badge variant="outline" className="rounded-full text-[10px]">
                    {r.groupProfile}
                  </Badge>
                )}
                {r.rooms && (
                  <Badge variant="outline" className="rounded-full text-[10px]">
                    {r.rooms}
                  </Badge>
                )}
                {r.priceRange && (
                  <Badge variant="outline" className="rounded-full text-[10px]">
                    {r.priceRange}
                  </Badge>
                )}
                {r.preferredArea && (
                  <Badge variant="outline" className="rounded-full text-[10px]">
                    {r.preferredArea}
                  </Badge>
                )}
              </div>
              <div className="mt-3 rounded-2xl bg-primary/5 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Formar o grupo
                  </p>
                  <p className="text-xs font-semibold">
                    {r.interestedCount ?? 0} de {r.spotsNeeded}
                  </p>
                </div>
                <div className="h-1.5 rounded-full bg-background mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.min(100, ((r.interestedCount ?? 0) / r.spotsNeeded) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Pessoas se reunindo para criar uma moradia compartilhada com preferências em
                  comum.
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{r.description}</p>
              <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                <MessageCircle className="w-3 h-3" /> Converse no app e combine um contato externo,
                como WhatsApp
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function HousingDetailScreen({ ctx }: { ctx: AppContext }) {
  const h: Housing = ctx.activeHouse ?? ctx.housing[0];
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [question, setQuestion] = useState("");
  const confirmedCount = h.confirmedResidents ?? 0;
  const remainingVacancies = Math.max(0, h.vacancies - confirmedCount);
  const [interestStarted, setInterestStarted] = useState(false);
  const [fitSent, setFitSent] = useState(false);
  const photos = h.images ?? (h.image ? [h.image] : []);
  const [activePhoto, setActivePhoto] = useState(0);
  const [fit, setFit] = useState({
    routine: "",
    occupation: "",
    cleaning: "",
    visits: "",
  });
  const fitReady = Object.values(fit).every((value) => value.trim());
  const sendQuestion = () => {
    if (!question.trim()) return;
    setContactSent(true);
  };
  return (
    <div className="pb-28">
      <div
        className="relative h-52 overflow-hidden bg-gradient-to-br from-accent/50 via-primary/20 to-[oklch(0.95_0.04_85)]"
        onTouchStart={(event) => {
          const startX = event.touches[0]?.clientX ?? 0;
          const handleTouchEnd = (endEvent: TouchEvent) => {
            const endX = endEvent.changedTouches[0]?.clientX ?? startX;
            if (Math.abs(endX - startX) > 40) {
              setActivePhoto((current) =>
                endX < startX
                  ? (current + 1) % photos.length
                  : (current - 1 + photos.length) % photos.length,
              );
            }
            event.currentTarget.removeEventListener("touchend", handleTouchEnd);
          };
          event.currentTarget.addEventListener("touchend", handleTouchEnd, { once: true });
        }}
      >
        {photos[activePhoto] && (
          <img
            src={photos[activePhoto]}
            alt={`${h.name} - foto ${activePhoto + 1}`}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        <button
          onClick={() => ctx.go("housing")}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-card/90 flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        {photos.length > 1 && (
          <>
            <button
              onClick={() =>
                setActivePhoto((current) => (current - 1 + photos.length) % photos.length)
              }
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => setActivePhoto((current) => (current + 1) % photos.length)}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
              {activePhoto + 1}/{photos.length}
            </span>
          </>
        )}
      </div>
      <div className="px-5 pt-5">
        <h1 className="text-2xl font-bold">{h.name}</h1>
        <p className="text-sm text-muted-foreground">
          {h.type} • {h.dist} da universidade
        </p>
        <div className="flex gap-2 mt-3 flex-wrap">
          <Badge variant="secondary" className="rounded-full">
            R$ {h.price}/mês
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            {remainingVacancies} vaga(s) restante(s)
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            Segurança {h.safety}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          <Stat icon={Shield} label="Segurança" value={h.safety} />
          <Stat icon={Star} label="Avaliação" value={String(h.rate)} />
          <Stat icon={Users} label="Vagas restantes" value={String(remainingVacancies)} />
        </div>
        <h3 className="font-semibold mt-6 mb-2">Sobre o lugar</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
        <Card className="p-4 rounded-3xl mt-5 bg-gradient-to-br from-primary/10 to-accent/20 border-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Formar o grupo
          </p>
          <p className="font-semibold mt-1">
            {confirmedCount} de {h.vacancies} pessoas confirmadas
          </p>
          <div className="h-2 rounded-full bg-background mt-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${Math.min(100, (confirmedCount / h.vacancies) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Faltam {Math.max(0, h.vacancies - confirmedCount)} pessoa(s) para fechar a casa. Estas
            são pessoas já entrevistadas e confirmadas pelo proprietário.
          </p>
          <div className="flex items-center gap-2 mt-3">
            {["Marina Souza", "Bruno Teles"].slice(0, confirmedCount).map((name) => (
              <div key={name} className="flex items-center gap-1.5">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-[10px] bg-accent/50">
                    {name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[11px] text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
          <Button
            variant={interestStarted ? "secondary" : "default"}
            onClick={() => setInterestStarted(true)}
            disabled={interestStarted || confirmedCount >= h.vacancies}
            className="w-full h-11 rounded-2xl mt-4"
          >
            {confirmedCount >= h.vacancies
              ? "Grupo completo ✓"
              : interestStarted
                ? "Processo de compatibilidade iniciado ✓"
                : "Tenho interesse"}
          </Button>
          {interestStarted && (
            <p className="text-xs text-primary text-center mt-2">
              Preencha o formulário abaixo para o proprietário avaliar seu fit cultural antes da
              entrevista.
            </p>
          )}
        </Card>
        {interestStarted && (
          <>
            {!fitSent && (
              <Card className="p-4 rounded-3xl mt-4 border-primary/30">
                <p className="font-semibold">Formulário de compatibilidade</p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  O proprietário verá suas respostas para decidir se vocês combinam antes de marcar
                  entrevista ou visita.
                </p>
                <div className="space-y-3">
                  <Input
                    value={fit.routine}
                    onChange={(event) => setFit({ ...fit, routine: event.target.value })}
                    placeholder="Como é sua rotina de estudo ou trabalho?"
                    className="h-11 rounded-2xl"
                  />
                  <Input
                    value={fit.occupation}
                    onChange={(event) => setFit({ ...fit, occupation: event.target.value })}
                    placeholder="Você estuda, trabalha ou faz os dois?"
                    className="h-11 rounded-2xl"
                  />
                  <Input
                    value={fit.cleaning}
                    onChange={(event) => setFit({ ...fit, cleaning: event.target.value })}
                    placeholder="Como você prefere dividir a limpeza?"
                    className="h-11 rounded-2xl"
                  />
                  <Input
                    value={fit.visits}
                    onChange={(event) => setFit({ ...fit, visits: event.target.value })}
                    placeholder="Como você se sente sobre receber visitas?"
                    className="h-11 rounded-2xl"
                  />
                </div>
                <Button
                  disabled={!fitReady}
                  onClick={() => setFitSent(true)}
                  className="w-full h-11 rounded-2xl mt-4"
                >
                  Enviar compatibilidade ao proprietário
                </Button>
              </Card>
            )}
            {fitSent && (
              <p className="text-sm text-primary text-center mt-4 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Respostas enviadas. Aguarde o retorno do
                proprietário para a entrevista ou visita.
              </p>
            )}
          </>
        )}
        <Card className="p-4 rounded-2xl mt-4 flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="text-xs bg-accent/50">{h.owner[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium flex items-center gap-1">
              {h.owner} <BadgeCheck className="w-3.5 h-3.5 text-primary" />
            </p>
            <p className="text-[11px] text-muted-foreground">Anunciante verificado pelo app</p>
          </div>
        </Card>
        <div className="mt-6">
          <p className="text-sm font-medium">Ainda tem alguma dúvida?</p>
          <p className="text-xs text-muted-foreground mt-1">
            Entre em contato com o anunciante antes de demonstrar interesse.
          </p>
          <Button
            onClick={() => setContactOpen(true)}
            className="w-full h-12 rounded-2xl mt-3"
            disabled={contactSent}
          >
            {contactSent ? "Dúvida enviada ✓" : "Entrar em contato para tirar dúvidas"}
          </Button>
        </div>
        {contactOpen && !contactSent && (
          <Card className="p-4 rounded-3xl mt-3 border-primary/30">
            <p className="font-semibold">Qual é a sua dúvida?</p>
            <Textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Escreva sua dúvida sobre a moradia..."
              className="rounded-2xl min-h-24 resize-none mt-3"
            />
            <Button
              onClick={sendQuestion}
              disabled={!question.trim()}
              className="w-full h-11 rounded-2xl mt-3"
            >
              Enviar dúvida
            </Button>
          </Card>
        )}
        {contactSent && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Sua dúvida foi enviada ao anunciante. Para participar da seleção de moradores, use
            “Tenho interesse” e preencha o formulário de compatibilidade.
          </p>
        )}
        {interestStarted && (
          <>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Nunca faça pagamentos antes de visitar o imóvel.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function HousingNewScreen({ ctx }: { ctx: AppContext }) {
  const { housing, setHousing, go, me } = ctx;
  const [f, setF] = useState({
    name: "",
    type: "República",
    price: "",
    dist: "",
    vacancies: "1",
    desc: "",
  });
  const ok = f.name.trim() && f.price.trim();
  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="housing"
        title="Cadastrar moradia"
        subtitle="Você está verificado, então pode anunciar."
      />
      <div className="space-y-3">
        <Input
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
          placeholder="Nome do anúncio"
          className="h-12 rounded-2xl"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["República", "Kitnet", "Apartamento", "Pensionato"].map((t) => (
            <button
              key={t}
              onClick={() => setF({ ...f, type: t })}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap border ${f.type === t ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={f.price}
            onChange={(e) => setF({ ...f, price: e.target.value })}
            placeholder="Preço (R$)"
            className="h-12 rounded-2xl"
          />
          <Input
            value={f.vacancies}
            onChange={(e) => setF({ ...f, vacancies: e.target.value })}
            placeholder="Vagas"
            className="h-12 rounded-2xl"
          />
        </div>
        <Input
          value={f.dist}
          onChange={(e) => setF({ ...f, dist: e.target.value })}
          placeholder="Distância da faculdade (ex: 0,6 km)"
          className="h-12 rounded-2xl"
        />
        <Textarea
          value={f.desc}
          onChange={(e) => setF({ ...f, desc: e.target.value })}
          placeholder="Descreva o lugar, regras e segurança"
          className="rounded-2xl min-h-24 resize-none"
        />
      </div>
      <Button
        disabled={!ok}
        className="w-full h-12 rounded-2xl mt-5"
        onClick={() => {
          setHousing([
            ...housing,
            {
              id: `h${Date.now()}`,
              name: f.name,
              type: f.type,
              price: Number(f.price) || 0,
              dist: f.dist || "—",
              safety: "Alta",
              rate: 5,
              vacancies: Number(f.vacancies) || 1,
              desc: f.desc || "Sem descrição.",
              owner: `${me.name} (verificado)`,
            },
          ]);
          go("housing");
        }}
      >
        Publicar anúncio
      </Button>
    </div>
  );
}

function RoommateNewScreen({ ctx }: { ctx: AppContext }) {
  const { roommatePosts, setRoommatePosts, go, me } = ctx;
  const [f, setF] = useState({
    title: "",
    targetPeople: "2",
    groupProfile: "",
    rooms: "",
    priceRange: "",
    preferredArea: "",
    description: "",
  });
  const ok = f.title.trim() && f.description.trim() && f.priceRange.trim();
  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="housing"
        title="Formar grupo para procurar moradia"
        subtitle="Encontre pessoas com gostos e orçamento parecidos para buscar um imóvel juntos."
      />
      <div className="space-y-3">
        <Input
          value={f.title}
          onChange={(e) => setF({ ...f, title: e.target.value })}
          placeholder="Ex: Procuro 2 mulheres para dividir apartamento em Itapuã"
          className="h-12 rounded-2xl"
        />
        <Input
          value={f.targetPeople}
          onChange={(e) => setF({ ...f, targetPeople: e.target.value })}
          placeholder="Quantas pessoas o grupo precisa ter?"
          type="number"
          className="h-12 rounded-2xl"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={f.priceRange}
            onChange={(e) => setF({ ...f, priceRange: e.target.value })}
            placeholder="Até quanto por pessoa?"
            className="h-12 rounded-2xl"
          />
          <Input
            value={f.preferredArea}
            onChange={(e) => setF({ ...f, preferredArea: e.target.value })}
            placeholder="Bairro ou região"
            className="h-12 rounded-2xl"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={f.rooms}
            onChange={(e) => setF({ ...f, rooms: e.target.value })}
            placeholder="Ex: apartamento de 3 quartos"
            className="h-12 rounded-2xl"
          />
          <Input
            value={f.groupProfile}
            onChange={(e) => setF({ ...f, groupProfile: e.target.value })}
            placeholder="Ex: mulheres que estudem/trabalhem"
            className="h-12 rounded-2xl"
          />
        </div>
        <Textarea
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          placeholder="Conte o que o grupo procura: localização, quartos, regras, rotina e preferências..."
          className="rounded-2xl min-h-28 resize-none"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        O objetivo não é preencher uma vaga de um anúncio. O grupo conversa, combina preferências e
        procura um imóvel que faça sentido para todas as pessoas.
      </p>
      <Button
        disabled={!ok}
        className="w-full h-12 rounded-2xl mt-5"
        onClick={() => {
          setRoommatePosts([
            ...roommatePosts,
            {
              id: `r${Date.now()}`,
              authorId: "me",
              authorName: me.name,
              authorVerified: me.verified,
              title: f.title,
              spotsNeeded: Math.max(1, Number(f.targetPeople) - 1 || 1),
              targetPeople: Math.max(2, Number(f.targetPeople) || 2),
              interestedCount: 1,
              groupProfile: f.groupProfile,
              rooms: f.rooms,
              priceRange: f.priceRange,
              preferredArea: f.preferredArea,
              description: f.description,
              comments: [],
              selectedCommentId: null,
            },
          ]);
          go("housing");
        }}
      >
        Criar grupo de busca
      </Button>
    </div>
  );
}

function RoommateDetailScreen({ ctx }: { ctx: AppContext }) {
  const { roommatePosts, setRoommatePosts, activeRoommatePost, me, go } = ctx;
  const post =
    roommatePosts.find((r: RoommatePost) => r.id === activeRoommatePost?.id) ?? activeRoommatePost;
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  if (!post) return null;

  const isMine = post.authorId === "me";

  const update = (updater: (p: RoommatePost) => RoommatePost) => {
    setRoommatePosts(roommatePosts.map((r: RoommatePost) => (r.id === post.id ? updater(r) : r)));
  };

  const sendComment = () => {
    if (!text.trim()) return;
    const alreadyInterested = post.comments.some((comment) => comment.authorId === "me");
    const comment: RoommateComment = {
      id: `rc${Date.now()}`,
      authorId: "me",
      authorName: me.name,
      authorVerified: me.verified,
      text,
      date: new Date().toISOString().slice(0, 10),
    };
    update((p) => ({
      ...p,
      interestedCount: alreadyInterested ? p.interestedCount : (p.interestedCount ?? 1) + 1,
      comments: [...p.comments, comment],
    }));
    setText("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  const selectCandidate = (commentId: string) => {
    update((p) => ({ ...p, selectedCommentId: commentId }));
  };

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="housing"
        title={post.title}
        subtitle={`${post.authorName} • grupo de ${post.targetPeople ?? post.spotsNeeded + 1} pessoas`}
      />

      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.groupProfile && (
          <Badge variant="secondary" className="rounded-full text-[10px]">
            {post.groupProfile}
          </Badge>
        )}
        {post.rooms && (
          <Badge variant="secondary" className="rounded-full text-[10px]">
            {post.rooms}
          </Badge>
        )}
        {post.priceRange && (
          <Badge variant="secondary" className="rounded-full text-[10px]">
            {post.priceRange}
          </Badge>
        )}
        {post.preferredArea && (
          <Badge variant="secondary" className="rounded-full text-[10px]">
            {post.preferredArea}
          </Badge>
        )}
      </div>
      <Card className="p-4 rounded-3xl mb-4 bg-gradient-to-br from-primary/10 to-accent/20 border-0">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Formar o grupo
          </p>
          <p className="text-sm font-semibold">
            {post.interestedCount ?? 0} de {post.spotsNeeded} pessoas interessadas
          </p>
        </div>
        <div className="h-2 rounded-full bg-background mt-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary"
            style={{
              width: `${Math.min(100, ((post.interestedCount ?? 0) / post.spotsNeeded) * 100)}%`,
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Quando o grupo estiver completo, vocês combinam os critérios e procuram juntos um
          apartamento compartilhado para criar a própria moradia.
        </p>
      </Card>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{post.description}</p>

      {isMine ? (
        <>
          <SectionTitle title="Pessoas interessadas (só você vê)" />
          {post.comments.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              Ninguém comentou ainda.
            </p>
          )}
          <div className="space-y-3">
            {post.comments.map((c: RoommateComment) => (
              <Card
                key={c.id}
                className={`p-4 rounded-2xl ${post.selectedCommentId === c.id ? "border-primary" : ""}`}
              >
                <p className="text-sm font-medium flex items-center gap-1">
                  {c.authorName}{" "}
                  {c.authorVerified && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{c.text}</p>
                {post.selectedCommentId === c.id ? (
                  <p className="text-xs text-primary font-medium mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Interesse confirmado — converse para
                    alinhar preferências
                  </p>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full h-8 text-xs mt-2"
                    onClick={() => selectCandidate(c.id)}
                  >
                    Demonstrar interesse
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <Card className="p-4 rounded-2xl mb-3">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Conte o que você procura e quais preferências são importantes..."
              className="rounded-2xl min-h-20 resize-none"
            />
            <Button className="w-full h-11 rounded-2xl mt-3" onClick={sendComment}>
              Demonstrar interesse
            </Button>
            {sent && (
              <p className="text-sm text-primary mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Enviado — só {post.authorName} vê isso.
              </p>
            )}
          </Card>
          <p className="text-[11px] text-muted-foreground">
            Sua mensagem fica visível apenas para {post.authorName}, para vocês combinarem a busca.
          </p>
        </>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="bg-secondary rounded-2xl p-3 text-center">
      <Icon className="w-4 h-4 mx-auto mb-1 text-primary" />
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

/* ───────── Perfil ───────── */
function ProfileScreen({ ctx }: { ctx: AppContext }) {
  const { me, go, friends, communities, diary, going } = ctx;
  const myTags: UserTag[] = [
    ...(me.admin ? ["admin" as UserTag] : []),
    ...(me.verified ? ["verified" as UserTag] : []),
    ...(me.isNew ? ["new" as UserTag] : []),
  ];
  const myGroups = communities.filter((c: Community) => c.status === "member");

  return (
    <div className="px-5 pt-12 pb-4">
      <button
        onClick={() => go("home")}
        className="flex items-center gap-2 mb-3 -ml-1 -mt-6 pl-1 pr-3 py-1.5 rounded-full hover:bg-secondary transition text-sm text-muted-foreground"
      >
        <span className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-3.5 h-3.5" />
        </span>
        Voltar
      </button>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Perfil</h1>
        <div className="flex gap-2">
          <button
            onClick={() => go("settings")}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Card className="p-5 rounded-3xl border-0 bg-gradient-to-br from-primary/12 to-accent/25 mb-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-xl bg-card">{me.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold flex items-center gap-1.5">
              {me.name} <UserTags tags={myTags} />
            </p>
            <p className="text-xs text-muted-foreground">
              {me.course} • {me.university}
            </p>
            <p className="text-xs text-muted-foreground">
              {me.age} anos • {me.city}
            </p>
          </div>
        </div>
        <p className="text-sm mt-3 leading-relaxed">{me.bio}</p>
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            className="rounded-full h-8 text-xs gap-1"
            onClick={() => go("editProfile")}
          >
            <Pencil className="w-3.5 h-3.5" /> Editar perfil
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-8 text-xs gap-1"
            onClick={() => go("friends")}
          >
            <UserPlus className="w-3.5 h-3.5" /> Amigos
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-4 gap-2 mb-5">
        <MiniStat label="Amigos" value={String(friends.length)} />
        <MiniStat label="Grupos" value={String(myGroups.length)} />
        <MiniStat label="Diário" value={String(diary.length)} />
        <MiniStat label="Eventos" value={String(going.length)} />
      </div>

      <SectionTitle title="Meus interesses" />
      <div className="flex flex-wrap gap-2 mb-6">
        {me.interests.map((t: string) => (
          <Badge key={t} variant="secondary" className="rounded-full">
            {t}
          </Badge>
        ))}
      </div>

      <SectionTitle title="Meus grupos" action="Explorar" onAction={() => go("communities")} />
      <div className="space-y-2 mb-5">
        {myGroups.length === 0 && (
          <p className="text-sm text-muted-foreground">Você ainda não participa de nenhum grupo.</p>
        )}
        {myGroups.map((g: Community) => (
          <Card
            key={g.id}
            onClick={() => {
              ctx.setActiveCommunity(g);
              go("community");
            }}
            className="p-3 rounded-2xl flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/12 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{g.name}</p>
              <p className="text-[11px] text-muted-foreground">{g.members} membros</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Card>
        ))}
      </div>

      <SectionTitle title="Atalhos" />
      <div className="space-y-2 mb-6">
        <ProfileLink icon={BookOpen} label="Diário emocional" onClick={() => go("diary")} />
        <ProfileLink icon={Calendar} label="Meus eventos" onClick={() => go("events")} />
        <ProfileLink icon={Building2} label="Moradia" onClick={() => go("housing")} />
        <ProfileLink icon={Settings} label="Configurações" onClick={() => go("settings")} />
      </div>
    </div>
  );
}

function ProfileLink({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <Card onClick={onClick} className="p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer">
      <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-sm font-medium flex-1">{label}</p>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </Card>
  );
}

function EditProfileScreen({ ctx }: { ctx: AppContext }) {
  const { me, setMe, go } = ctx;
  const [f, setF] = useState({ ...me });
  const allTags = [
    "Música",
    "Games",
    "Leitura",
    "Esportes",
    "Arte",
    "Cinema",
    "Tecnologia",
    "Viagens",
    "Dança",
    "Café",
  ];
  const toggle = (t: string) =>
    setF((p: Me) => ({
      ...p,
      interests: p.interests.includes(t) ? p.interests.filter((x) => x !== t) : [...p.interests, t],
    }));

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="profile"
        title="Editar perfil"
        subtitle="Seus dados sensíveis nunca aparecem para outros usuários."
      />

      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="text-2xl bg-accent/50">{f.name[0]}</AvatarFallback>
        </Avatar>
        <Button size="sm" variant="outline" className="rounded-full h-8 text-xs mt-3 gap-1">
          <Camera className="w-3.5 h-3.5" /> Trocar foto
        </Button>
      </div>

      <div className="space-y-3">
        <Field label="Nome">
          <Input
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            className="h-12 rounded-2xl"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Idade">
            <Input
              value={f.age}
              onChange={(e) => setF({ ...f, age: e.target.value })}
              className="h-12 rounded-2xl"
            />
          </Field>
          <Field label="Cidade">
            <Input
              value={f.city}
              onChange={(e) => setF({ ...f, city: e.target.value })}
              className="h-12 rounded-2xl"
            />
          </Field>
        </div>
        <Field label="Curso">
          <Input
            value={f.course}
            onChange={(e) => setF({ ...f, course: e.target.value })}
            className="h-12 rounded-2xl"
          />
        </Field>
        <Field label="Universidade">
          <Input
            value={f.university}
            onChange={(e) => setF({ ...f, university: e.target.value })}
            className="h-12 rounded-2xl"
          />
        </Field>
        <Field label="Sobre você">
          <Textarea
            value={f.bio}
            onChange={(e) => setF({ ...f, bio: e.target.value })}
            className="rounded-2xl min-h-20 resize-none"
          />
        </Field>
      </div>

      <p className="text-sm font-semibold mt-6 mb-3">Interesses</p>
      <div className="flex flex-wrap gap-2">
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => toggle(t)}
            className={`px-3 py-1.5 rounded-full text-sm border ${f.interests.includes(t) ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <Button
        className="w-full h-12 rounded-2xl mt-8"
        onClick={() => {
          setMe(f);
          go("profile");
        }}
      >
        Salvar alterações
      </Button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1.5 ml-1">{label}</p>
      {children}
    </div>
  );
}

/* ───────── Configurações ───────── */
function SettingsScreen({ ctx }: { ctx: AppContext }) {
  const { me, setMe, go } = ctx;
  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader ctx={ctx} back="profile" title="Configurações" />

      <SectionTitle title="Segurança e privacidade" />
      <Card className="p-4 rounded-2xl mb-3 space-y-4">
        <ToggleRow label="Perfil visível apenas para amigos" defaultChecked />
        <ToggleRow label="Autenticação em duas etapas" defaultChecked />
        <ToggleRow label="Permitir pedidos de amizade" defaultChecked />
        <ToggleRow label="Mostrar meus grupos no perfil" />
        <div className="pt-1 border-t border-border">
          <button
            onClick={() => go("verify")}
            className="w-full flex items-center gap-2 pt-3 text-left"
          >
            <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs text-muted-foreground flex-1">
              {me.verified ? "Conta verificada" : "Verificação de identidade (opcional)"}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </Card>

      <SectionTitle title="Notificações" />
      <Card className="p-4 rounded-2xl mb-3 space-y-4">
        <ToggleRow label="Lembrete do diário emocional" defaultChecked />
        <ToggleRow label="Novos eventos da minha área" defaultChecked />
        <ToggleRow label="Pedidos de entrada em grupos" defaultChecked />
      </Card>

      <SectionTitle title="Conta" />
      <Card className="p-4 rounded-2xl mb-6 space-y-4">
        <button
          onClick={() => go("editProfile")}
          className="flex items-center gap-2 w-full text-left text-sm"
        >
          <PenLine className="w-4 h-4 text-muted-foreground" /> Editar perfil
        </button>
        <button
          onClick={() => {
            setMe({ ...me, verified: false });
            go("login" as Screen);
          }}
          className="flex items-center gap-2 w-full text-left text-sm text-destructive"
        >
          <LogOut className="w-4 h-4" /> Sair da conta
        </button>
      </Card>
    </div>
  );
}

function ToggleRow({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm">{label}</span>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
}

/* ───────── Verificação ───────── */
function VerifyScreen({ ctx }: { ctx: AppContext }) {
  const { me, setMe, go } = ctx;
  const [f, setF] = useState({ full: "", birth: "", rg: "", cpf: "", cep: "", phone: "" });
  const [photo, setPhoto] = useState(false);
  const [sentReq, setSentReq] = useState(false);
  const ok = f.full.trim() && f.cpf.trim() && f.rg.trim() && photo;

  if (me.verified) {
    return (
      <div className="px-5 pt-12 pb-28">
        <ScreenHeader ctx={ctx} back="settings" title="Verificação" />
        <Card className="p-6 rounded-3xl text-center border-0 bg-primary/10">
          <BadgeCheck className="w-10 h-10 mx-auto text-primary mb-2" />
          <p className="font-semibold">Sua conta está verificada</p>
          <p className="text-sm text-muted-foreground mt-1">
            Sua foto com documento foi apagada dos nossos servidores.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-5 pt-12 pb-28">
      <ScreenHeader
        ctx={ctx}
        back="settings"
        title="Verificação de identidade"
        subtitle="Opcional. Serve para liberar o cadastro de moradia e aumentar a confiança da comunidade."
      />

      <Card className="p-4 rounded-2xl mb-4 bg-secondary/60 border-0">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <Shield className="w-3.5 h-3.5 inline mr-1 text-primary" />
          Seus dados são usados apenas para conferir que você é uma pessoa real.
          <strong className="text-foreground">
            {" "}
            A foto com o documento é apagada permanentemente assim que a verificação é concluída
          </strong>
          , e nenhum dado do documento aparece no seu perfil público.
        </p>
      </Card>

      <div className="space-y-3">
        <Input
          value={f.full}
          onChange={(e) => setF({ ...f, full: e.target.value })}
          placeholder="Nome e sobrenome completos"
          className="h-12 rounded-2xl"
        />
        <Input
          value={f.birth}
          onChange={(e) => setF({ ...f, birth: e.target.value })}
          placeholder="Data de nascimento (dd/mm/aaaa)"
          className="h-12 rounded-2xl"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={f.rg}
            onChange={(e) => setF({ ...f, rg: e.target.value })}
            placeholder="RG"
            className="h-12 rounded-2xl"
          />
          <Input
            value={f.cpf}
            onChange={(e) => setF({ ...f, cpf: e.target.value })}
            placeholder="CPF"
            className="h-12 rounded-2xl"
          />
        </div>
        <Input
          value={f.cep}
          onChange={(e) => setF({ ...f, cep: e.target.value })}
          placeholder="CEP"
          className="h-12 rounded-2xl"
        />
        <Input
          value={f.phone}
          onChange={(e) => setF({ ...f, phone: e.target.value })}
          placeholder="Telefone para contato"
          className="h-12 rounded-2xl"
        />

        <button onClick={() => setPhoto(!photo)} className="w-full">
          <Card
            className={`p-5 rounded-2xl border-dashed text-center ${photo ? "border-primary bg-primary/5" : ""}`}
          >
            <Camera className="w-6 h-6 mx-auto text-primary mb-2" />
            <p className="text-sm font-medium">
              {photo ? "Foto anexada ✓" : "Anexar foto sua ao lado do documento"}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              A foto será apagada após a verificação.
            </p>
          </Card>
        </button>
      </div>

      <Button
        disabled={!ok}
        className="w-full h-12 rounded-2xl mt-5"
        onClick={() => {
          setSentReq(true);
          setTimeout(() => {
            setMe({ ...me, verified: true, isNew: false });
            go("settings");
          }, 1400);
        }}
      >
        {sentReq ? "Enviando..." : "Enviar para verificação"}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center mt-3">
        A análise costuma levar até 48 horas. Você continua usando o app normalmente enquanto isso.
      </p>
    </div>
  );
}
