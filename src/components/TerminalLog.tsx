import React, { useEffect, useRef } from "react";
import { LogEntry } from "../types";

interface TerminalLogProps {
  logs: LogEntry[];
  speed: string;
}

export default function TerminalLog({ logs, speed }: TerminalLogProps) {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const typeConfig = {
    success: { text: "text-emerald-400 font-medium", icon: "✔ [SUCCESS]" },
    warn: { text: "text-amber-400 font-medium", icon: "⚡ [WARN]" },
    active: { text: "text-cyan-400 font-bold", icon: "▶ [ACTIVE]" },
    agent: { text: "text-purple-400", icon: "⚙ [COLLAB]" },
    info: { text: "text-slate-400", icon: "::" },
  };

  return (
    <div className="h-[180px] bg-black/60 border border-slate-800/80 rounded-lg p-3 relative flex flex-col overflow-hidden font-mono text-[11px] select-none">
      {/* Terminal Title */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-2 shrink-0 text-[10px]">
        <span className="text-slate-500 tracking-wider flex items-center">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
          AGENT STREAM MONITOR (实时智能流监视器)
        </span>
        <span className="text-slate-500 uppercase tracking-widest">{speed}</span>
      </div>

      {/* Terminal Lines Container */}
      <div className="flex-grow overflow-y-auto space-y-1.5 pr-1 text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
        {logs.length === 0 ? (
          <span className="text-slate-600 block">SYSTEM IDLE. AWAITING PROCESS COMMANDS...</span>
        ) : (
          logs.map((log, idx) => {
            const config = typeConfig[log.type] || typeConfig.info;
            return (
              <div
                key={idx}
                className={`transition-all duration-300 transform translate-x-0 ${config.text} block`}
              >
                <span className="text-slate-600 mr-2">[{log.timestamp}]</span>
                <span className="mr-1">{config.icon}</span>
                <span>{log.message}</span>
              </div>
            );
          })
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
