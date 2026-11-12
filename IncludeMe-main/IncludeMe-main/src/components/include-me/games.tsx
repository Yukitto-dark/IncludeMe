import { useMemo, useState } from "react";
import { ArrowLeft, RotateCcw, Check, X, Shuffle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { quizCity, quizUni, truthOrDare, bingoItems, scrambleWords } from "@/lib/include-me";

export type GameId = "quizCity" | "quizUni" | "truthDare" | "bingo" | "scramble";

export const GAME_TITLES: Record<GameId, string> = {
  quizCity: "Quiz da cidade",
  quizUni: "Trivia universitária",
  truthDare: "Verdade ou desafio",
  bingo: "Bingo de calouros",
  scramble: "Palavra embaralhada",
};

export function GameScreen({ id, onBack }: { id: GameId; onBack: () => void }) {
  return (
    <div className="px-5 pt-12 pb-28">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground flex items-center gap-1 mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Interagir
      </button>
      <h1 className="text-2xl font-bold mb-1">{GAME_TITLES[id]}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Jogue sozinho ou com o grupo. Sem pontuação pública.
      </p>
      {(id === "quizCity" || id === "quizUni") && (
        <Quiz questions={id === "quizCity" ? quizCity : quizUni} />
      )}
      {id === "truthDare" && <TruthDare />}
      {id === "bingo" && <Bingo />}
      {id === "scramble" && <Scramble />}
    </div>
  );
}

function Quiz({ questions }: { questions: { q: string; a: string[]; correct: number }[] }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const reset = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <Card className="p-6 rounded-3xl border-0 bg-primary/10 text-center">
        <Trophy className="w-10 h-10 mx-auto text-primary mb-3" />
        <p className="text-xl font-bold">
          {score} de {questions.length}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {score === questions.length
            ? "Perfeito! Você já manja bastante."
            : "Boa! Cada acerto é um pedaço a menos de estranheza."}
        </p>
        <Button onClick={reset} className="rounded-full mt-5 gap-2">
          <RotateCcw className="w-4 h-4" /> Jogar de novo
        </Button>
      </Card>
    );
  }

  const cur = questions[i]!;
  const next = () => {
    if (i + 1 >= questions.length) setDone(true);
    else {
      setI(i + 1);
      setPicked(null);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 flex-1 rounded-full ${idx <= i ? "bg-primary" : "bg-secondary"}`}
          />
        ))}
      </div>
      <Card className="p-5 rounded-3xl border-0 bg-gradient-to-br from-primary/12 to-accent/30">
        <p className="text-xs font-semibold text-primary mb-2">
          Pergunta {i + 1}/{questions.length}
        </p>
        <p className="font-semibold text-base mb-4">{cur.q}</p>
        <div className="space-y-2">
          {cur.a.map((opt, idx) => {
            const isCorrect = idx === cur.correct;
            const show = picked !== null;
            return (
              <button
                key={opt}
                disabled={show}
                onClick={() => {
                  setPicked(idx);
                  if (isCorrect) setScore((s) => s + 1);
                }}
                className={`w-full text-left p-3 rounded-2xl border text-sm flex items-center justify-between transition ${
                  show && isCorrect
                    ? "border-primary bg-primary/15"
                    : show && idx === picked
                      ? "border-destructive bg-destructive/10"
                      : "border-border bg-background"
                }`}
              >
                <span>{opt}</span>
                {show && isCorrect && <Check className="w-4 h-4 text-primary" />}
                {show && idx === picked && !isCorrect && <X className="w-4 h-4 text-destructive" />}
              </button>
            );
          })}
        </div>
      </Card>
      {picked !== null && (
        <Button onClick={next} className="w-full h-12 rounded-2xl mt-4">
          {i + 1 >= questions.length ? "Ver resultado" : "Próxima"}
        </Button>
      )}
    </div>
  );
}

function TruthDare() {
  const [card, setCard] = useState<{ type: "truth" | "dare"; text: string } | null>(null);
  const draw = (type: "truth" | "dare") => {
    const list = truthOrDare[type];
    setCard({ type, text: list[Math.floor(Math.random() * list.length)]! });
  };
  return (
    <div>
      <Card className="p-6 rounded-3xl border-0 bg-gradient-to-br from-accent/50 to-primary/10 min-h-40 flex items-center justify-center text-center">
        {card ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              {card.type === "truth" ? "Verdade" : "Desafio"}
            </p>
            <p className="font-semibold leading-relaxed">{card.text}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Escolha uma carta para começar. Nada aqui é obrigatório — pode passar a vez.
          </p>
        )}
      </Card>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button onClick={() => draw("truth")} className="h-12 rounded-2xl">
          Verdade
        </Button>
        <Button onClick={() => draw("dare")} variant="outline" className="h-12 rounded-2xl">
          Desafio
        </Button>
      </div>
    </div>
  );
}

function Bingo() {
  const [marked, setMarked] = useState<number[]>([]);
  const toggle = (i: number) =>
    setMarked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const win = lines.some((l) => l.every((i) => marked.includes(i)));
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Encontre pessoas que se encaixem em cada quadro e marque. Complete uma linha para bater
        bingo.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {bingoItems.map((t, i) => (
          <button
            key={t}
            onClick={() => toggle(i)}
            className={`aspect-square rounded-2xl p-2 text-[11px] font-medium leading-tight border transition ${
              marked.includes(i)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {win && (
        <Card className="p-4 rounded-2xl mt-4 border-0 bg-primary/12 text-center">
          <p className="font-semibold">🎉 Bingo! Você fechou uma linha.</p>
        </Card>
      )}
      <Button
        onClick={() => setMarked([])}
        variant="outline"
        className="w-full h-11 rounded-2xl mt-4 gap-2"
      >
        <RotateCcw className="w-4 h-4" /> Limpar cartela
      </Button>
    </div>
  );
}

function Scramble() {
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "no">("idle");
  const item = scrambleWords[idx]!;
  const scrambled = useMemo(
    () =>
      item.word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join(" "),
    [idx, item.word],
  );
  const check = () => setStatus(guess.trim().toUpperCase() === item.word ? "ok" : "no");
  const next = () => {
    setIdx((idx + 1) % scrambleWords.length);
    setGuess("");
    setStatus("idle");
  };

  return (
    <div>
      <Card className="p-6 rounded-3xl border-0 bg-gradient-to-br from-primary/12 to-accent/30 text-center">
        <p className="text-2xl font-bold tracking-[0.3em]">{scrambled}</p>
        <p className="text-xs text-muted-foreground mt-3">Dica: {item.hint}</p>
      </Card>
      <Input
        value={guess}
        onChange={(e) => {
          setGuess(e.target.value);
          setStatus("idle");
        }}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Sua resposta"
        className="h-12 rounded-2xl mt-4 uppercase"
      />
      {status === "ok" && <p className="text-sm text-primary font-medium mt-2">Acertou! 🎉</p>}
      {status === "no" && (
        <p className="text-sm text-destructive mt-2">Ainda não. Tente de novo.</p>
      )}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button onClick={check} className="h-12 rounded-2xl">
          Verificar
        </Button>
        <Button onClick={next} variant="outline" className="h-12 rounded-2xl gap-2">
          <Shuffle className="w-4 h-4" /> Outra
        </Button>
      </div>
    </div>
  );
}
