import React, { useState, useEffect, useRef } from "react";
import { REPORT_CONTENT } from "../types";

interface ReportViewerProps {
  isReportActive: boolean;
  onSealComplete: () => void;
}

export default function ReportViewer({ isReportActive, onSealComplete }: ReportViewerProps) {
  const [typedHTML, setTypedHTML] = useState<string>("");
  const [percentStatus, setPercentStatus] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onSealCompleteRef = useRef(onSealComplete);

  useEffect(() => {
    onSealCompleteRef.current = onSealComplete;
  }, [onSealComplete]);

  useEffect(() => {
    if (!isReportActive) {
      setTypedHTML("");
      setPercentStatus(0);
      setIsTypingComplete(false);
      return;
    }

    let charIdx = 0;
    const totalLen = REPORT_CONTENT.length;
    let currentStr = "";

    // Reset status percent counter
    const percentInterval = setInterval(() => {
      setPercentStatus((prev) => {
        if (prev >= 100) {
          clearInterval(percentInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 28);

    function typeNextChar() {
      if (charIdx < totalLen) {
        // Run up to 4 times per tick to increase typing speed and responsiveness
        for (let i = 0; i < 4; i++) {
          if (charIdx >= totalLen) break;
          // Tag skip parsing
          if (REPORT_CONTENT[charIdx] === "<") {
            const endTagIdx = REPORT_CONTENT.indexOf(">", charIdx);
            if (endTagIdx !== -1) {
              currentStr += REPORT_CONTENT.slice(charIdx, endTagIdx + 1);
              charIdx = endTagIdx + 1;
            } else {
              currentStr += REPORT_CONTENT[charIdx];
              charIdx++;
            }
          } else {
            currentStr += REPORT_CONTENT[charIdx];
            charIdx++;
          }
        }

        setTypedHTML(currentStr);
        scrollRef.current?.scrollIntoView({ behavior: "auto" });

        // Speed adjustment
        timerRef.current = setTimeout(typeNextChar, 10);
      } else {
        setIsTypingComplete(true);
        clearInterval(percentInterval);
        setPercentStatus(100);
        onSealCompleteRef.current();
      }
    }

    typeNextChar();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearInterval(percentInterval);
    };
  }, [isReportActive]);

  return (
    <div className="bg-[#0d131f] border border-slate-800 rounded-xl p-4 h-full flex flex-col overflow-hidden relative select-none">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-3 bg-emerald-500 rounded-sm"></span>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
            董事会就绪研究报告视图
          </span>
        </div>
        <span className="text-[9px] font-mono border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 bg-emerald-500/5 select-none font-semibold">
          {percentStatus}% DEPLOYED
        </span>
      </div>

      {/* Corporate report render layer */}
      <div className="flex-grow overflow-y-auto px-4 py-3 rounded-lg bg-[#040812]/80 border border-slate-900/60 relative scrollbar-thin">
        {!isReportActive ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs">
            <svg
              className="w-10 h-10 stroke-current text-slate-700 mb-3 animate-pulse"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className="leading-relaxed">
              等待工作流进入 06 阶段
              <br />
              此处将动态流式拼装董事会级研究报告。
            </span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-300 leading-relaxed font-sans select-text pb-4">
            {/* Direct HTML render of the typed strategy brief */}
            <div dangerouslySetInnerHTML={{ __html: typedHTML }} />

            {/* Seal overlay with modern pop design */}
            {isTypingComplete && (
              <div className="text-center mt-6 z-10 relative animate-[scaleIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
                <div className="inline-block border-2 border-dashed border-cyan-400 px-6 py-2 bg-cyan-950/20 rounded font-mono text-[11px] font-bold text-cyan-400 tracking-widest uppercase rotate-[-2deg] shadow-[0_0_15px_rgba(30,180,210,0.2)]">
                  BOARD-READY REPORT GENERATED
                  <br />
                  <span className="text-[8px] opacity-60 tracking-wider">
                    ASTRACONSULT COGNITIVE ENGINE
                  </span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        )}
      </div>
    </div>
  );
}
