import puppeteer from "puppeteer-core";
const OUT =
  "C:/Users/DINESH~1/AppData/Local/Temp/claude/d--ad-ascent/c10a6065-fabd-4722-912c-1b885b73db02/scratchpad";
const URL = "http://localhost:4321/";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });

const errs = [];
const p = await b.newPage();
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
p.on("pageerror", (e) => errs.push("pageerror:" + e.message));
await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await p.goto(URL, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 900));
await p.screenshot({ path: OUT + "/w-hero-light.png" });

// hero unfold
await p.evaluate(() => window.scrollTo(0, window.innerHeight * 1.0));
await new Promise((r) => setTimeout(r, 700));
await p.screenshot({ path: OUT + "/w-hero-unfold.png" });

// diagram animated (scroll #how, wait for build)
await p.evaluate(() => document.getElementById("how").scrollIntoView());
await new Promise((r) => setTimeout(r, 1700));
await (await p.$("#how")).screenshot({ path: OUT + "/w-how.png" });

const m = await p.evaluate(() => ({ overflow: document.documentElement.scrollWidth > window.innerWidth + 1, sw: document.documentElement.scrollWidth }));
console.log("desktop overflow:", m.overflow, "sw", m.sw);
console.log("console errors:", errs.length ? errs.join(" | ") : "none");

// full light + dark (reduced-motion so everything visible)
const rp = await b.newPage();
await rp.setViewport({ width: 1440, height: 900 });
await rp.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await rp.goto(URL, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 700));
await rp.screenshot({ path: OUT + "/w-full-light.png", fullPage: true });
await rp.evaluate(() => localStorage.setItem("theme", "dark"));
await rp.goto(URL, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 700));
await rp.screenshot({ path: OUT + "/w-full-dark.png", fullPage: true });

// mobile
const mp = await b.newPage();
await mp.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
await mp.goto(URL, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 600));
const mm = await mp.evaluate(() => ({ overflow: document.documentElement.scrollWidth > window.innerWidth + 1 }));
console.log("mobile overflow:", mm.overflow);
await mp.screenshot({ path: OUT + "/w-mobile-hero.png" });

await b.close();
console.log("done");
