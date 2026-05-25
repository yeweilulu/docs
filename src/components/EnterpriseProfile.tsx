import React from "react";

interface ProfileData {
  companyName: string;
  industry: string;
  size: string;
  revenue: string;
  challenges: string;
  goal: string;
}

interface EnterpriseProfileProps {
  data: ProfileData;
  onChange: (key: keyof ProfileData, value: string) => void;
  hasContext: boolean;
  onInject: () => void;
}

export default function EnterpriseProfile({
  data,
  onChange,
  hasContext,
  onInject,
}: EnterpriseProfileProps) {
  return (
    <div
      id="input-container-card"
      className={`bg-[#0d131f] border border-slate-800 rounded-xl p-4 flex flex-col flex-1 shadow-inner h-full overflow-y-auto transition-all duration-500 ${
        hasContext ? "border-cyan-500/30 bg-[#0a0f18]/95 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]" : ""
      }`}
    >
      {/* Box Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-3.5 bg-cyan-500 rounded-sm shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            企业咨询画像接入
          </h2>
        </div>
        <span
          className={`text-[9px] px-2 py-0.5 rounded font-mono font-semibold select-none border transition-all ${
            hasContext
              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse"
              : "bg-slate-800 text-slate-500 border-slate-700/50"
          }`}
        >
          {hasContext ? "ACTIVE" : "PENDING"}
        </span>
      </div>

      {/* Corporate profile questions */}
      <div className="space-y-3.5 flex-grow text-xs select-none">
        <div>
          <label className="text-[10px] text-cyan-400 block mb-1 font-mono uppercase font-bold tracking-wider">
            Company Name / 企业名称
          </label>
          <input
            type="text"
            value={data.companyName}
            disabled={hasContext}
            onChange={(e) => onChange("companyName", e.target.value)}
            className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded px-3 py-1.5 text-slate-100 outline-none transition-all font-sans font-medium disabled:opacity-75 disabled:text-slate-400 disabled:border-slate-800/80"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-cyan-400 block mb-1 font-mono uppercase font-bold tracking-wider">
              Industry / 领域
            </label>
            <input
              type="text"
              value={data.industry}
              disabled={hasContext}
              onChange={(e) => onChange("industry", e.target.value)}
              className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded px-3 py-1.5 text-slate-100 outline-none transition-all font-sans disabled:opacity-75 disabled:text-slate-400 disabled:border-slate-800/80"
            />
          </div>
          <div>
            <label className="text-[10px] text-cyan-400 block mb-1 font-mono uppercase font-bold tracking-wider">
              Employees / 规模
            </label>
            <input
              type="text"
              value={data.size}
              disabled={hasContext}
              onChange={(e) => onChange("size", e.target.value)}
              className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded px-3 py-1.5 text-slate-100 outline-none transition-all font-sans disabled:opacity-75 disabled:text-slate-400 disabled:border-slate-800/80"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-cyan-400 block mb-1 font-mono uppercase font-bold tracking-wider">
            Annual Revenue / 年营收
          </label>
          <input
            type="text"
            value={data.revenue}
            disabled={hasContext}
            onChange={(e) => onChange("revenue", e.target.value)}
            className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded px-3 py-1.5 text-slate-100 outline-none transition-all font-mono disabled:opacity-75 disabled:text-slate-400 disabled:border-slate-800/80"
          />
        </div>

        <div>
          <label className="text-[10px] text-cyan-400 block mb-1 font-mono uppercase font-bold tracking-wider">
            Current Challenges / 业务挑战
          </label>
          <textarea
            rows={3}
            value={data.challenges}
            disabled={hasContext}
            onChange={(e) => onChange("challenges", e.target.value)}
            className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded px-3 py-1.5 text-slate-100 outline-none transition-all font-sans font-medium leading-relaxed resize-none disabled:opacity-75 disabled:text-slate-400 disabled:border-slate-800/80"
          />
        </div>

        <div>
          <label className="text-[10px] text-cyan-400 block mb-1 font-mono uppercase font-bold tracking-wider">
            Consulting Goal / 咨询目标
          </label>
          <textarea
            rows={3}
            value={data.goal}
            disabled={hasContext}
            onChange={(e) => onChange("goal", e.target.value)}
            className="w-full bg-[#05080c] border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded px-3 py-1.5 text-slate-100 outline-none transition-all font-sans font-medium leading-relaxed resize-none disabled:opacity-75 disabled:text-slate-400 disabled:border-slate-800/80"
          />
        </div>
      </div>
    </div>
  );
}
