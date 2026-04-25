export interface GoldSetQuestion {
  question: string;
  courseSlug: string;
  category: "factual" | "comparative" | "out_of_scope";
  expectedFacts: string[];
  shouldRefuse?: boolean;
}

export const GOLD_SET: GoldSetQuestion[] = [
  // Factual questions
  {
    question: "When was the Battle of Bosworth Field?",
    courseSlug: "tudor-dynasty",
    category: "factual",
    expectedFacts: ["1485", "Bosworth"],
  },
  {
    question: "Who led the Iceni revolt against Rome?",
    courseSlug: "roman-britain",
    category: "factual",
    expectedFacts: ["Boudica", "Iceni"],
  },
  {
    question: "When was the Battle of Hastings?",
    courseSlug: "medieval-england",
    category: "factual",
    expectedFacts: ["1066", "Hastings"],
  },
  {
    question: "What was the Act of Supremacy?",
    courseSlug: "tudor-dynasty",
    category: "factual",
    expectedFacts: ["1534", "Supreme Head", "Church of England"],
  },
  {
    question: "When did food rationing begin in Britain during WWII?",
    courseSlug: "wwii-home-front",
    category: "factual",
    expectedFacts: ["1940", "January"],
  },
  {
    question: "When was Hadrian's Wall built?",
    courseSlug: "roman-britain",
    category: "factual",
    expectedFacts: ["122", "AD"],
  },
  {
    question: "When did the Black Death reach England?",
    courseSlug: "medieval-england",
    category: "factual",
    expectedFacts: ["1348"],
  },
  {
    question: "What year was the Spanish Armada defeated?",
    courseSlug: "tudor-dynasty",
    category: "factual",
    expectedFacts: ["1588"],
  },
  {
    question: "When was the Liverpool and Manchester Railway opened?",
    courseSlug: "victorian-age",
    category: "factual",
    expectedFacts: ["1830"],
  },
  {
    question: "When was Charles I executed?",
    courseSlug: "english-civil-war",
    category: "factual",
    expectedFacts: ["1649", "January"],
  },
  // Comparative questions
  {
    question: "How did Henry VII's approach to kingship differ from his predecessors?",
    courseSlug: "tudor-dynasty",
    category: "comparative",
    expectedFacts: ["financial", "accounts", "bonds"],
  },
  {
    question: "Compare the suffragists and suffragettes approaches",
    courseSlug: "victorian-age",
    category: "comparative",
    expectedFacts: ["Fawcett", "Pankhurst", "constitutional", "militant"],
  },
  // Out of scope — should refuse
  {
    question: "What is the capital of France?",
    courseSlug: "tudor-dynasty",
    category: "out_of_scope",
    expectedFacts: [],
    shouldRefuse: true,
  },
  {
    question: "Explain quantum mechanics",
    courseSlug: "roman-britain",
    category: "out_of_scope",
    expectedFacts: [],
    shouldRefuse: true,
  },
  {
    question: "Who won the 2024 US election?",
    courseSlug: "medieval-england",
    category: "out_of_scope",
    expectedFacts: [],
    shouldRefuse: true,
  },
];
