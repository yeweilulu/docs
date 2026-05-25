export interface LogEntry {
  timestamp: string;
  type: "success" | "warn" | "active" | "agent" | "info";
  message: string;
}

export interface Task {
  id: string;
  title: string;
  desc: string;
  result: string;
}

export interface Stage {
  title: string;
  indicator: string;
  confidence: number;
  agentIds: string[];
  tasks: Task[];
}

export interface Agent {
  id: string;
  name: string;
  shortName: string;
  color: string;
  x: number; // percentage coordinate inside network container
  y: number; // percentage coordinate inside network container
  role: string;
}

export const AGENT_LOOKUP: Record<string, Agent> = {
  planner: { id: "planner", name: "Planner (大脑工作规划)", shortName: "PLN", color: "#ffb700", x: 45, y: 43, role: "Planner (规划)" },
  strategy: { id: "strategy", name: "Strategy (商业战略专家)", shortName: "STR", color: "#00f2ff", x: 15, y: 18, role: "Strategy (战略)" },
  finance: { id: "finance", name: "Finance (财务估值精算)", shortName: "FIN", color: "#10b981", x: 15, y: 68, role: "Finance (财务)" },
  operations: { id: "operations", name: "Operations (精益品质质检)", shortName: "OPS", color: "#6366f1", x: 75, y: 18, role: "Operations (运营)" },
  risk: { id: "risk", name: "Risk (合规抗扰防线)", shortName: "RSK", color: "#ef4444", x: 75, y: 68, role: "Risk (风控)" },
  retrieval: { id: "retrieval", name: "Retrieval (智慧案例检索)", shortName: "KB", color: "#0ea5e9", x: 45, y: 10, role: "Knowledge (检索)" },
  writing: { id: "writing", name: "Writing (董事会级文书)", shortName: "WRT", color: "#14b8a6", x: 45, y: 76, role: "Writing (文案)" },
  review: { id: "review", name: "Review (逻辑对抗终审)", shortName: "RVW", color: "#f43f5e", x: 8, y: 43, role: "Review (合规审)" },
  synthesizer: { id: "synthesizer", name: "Synthesizer (全局融汇合成)", shortName: "SYN", color: "#8b5cf6", x: 82, y: 43, role: "Synthesizer (合成)" }
};

export const STAGES_DATA: Stage[] = [
  {
    title: "01 数据准入 (Context Intake)",
    indicator: "建立咨询上下文",
    confidence: 97.4,
    agentIds: ["planner", "strategy"],
    tasks: [
      { id: "1-1", title: "解析企业基本画像 profile", desc: "辨识先进制造行业，梳理860名雇员体量，接入年营收1.28亿美元商业模型...", result: "行业对齐：Advanced Manufacturing 成功绑定，专家路由生成完毕。" },
      { id: "1-2", title: "清洗并提取多源业务痛点", desc: "扫描业务瓶颈，分析碎片化数据系统、人工品质检测阻碍、汇报与预测速率慢...", result: "提取 4 个核心业务负向因子，定性为重度质量智检及协同决策阻塞。" },
      { id: "1-3", title: "确立咨询与转型主轴方向", desc: "映射高管咨询愿景：全流程降低业务成本、部署缺陷品质智检、极速战略中枢看板...", result: "输出：降本(Cost Reduc)、品质核鉴(Quality Intel)、决策跃升(Speed Cockpit)。" },
      { id: "1-4", title: "构建自适应咨询语义向量库", desc: "生成三维语义密集关联空间，锚定业务语境，装载制造业标准案例知识库...", result: "上下文构建就绪 (Confidence = 97.4%)，准备进行分解性拓扑研究。" }
    ]
  },
  {
    title: "02 任务拆解 (Decomposition)",
    indicator: "Planner多链路规划",
    confidence: 98.1,
    agentIds: ["planner", "strategy", "finance", "operations"],
    tasks: [
      { id: "2-1", title: "咨询框架全解拆分", desc: "通过 Planner Agent 将战略重任拆解为：场景可行性层、精益精算层、风控合规层...", result: "生成 3 大咨询研究子方向，确立 15 个具体业务量化点。" },
      { id: "2-2", title: "装载专项领域专家智能体", desc: "调配 Strategy (战略)、Finance (财务)、Operations (运营)、Risk (风险) 组成专家团...", result: "4 维专家节点链路挂载，主通道信息吞吐率扩容 240%。" },
      { id: "2-3", title: "生成6条业务执行轨道路线", desc: "初始化平行的分析数据管线，自动分配任务优先级，定义底图输出逻辑模板...", result: "6 条分析跑道及报告元大纲初始化成功，执行资源分配完毕。" }
    ]
  },
  {
    title: "03 专家研判 (Agent Analysis)",
    indicator: "9单元专业智能集群",
    confidence: 98.6,
    agentIds: ["strategy", "finance", "operations", "risk"],
    tasks: [
      { id: "3-1", title: "Strategy 智能体评估业务突破口", desc: "分析 NovaTech 现场管线特征，对齐数字化重构优先级评分...", result: "核心突破口确定：首批部署视觉缺陷自动智检装置 + 集团实时决策大屏。" },
      { id: "3-2", title: "Finance 智能体测算资本潜在留存", desc: "对资产流失点建模，测算人工工时、漏检废次、高管延决策价值池...", result: "預估年化综合释放价值：$8.6M 至 $18.4M，投资回报率 ROI = 312%。" },
      { id: "3-3", title: "Operations 智能体剖解生产质检壁垒", desc: "推导质检测算模型，覆盖制造表面擦撕划、缺料件判定速度瓶颈...", result: "智检覆盖率预计提升至 99.8%，整体产品研制质检交付时效提速 72%。" },
      { id: "3-4", title: "Risk 智能体界定安全规则防线", desc: "评估工业大数据外泄防卫，映射本地算力部署、数据多层防护隔离以及模型演练对白...", result: "设计边缘多活物理加密与定期对抗防御机制，消除合规风险。" }
    ]
  },
  {
    title: "04 知识检索 (Knowledge Retrieval)",
    indicator: "AstraKnowledge联脑检索",
    confidence: 99.2,
    agentIds: ["retrieval", "strategy", "operations"],
    tasks: [
      { id: "4-1", title: "精准多路检索全球顶尖制造案例", desc: "在工业物联知识底库中泛寻同等员工、同等营收的高端装备AI缺陷案例...", result: "检索命中 38 条相似案例片段，自动提纯可借鉴实施策略。" },
      { id: "4-2", title: "锚定行业同等体量转型ROI基准", desc: "对比 12 家上市高端制造业 3 年内智检系统部署带来的财务轨迹与资产走势...", result: "提取成熟转型曲线与回报模型因子，校正财务精算精细配重。" },
      { id: "4-3", title: "提取多维合规技术监管规程", desc: "载入工信部工业数据安全共性标准 (ISA) 与国际模型抗噪声防卫范式...", result: "锁定防守设计要求，防止任何技术层面的隐私漏洞和商业幻觉发散。" }
    ]
  },
  {
    title: "05 报告合成 (Report Synthesis)",
    indicator: "多智能组文案拼装",
    confidence: 99.5,
    agentIds: ["writing", "review", "synthesizer"],
    tasks: [
      { id: "5-1", title: "编写总裁高管执行概要 (Executives)", desc: "梳理“痛点-路径-价值-风控”的起承转合结构，力保商业高度与技术洞察一体化...", result: "高管版 executive-ready 论述成稿，文风沉稳，逻辑精炼。" },
      { id: "5-2", title: "敏捷精益转型90天实施战役设计", desc: "规划1-30天缺陷智检装置及大屏原型，31-60天多系统融汇及模型调优，61-90天全面并网运营...", result: "输出高可行性敏捷迭代时间线，杜绝传统12个月冗长落地期。" },
      { id: "5-3", title: "合规 Review 深度风暴校验", desc: "智能审理合规智能群，深度校验全要素估算，避免文字幻觉以及数值逻辑割裂...", result: "交叉对抗验证 4 轮，无逻辑逻辑漏洞，报告一致性：100% 确认。" }
    ]
  },
  {
    title: "06 决策报告 (Final Report)",
    indicator: "报告装箱汇报发布",
    confidence: 99.8,
    agentIds: ["writing", "synthesizer", "review"],
    tasks: [
      { id: "6-1", title: "渲染多维度核心转化指标与财务预期", desc: "将多 Agent 离散模型算力转化合并，绘制董事会级数据透视面...", result: "输出核心价值矩阵：年省质检验工工时超2万小时，降本18.5%。" },
      { id: "6-2", title: "拼装董事会就绪级深度战略方案", desc: "将战略图谱、90天落地推导战役、合规管理机制融合，完成最终黑金奢华格式压膜...", result: "咨询成果精细化美化完毕，格式自适应董事会演示标准。" },
      { id: "6-3", title: "战略研究方案生成归位", desc: "打打包并装载，输出至汇报仪，全流水线最终完美校准...", result: "系统全链运行成功：AstraConsult 生成决策方案正式生成！" }
    ]
  }
];

export const MOCK_KNOWLEDGE_BASE = [
  { tag: "BENCHMARK", title: "中国先进制造工业大脑 ROI 回报率数据模型" },
  { tag: "CASE STUDY", title: "某800人规模重工业表面视觉质检智替换案例 (年省 $4.2M)" },
  { tag: "GOVERNANCE", title: "安全模型防线：端侧多云数据降噪脱敏与抗噪声重组要求" },
  { tag: "STRATEGY", title: "敏捷90天转型：传统车间单点智检试点阶段精益指南" },
  { tag: "BENCHMARK", title: "工业互联网 2.0：秒级驾驶舱高管跨部门协同基建范式" },
  { tag: "CASE STUDY", title: "NovaTech 同体量生产调度柔性建模与预测质保模型" },
  { tag: "REGULATION", title: "工信部《工业智能数据融合安全合规性白皮书》" },
  { tag: "STRATEGY", title: "从 ERP 到大模型：多系统 API 极速并网合伙白皮书 V4" }
];

export const REPORT_CONTENT = `
<h2>ASTRA_CONSULT INTEL_REPORT</h2>
<hr class="border-cyan-500/20 my-3">

<div class="bg-cyan-500/10 border-l-4 border-cyan-400 p-3 rounded-r mb-4">
  <div class="text-xs font-bold text-cyan-400 font-mono tracking-wider">BOARD-READY EXECUTIVE BRIEFING</div>
  <div class="text-[11px] text-slate-300 mt-1">本报告基于 <b>NovaTech Group</b> 1.28亿美元营收画像，经 AstraConsult 9大专家智能体多维模型交互及 38 例工业知识精算检索而得。</div>
</div>

<h3 class="text-amber-400 text-xs font-bold mb-2">一、 核心决策概要 (Executive Summary)</h3>
<p class="mb-3 text-slate-300 text-[11px] leading-relaxed">NovaTech 当前的核心阻碍在于数据孤岛导致决策迟滞、品质检测高度依赖人工，整体抗风险波动能力低。AstraConsult 建议：<b>立足AI模型，建立以“缺陷视觉处理 + 总裁室实时驾驶舱”为先导的双轴转型策略。</b></p>

<h3 class="text-amber-400 text-xs font-bold mb-2">二、 关键战略性行动 (Strategic Initiatives)</h3>
<ul class="list-disc pl-4 mb-3 space-y-1 text-slate-300 text-[11px] leading-relaxed">
  <li><b>行动一：端侧自适应视觉表面划痕/破缩智检系统。</b> 将缺陷漏检率降低至 0.02% 以下，人工工时释放 72%，降本显性。</li>
  <li><b>行动二：全链路敏捷多源系统并网，打造“秒级战略中枢看板”。</b> 让复杂高管报表分析从 48 小时极速压缩至 3.5 秒。</li>
  <li><b>行动三：多维时空需求滚动，预测精度提升 18.5%。</b> 降低厂货压重，大幅增进供应链健康度。</li>
</ul>

<h3 class="text-amber-400 text-xs font-bold mb-2">三、 90天敏捷落地路径 (90-Day Tactical Roadmap)</h3>
<p class="mb-2 text-slate-300 text-[11px]">舍弃冗长实施，采取分阶迭代方式：</p>
<table class="w-full text-[10px] border-collapse mb-3 bg-white/5 rounded overflow-hidden">
  <thead>
    <tr class="border-b border-cyan-500/20 bg-[#0d131f]">
      <th class="text-left p-2 text-cyan-400 font-bold">第一战役(1-30天)</th>
      <th class="text-left p-2 text-cyan-400 font-bold">第二战役(31-60天)</th>
      <th class="text-left p-2 text-cyan-400 font-bold">第三战役(61-90天)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-2 border-b border-white/5 text-slate-300">质检单点试点<br>精益财务数据切片</td>
      <td class="p-2 border-b border-white/5 text-slate-300">车间多系统并网<br>决策看板交互初构</td>
      <td class="p-2 border-b border-white/5 text-slate-300">模型鲁棒微调上线<br>全面切换自运行</td>
    </tr>
  </tbody>
</table>

<h3 class="text-amber-400 text-xs font-bold mb-2">四、 安全机制与模型风险防线 (Risk Controls)</h3>
<p class="mb-3 text-slate-300 text-[11px] leading-relaxed">构建数据合规性硬阻壁垒。数据绝不出厂，采用私有端侧模型进行局部降噪声对抗重组；并在边缘设置定时自动化合规抗扰审查机制，防止任何敏感数据幻觉漂移。</p>

<h3 class="text-amber-400 text-xs font-bold mb-2">五、 资本效能测算 (Business Impact / ROI)</h3>
<p class="mb-3 text-slate-300 text-[11px] leading-relaxed">经 <b>Finance Agent</b> 估算，本次落地方案所需总资本投入极具克制，预计在投运后第12个月全面越过盈亏中性线，<b>3年期综合价值增量表现为 $14.12M 现金等价，投资回报率高达 312%。</b></p>
`;
