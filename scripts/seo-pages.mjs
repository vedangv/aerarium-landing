const SITE_URL = "https://aerarium.app";
const TESTFLIGHT_URL = "https://testflight.apple.com/join/Xna39VKU";
const RESEARCH_URL = "https://research.aerarium.app/";

export const seoPages = [
  {
    slug: "portfolio-x-ray",
    eyebrow: "ETF look-through exposure",
    title: "Portfolio X-Ray: ETF Look-Through Across Accounts | Aerarium",
    description: "See your true stock exposure across direct holdings and ETFs. Aerarium Portfolio looks through funds and rolls exposure up across accounts.",
    h1: "See what you actually own inside your ETFs.",
    intro: "A ticker list can hide the exposure that matters. Portfolio X-Ray combines direct positions with the underlying holdings of funds, then rolls the result up across your accounts.",
    problemTitle: "A spreadsheet can miss the overlap.",
    problem: [
      "Owning a stock directly is only part of the picture. The same company may also sit inside broad-market ETFs, sector funds, retirement accounts, and taxable accounts.",
      "Portfolio X-Ray is designed for the question that ordinary brokerage screens rarely answer clearly: how much exposure do I actually have to a company, sector, asset class, or currency?",
    ],
    featureTitle: "One look-through view, four useful lenses.",
    feature: [
      "Aerarium Portfolio separates direct exposure from exposure held through funds. You can inspect the result by holding, sector, asset class, or currency without manually rebuilding a workbook.",
      "The goal is visibility, not a recommendation. Aerarium does not tell you what to buy or sell. It makes the exposure visible so you can compare your portfolio with your own rules.",
    ],
    image: "/assets/seo/xray-holdings.jpg",
    imageAlt: "Aerarium Portfolio X-Ray holdings view showing direct stock exposure and exposure held through funds.",
    highlights: ["Direct + fund-derived exposure", "Across connected accounts", "Holding, sector, asset, and currency views"],
    audience: "Long-term investors who own ETFs, hold investments across more than one account, or want to understand concentration before changing a portfolio.",
    limitations: "Portfolio X-Ray is an informational monitoring view. Aerarium does not provide investment advice, recommend securities, or place trades.",
    faq: [
      ["What is ETF look-through?", "ETF look-through means identifying the underlying holdings inside funds and combining them with positions you own directly. The result is a clearer estimate of your total exposure."],
      ["Does Portfolio X-Ray work across accounts?", "Yes. Aerarium Portfolio is designed to roll up supported holdings across connected and manual accounts after applying per-position currency conversion."],
      ["Does Aerarium place trades?", "No. Brokerage sync is read-only. Aerarium monitors your portfolio and never places trades."],
      ["Is the exposure figure investment advice?", "No. It is an informational view of your own portfolio data, not a recommendation to buy, sell, or hold any security."],
    ],
    related: ["policy-score", "investment-policy-statement-app", "methodology"],
  },
  {
    slug: "investment-policy-statement-app",
    eyebrow: "IPS portfolio app",
    title: "Investment Policy Statement App and IPS Cockpit | Aerarium",
    description: "Turn an Investment Policy Statement into live portfolio guardrails. Aerarium Portfolio tracks IPS rules, versions, reviews, and exceptions.",
    h1: "Turn your investment policy into live guardrails.",
    intro: "A written plan is useful only when it stays close to the portfolio. Aerarium Portfolio turns an Investment Policy Statement into a working cockpit for rules, reviews, and exceptions.",
    problemTitle: "Your rules should not live in a forgotten document.",
    problem: [
      "Investors often know the principles they want to follow: position limits, asset-allocation ranges, liquidity floors, restricted assets, and a review cadence. The hard part is remembering those rules when the market moves.",
      "The IPS Cockpit keeps the current policy visible and makes policy drift easier to review without turning the app into a trading interface.",
    ],
    featureTitle: "A policy record with an active review loop.",
    feature: [
      "Aerarium Portfolio stores an IPS as an immutable versioned policy. When you revise it, the prior version remains part of the history rather than being silently overwritten.",
      "The cockpit surfaces allocation checks, guardrails, policies, liquidity, and version history in one place. It is designed to support disciplined review, not constant activity.",
    ],
    image: "/assets/seo/ips-cockpit.jpg",
    imageAlt: "Aerarium IPS cockpit showing a policy score and allocation checks against investment policy ranges.",
    highlights: ["Immutable IPS versions", "Allocation ranges and guardrails", "Review cadence and exceptions"],
    audience: "Investors who want a repeatable decision process, a written portfolio policy, and a calmer way to check whether the portfolio still matches the plan.",
    limitations: "Aerarium provides tools for documenting and monitoring your own policy. It is not a robo-advisor and does not generate individualized investment advice.",
    faq: [
      ["What is an Investment Policy Statement?", "An Investment Policy Statement, or IPS, is a written set of portfolio objectives, constraints, allocation targets, guardrails, and review rules."],
      ["Can I change my IPS later?", "Yes. Aerarium treats IPS versions as immutable history. A revision creates a new version so you can review how your policy evolved."],
      ["Does Aerarium rebalance my portfolio automatically?", "No. Aerarium monitors policy alignment and surfaces exceptions. It does not place trades or rebalance accounts."],
      ["Is an IPS only for professional investors?", "No. The same discipline can help an individual investor define a plan before market noise tests it."],
    ],
    related: ["policy-score", "portfolio-x-ray", "methodology"],
  },
  {
    slug: "policy-score",
    eyebrow: "Portfolio health score",
    title: "Policy Score: A Transparent Portfolio Health Score | Aerarium",
    description: "Understand portfolio drift, concentration, liquidity, goals, and review cadence with Aerarium's transparent Policy Score.",
    h1: "Know when your portfolio has drifted from your own rules.",
    intro: "Policy Score compresses several portfolio checks into one visible signal, then lets you inspect the drivers. It is a monitoring tool for discipline, not a black-box rating.",
    problemTitle: "One number should lead to an explanation.",
    problem: [
      "A portfolio can drift in more than one way. Asset allocation can move outside a target band. A single holding can become too concentrated. Liquidity can fall below a floor. Reviews can become overdue.",
      "A useful score should not hide those details. Policy Score is designed as an entry point: the score shows whether attention is needed, and the breakdown shows why.",
    ],
    featureTitle: "A score with visible drivers.",
    feature: [
      "Aerarium Portfolio evaluates allocation drift, concentration risk, cash runway, goal alignment, speculative compliance, and review cadence against the rules you have recorded.",
      "The breakdown keeps healthy areas visible alongside the pressure points. You can inspect the checks that contribute to the score before deciding what, if anything, to do.",
    ],
    image: "/assets/seo/policy-score.jpg",
    imageAlt: "Aerarium Policy Score breakdown showing portfolio health drivers and their point contributions.",
    highlights: ["Transparent score drivers", "Policy-linked monitoring", "Healthy areas and pressure points"],
    audience: "Investors who want a quick portfolio health check without losing the detail needed to understand concentration, drift, or overdue reviews.",
    limitations: "Policy Score reflects the rules and portfolio data available in Aerarium. It is not a prediction, credit score, performance forecast, or investment recommendation.",
    faq: [
      ["What does Policy Score measure?", "Policy Score reflects portfolio alignment with your recorded rules across allocation drift, concentration, liquidity, goals, speculative compliance, and review cadence."],
      ["Is Policy Score a performance score?", "No. It is a policy-alignment signal. It does not predict returns or rank investments."],
      ["Can I inspect why the score changed?", "Yes. The breakdown shows the individual score drivers so the number is not a black box."],
      ["Does a low Policy Score tell me to trade?", "No. It tells you which recorded rules need attention. Any portfolio decision remains yours."],
    ],
    related: ["investment-policy-statement-app", "portfolio-x-ray", "methodology"],
  },
  {
    slug: "goals-funding-plan",
    eyebrow: "Goals-based portfolio funding",
    title: "Goals Funding Plan for Your Investment Portfolio | Aerarium",
    description: "Assign portfolio sleeves to goals in one central funding plan. Aerarium shows how assets support needs, wants, and wishes without hiding tradeoffs.",
    h1: "Assign assets to goals without hiding the tradeoffs.",
    intro: "A goal should connect back to the portfolio that funds it. Aerarium Portfolio uses a central funding plan so you can see how asset sleeves are assigned across goals.",
    problemTitle: "Goal planning becomes confusing when each goal is a separate island.",
    problem: [
      "When asset assignments are edited one goal at a time, global constraints become hard to reason about. A change to one goal can affect the capacity available to another.",
      "Aerarium keeps the portfolio-level tradeoff visible. The funding plan shows available asset pools, assigned sleeves, and any unassigned capacity in one place.",
    ],
    featureTitle: "One funding plan across all active goals.",
    feature: [
      "The goals hub gives a clean view of needs, wants, wishes, and current allocations. The central funding plan then lets you distribute stocks, bonds, cash, and alternatives across goals without drilling through each goal separately.",
      "An emergency fund can be explicit when that is useful, while unassigned cash remains visible rather than being forced into a goal.",
    ],
    image: "/assets/seo/goals-funding.jpg",
    imageAlt: "Aerarium central goals funding plan showing asset sleeve assignments across multiple goals.",
    highlights: ["Central sleeve assignment", "Needs, wants, and wishes", "Visible unassigned capacity"],
    audience: "Investors who use one portfolio to support multiple goals and want to understand how asset assignments interact before making changes.",
    limitations: "Aerarium tracks funding structure and progress using the information you provide. It does not guarantee outcomes or replace a personalized financial plan.",
    faq: [
      ["What is a portfolio sleeve?", "A portfolio sleeve is a portion of an asset pool assigned to support a goal. It makes the relationship between portfolio assets and goals explicit."],
      ["Do I need to assign every dollar?", "No. Aerarium keeps unassigned capacity visible so you can choose whether to allocate it, retain flexibility, or treat cash as an implicit reserve."],
      ["Can I fund an emergency goal with cash?", "Yes. An explicit emergency-fund goal can use cash sleeves so you can distinguish protected reserves from deployable or spendable cash."],
      ["Does Aerarium tell me how much to save?", "Aerarium helps you monitor the plan you create. It does not provide individualized savings or investment advice."],
    ],
    related: ["methodology", "investment-policy-statement-app", "policy-score"],
  },
  {
    slug: "investment-thesis-tracker",
    eyebrow: "Investment thesis tracker",
    title: "Investment Thesis Tracker and Review Loop | Aerarium",
    description: "Capture why you bought an investment, review the thesis over time, and keep decisions tied to written reasoning with Aerarium Portfolio.",
    h1: "Remember why you bought it before the market tests your conviction.",
    intro: "A decision log is most valuable after the excitement fades. Aerarium Portfolio keeps a written thesis and review cadence close to the position it was meant to explain.",
    problemTitle: "Memory is a weak investment process.",
    problem: [
      "It is easy to remember a compelling narrative at the moment of purchase and harder to recall the original reasoning months later. Price movement can quietly rewrite the story.",
      "A thesis tracker creates a small but useful forcing function: write down the reason, record the review date, and revisit the decision with the original context still visible.",
    ],
    featureTitle: "A simple thesis and check-in loop.",
    feature: [
      "Aerarium lets you capture an investment thesis and maintain a review loop around it. The app keeps check-ins visible alongside the rest of your portfolio discipline workflow.",
      "The point is not to generate a recommendation. It is to preserve your reasoning so future decisions are less dependent on memory or impulse.",
    ],
    image: "/assets/seo/thesis-tracker.png",
    imageAlt: "Aerarium thesis check-in view showing an investment thesis and its review workflow.",
    highlights: ["Written decision context", "Review reminders", "Thesis check-in history"],
    audience: "Investors who want to document the reason behind a position and create a repeatable check-in habit before market noise changes the narrative.",
    limitations: "Aerarium records and organizes your own reasoning. It does not evaluate whether a security is suitable or recommend a trade.",
    faq: [
      ["What is an investment thesis?", "An investment thesis is your written reason for owning an investment, including the assumptions or conditions you want to review over time."],
      ["Why track a thesis after buying?", "A written record helps you compare the original reasoning with later evidence instead of relying on memory after the price moves."],
      ["Does Aerarium generate theses with AI?", "The core workflow is designed around your own written reasoning and review discipline."],
      ["Can a thesis tracker replace investment research?", "No. It is a decision-hygiene tool that complements research; it does not replace analysis or advice."],
    ],
    related: ["methodology", "investment-policy-statement-app", "portfolio-x-ray"],
  },
  {
    slug: "security",
    eyebrow: "Read-only portfolio monitoring",
    title: "Aerarium Security: Read-Only Brokerage Sync and Data Controls",
    description: "Learn how Aerarium approaches read-only brokerage sync, encrypted sensitive fields, account recovery, export, and deletion controls.",
    h1: "Security you can verify, not just trust.",
    intro: "A portfolio-monitoring app should ask for the least access it needs. Aerarium is designed around read-only brokerage sync, visible account controls, and a clear separation between private portfolio data and public research.",
    problemTitle: "Visibility should not require trading access.",
    problem: [
      "Many investors want a consolidated view of their holdings without handing another product the ability to move money or place trades.",
      "Aerarium Portfolio is designed as a monitoring and discipline layer. Connected brokerage positions remain read-only unless you intentionally convert data into a manual record.",
    ],
    featureTitle: "Private portfolio data stays separate from public research.",
    feature: [
      "Aerarium Portfolio includes read-only brokerage sync, encrypted sensitive fields, recovery planning, export controls, and account deletion controls. Aerarium Research uses public-market data and remains separate from private portfolio records.",
      "The app is not a trading platform. That constraint is part of the product model, not a marketing footnote.",
    ],
    image: "/assets/seo/security-controls.jpg",
    imageAlt: "Aerarium profile settings showing security, encryption, and account-control surfaces.",
    highlights: ["Read-only brokerage sync", "Encrypted sensitive fields", "Export and deletion controls"],
    audience: "Investors who want portfolio visibility and discipline tooling without giving the app trading authority.",
    limitations: "No software can eliminate every risk. Aerarium documents its access model clearly and keeps the product read-only by design.",
    faq: [
      ["Can Aerarium place trades?", "No. Aerarium Portfolio uses read-only brokerage sync and never places trades."],
      ["Does Aerarium separate private and public data?", "Yes. Aerarium Portfolio is the private portfolio-monitoring product. Aerarium Research is a separate public-market research workspace."],
      ["Can I export my data?", "Yes. Data export remains available as part of the privacy and compliance controls."],
      ["Can I delete my account?", "Yes. Aerarium includes account-deletion controls and a recovery-key flow for encrypted financial fields."],
    ],
    related: ["methodology", "portfolio-x-ray", "investment-policy-statement-app"],
  },
  {
    slug: "methodology",
    eyebrow: "Rules-based personal investing",
    title: "Aerarium Methodology: Guardrails, Visibility, and Review Discipline",
    description: "Read the methodology behind Aerarium: portfolio visibility, written IPS guardrails, transparent monitoring, review cadence, and read-only design.",
    h1: "Guardrails, visibility, and review discipline.",
    intro: "Aerarium was built around a simple idea: your investing rules should not live only in your head or a manually updated spreadsheet. They should remain visible when the portfolio changes.",
    problemTitle: "The spreadsheet stopped answering the real question.",
    problem: [
      "The founder story started with a practical problem. Holdings lived across retirement and taxable accounts. Broad ETFs and direct positions overlapped. A spreadsheet tracked accounts, but it did not make total exposure obvious.",
      "The important question was no longer just which tickers were present. It was how much exposure actually existed after looking through funds and across accounts.",
    ],
    featureTitle: "The portfolio is a system, not a list.",
    feature: [
      "Aerarium Portfolio connects visibility with discipline: Portfolio X-Ray for look-through exposure, an IPS Cockpit for written rules, Policy Score for transparent monitoring, a goals funding plan for sleeve assignments, and thesis check-ins for decision hygiene.",
      "Aerarium Research complements that private workflow with source-first public-market research. The products remain distinct: public research informs decisions, while private portfolio monitoring keeps those decisions connected to your plan.",
    ],
    image: "/assets/seo/dashboard.jpg",
    imageAlt: "Aerarium Portfolio dashboard showing private portfolio monitoring, policy score, and account overview.",
    highlights: ["Visibility before activity", "Guardrails, not handholding", "Research separate from private records"],
    audience: "Long-term investors who want a calmer system for understanding a portfolio, documenting rules, and reviewing decisions without a trading-first interface.",
    limitations: "Aerarium does not place trades, predict returns, recommend securities, or provide financial advice. It helps investors monitor the information and rules they choose to record.",
    faq: [
      ["What problem is Aerarium designed to solve?", "Aerarium helps investors see true portfolio exposure, document their own policy rules, and review whether the portfolio still matches the plan."],
      ["Is Aerarium a brokerage or robo-advisor?", "No. Aerarium is a read-only portfolio discipline layer and a separate public-market research workspace."],
      ["How are Aerarium Portfolio and Aerarium Research different?", "Portfolio is the private iOS monitoring app. Research is the web workspace for source-first public-market data. Private portfolio records remain separate from public research."],
      ["Who built Aerarium?", "Aerarium is built by Vedang, a solo founder and CFA charterholder, from a real personal portfolio problem involving overlapping holdings across funds and accounts."],
    ],
    related: ["portfolio-x-ray", "investment-policy-statement-app", "security"],
  },
];

const pagesBySlug = new Map(seoPages.map((page) => [page.slug, page]));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderFaqSchema(page) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${page.slug}#webpage`,
        url: `${SITE_URL}/${page.slug}`,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#portfolio-app` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Aerarium", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.eyebrow, item: `${SITE_URL}/${page.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  }).replaceAll("<", "\\u003c");
}

function renderRelated(page) {
  return page.related
    .map((slug) => pagesBySlug.get(slug))
    .filter(Boolean)
    .map((related) => `<a class="related-link" href="/${related.slug}"><span>${escapeHtml(related.eyebrow)}</span><strong>${escapeHtml(related.h1)}</strong></a>`)
    .join("");
}

export function renderSeoPage(page) {
  const faqItems = page.faq
    .map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
    .join("");
  const highlightItems = page.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("");
  const problemParagraphs = page.problem.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const featureParagraphs = page.feature.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="${SITE_URL}/${page.slug}" />
    <link rel="icon" type="image/png" sizes="64x64" href="/assets/brand/favicon-64.png" />
    <link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Aerarium" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${SITE_URL}/${page.slug}" />
    <meta property="og:image" content="${SITE_URL}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${SITE_URL}/og-image.png" />
    <script type="application/ld+json">${renderFaqSchema(page)}</script>
    <style>
      :root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#080d0b;color:#f4f4ef}
      *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 80% 10%,rgba(45,212,191,.09),transparent 28rem),#080d0b;color:#f4f4ef;line-height:1.7;overflow-x:hidden}a{color:inherit;text-decoration:none}.shell{width:min(1160px,calc(100% - 40px));margin:auto}.nav{position:sticky;top:0;z-index:3;border-bottom:1px solid rgba(148,163,184,.14);background:rgba(8,13,11,.9);backdrop-filter:blur(18px)}.nav-inner,.footer-inner{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:18px 0}.brand{display:flex;align-items:center;gap:11px;font-size:18px;font-weight:800;letter-spacing:.01em}.brand img{width:38px;height:38px;border-radius:10px}.nav-links,.actions{display:flex;align-items:center;gap:18px}.nav-links a,.quiet{color:#a7b0aa;font-size:14px}.nav-links a:hover,.quiet:hover{color:#d7fbe9}.button{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(110,231,183,.62);border-radius:999px;padding:11px 18px;background:#73d79e;color:#07100c;font-size:14px;font-weight:800}.button.secondary{background:transparent;color:#d7fbe9}.hero{padding:108px 0 64px}.eyebrow{display:inline-flex;align-items:center;border:1px solid rgba(110,231,183,.36);border-radius:999px;padding:7px 12px;color:#83e9b0;font-size:12px;font-weight:800;letter-spacing:.15em;text-transform:uppercase}.hero h1{max-width:930px;margin:22px 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(48px,8vw,92px);font-weight:500;letter-spacing:-.04em;line-height:.98}.hero .intro{max-width:790px;color:#bdc6c0;font-size:clamp(18px,2vw,23px)}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.proof{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:50px 0 0;padding:0;list-style:none}.proof li{border-top:1px solid rgba(110,231,183,.35);padding:15px 4px;color:#d9e2dc;font-weight:700}.band{padding:76px 0;border-top:1px solid rgba(148,163,184,.13)}.split{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.82fr);gap:70px;align-items:center}.copy h2,.section-title{margin:0 0 18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(35px,4.5vw,62px);font-weight:500;letter-spacing:-.035em;line-height:1.02}.copy p,.audience p,.limits p{color:#aeb8b2;font-size:17px}.visual{display:flex;justify-content:center;min-height:520px;padding:20px;border:1px solid rgba(110,231,183,.22);border-radius:28px;background:linear-gradient(150deg,rgba(16,33,27,.8),rgba(7,12,10,.92));overflow:hidden}.visual img{width:min(100%,280px);height:610px;object-fit:cover;object-position:top;border-radius:22px;border:1px solid rgba(148,163,184,.26);box-shadow:0 24px 70px rgba(0,0,0,.45)}.grid-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.plain-panel{border-top:1px solid rgba(148,163,184,.2);padding:22px 2px}.plain-panel h3{margin:0 0 8px;font-size:18px}.plain-panel p{margin:0;color:#aeb8b2}.faq details{border-top:1px solid rgba(148,163,184,.2);padding:17px 0}.faq summary{cursor:pointer;font-size:17px;font-weight:800}.faq p{max-width:820px;margin:10px 0 0;color:#aeb8b2}.related{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.related-link{display:flex;min-height:138px;flex-direction:column;justify-content:space-between;border:1px solid rgba(148,163,184,.18);border-radius:10px;padding:18px;background:rgba(14,24,20,.55)}.related-link:hover{border-color:rgba(110,231,183,.55)}.related-link span{color:#83e9b0;font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}.related-link strong{font-size:17px;line-height:1.3}.cta{padding:42px;border:1px solid rgba(110,231,183,.28);border-radius:16px;background:rgba(16,33,27,.62)}.cta h2{max-width:700px;margin:0 0 10px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(33px,4vw,54px);font-weight:500;line-height:1}.cta p{max-width:730px;color:#b9c3bd}.footer{border-top:1px solid rgba(148,163,184,.14);padding:16px 0 26px;color:#9ca7a0;font-size:13px}
      @media(max-width:760px){.nav-links,.nav .actions{display:none}.shell{width:min(calc(100% - 28px),680px)}.nav-inner{gap:12px}.button{padding:10px 14px;font-size:13px}.hero-actions .button{width:100%}.hero{padding:76px 0 44px}.hero h1{font-size:clamp(38px,11vw,48px);letter-spacing:-.02em;line-height:1.04;overflow-wrap:break-word}.proof,.related,.grid-two,.split{grid-template-columns:1fr}.split{gap:34px}.band{padding:54px 0}.visual{min-height:auto}.visual img{height:min(650px,138vw)}.actions .secondary{display:none}.cta{padding:28px}.footer-inner{align-items:flex-start;flex-direction:column}}
    </style>
  </head>
  <body>
    <header class="nav">
      <div class="shell nav-inner">
        <a class="brand" href="/"><img src="/assets/brand/app-icon-512.png" alt="" /><span>Aerarium</span></a>
        <nav class="nav-links" aria-label="Primary"><a href="/portfolio-x-ray">Portfolio X-Ray</a><a href="/investment-policy-statement-app">IPS Cockpit</a><a href="/methodology">Methodology</a><a href="/security">Security</a></nav>
        <div class="actions"><a class="quiet" href="${RESEARCH_URL}">Open Research</a><a class="button" href="${TESTFLIGHT_URL}">Join iOS Beta</a></div>
      </div>
    </header>
    <main>
      <section class="shell hero">
        <span class="eyebrow">${escapeHtml(page.eyebrow)}</span>
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="intro">${escapeHtml(page.intro)}</p>
        <div class="hero-actions"><a class="button" href="${TESTFLIGHT_URL}">Join the free iOS beta</a><a class="button secondary" href="/#waitlist">Get App Store launch updates</a></div>
        <ul class="proof">${highlightItems}</ul>
      </section>
      <section class="band">
        <div class="shell split">
          <div class="copy"><h2>${escapeHtml(page.problemTitle)}</h2>${problemParagraphs}</div>
          <figure class="visual"><img src="${page.image}" alt="${escapeHtml(page.imageAlt)}" /></figure>
        </div>
      </section>
      <section class="band">
        <div class="shell copy"><h2>${escapeHtml(page.featureTitle)}</h2>${featureParagraphs}</div>
      </section>
      <section class="band">
        <div class="shell grid-two">
          <div class="plain-panel audience"><h3>Who it is for</h3><p>${escapeHtml(page.audience)}</p></div>
          <div class="plain-panel limits"><h3>What Aerarium does not do</h3><p>${escapeHtml(page.limitations)}</p></div>
        </div>
      </section>
      <section class="band faq">
        <div class="shell"><h2 class="section-title">Questions, answered plainly.</h2>${faqItems}</div>
      </section>
      <section class="band">
        <div class="shell"><h2 class="section-title">Keep exploring Aerarium.</h2><div class="related">${renderRelated(page)}</div></div>
      </section>
      <section class="band">
        <div class="shell cta"><h2>Use visibility to support your own discipline.</h2><p>Aerarium Portfolio is free during the iOS beta. Brokerage sync is read-only, and Aerarium never places trades.</p><div class="hero-actions"><a class="button" href="${TESTFLIGHT_URL}">Join iOS Beta</a><a class="button secondary" href="${RESEARCH_URL}">Open Aerarium Research</a></div></div>
      </section>
    </main>
    <footer class="footer">
      <div class="shell footer-inner"><a class="brand" href="/"><img src="/assets/brand/app-icon-512.png" alt="" /><span>Aerarium</span></a><div><a class="quiet" href="/privacy.html">Privacy</a> · <a class="quiet" href="/terms.html">Terms</a> · <a class="quiet" href="/security">Security</a> · <a class="quiet" href="/methodology">Methodology</a></div></div>
    </footer>
  </body>
</html>`;
}
