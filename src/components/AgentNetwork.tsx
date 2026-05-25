import React, { useMemo } from "react";
import { AGENT_LOOKUP } from "../types";

interface AgentNetworkProps {
  activeAgentIds: string[];
}

export default function AgentNetwork({ activeAgentIds }: AgentNetworkProps) {
  const agents = useMemo(() => Object.values(AGENT_LOOKUP), []);

  const rawConnections = useMemo(
    () => [
      ["planner", "strategy"],
      ["planner", "finance"],
      ["planner", "operations"],
      ["planner", "risk"],
      ["planner", "writing"],
      ["strategy", "finance"],
      ["operations", "risk"],
      ["retrieval", "strategy"],
      ["retrieval", "operations"],
      ["retrieval", "planner"],
      ["writing", "review"],
      ["writing", "synthesizer"],
      ["synthesizer", "review"],
      ["strategy", "review"],
    ],
    []
  );

  return (
    <div id="agent-network-container" className="relative w-full h-full bg-[#0d131f] border border-slate-800 rounded-xl p-4 overflow-hidden flex flex-col shadow-inner select-none">
      {/* Background Mesh */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1e293b 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3 z-10 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-3 bg-[#a855f7] rounded-sm"></span>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
            多智能体分布式协同网络 (Neural Mesh)
          </span>
        </div>
        <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
          {activeAgentIds.length} / 9 Active
        </span>
      </div>

      <div className="flex-grow relative bg-[#040812]/50 border border-slate-900/60 rounded-lg p-2 overflow-hidden">
        {/* SVG Network Connections scaled on normalized 0-100 grid */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {rawConnections.map(([id1, id2]) => {
            const node1 = AGENT_LOOKUP[id1];
            const node2 = AGENT_LOOKUP[id2];
            if (!node1 || !node2) return null;

            const isLinkActive =
              activeAgentIds.includes(id1) && activeAgentIds.includes(id2);

            return (
              <path
                key={`link-${id1}-${id2}`}
                d={`M ${node1.x} ${node1.y} Q ${(node1.x + node2.x) / 2} ${
                  (node1.y + node2.y) / 2 + 10
                } ${node2.x} ${node2.y}`}
                stroke={isLinkActive ? "url(#activeLineGradient)" : "rgba(30, 41, 59, 0.4)"}
                strokeWidth={isLinkActive ? 0.8 : 0.25}
                fill="none"
                filter={isLinkActive ? "url(#glowCyan)" : undefined}
                className={isLinkActive ? "dash-trail" : ""}
                style={{
                  strokeDasharray: isLinkActive ? "2, 1" : undefined,
                  transition: "stroke 0.4s ease, stroke-width 0.4s ease",
                }}
              />
            );
          })}

          <defs>
            <linearGradient id="activeLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2ff" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* HTML Rendered Nodes */}
        {agents.map((agent) => {
          const isActive = activeAgentIds.includes(agent.id);
          return (
            <div
              key={agent.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 select-none"
              style={{
                left: `${agent.x}%`,
                top: `${agent.y}%`,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="relative group flex flex-col items-center">
                {/* Micro breath ring */}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-25"
                    style={{
                      backgroundColor: agent.color,
                      animationDuration: "2s",
                    }}
                  ></span>
                )}

                {/* Node bubble */}
                <div
                  className="w-10 h-10 rounded-full border flex flex-col items-center justify-center font-mono relative z-10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)]"
                  style={{
                    backgroundColor: isActive ? "#070b16" : "#020409",
                    borderColor: isActive ? agent.color : "#1e293b",
                    boxShadow: isActive ? `0 0 14px ${agent.color}44` : "none",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <span
                    className="text-[9px] font-bold block"
                    style={{ color: isActive ? agent.color : "#475569" }}
                  >
                    {agent.shortName}
                  </span>
                </div>

                {/* Agent role badge */}
                <div
                  className={`mt-1.5 px-1.5 py-0.5 rounded text-[8px] tracking-wide border font-sans whitespace-nowrap transition-all duration-305 ${
                    isActive
                      ? "bg-slate-900 text-white border-cyan-400/30 font-semibold"
                      : "bg-slate-950/80 text-slate-500 border-slate-900"
                  }`}
                >
                  {agent.role}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
