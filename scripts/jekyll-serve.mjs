import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const rubyBin = process.env.RUBY_BIN || "C:\\Ruby33-x64\\bin";
const isWindows = process.platform === "win32";
const useRbenv =
  !isWindows && spawnSync("rbenv", ["which", "bundle"], { stdio: "ignore" }).status === 0;
const bundleCommand = isWindows ? path.join(rubyBin, "bundle.bat") : useRbenv ? "rbenv" : "bundle";
const host = process.env.JEKYLL_HOST || "127.0.0.1";
const port = process.env.JEKYLL_PORT || "4102";
const prod = process.argv.includes("--prod");
const installOnly = process.argv.includes("--install-only");
const includeDrafts = !prod && process.env.JEKYLL_DRAFTS !== "false";

const env = {
  ...process.env,
  PATH: isWindows ? `${rubyBin};${process.env.PATH || ""}` : process.env.PATH,
  BUNDLE_PATH: process.env.BUNDLE_PATH || "vendor/bundle",
  BUNDLE_USER_HOME: process.env.BUNDLE_USER_HOME || path.join(root, ".bundle-home"),
  BUNDLE_APP_CONFIG: process.env.BUNDLE_APP_CONFIG || path.join(root, ".bundle")
};

function bundleArgs(args) {
  return useRbenv ? ["exec", "bundle", ...args] : args;
}

function runBundle(args, stdio = "inherit") {
  return spawnSync(bundleCommand, bundleArgs(args), {
    cwd: root,
    env,
    stdio,
    shell: isWindows
  });
}

runBundle(["config", "set", "path", env.BUNDLE_PATH]);

const check = runBundle(["check"], "inherit");
if (check.status !== 0) {
  const install = runBundle(["install"]);
  if (install.status !== 0) {
    process.exit(install.status ?? 1);
  }
}

if (installOnly) {
  process.exit(0);
}

const args = [
  "exec",
  "jekyll",
  "serve",
  "--force_polling",
  "--host",
  host,
  "--port",
  port
];

if (includeDrafts) {
  args.push("--drafts");
}

console.log(`[info] http://${host}:${port}`);
console.log(`[info] ${bundleCommand} ${bundleArgs(args).join(" ")}`);

const child = spawn(bundleCommand, bundleArgs(args), {
  cwd: root,
  env,
  stdio: "inherit",
  shell: isWindows
});

function stopChild() {
  if (child.killed) {
    return;
  }

  if (isWindows && child.pid) {
    spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore"
    });
  } else {
    child.kill();
  }
}

process.on("SIGINT", () => {
  stopChild();
  process.exit(130);
});

process.on("SIGTERM", () => {
  stopChild();
  process.exit(143);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
