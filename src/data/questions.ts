export interface QuestionOption {
  id: string;
  text: string;
}

export type QuestionType = "mcq" | "msq" | "numerical" | "passage";

export interface Question {
  id: string;
  examSlug: string;
  subject: string;
  topic: string;
  type: QuestionType;
  difficulty: "Easy" | "Medium" | "Hard";
  passageText?: string;
  prompt: string;
  options?: QuestionOption[];
  correctAnswer: string | string[]; // Option ID(s) or numerical string
  hints: string[];
  explanation: string;
  conceptSummary: string;
}

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q-cat-qa-01",
    examSlug: "cat",
    subject: "Quantitative Aptitude",
    topic: "Arithmetic - Profit & Loss",
    type: "mcq",
    difficulty: "Medium",
    prompt: "A merchant marks his goods up by 40% above the cost price. He sells 60% of the stock at this marked price, and the remaining 40% at a discount of 25% on the marked price. What is the merchant's net overall profit percentage?",
    options: [
      { id: "A", text: "21.0%" },
      { id: "B", text: "23.2%" },
      { id: "C", text: "26.0%" },
      { id: "D", text: "28.5%" },
    ],
    correctAnswer: "C",
    hints: [
      "Assume a convenient base: let Cost Price (CP) for 100 units of goods be 100 total, so CP per unit = 1.",
      "Calculate Marked Price: MP = 1.40. First portion sells 60 units at 1.40. The remaining 40 units sell at 1.40 × 0.75.",
      "Sum the revenues: 60 × 1.40 = 84. And 40 × (1.40 × 0.75) = 40 × 1.05 = 42. Total Revenue = 84 + 42 = 126.",
    ],
    explanation: "Let total goods = 100 units, CP per unit = 1, so total CP = 100.\nMarked Price (MP) per unit = 1.40.\nPart 1: 60 units sold at MP = 60 × 1.40 = 84.\nPart 2: 40 units sold at 25% discount on MP = 40 × (1.40 × (1 - 0.25)) = 40 × 1.05 = 42.\nTotal Selling Price (SP) = 84 + 42 = 126.\nNet Profit = ((126 - 100) / 100) × 100% = 26.0%.",
    conceptSummary: "Weighted average revenue across segmented discount tranches.",
  },
  {
    id: "q-cat-dilr-01",
    examSlug: "cat",
    subject: "DILR",
    topic: "Logical Arrangements",
    type: "mcq",
    difficulty: "Hard",
    prompt: "Six researchers—A, B, C, D, E, and F—are seated in a row facing North. Exactly two people sit between B and E. D is to the immediate right of E. A is not at either extreme end. C is to the immediate left of B. Who must be sitting at the extreme right end?",
    options: [
      { id: "A", text: "D" },
      { id: "B", text: "F" },
      { id: "C", text: "E" },
      { id: "D", text: "Cannot be uniquely determined" },
    ],
    correctAnswer: "A",
    hints: [
      "Notice that C is to the immediate left of B, forming the fixed block [C, B].",
      "D is to the immediate right of E, forming the block [E, D].",
      "Since exactly two people sit between B and E, the arrangement has to be [C, B, _, _, E, D] filling all 6 positions!",
    ],
    explanation: "We have 6 positions: 1, 2, 3, 4, 5, 6 from left to right.\nBlock 1: (C, B). Block 2: (E, D).\nTwo people between B and E: if B is at pos 2, E is at pos 5, giving (C, B, _, _, E, D). Pos 6 is D.\nSince A cannot be at an extreme end, A must be in position 3 or 4, and F takes the remaining internal spot.\nThus, position 6 is uniquely occupied by D.",
    conceptSummary: "Linear arrangement deduction using rigid adjacent and gap constraints.",
  },
  {
    id: "q-cat-varc-01",
    examSlug: "cat",
    subject: "VARC",
    topic: "Critical Reasoning - Assumptions",
    type: "mcq",
    difficulty: "Medium",
    prompt: "Editorial statement: 'To curb urban traffic congestion, the municipal corporation must double parking tariffs in central commercial zones. Past evidence demonstrates that motorists are highly sensitive to out-of-pocket vehicular expenses.' Which of the following is an underlying assumption required by the argument?",
    options: [
      { id: "A", text: "Alternative public transit in central commercial zones is adequate to absorb motorists who stop driving." },
      { id: "B", text: "Increased parking fees will not simply induce drivers to circle commercial blocks looking for illegal street parking." },
      { id: "C", text: "Doubling parking fees will generate surplus municipal revenue for highway expansion." },
      { id: "D", text: "Motorists visiting central zones have alternatives to driving or will reduce non-essential motorized trips." },
    ],
    correctAnswer: "D",
    hints: [
      "Use the Assumption Negation Technique: Negate each option and test if the author's conclusion collapses.",
      "If motorists have absolutely no choice and cannot reduce trips, doubling tariffs will only cost them more without decreasing congestion.",
    ],
    explanation: "If motorists have no alternatives and cannot reduce trips to the central zone, they will continue driving despite the tariff hike, directly failing the objective to curb traffic congestion. Therefore, option D is a necessary foundational assumption.",
    conceptSummary: "Assumption validation via negation of behavioral elasticity.",
  },
  {
    id: "q-gate-cs-01",
    examSlug: "gate-cs",
    subject: "Algorithms",
    topic: "Dynamic Programming & Recurrences",
    type: "mcq",
    difficulty: "Medium",
    prompt: "Consider the recurrence relation: T(n) = 3T(n/4) + n log n with base condition T(1) = Θ(1). According to the Master Theorem, what is the asymptotic time complexity of T(n)?",
    options: [
      { id: "A", text: "Θ(n log n)" },
      { id: "B", text: "Θ(n^(log_4 3))" },
      { id: "C", text: "Θ(n^2)" },
      { id: "D", text: "Θ(n log^2 n)" },
    ],
    correctAnswer: "A",
    hints: [
      "Identify a = 3, b = 4. Calculate log_b(a) = log_4(3) ≈ 0.792.",
      "Compare f(n) = n log n with n^(log_b a) = n^0.792. Notice that f(n) dominates polynomially.",
    ],
    explanation: "Here a = 3, b = 4, f(n) = n log n. We compare f(n) with n^(log_4 3) ≈ n^0.792. Since f(n) = Ω(n^(0.792 + ε)) for ε ≈ 0.2 and 3*(n/4)log(n/4) <= c*n log n for c < 1 (regularity holds), Case 3 of the Master Theorem applies: T(n) = Θ(f(n)) = Θ(n log n).",
    conceptSummary: "Master Theorem Case 3 polynomial dominance test.",
  },
  {
    id: "q-gmat-di-01",
    examSlug: "gmat",
    subject: "Data Insights",
    topic: "Multi-Source Reasoning",
    type: "mcq",
    difficulty: "Hard",
    prompt: "A fintech startup observes that its customer acquisition cost (CAC) decreased by 20% in Q3 compared to Q2, while its total marketing expenditure remained constant at $100,000. If the lifetime value (LTV) per acquired user was $400 in Q2 and $350 in Q3, what was the percentage change in the LTV-to-CAC ratio from Q2 to Q3?",
    options: [
      { id: "A", text: "Increased by 9.375%" },
      { id: "B", text: "Decreased by 5.25%" },
      { id: "C", text: "Increased by 12.5%" },
      { id: "D", text: "Remained unchanged" },
    ],
    correctAnswer: "A",
    hints: [
      "Let CAC in Q2 be C. In Q3, CAC is 0.8C.",
      "Ratio in Q2 = 400 / C. Ratio in Q3 = 350 / (0.8C) = 437.5 / C.",
      "Percentage change = (437.5 - 400) / 400 = 37.5 / 400 = +9.375%.",
    ],
    explanation: "Let CAC_Q2 = C. Then CAC_Q3 = 0.80 × C.\nRatio_Q2 = 400 / C.\nRatio_Q3 = 350 / (0.80 × C) = 437.5 / C.\nChange = (437.5 - 400) / 400 = 37.5 / 400 = +0.09375 = +9.375% increase.",
    conceptSummary: "Proportional ratio analysis with denominator deflation.",
  },
  {
    id: "q-jee-math-01",
    examSlug: "jee-adv",
    subject: "Mathematics",
    topic: "Calculus - Definite Integrals",
    type: "mcq",
    difficulty: "Hard",
    prompt: "Evaluate the value of the definite integral I = ∫[0 to π] (x sin x) / (1 + cos^2 x) dx.",
    options: [
      { id: "A", text: "π^2 / 4" },
      { id: "B", text: "π / 2" },
      { id: "C", text: "π^2 / 2" },
      { id: "D", text: "π / 4" },
    ],
    correctAnswer: "A",
    hints: [
      "Apply King's Property: ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx.",
      "Add the original integral I to the transformed integral I.",
      "The x in the numerator cancels out leaving (π/2) ∫[0 to π] (sin x) / (1 + cos^2 x) dx.",
    ],
    explanation: "By property ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx:\nI = ∫[0 to π] ((π - x) sin(π - x)) / (1 + cos^2(π - x)) dx = ∫[0 to π] ((π - x) sin x) / (1 + cos^2 x) dx.\nAdding both gives 2I = π ∫[0 to π] (sin x) / (1 + cos^2 x) dx.\nSubstitute u = cos x, du = -sin x dx:\n2I = π ∫[-1 to 1] (1 / (1 + u^2)) du = π [arctan(1) - arctan(-1)] = π [π/4 - (-π/4)] = π(π/2) = π^2 / 2.\nTherefore, I = π^2 / 4.",
    conceptSummary: "Definite integration symmetry via King's Rule.",
  },
];
