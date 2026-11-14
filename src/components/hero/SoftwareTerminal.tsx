'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Sparkles,
  Cpu,
  ShieldAlert,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  ChevronRight,
  Braces
} from 'lucide-react';

// Pre-packaged cyber hacker / code sequences
const CODE_SNIPPETS = [
  'import { VisionPipeline, YOLOv8 } from "@mrtechniques/neural";',
  'import { DaVinciColorEngine, ACEScg } from "@mrtechniques/color";',
  'const stream = new VideoTelemetryStream({ fps: 60, res: "4K_DCI" });',
  'await stream.attachNeuralTracking({ model: "yolov8x-cinema.pt" });',
  'const matrix = await ACEScg.transformGamut("S-Log3", "Rec.709");',
  'const target = VisionPipeline.detectSubject({ confidence: 0.998 });',
  'console.log(`[CORE] Subject locked: Mohammed Shajith // ID: MT_01`);',
  'const quantumHydrate = await NextServer.turboRender({ route: "/" });',
  'const ffmpegStream = spawn("ffmpeg", ["-i", "input_prores.mov", "-c:v", "libx265"]);',
  'ffmpegStream.stderr.on("data", (log) => Telemetry.emit("encode", log));',
  'export default async function CyberArchitecture() { return <MrTechniques />; }'
];

const HACK_LOGS = [
  '[SYS_INIT] Loading Mr Techniques Kernel v4.19-LTS-amd64...',
  '[DAEMON] Initializing Optical Sensor Pipeline (Sony Cinema FX6)... OK',
  '[NEURAL] Loading YOLOv8 TensorRT weights into GPU memory [VRAM: 16GB]... OK',
  '[SECURITY] Penetration bypass active: Proxying through 12.9716°N / 77.5946°E...',
  '[CIPHER] Decrypting raw S-Log3 10-bit color matrices...',
  '[FIREWALL] Override status: ACCESS GRANTED.',
  '[NEXT_TURBO] Turbopack compiled 842 modules in 14.8ms.',
  '[TELEMETRY] FPV Drone Gyro Stabilization: ACTIVE (Pitch: 0.04°, Roll: -0.01°)',
  '[SYSTEM] Status: 100% OPERATIONAL. Welcome, operator.'
];

export default function SoftwareTerminal() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'hacker' | 'neural'>('terminal');
  const [history, setHistory] = useState<string[]>([
    'mr_techniques@core:~$ system-status --verbose',
    '[OK] Mr Techniques Core Architecture loaded.',
    '[OK] AI/ML Neural Pipeline connected: YOLOv8 / PyTorch / CUDA 12.4',
    '[OK] Full-Stack Engine: Next.js 16 / TypeScript / Tailwind CSS',
    'mr_techniques@core:~$ initiate --target="MR_TECHNIQUES"'
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const snippetIdxRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play subtle synthesized mechanical click sound (zero asset dependency)
  const playClickSound = (frequency = 600, duration = 0.02) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable or blocked by autoplay
    }
  };

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => setCursorBlink((b) => !b), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (autoScroll && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, autoScroll]);

  // Handle typing from real keyboard when focused (hacker simulator mode)
  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else {
      playClickSound();
    }
  };

  // Hacker simulator typing anywhere inside terminal box
  const handleGlobalHackerTyping = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // If user is typing in regular input, let input handle it
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    
    // Inject the next cyber code snippet on any keypress
    playClickSound(750, 0.03);
    const snippet = CODE_SNIPPETS[snippetIdxRef.current % CODE_SNIPPETS.length];
    snippetIdxRef.current++;
    setHistory((prev) => [...prev, snippet]);
  };

  // Command execution logic
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    playClickSound(850, 0.04);
    const newLogs = [`mr_techniques@core:~$ ${trimmed}`];

    const lower = trimmed.toLowerCase();
    if (lower === 'clear' || lower === 'cls') {
      setHistory(['[CLEARED] mr_techniques@core:~$ ready.']);
      return;
    } else if (lower === 'help') {
      newLogs.push(
        'Available Directives:',
        '  status     - Display neural & system telemetry',
        '  hack       - Trigger automated cyber infiltration sequence',
        '  vision     - Run YOLOv8 object & subject detection pipeline',
        '  dossier    - Print Mohammed Shajith / Mr Techniques bio',
        '  skills     - List full-stack & cinema technologies',
        '  clear      - Clear terminal screen'
      );
    } else if (lower === 'status') {
      newLogs.push(
        'KERNEL: MT-OS v4.19.0 (x86_64)',
        'CPU: Neural Engine 16-Core @ 4.2 GHz [UTIL: 32%]',
        'MEMORY: 64 GB Unified LPDDR5 [USED: 18.4 GB]',
        'CAMERA INTERFACE: Sony FX6 / FX3 Cinema Line [CONNECTED]',
        'GEOLOCATION: 12.9716° N, 77.5946° E'
      );
    } else if (lower === 'dossier') {
      newLogs.push(
        '-------------------------------------------------------',
        'NAME: Mohammed Shajith (Callsign: Mr Techniques)',
        'SPECIALIZATION: Director of Photography & AI/ML Software Architect',
        'EXPERIENCE: 10+ Years Cinematography & Computer Vision Systems',
        'STACK: Next.js 16, PyTorch, YOLOv8, DaVinci Resolve, TypeScript',
        '-------------------------------------------------------'
      );
    } else if (lower === 'skills') {
      newLogs.push(
        'TECH: PyTorch | CUDA | YOLOv8 | Next.js 16 | React 19 | Tailwind | Node.js',
        'CINEMA: DaVinci Resolve | Sony Cinema Line | Arri LogC | FPV Drones | Gimbal Ops'
      );
    } else if (lower === 'hack') {
      runHackingSimulation();
      return;
    } else if (lower === 'vision') {
      runNeuralVisionDemo();
      return;
    } else {
      newLogs.push(`Command not found: "${trimmed}". Type "help" for active directives.`);
    }

    setHistory((prev) => [...prev, ...newLogs]);
  };

  // Automated Hacking Simulator Sequence
  const runHackingSimulation = () => {
    if (isHacking) return;
    setIsHacking(true);
    setHistory((prev) => [
      ...prev,
      'mr_techniques@core:~$ initiate-cyber-intrusion --target="MAINFRAME"',
      '>>> [INTRUSION SEQUENCE INITIATED] <<<'
    ]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < HACK_LOGS.length) {
        playClickSound(500 + step * 40, 0.03);
        const log = HACK_LOGS[step];
        setHistory((prev) => [...prev, log]);
        step++;
      } else {
        clearInterval(interval);
        setIsHacking(false);
        setHistory((prev) => [
          ...prev,
          '>>> [ACCESS PROTOCOL COMPLETE: FULL ROOT PRIVILEGES] <<<'
        ]);
      }
    }, 280);
  };

  // Run Neural Vision Pipeline Simulation
  const runNeuralVisionDemo = () => {
    playClickSound(700, 0.05);
    setHistory((prev) => [
      ...prev,
      'mr_techniques@core:~$ python -m vision.track --source=cine_feed_01.raw',
      '[CUDA:0] Model: YOLOv8x-Custom-Trained (53.2M params)',
      '[FRAME 0012] Detected: human (99.8%) [BBox: 120, 84, 460, 890]',
      '[FRAME 0012] Classified: MOHAMMED SHAJITH [CONFIDENCE: 99.8%]',
      '[COLOR] Applying 3D LUT: Arri Alexa 709 -> REC.709 D65',
      '[RENDER] Realtime FPS: 59.94 fps | Latency: 4.2ms | Jitter: 0.1ms',
      '[OK] Neural tracking locked.'
    ]);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleGlobalHackerTyping}
      className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#090e17]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col h-[520px] sm:h-[560px] font-mono select-none outline-none focus:border-cyan-400 transition-colors group"
    >
      {/* Top Cyber / Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 z-20" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-[#060a10]/90">
        {/* macOS/Unix Window Buttons */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/40 inline-block shadow-[0_0_8px_#ef4444]" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400/40 inline-block shadow-[0_0_8px_#eab308]" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40 inline-block shadow-[0_0_8px_#10b981]" />
          
          <div className="ml-3 hidden sm:flex items-center gap-2 text-xs text-zinc-400">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-300 font-semibold">mr_techniques@core</span>
            <span className="text-zinc-600">:</span>
            <span className="text-zinc-400">~/systems</span>
          </div>
        </div>

        {/* Center Title Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-[11px] text-cyan-300 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]" />
          <span>HACKER SIMULATOR // ONLINE</span>
        </div>

        {/* Audio & Status controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded text-xs transition-colors border ${
              soundEnabled
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                : 'bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-white'
            }`}
            title={soundEnabled ? 'Mute Terminal Clicks' : 'Enable Terminal Audio Feedback'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <span className="hidden md:inline-block text-[10px] text-zinc-500 font-mono">
            PRESS ANY KEY TO HACK
          </span>
        </div>
      </div>

      {/* Terminal Sub-Nav / Action Triggers */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-cyan-500/15 bg-[#05080e]/60 text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={runHackingSimulation}
            disabled={isHacking}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 active:scale-95 transition-all disabled:opacity-50 text-[11px]"
          >
            <ShieldAlert className="w-3 h-3 text-cyan-400" />
            <span>{isHacking ? 'INTRUSION IN PROGRESS...' : '> EXECUTE HACK'}</span>
          </button>

          <button
            onClick={runNeuralVisionDemo}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800/70 border border-zinc-700/60 text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 active:scale-95 transition-all text-[11px]"
          >
            <Cpu className="w-3 h-3 text-amber-400" />
            <span className="hidden xs:inline">NEURAL</span> VISION
          </button>

          <button
            onClick={() => executeCommand('status')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800/70 border border-zinc-700/60 text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 active:scale-95 transition-all text-[11px]"
          >
            <Braces className="w-3 h-3 text-rose-400" />
            <span>SYS_INFO</span>
          </button>
        </div>

        <button
          onClick={() => executeCommand('clear')}
          className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>CLEAR</span>
        </button>
      </div>

      {/* Terminal Main Body / Scroll View */}
      <div
        ref={terminalBodyRef}
        className="relative z-10 flex-1 p-4 sm:p-5 overflow-y-auto space-y-1.5 text-xs sm:text-sm text-cyan-100 font-mono leading-relaxed select-text cursor-text"
      >
        {/* Glowing ASCII Banner: MR TECHNIQUES */}
        <div className="py-2 text-cyan-400 select-none overflow-x-auto no-scrollbar font-bold leading-none tracking-tight">
          <pre className="text-[7px] sm:text-[9.5px] md:text-[11px] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
{`
 ███╗   ███╗██████╗     ████████╗███████╗ ██████╗██╗  ██╗███╗   ██╗██╗ ██████╗ ██╗   ██╗███████╗███████╗
 ████╗ ████║██╔══██╗    ╚══██╔══╝██╔════╝██╔════╝██║  ██║████╗  ██║██║██╔═══██╗██║   ██║██╔════╝██╔════╝
 ██╔████╔██║██████╔╝       ██║   █████╗  ██║     ███████║██╔██╗ ██║██║██║   ██║██║   ██║█████╗  ███████╗
 ██║╚██╔╝██║██╔══██╗       ██║   ██╔══╝  ██║     ██╔══██║██║╚██╗██║██║██║▄▄ ██║██║   ██║██╔══╝  ╚════██║
 ██║ ╚═╝ ██║██║  ██║       ██║   ███████╗╚██████╗██║  ██║██║ ╚═╝██║██║╚██████╔╝╚██████╔╝███████╗███████║
 ╚═╝     ╚═╝╚═╝  ╚═╝       ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝
`}
          </pre>
          <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-cyan-500/20 pb-2 mb-2 font-mono">
            <span>CORE REPOSITORY: MOHAMMED SHAJITH</span>
            <span className="text-cyan-400 font-semibold">[TURBOPACK 16.3 // LIVE]</span>
          </div>
        </div>

        {/* History stream */}
        {history.map((line, idx) => {
          const isPrompt = line.startsWith('mr_techniques@core:~$');
          const isError = line.startsWith('Command not found');
          const isOk = line.includes('[OK]') || line.includes('GRANTED') || line.includes('COMPLETE');
          const isWarning = line.includes('[INTRUSION') || line.includes('DECRYPTING') || line.includes('FIREWALL');

          return (
            <div
              key={idx}
              className={`leading-relaxed break-words ${
                isPrompt
                  ? 'text-cyan-300 font-semibold flex items-start gap-1.5'
                  : isError
                  ? 'text-red-400'
                  : isOk
                  ? 'text-emerald-400'
                  : isWarning
                  ? 'text-amber-400'
                  : 'text-zinc-300'
              }`}
            >
              {isPrompt ? (
                <>
                  <span className="text-cyan-400 select-none">❯</span>
                  <span>{line.replace('mr_techniques@core:~$ ', '')}</span>
                </>
              ) : (
                <span>{line}</span>
              )}
            </div>
          );
        })}

        {/* Active Command Line Input */}
        <div className="flex items-center gap-2 pt-2 text-cyan-300">
          <span className="text-cyan-400 font-semibold select-none">mr_techniques@core:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleTerminalKeyDown}
            placeholder="Type 'help', 'hack', 'vision', or any command..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-zinc-600 focus:ring-0 text-xs sm:text-sm"
            autoFocus
          />
          <span
            className={`inline-block w-2.5 h-4 bg-cyan-400 shadow-[0_0_8px_#06b6d4] transition-opacity ${
              cursorBlink ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      {/* Terminal Footer Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2 border-t border-cyan-500/20 bg-[#05090f]/90 text-[11px] text-zinc-400 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            PORT: 3000
          </span>
          <span className="hidden sm:inline text-zinc-600">//</span>
          <span className="hidden sm:inline text-zinc-400">LATENCY: 12ms</span>
          <span className="hidden md:inline text-zinc-600">//</span>
          <span className="hidden md:inline text-zinc-400">BRANCH: main*</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-cyan-400/80">UTF-8</span>
          <span className="text-zinc-600">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            SYNCHRONIZED
          </span>
        </div>
      </div>
    </div>
  );
}
