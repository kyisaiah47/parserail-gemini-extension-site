import { PRODUCT } from '@/lib/product';
import Link from 'next/link';
import PageViews from '@/components/site-view/PageViews';
import ViewControls from '@/components/site-view/ViewControls';
import SimplePage from '@/components/site-view/SimplePage';
import CopyCommand from '@/components/site-view/CopyCommand';
import { SimpleFrame } from '@/components/site-view/SimpleChrome';

const GEMINI_EXTENSIONS = 'https://github.com/google-gemini/gemini-cli/blob/main/docs/extensions/reference.md';
const PRODUCT_README = `${PRODUCT.repo}/blob/main/README.md`;
const MANIFEST = `${PRODUCT.repo}/blob/main/gemini-extension.json`;

export const metadata = { title: 'How to install ParseRail for Gemini CLI', description: 'Install and verify the ParseRail Gemini CLI extension, including its API-key setting and restart step.', alternates: { canonical: `https://${PRODUCT.host}/install` } };

/* One set of facts, two compositions. Both views render these nodes, so they state the same thing. */
const TITLE = 'How do you install ParseRail for Gemini CLI?';
const INTRO = 'Run the GitHub install command in a terminal, provide the ParseRail API key when Gemini CLI asks for it, then restart Gemini CLI and confirm the extension appears in the extension list.';
const FETCHED = 'This guide reflects the ParseRail repository and Gemini CLI extension reference fetched on 2026-10-02.';
const STEPS_HEADING = 'What are the installation steps?';
const VERIFY_HEADING = 'How do you verify the extension?';
const STEPS = [
  { title: 'Install from the repository.', body: <>Run <code>{PRODUCT.install}</code> outside Gemini CLI&apos;s interactive mode. Gemini CLI&apos;s reference says the install command accepts a GitHub URL or local path, and GitHub installs require Git. <a href={GEMINI_EXTENSIONS}>Read the Gemini CLI reference.</a></> },
  { title: 'Enter the API key.', body: <>When the installer prompts for settings, provide the ParseRail API key. The extension manifest declares the setting as <code>PARSERAIL_API_KEY</code> and marks it sensitive. <a href={MANIFEST}>Read the manifest.</a></> },
  { title: 'Restart the session.', body: <>Close and reopen Gemini CLI after installation or configuration. The Gemini CLI reference says extension management changes take effect after restart.</> },
];
const VERIFY = <>Run <code>gemini extensions list</code> in a terminal, or run <code>/extensions list</code> inside Gemini CLI. Gemini CLI documents both commands for checking installed extensions; the interactive slash command is the safe in-session check. Then ask Gemini to use a ParseRail document tool with one source such as a file URL, text, or base64 file input.</>;
const REGISTERS = <><strong>What this extension registers:</strong> the ParseRail MCP server, the bundled <code>GEMINI.md</code> context file, and the sensitive <code>PARSERAIL_API_KEY</code> setting. The product repository&apos;s README contains the install command and the manifest is the source for the registration details. <a href={PRODUCT_README}>README</a> · <a href={MANIFEST}>manifest</a></>;

export default function InstallGuide() {
  return <PageViews simpleView={<SimpleFrame><SimpleInstall /></SimpleFrame>} consoleView={<ConsoleInstall />} />;
}

function SimpleInstall() {
  return <SimplePage eyebrow="GEMINI CLI · PROCEDURE" title={TITLE} intro={<p>{INTRO}</p>}>
    <CopyCommand command={PRODUCT.install} label="Install command" />
    <p className="sv-terms">{FETCHED}</p>
    <section className="sv-section" id="steps">
      <div className="sv-section-intro"><div><span className="sv-eyebrow">01 / PROCEDURE</span><h2>{STEPS_HEADING}</h2></div><p>terminal → setting → restart</p></div>
      <ol className="sv-cards">{STEPS.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>
    </section>
    <section className="sv-section" id="verify">
      <div className="sv-section-intro"><div><span className="sv-eyebrow">02 / VERIFY</span><h2>{VERIFY_HEADING}</h2></div><p>one command</p></div>
      <div className="sv-result"><p className="sv-lead">{VERIFY}</p><p className="sv-note">{REGISTERS}</p></div>
    </section>
    <nav className="sv-home-links" aria-label="Next steps">
      <Link href="/">Back to the extension register ↗</Link>
      <a href={PRODUCT_README} target="_blank" rel="noreferrer">Read the README ↗</a>
      <a href={MANIFEST} target="_blank" rel="noreferrer">Read the manifest ↗</a>
      <a href={GEMINI_EXTENSIONS} target="_blank" rel="noreferrer">Read the Gemini CLI reference ↗</a>
    </nav>
  </SimplePage>;
}

function ConsoleInstall() {
  return <div className="site-shell guide-shell">
    <header className="masthead"><Link className="brand" href="/"><span className="brand-mark">◈</span><span>{PRODUCT.name}</span></Link><span className="crumb">INSTALL GUIDE</span><nav><Link href="/">Register</Link><a href="#steps">Steps</a><a href="#verify">Verify</a></nav></header>
    <main>
      <section className="content-grid intro guide-hero"><div className="rail"><span className="eyebrow">GEMINI CLI / PROCEDURE</span><span className="rail-note">READ FIRST<br />UPDATED 2026-10-02</span></div><div className="lead"><h1>{TITLE}</h1><p>{INTRO}</p><div className="install-box"><span className="prompt">$</span><code>{PRODUCT.install}</code></div><p className="install-note">{FETCHED}</p></div></section>
      <section id="steps" className="section content-grid"><div className="rail"><span className="section-no">01</span><span className="eyebrow">PROCEDURE</span><span className="rail-note">THREE CHECKS<br />FROM SOURCE</span></div><div className="section-main"><div className="section-head"><h2>{STEPS_HEADING}</h2><span>terminal → setting → restart</span></div><ol className="guide-steps">{STEPS.map((step) => <li key={step.title}><strong>{step.title}</strong><p>{step.body}</p></li>)}</ol></div></section>
      <section id="verify" className="section content-grid"><div className="rail"><span className="section-no">02</span><span className="eyebrow">VERIFY</span><span className="rail-note">CONFIRM<br />THE ROUTE</span></div><div className="section-main"><div className="section-head"><h2>{VERIFY_HEADING}</h2><span>one command</span></div><p className="guide-answer">{VERIFY}</p><div className="callout"><p>{REGISTERS}</p></div></div></section>
    </main>
    <footer className="footer"><div className="footer-top"><span>ParseRail for Gemini CLI.</span><Link href="/">Back to the extension register</Link></div><div className="footer-bottom"><span>Sources fetched 2026-10-02 · Gemini CLI reference · ParseRail README · extension manifest</span></div><div className="foot-view"><ViewControls /></div></footer>
  </div>;
}
