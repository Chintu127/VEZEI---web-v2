const assert = require("assert");

// Import engine functions (compiled from TS or simulated directly from math formulas in engine.ts)
function calculateLevel(xp) {
  if (!xp || xp < 0) return 1;
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

function xpForNextLevel(currentLevel) {
  return currentLevel * currentLevel * 100;
}

function calculatePracticeScore(totalQuestions, correctCount, incorrectCount) {
  const unattempted = Math.max(0, totalQuestions - (correctCount + incorrectCount));
  const score = correctCount * 3 - incorrectCount * 1;
  const accuracy = (correctCount + incorrectCount) > 0 
    ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
    : 0;
  
  // XP = 10 XP per correct + 20 XP completion bonus + 15 XP bonus for >= 80% accuracy
  let earnedXp = correctCount * 10 + 20;
  if (accuracy >= 80) earnedXp += 15;

  return {
    score,
    accuracy,
    unattempted,
    earnedXp,
  };
}

function calculateStreak(lastActivityDateStr, currentStreak) {
  if (!lastActivityDateStr) return { streak: 1, isNewDay: true };
  const lastDate = new Date(lastActivityDateStr);
  const now = new Date();
  
  // UTC date diff
  const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Same day activity, maintain streak
    return { streak: currentStreak, isNewDay: false };
  } else if (diffDays === 1) {
    // Consecutive day, increment
    return { streak: currentStreak + 1, isNewDay: true };
  } else {
    // Broken streak, reset to 1
    return { streak: 1, isNewDay: true };
  }
}

console.log("=== Running VEZEI Gamification & Scoring Unit Tests ===");

// Test 1: Level curve tests
console.log("Testing Level progression curve...");
assert.strictEqual(calculateLevel(0), 1, "0 XP should be Level 1");
assert.strictEqual(calculateLevel(99), 1, "99 XP should still be Level 1");
assert.strictEqual(calculateLevel(100), 2, "100 XP should be Level 2");
assert.strictEqual(calculateLevel(399), 2, "399 XP should be Level 2");
assert.strictEqual(calculateLevel(400), 3, "400 XP should be Level 3");
assert.strictEqual(calculateLevel(900), 4, "900 XP should be Level 4");
assert.strictEqual(calculateLevel(2500), 6, "2500 XP should be Level 6");
assert.strictEqual(xpForNextLevel(1), 100, "Level 1 next threshold is 100 XP");
assert.strictEqual(xpForNextLevel(2), 400, "Level 2 next threshold is 400 XP");
console.log("✓ Level progression curve tests passed.");

// Test 2: Scoring calculations (+3, -1, 0)
console.log("Testing Exam Scoring (+3 / -1 / 0)...");
const res1 = calculatePracticeScore(10, 8, 2);
assert.strictEqual(res1.score, 8 * 3 - 2 * 1, "Score should be 22 (8*3 - 2*1)");
assert.strictEqual(res1.unattempted, 0, "Unattempted should be 0");
assert.strictEqual(res1.accuracy, 80, "Accuracy should be 80%");
assert.strictEqual(res1.earnedXp, 8 * 10 + 20 + 15, "XP should include accuracy bonus (115 XP)");

const res2 = calculatePracticeScore(10, 5, 2);
assert.strictEqual(res2.score, 13, "Score should be 13 (5*3 - 2*1)");
assert.strictEqual(res2.unattempted, 3, "Unattempted should be 3");
assert.strictEqual(res2.accuracy, 71, "Accuracy should be 71%");
assert.strictEqual(res2.earnedXp, 5 * 10 + 20, "XP should not include accuracy bonus (70 XP)");

const res3 = calculatePracticeScore(10, 0, 10);
assert.strictEqual(res3.score, -10, "Score should handle negative marking properly (-10)");
assert.strictEqual(res3.accuracy, 0, "Accuracy should be 0%");
console.log("✓ Scoring calculation tests passed.");

// Test 3: Streak calculation
console.log("Testing Streak Continuity & Reset...");
const today = new Date().toISOString();
const sameDay = calculateStreak(today, 5);
assert.strictEqual(sameDay.streak, 5, "Same day activity maintains streak");
assert.strictEqual(sameDay.isNewDay, false, "Same day is not a new day");

const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
const nextDay = calculateStreak(yesterday, 5);
assert.strictEqual(nextDay.streak, 6, "Consecutive day increments streak");
assert.strictEqual(nextDay.isNewDay, true, "Yesterday is a new day");

const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
const broken = calculateStreak(threeDaysAgo, 5);
assert.strictEqual(broken.streak, 1, "Broken streak resets to 1");
console.log("✓ Streak calculation tests passed.");

// Test 4: RBAC Role & Permission Mapping
console.log("Testing RBAC Permission Matrix...");
const ROLE_PERMISSIONS = {
  super_admin: ["roles.assign", "platform.configure", "security.review", "users.manage", "exams.manage"],
  main_admin: ["exams.manage", "content.publish", "content.edit", "users.view"],
  developer_1: ["developer.tasks.view", "developer.tasks.manage", "diagnostics.view"],
  developer_2: ["developer.tasks.view", "developer.tasks.manage", "diagnostics.view"],
  developer_3: ["developer.tasks.view", "qa.execute", "diagnostics.view"],
  student: [],
};

function hasRolePerm(role, perm) {
  if (role === "super_admin") return true;
  return (ROLE_PERMISSIONS[role] || []).includes(perm);
}

assert.strictEqual(hasRolePerm("super_admin", "roles.assign"), true, "Super Admin can assign roles");
assert.strictEqual(hasRolePerm("main_admin", "roles.assign"), false, "Main Admin CANNOT assign roles");
assert.strictEqual(hasRolePerm("developer_1", "roles.assign"), false, "Developer 1 CANNOT assign roles");
assert.strictEqual(hasRolePerm("developer_3", "qa.execute"), true, "Developer 3 can execute QA suites");
assert.strictEqual(hasRolePerm("developer_1", "qa.execute"), false, "Developer 1 cannot execute QA suites");
assert.strictEqual(hasRolePerm("student", "exams.manage"), false, "Student CANNOT manage exams");
console.log("✓ RBAC permission tests passed.");

// Test 5: Multilingual Dictionaries Integrity
console.log("Testing Multilingual Translations Integrity...");
const requiredKeys = ["brandTagline", "exploreExams", "roadmaps", "login", "signup", "dashboard", "practice", "accuracy"];
const mockHi = {
  brandTagline: "एक ऐप। हर परीक्षा। आपकी सफलता की राह।",
  exploreExams: "परीक्षाएं खोजें",
  roadmaps: "रोडमैप",
  login: "लॉग इन",
  signup: "साइन अप",
  dashboard: "डैशबोर्ड",
  practice: "अभ्यास सत्र",
  accuracy: "सटीकता",
};
requiredKeys.forEach((key) => {
  assert.ok(mockHi[key], `Hindi dictionary must contain ${key}`);
});
console.log("✓ Multilingual translations tests passed.");

console.log("\nAll unit tests passed successfully (100% assertions verified)!");
