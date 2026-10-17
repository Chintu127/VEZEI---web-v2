const http = require("http");

const routes = [
  "/",
  "/exams",
  "/exams/cat",
  "/features",
  "/how-it-works",
  "/pricing",
  "/leaderboard",
  "/about",
  "/resources",
  "/faq",
  "/contact",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/onboarding",
  "/app",
  "/app/exams",
  "/app/learn",
  "/app/learn/quant-percentages-01",
  "/app/practice",
  "/app/practice/session",
  "/app/results/res-cat-01",
  "/app/mock-tests",
  "/app/ai-tutor",
  "/app/analytics",
  "/app/planner",
  "/app/battle",
  "/app/leaderboards",
  "/app/achievements",
  "/app/mistakes",
  "/app/bookmarks",
  "/app/profile",
  "/app/settings",
  "/app/billing",
  "/admin",
  "/admin/super",
  "/admin/main",
  "/admin/developer-1",
  "/admin/developer-2",
  "/admin/developer-3",
  "/admin/exams",
  "/admin/questions",
  "/admin/mock-tests",
  "/admin/users",
  "/admin/audit-logs",
  "/api/dashboard",
  "/api/notifications",
  { path: "/api/practice/sessions", method: "POST", body: JSON.stringify({ examSlug: "cat", questionCount: 5 }) },
];

async function checkRoute(item) {
  const isObj = typeof item === "object";
  const route = isObj ? item.path : item;
  const method = isObj ? item.method : "GET";
  const body = isObj ? item.body : null;

  return new Promise((resolve) => {
    const url = new URL(`http://localhost:3000${route}`);
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: method,
        headers: body
          ? {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(body),
            }
          : {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            route: `${method} ${route}`,
            statusCode: res.statusCode,
            length: data.length,
            ok: res.statusCode >= 200 && res.statusCode < 400,
          });
        });
      }
    );
    req.on("error", (err) => {
      resolve({ route: `${method} ${route}`, statusCode: 0, error: err.message, ok: false });
    });
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

async function run() {
  console.log("=== VEZEI Platform Route Verification ===");
  let passed = 0;
  let failed = 0;

  for (const route of routes) {
    const res = await checkRoute(route);
    if (res.ok) {
      console.log(`[PASS] ${res.statusCode} ${res.route} (${res.length} bytes)`);
      passed++;
    } else {
      console.error(`[FAIL] ${res.statusCode} ${res.route}: ${res.error || "HTTP " + res.statusCode}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed out of ${routes.length} total tested.`);
  if (failed === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
