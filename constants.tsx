import { 
  Moon, 
  Utensils, 
  Brain, 
  Activity, 
  ShieldAlert,
  Clock,
  Smile
} from 'lucide-react';
import { SectionContent, DailyTask } from './types';

export const BASIC_PROTOCOL = [
  { id: 'b1', text: '保持充足的睡眠时长与高质量睡眠', icon: Moon },
  { id: 'b2', text: '绝对不要吸烟', icon: ShieldAlert },
  { id: 'b3', text: '尽可能每天做适量运动', icon: Activity },
  { id: 'b4', text: '严格控制糖分摄入', icon: Utensils },
];

export const DEFAULT_DAILY_TASKS: DailyTask[] = [
  { id: 't1', text: '晨间户外接触阳光 (2-10分钟)', time: '早晨', category: 'sleep', completed: false },
  { id: 't2', text: '延迟咖啡因摄入 (起床90分钟后)', time: '早晨', category: 'sleep', completed: false },
  { id: 't3', text: '深度专注工作 (90分钟周期)', time: '上午', category: 'focus', completed: false },
  { id: 't4', text: 'NSDR / 冥想休息 (10-20分钟)', time: '下午', category: 'focus', completed: false },
  { id: 't5', text: '观看落日', time: '傍晚', category: 'sleep', completed: false },
  { id: 't6', text: '避免电子屏幕强光', time: '22:00后', category: 'sleep', completed: false },
];

export const SECTIONS: SectionContent[] = [
  {
    id: 'sleep',
    title: '睡眠 (Sleep)',
    icon: Moon,
    summary: '睡眠是生理与心理健康的基石。通过调控光照和体温来校准生物钟，是获得高质量睡眠的关键。',
    science: '体内的生物钟受光照（特别是蓝光）和体温影响。晨间皮质醇峰值设定昼夜节律的开始，而晚间褪黑素的分泌则启动睡眠过程。这两者的相位对齐至关重要。',
    chartType: 'sleep',
    actions: [
      { id: 's1', text: '晨间接触阳光', detail: '起床后尽快到户外接触阳光 2-10 分钟。这是校准生物钟的最强信号。', important: true },
      { id: 's2', text: '傍晚观察落日', detail: '有助于缓解晚间人造光对生物钟的负面影响。' },
      { id: 's3', text: '晚间避光', detail: '晚上 11 点至凌晨 4 点尽量避免接触强光，特别是顶部光源和蓝光。' },
      { id: 's4', text: '咖啡因控制', detail: '中午之后尽量减少咖啡因摄入（根据个人代谢情况调整）。' },
      { id: 's5', text: '利用体温调节', detail: '早晨冷水澡助醒（升温），晚上热水澡或运动助眠（虽然运动本身升温，但之后会有降温效应）。' },
      { id: 's6', text: 'NSDR (非睡眠深度休息)', detail: '午后疲惫时尝试 Yoga Nidra 或冥想，而非长时间午睡。' }
    ],
    warnings: ['不要依赖褪黑素补充剂，可能导致激素失衡或抑郁情绪。'],
    references: [
      {
        id: 'ref-sleep-1',
        title: "Stability, efficacy, and circadian phase of the human circadian pacemaker in an era of electric light",
        authors: "Czeisler, C. A., et al.",
        journal: "Harvard Medical School",
        year: "2013",
        url: "https://pubmed.ncbi.nlm.nih.gov/23814216/"
      },
      {
        id: 'ref-sleep-2',
        title: "The impact of daytime light exposures on sleep and mood in office workers",
        authors: "Boubekri, M., et al.",
        journal: "Sleep Health",
        year: "2014"
      }
    ],
    assessmentQuestions: [
      { id: 'wakeTime', label: '你通常几点起床？', type: 'text', placeholder: '例如：07:30' },
      { id: 'sunlight', label: '起床后多久会接触到自然光？', type: 'select', options: ['10分钟内', '30分钟内', '1小时后', '几乎不接触'] },
      { id: 'caffeine', label: '你每天最后一次摄入咖啡因是在几点？', type: 'text', placeholder: '例如：14:00' },
      { id: 'screenTime', label: '睡前1小时你会使用电子设备吗？', type: 'select', options: ['经常使用', '偶尔使用', '从不使用'] },
      { id: 'quality', label: '你给自己的睡眠质量打几分 (1-10)？', type: 'number' }
    ]
  },
  {
    id: 'diet',
    title: '饮食 (Diet & Fasting)',
    icon: Utensils,
    summary: '何时吃与吃什么同等重要。间歇性禁食和发酵食物对代谢及肠道菌群有显著益处。',
    science: '限制进食窗口（Time-Restricted Feeding）迫使身体从利用葡萄糖转为利用脂肪酸和酮体，并激活自噬机制（Autophagy），清理受损细胞。',
    chartType: 'diet',
    actions: [
      { id: 'd1', text: '间歇性禁食 (Fasting)', detail: '尝试将进食窗口控制在 8-10 小时内（如 10:00-18:00）。起床后 1 小时和睡前 2-3 小时尽量不进食。', important: true },
      { id: 'd2', text: '增加发酵食物', detail: '每天摄入 1-2 次天然发酵食物（酸菜、泡菜、无糖酸奶、纳豆）以丰富肠道菌群。', important: true },
      { id: 'd3', text: '多吃植物纤维', detail: '全谷物、豆类、蔬菜是肠道菌群的"食物"。' },
      { id: 'd4', text: '地中海饮食结构', detail: '相比生酮，地中海饮食更容易坚持且对长期健康有益。' }
    ],
    warnings: ['益生菌补充剂效果不稳定，优先通过天然食物获取。', '若要增肌，可适当提前进食窗口补充蛋白质。'],
    references: [
      {
        id: 'ref-diet-1',
        title: "Early Time-Restricted Feeding Improves Insulin Sensitivity, Blood Pressure, and Oxidative Stress Even without Weight Loss in Men with Prediabetes",
        authors: "Sutton, E. F., et al.",
        journal: "Cell Metabolism",
        year: "2018",
        url: "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(18)30253-5"
      },
      {
        id: 'ref-diet-2',
        title: "Gut-microbiota-targeted diets modulate human immune status",
        authors: "Wastyk, H. C., et al.",
        journal: "Cell",
        year: "2021"
      }
    ],
    assessmentQuestions: [
      { id: 'window', label: '你每天的进食窗口大约是多少小时？', type: 'number', placeholder: '例如：8, 12, 16' },
      { id: 'breakfast', label: '起床后多久吃早餐？', type: 'select', options: ['立即', '1小时后', '2小时以上', '不吃早餐'] },
      { id: 'fermented', label: '你每周吃几次发酵食物（酸奶/泡菜等）？', type: 'select', options: ['每天', '每周3-4次', '偶尔', '从不'] },
      { id: 'sugar', label: '你对精制糖/甜食的摄入频率？', type: 'select', options: ['每天多次', '每天一次', '每周几次', '极少'] }
    ]
  },
  {
    id: 'dopamine',
    title: '心态与动力 (Dopamine)',
    icon: Smile,
    summary: '多巴胺是动力的源泉，但储备有限。管理"快乐阈值"，建立成长型思维。',
    science: '多巴胺系统遵循"痛苦-快乐平衡"（Pain-Pleasure Balance）。人为造成的高峰（如药物、滥用社交媒体）会导致随后的基线下降，造成动力缺失（Anhedonia）。',
    chartType: 'dopamine',
    actions: [
      { id: 'm1', text: '不要叠加快乐来源', detail: '避免同时进行多项高刺激活动（如边健身边听音乐边喝功能饮料），以免耗尽多巴胺储备。' },
      { id: 'm2', text: '随机奖励机制', detail: '对喜欢的活动实行间歇性奖励（有时听音乐，有时不听），保持新鲜感。', important: true },
      { id: 'm3', text: '成长型思维', detail: '将"努力的过程"本身视为奖励，而非只关注结果。这能维持长期动力。' },
      { id: 'm4', text: '冷水疗法', detail: '冷水浴可提升多巴胺 2.5 倍并持续数小时，建议每周总计 11 分钟。' }
    ],
    warnings: ['避免强效多巴胺药物（如安非他命类），它们会永久性提高快乐阈值，导致生活无趣。', '深夜接触蓝光会降低次日的多巴胺水平。'],
    references: [
      {
        id: 'ref-dopamine-1',
        title: "Dopamine Nation: Finding Balance in the Age of Indulgence",
        authors: "Lembke, A.",
        journal: "Dutton",
        year: "2021"
      },
      {
        id: 'ref-dopamine-2',
        title: "Reward, dopamine and the control of food intake: implications for obesity",
        authors: "Volkow, N. D., et al.",
        journal: "Trends in Cognitive Sciences",
        year: "2011"
      }
    ],
    assessmentQuestions: [
      { id: 'phone', label: '你每天在社交媒体/短视频上花费多少时间？', type: 'select', options: ['<30分钟', '30-60分钟', '1-2小时', '>2小时'] },
      { id: 'stacking', label: '进行娱乐活动时（如健身/游戏），你会同时叠加多少种刺激（音乐/零食/饮料）？', type: 'select', options: ['0-1种', '2-3种', '很多种'] },
      { id: 'motivation', label: '你近期是否感到动力不足或很难对事物产生兴趣？', type: 'select', options: ['经常', '偶尔', '很少'] },
      { id: 'cold', label: '是否尝试过冷水浴？', type: 'select', options: ['定期进行', '偶尔尝试', '从未尝试'] }
    ]
  },
  {
    id: 'focus',
    title: '学习与专注 (Focus)',
    icon: Brain,
    summary: '利用神经可塑性进行高效学习。专注需要视线控制和适当的压力信号。',
    science: '大脑的专注力遵循 90 分钟的超日节律（Ultradian Rhythm）。神经可塑性的触发需要"乙酰胆碱"（专注）和"去甲肾上腺素"（警觉）的协同作用。',
    chartType: 'focus',
    actions: [
      { id: 'f1', text: '拥抱挫折感', detail: '学习时的挫折感是神经可塑性开启的信号，不要轻易放弃。', important: true },
      { id: 'f2', text: '90 分钟周期', detail: '利用生物节律，进行 90 分钟的高强度专注学习，随后休息。' },
      { id: 'f3', text: '生理叹息', detail: '感到压力大时：鼻吸两口（一大一小），嘴呼一口长气。快速降低压力。' },
      { id: 'f4', text: '视线管理', detail: '工作时视线平视或略向上，可提升警觉度；视线向下倾向于放松。' },
      { id: 'f5', text: '前庭干扰', detail: '尝试新颖的平衡动作（如倒立、单腿站）可激活神经可塑性。' }
    ],
    references: [
      {
        id: 'ref-focus-1',
        title: "Basic rest-activity cycle—22 years later",
        authors: "Kleitman, N.",
        journal: "Sleep",
        year: "1982"
      },
      {
        id: 'ref-focus-2',
        title: "Brief meditation training induces smoking reduction",
        authors: "Tang, Y. Y., et al.",
        journal: "PNAS",
        year: "2013"
      }
    ],
    assessmentQuestions: [
      { id: 'duration', label: '你能够连续保持高度专注多长时间？', type: 'select', options: ['<20分钟', '20-45分钟', '45-90分钟', '>90分钟'] },
      { id: 'distraction', label: '工作学习时，手机/通知对你的干扰程度？', type: 'select', options: ['严重', '中等', '轻微'] },
      { id: 'stress', label: '面对困难任务产生挫败感时，你通常会？', type: 'select', options: ['立即放弃/切换任务', '感到焦虑但坚持', '视为学习机会并继续'] },
      { id: 'monitor', label: '你的显示器位置通常是？', type: 'select', options: ['低于视线（低头）', '平视或略高', '不确定'] }
    ]
  },
  {
    id: 'longevity',
    title: '长寿 (Longevity)',
    icon: Clock,
    summary: '衰老被视为一种基因信息的丢失。通过生活方式干预可减缓甚至逆转"衰老时钟"。',
    science: '衰老的信息论（Information Theory of Aging）：随着时间推移，表观遗传标记（Epigenetic markers）变得混乱，导致基因表达异常。Sirtuins 蛋白是维持基因组稳定的关键卫士。',
    chartType: 'longevity',
    actions: [
      { id: 'l1', text: '限制糖与精制碳水', detail: '减少胰岛素波动，保持细胞对胰岛素的敏感性。' },
      { id: 'l2', text: '有氧 + 力量训练', detail: '每周 150-180 分钟有氧（Zone 2）加上 2-3 次力量训练。', important: true },
      { id: 'l3', text: '植物蛋白为主', detail: '适度减少红肉，增加植物蛋白摄入。' },
      { id: 'l4', text: '特定补充剂', detail: 'Omega-3 (EPA) 对大脑和抗炎至关重要。维生素D、镁也是基础。' }
    ],
    warnings: ['关于 NMN 和白藜芦醇等抗衰老药物仍有科学争议，需谨慎参考。', '吸烟和 X 光辐射会直接破坏基因表达，加速衰老。'],
    references: [
      {
        id: 'ref-longevity-1',
        title: "Loss of epigenetic information as a cause of mammalian aging",
        authors: "Sinclair, D. A., et al.",
        journal: "Cell",
        year: "2023",
        url: "https://www.cell.com/cell/fulltext/S0092-8674(22)01570-7"
      },
      {
        id: 'ref-longevity-2',
        title: "Lifespan: Why We Age—and Why We Don't Have To",
        authors: "Sinclair, D. A.",
        journal: "Atria Books",
        year: "2019"
      }
    ],
    assessmentQuestions: [
      { id: 'cardio', label: '每周进行有氧运动（跑步/游泳/骑行）的总时长？', type: 'select', options: ['<1小时', '1-2小时', '2-3小时', '>3小时'] },
      { id: 'strength', label: '每周进行力量训练（举铁/自重）的次数？', type: 'select', options: ['0次', '1-2次', '3次以上'] },
      { id: 'plant', label: '你的饮食中植物性食物的占比大约是？', type: 'select', options: ['<30%', '50%', '>70%'] },
      { id: 'family', label: '是否有家族遗传病史（心脏病/糖尿病等）？', type: 'select', options: ['是', '否', '不清楚'] }
    ]
  }
];