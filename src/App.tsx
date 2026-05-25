import React, { useState, useEffect, useRef, useMemo } from "react";
import { Stage, Task, STAGES_DATA, AGENT_LOOKUP, MOCK_KNOWLEDGE_BASE, LogEntry } from "./types";
import BackgroundParticles from "./components/BackgroundParticles";
import AgentNetwork from "./components/AgentNetwork";
import TerminalLog from "./components/TerminalLog";
import EnterpriseProfile from "./components/EnterpriseProfile";
import ReportViewer from "./components/ReportViewer";

export default function App() {
  // --- Corporate Ingestion States ---
  const [profileData, setProfileData] = useState({
    companyName: "NovaTech Manufacturing Group",
    industry: "Advanced Manufacturing",
    size: "860 employees",
    revenue: "$128M",
    challenges: "Fragmented data systems, manual quality inspection, slow executive reporting, low forecast accuracy",
    goal: "Generate an AI transformation strategy report focused on cost reduction, quality intelligence, and executive decision speed."
  });
  const [hasContext, setHasContext] = useState<boolean>(false);

  // --- Core Simulation Stage Machine States ---
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(-1);
  const [isStageRunning, setIsStageRunning] = useState<boolean>(false);
  const [isWorkflowComplete, setIsWorkflowComplete] = useState<boolean>(false);

  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [currentSubTaskProgress, setCurrentSubTaskProgress] = useState<number>(0);

  // --- Interactive Dashboard Statistics ---
  const [tokensCount, setTokensCount] = useState<number>(0);
  const [confidenceScore, setConfidenceScore] = useState<number>(0);
  const [activeAgentsCount, setActiveAgentsCount] = useState<string>("0 / 9");
  const [knowledgeClipsCount, setKnowledgeClipsCount] = useState<number>(0);
  const [systemTimecode, setSystemTimecode] = useState<string>("00:00:00.000");

  // --- Component Dynamic Buffers ---
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: "06:52:09", type: "info", message: "SYSTEM INITIALIZED. STANDBY IN PASSIVE MONITORING..." },
    { timestamp: "06:52:10", type: "info", message: "ASTRACONSULT ENGINE ON: WAITING FOR CORPORATE PICTURES..." }
  ]);
  const [terminalSpeed, setTerminalSpeed] = useState<string>("IDLE (0bps)");
  const [knowledgeFragments, setKnowledgeFragments] = useState<Array<{ tag: string; title: string; id: number }>>([]);
  
  // Ref pointers for real-time timing execution
  const startTimeRef = useRef<number>(Date.now());
  const scrollRef = useRef<HTMLDivElement>(null);
  const kbIndexRef = useRef<number>(0);

  // --- Real-Time UTC Timecode Generator ---
  useEffect(() => {
    startTimeRef.current = Date.now();
    const timer = setInterval(() => {
      const now = new Date(Date.now() - startTimeRef.current);
      const hrs = String(now.getUTCHours()).padStart(2, "0");
      const mins = String(now.getUTCMinutes()).padStart(2, "0");
      const secs = String(now.getUTCSeconds()).padStart(2, "0");
      const ms = String(now.getUTCMilliseconds()).padStart(3, "0");
      setSystemTimecode(`${hrs}:${mins}:${secs}.${ms}`);
    }, 45);

    return () => clearInterval(timer);
  }, []);

  // Helper log emitter
  const appendLog = (msg: string, type: LogEntry["type"]) => {
    const timeStr = new Date().toISOString().slice(11, 19);
    setLogs((prev) => [...prev, { timestamp: timeStr, type, message: msg }]);
  };

  // --- Action: Corporate Context Ingestion ---
  const handleInjectContext = () => {
    if (isStageRunning || hasContext) return;
    setHasContext(true);

    appendLog("--- ENTERPRISE CONTEXT INTENDED ---", "warn");
    appendLog(`画像接入: ${profileData.companyName} | 行业: ${profileData.industry} | 规模/营收: ${profileData.size} / ${profileData.revenue}`, "info");
    appendLog("自适应会话链路握手成功。分析引擎加载完毕，准备激活工作流流程...", "success");

    setTokensCount(104);
    setConfidenceScore(97.4);
    setActiveAgentsCount("1 / 9");
    setTerminalSpeed("ACTIVE (450bps)");

    // Smooth scroll dynamic list
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // --- Action: Process Next Campaign Stage ---
  const handleNextStage = () => {
    if (isStageRunning || !hasContext) return;

    const nextIdx = currentStageIndex + 1;
    if (nextIdx >= STAGES_DATA.length) return;

    setCurrentStageIndex(nextIdx);
    setCurrentTaskIndex(0);
    setIsStageRunning(true);
    setCurrentSubTaskProgress(0);
    setTerminalSpeed("COMPUTING (12Kbps)");

    const stage = STAGES_DATA[nextIdx];
    appendLog(`>>> 启动重大战役 0${nextIdx + 1}: ${stage.title} <<<`, "active");
    setActiveAgentsCount(`${stage.agentIds.length} / 9`);
    setConfidenceScore(stage.confidence);
  };

  // --- Real-time Loop task sequencer ---
  useEffect(() => {
    if (!isStageRunning || currentStageIndex === -1 || currentTaskIndex === -1) return;

    const stage = STAGES_DATA[currentStageIndex];
    if (currentTaskIndex >= stage.tasks.length) {
      // Stage completion
      setIsStageRunning(false);
      setTerminalSpeed("STANDBY (0bps)");
      appendLog(`=== 战役轮 0${currentStageIndex + 1} 完美并排完成 (ALL WORK COMPLETED) ===`, "success");

      if (currentStageIndex === STAGES_DATA.length - 1) {
        setIsWorkflowComplete(true);
        appendLog("--- 全局多级智能体战术网络封账收尾 | BOARD-READY REPORT DEPLOYED ---", "warn");
      }
      return;
    }

    const task = stage.tasks[currentTaskIndex];
    
    // First print log when task registers
    if (currentSubTaskProgress === 0) {
      appendLog(`调配专家处理中: ${task.title}`, "agent");
    }

    // Dynamic incremental timer represents micro calculations progress
    const msStep = Math.random() * 50 + 35;
    const progressTimer = setTimeout(() => {
      setCurrentSubTaskProgress((prev) => {
        const delta = Math.random() * 12 + 8;
        const nextProgress = prev + delta;
        if (nextProgress >= 100) {
          // Task completes
          appendLog(`解析输出反馈: ${task.result}`, "success");
          setCompletedTaskIds((prevCompleted) => [...prevCompleted, task.id]);
          
          setTokensCount((prev) => prev + Math.floor(Math.random() * 140) + 100);
          setConfidenceScore((prev) => {
            const calculatedConfidence = stage.confidence + (Math.random() * 0.15 - 0.05);
            return parseFloat(Math.min(calculatedConfidence, 99.8).toFixed(1));
          });

          // stage retrieval logic creates and displays knowledge blocks
          if (currentStageIndex === 3) {
            setKnowledgeClipsCount((prev) => prev + 1);
            const kbItem = MOCK_KNOWLEDGE_BASE[kbIndexRef.current % MOCK_KNOWLEDGE_BASE.length];
            setKnowledgeFragments((prev) => [
              { ...kbItem, id: Date.now() * 1000 + kbIndexRef.current },
              ...prev.slice(0, 4)
            ]);
            kbIndexRef.current++;
          }

          setCurrentTaskIndex((prev) => prev + 1);
          return 0; // reset for next sequence
        }
        return nextProgress;
      });
    }, msStep);

    return () => clearTimeout(progressTimer);
  }, [isStageRunning, currentStageIndex, currentTaskIndex, currentSubTaskProgress]);

  // --- Action: Full Console Systems Reset ---
  const handleResetDemo = () => {
    setHasContext(false);
    setCurrentStageIndex(-1);
    setCurrentTaskIndex(-1);
    setIsStageRunning(false);
    setIsWorkflowComplete(false);
    setCompletedTaskIds([]);
    setCurrentSubTaskProgress(0);
    setTokensCount(0);
    setConfidenceScore(0);
    setActiveAgentsCount("0 / 9");
    setKnowledgeClipsCount(0);
    setKnowledgeFragments([]);
    setTerminalSpeed("IDLE (0bps)");
    kbIndexRef.current = 0;
    setLogs([
      { timestamp: new Date().toISOString().slice(11, 19), type: "info", message: "[SYSTEM] CONSOLE CONTROLS RESET. BACK TO INITIAL IDLE STATUS." }
    ]);
  };

  // --- Computations: Active Stage Active lists ---
  const activeAgentIds = useMemo(() => {
    if (!hasContext) return [];
    if (currentStageIndex === -1) return ["planner"];
    
    // Extract agents belonging to active stage
    return STAGES_DATA[currentStageIndex]?.agentIds || [];
  }, [hasContext, currentStageIndex]);

  // Helper calculates current percentage progress of active stage
  const activeStagePercent = useMemo(() => {
    if (currentStageIndex === -1) return 0;
    const stage = STAGES_DATA[currentStageIndex];
    if (!isStageRunning && currentTaskIndex >= stage.tasks.length) return 100;
    
    const taskRatio = currentTaskIndex / stage.tasks.length;
    const subTaskRatio = (currentSubTaskProgress / 100) / stage.tasks.length;
    return Math.min(Math.round((taskRatio + subTaskRatio) * 100), 100);
  }, [currentStageIndex, currentTaskIndex, currentSubTaskProgress, isStageRunning]);

  return (
    <div className="relative min-h-screen bg-[#05080c] text-slate-200 select-none overflow-x-hidden font-sans flex flex-col justify-between p-4 xl:p-6 max-w-[1920px] mx-auto h-screen">
      {/* Generative Interactive Dot Grid & Particles Overlay */}
      <BackgroundParticles />
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      </div>

      {/* ======================= HEADER PROFILE STATUS BAR ======================= */}
      <header className="h-16 shrink-0 border border-slate-800/80 bg-[#0a0f18]/85 backdrop-blur-xl flex items-center justify-between px-6 rounded-xl z-20 shadow-[0_4px_24px_rgba(0,0,0,0.5)] mb-3">
        <div className="flex items-center gap-4 select-none">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <div className="w-4 h-4 border-2 border-white/80 rotate-45"></div>
          </div>
          <div>
            <h1 className="text-sm md:text-[15px] font-bold tracking-tight text-white flex items-center gap-2">
              <span>AstraConsult</span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/25 px-1.5 py-0.5 rounded uppercase font-semibold">
                AGENTIC CONFLICT SYSTEM
              </span>
            </h1>
            <p className="text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">
              Workflow Engine v4.2.0-Live
            </p>
          </div>
        </div>

        {/* System telemetry stats */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[10px] text-slate-400 select-none">
          <div className="text-right">
            <span className="text-slate-500 block text-[8px] uppercase tracking-wider">SYSTEM STATUS</span>
            <span className={`font-bold uppercase ${isStageRunning ? "text-cyan-400 animate-pulse" : "text-emerald-400"}`}>
              {hasContext ? (isStageRunning ? "Executing/研判中" : "Standby/待命中") : "STANDBY/等待注入"}
            </span>
          </div>
          
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="text-right">
            <span className="text-slate-500 block text-[8px] uppercase tracking-wider">GEN TOKENS</span>
            <span className="font-bold text-white tracking-wide">{tokensCount.toLocaleString()}</span>
          </div>

          <div className="h-6 w-px bg-slate-800"></div>
          <div className="text-right">
            <span className="text-slate-500 block text-[8px] uppercase tracking-wider">ACTIVE AGENTS</span>
            <span className="font-bold text-purple-400 tracking-wide">{activeAgentsCount}</span>
          </div>

          <div className="h-6 w-px bg-slate-800"></div>
          <div className="text-right">
            <span className="text-slate-500 block text-[8px] uppercase tracking-wider">SYSTEM CONFIDENCE</span>
            <span className="font-bold text-emerald-400 tracking-wide">
              {confidenceScore > 0 ? `${confidenceScore}%` : "-- %"}
            </span>
          </div>

          <div className="h-6 w-px bg-slate-800"></div>
          <div className="text-right">
            <span className="text-slate-500 block text-[8px] uppercase tracking-wider">SYSTEM CLOCK</span>
            <span className="font-bold text-slate-300 tracking-wider font-mono">{systemTimecode}</span>
          </div>
        </div>
      </header>

      {/* ======================= DETAILED INTERACTIVE INTERFACE GRID ======================= */}
      <main className="flex-1 grid grid-cols-12 gap-4 z-20 overflow-hidden min-h-0">
        
        {/* LEFT COLUMN PANEL: Enterprise Input Box + Knowledge Fragment Tracker */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden h-full min-h-0">
          
          {/* Corporate Form */}
          <div className="flex-[3] min-h-0 h-full overflow-hidden">
            <EnterpriseProfile
              data={profileData}
              onChange={(key, val) => setProfileData((prev) => ({ ...prev, [key]: val }))}
              hasContext={hasContext}
              onInject={handleInjectContext}
            />
          </div>

          {/* Intelligent Knowledge Retrieval Logs */}
          <div className="bg-[#0d131f] border border-slate-800 rounded-xl p-4 flex-[2] flex flex-col overflow-hidden relative min-h-0">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5 z-10 shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-3 bg-amber-500 rounded-sm shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  智慧战略知识库检索
                </h2>
              </div>
              <span className={`text-[8px] font-mono border px-2 py-0.5 rounded ${
                currentStageIndex === 3 && isStageRunning
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse"
                  : "bg-slate-800 text-slate-500 border-slate-700/50"
              }`}>
                {currentStageIndex === 3 && isStageRunning ? "RETRIEVING" : "IDLE"}
              </span>
            </div>

            {/* Scrolling list for retrieved files */}
            <div className="flex-grow overflow-y-auto space-y-2 pr-1 text-[11px] font-mono scrollbar-thin">
              {knowledgeFragments.length === 0 ? (
                <div className="text-slate-500/80 text-center py-8 select-none leading-relaxed text-[10px]">
                  等待知识节点唤起...
                </div>
              ) : (
                knowledgeFragments.map((frag) => (
                  <div
                    key={frag.id}
                    className="p-2 rounded bg-black/40 border border-slate-800/50 flex gap-2 items-start transition-all animate-[fadeIn_0.3s_ease_forwards]"
                  >
                    <span className="text-[8px] bg-slate-800 text-cyan-400 border border-cyan-400/20 px-1 py-0.5 rounded tracking-wide capitalize shrink-0 font-bold">
                      {frag.tag}
                    </span>
                    <span className="text-[10px] text-slate-300 leading-tight block">
                      {frag.title}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN PANEL: Campaign workflow status indicators + Task execution container */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-4 overflow-hidden h-full min-h-0">
          
          {/* Workflow nodes indicator maps */}
          <div className="bg-[#0d131f] border border-slate-800 rounded-xl p-4 flex flex-col justify-between shrink-0 h-[105px] relative">
            <div className="flex items-center justify-between border-b border-slate-800/65 pb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                AstraConsult 业务咨询工作流流程 Status
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">
                {currentStageIndex === -1 ? "等待激活" : `Stage 0${currentStageIndex + 1} ACTIVE`}
              </span>
            </div>

            {/* Progress lines tracks & step numbers */}
            <div className="relative flex justify-between items-center px-4 md:px-6 py-1 select-none z-10 mt-1">
              {/* Dynamic visual path vector linking dots */}
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[2px] bg-slate-800 z-0">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_#22d3ee] transition-all duration-500"
                  style={{
                    width: `${Math.max(0, currentStageIndex) * 20}%`
                  }}
                ></div>
              </div>

              {STAGES_DATA.map((stg, sIdx) => {
                const isPassed = sIdx < currentStageIndex;
                const isActive = sIdx === currentStageIndex;
                
                let dotStyle = "border-slate-705 bg-[#0a0f18] text-slate-500";
                let labelStyle = "text-slate-500 font-medium";

                if (isPassed) {
                  dotStyle = "border-emerald-500 bg-emerald-950/70 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
                  labelStyle = "text-emerald-400 font-semibold";
                } else if (isActive) {
                  dotStyle = "border-cyan-400 bg-[#0d131f] text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)] scale-110 animate-pulse";
                  labelStyle = "text-cyan-400 font-bold";
                }

                return (
                  <div key={sIdx} className="flex flex-col items-center justify-center relative z-10 transition-all duration-300">
                    <div className={`w-7 h-7 rounded-full border text-[11px] font-semibold font-mono flex items-center justify-center transition-all ${dotStyle}`}>
                      {String(sIdx + 1).padStart(2, "0")}
                    </div>
                    <span className={`text-[8.5px] mt-1 whitespace-nowrap transition-all ${labelStyle}`}>
                      {stg.indicator}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Running Sub-Campaign Detailed Log Console */}
          <div className="bg-[#000000]/25 border border-slate-801/50 rounded-xl p-4 flex-1 flex flex-col justify-between overflow-hidden relative min-h-0">
            <div className="flex items-center justify-between border-b border-slate-800/85 pb-2.5 mb-3 shrink-0">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isStageRunning ? "bg-cyan-500 animate-ping" : "bg-slate-700"}`}></span>
                <span className="text-xs font-bold tracking-wider text-slate-300">
                  {currentStageIndex === -1 ? "等待工作流战略指令..." : STAGES_DATA[currentStageIndex].title}
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-500 font-bold">{activeStagePercent}%</span>
            </div>

            {/* Render sub-tasks inside campaign lists */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
              
              {/* Nested cards dynamic lists */}
              <div className="flex-grow overflow-y-auto space-y-3 pr-1 max-h-[80%] pb-2 scrollbar-thin">
                {currentStageIndex === -1 ? (
                  <div className="text-slate-500 text-center py-12 flex flex-col items-center justify-center h-full select-none">
                    <svg
                      className="w-12 h-12 text-slate-80s/70 stroke-current text-slate-800 mb-2 animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                      />
                    </svg>
                    <span className="text-xs tracking-widest font-mono text-slate-500 uppercase">
                      AstraConsult Engine Ready
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1.5 block max-w-xs leading-relaxed">
                      请先于左侧编辑画像并点击 [发送企业上下文] 注入决策中枢。
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {STAGES_DATA[currentStageIndex].tasks.map((task, stIdx) => {
                      const isTaskFinished = completedTaskIds.includes(task.id);
                      const isTaskActive = currentTaskIndex === stIdx && isStageRunning;
                      
                      if (!isTaskFinished && !isTaskActive) return null;

                      let borderClass = isTaskFinished
                        ? "border-emerald-500/30 bg-emerald-950/5"
                        : "border-slate-800 bg-[#0d131f]/20 shadow-[0_0_12px_rgba(34,211,238,0.05)] text-glow-cyan";

                      return (
                        <div
                          key={task.id}
                          className={`p-3 rounded-lg border relative overflow-hidden transition-all duration-300 ${borderClass}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${isTaskFinished ? "bg-emerald-400 animate-none" : "bg-cyan-400 animate-pulse"}`}></span>
                                <span className={`font-bold text-xs ${isTaskFinished ? "text-slate-300" : "text-white"}`}>
                                  {task.title}
                                </span>
                              </div>
                              <p className="text-[10px] leading-relaxed text-slate-400 mt-0.5">
                                {task.desc}
                              </p>

                              {isTaskFinished && (
                                <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 text-[10.5px] text-emerald-400 font-mono tracking-wide">
                                  {task.result}
                                </div>
                              )}
                            </div>

                            <span className={`text-[9px] font-mono border px-2 py-0.5 rounded font-bold ${
                              isTaskFinished
                                ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/30"
                                : "bg-cyan-950/20 text-cyan-400 border-cyan-500/30"
                            }`}>
                              {isTaskFinished ? "COMPLETED" : "RUNNING"}
                            </span>
                          </div>

                          {/* Dynamic Task Level Horizontal Progress Bar */}
                          {isTaskActive && (
                            <div
                              className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-75"
                              style={{ width: `${currentSubTaskProgress}%` }}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Advanced System Console Output logs */}
              <div className="mt-2 shrink-0">
                <TerminalLog logs={logs} speed={terminalSpeed} />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN PANEL: Active networks layout + board briefing report files */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden h-full min-h-0">
          
          {/* Agent connection mapping visual details */}
          <div className="flex-[2] min-h-0 h-full overflow-hidden">
            <AgentNetwork activeAgentIds={activeAgentIds} />
          </div>

          {/* Consultation Board Report view */}
          <div className="flex-[3] min-h-0 h-full overflow-hidden">
            <ReportViewer
              isReportActive={currentStageIndex === STAGES_DATA.length - 1}
              onSealComplete={() => {}}
            />
          </div>
        </aside>

      </main>

      {/* ======================= FOOTER CONTROLLER ACTIONS ======================= */}
      <footer className="h-16 shrink-0 bg-[#0a0f18]/80 border border-slate-800 px-6 flex flex-col md:flex-row items-center justify-between rounded-xl z-20 gap-3 md:gap-0 mt-3 select-none text-xs">
        
        {/* Helper suggestions tips */}
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <span className="font-mono text-slate-500 text-[10px] tracking-wider uppercase font-semibold">
            COMMANDER TIP:
          </span>
          <span className="text-[11px] text-cyan-450 block max-w-md truncate text-cyan-400 font-semibold md:max-w-xl">
            {!hasContext
              ? "画像准备就绪，请先点击“发送企业上下文”注入中枢系统。"
              : isWorkflowComplete
              ? "AstraConsult 全链工作流执行完毕！董事会级决策方案已成功在右下角压膜。"
              : isStageRunning
              ? "专家小组研判计算中，系统处于多通道保护保密模式。"
              : `第0${currentStageIndex + 1}阶段分析成果已归档。点击“接入下一阶段”拓展研究领域。`}
          </span>
        </div>

        {/* Buttons dynamic actions group */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          
          {/* Ingest Enterprise Target Inputs */}
          <button
            onClick={handleInjectContext}
            disabled={hasContext || isStageRunning}
            className={`px-5 py-2 rounded-lg font-bold tracking-wide flex items-center gap-2 transform active:scale-95 transition-all text-[11px] font-sans ${
              hasContext || isStageRunning
                ? "bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            }`}
          >
            <svg
              className="w-4 h-4 text-cyan"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>发送企业上下文</span>
          </button>

          {/* Action: Sequenced Campaign Trigger */}
          <button
            onClick={handleNextStage}
            disabled={!hasContext || isStageRunning || isWorkflowComplete}
            className={`px-5 py-2 rounded-lg font-bold tracking-wide flex items-center gap-2 transform active:scale-95 transition-all text-[11px] font-sans ${
              !hasContext || isStageRunning || isWorkflowComplete
                ? "bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                : "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.4)]"
            }`}
          >
            <span>
              {isWorkflowComplete ? "工作流完美闭环" : "接入下一阶段"}
            </span>
            {!isWorkflowComplete && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </button>

          {/* App reset backup controller */}
          <button
            onClick={handleResetDemo}
            title="重置控制舱"
            className="p-2 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all transform active:scale-90 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 16H23"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
