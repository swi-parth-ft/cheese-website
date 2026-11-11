"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Plus,
  Command,
  MousePointer2,
  Volume2,
  ArrowDown,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "../components/site-chrome";
import { Hardware } from "../components/hardware";
import { Highlights } from "../components/highlights";
import { appStoreURL, releasePage } from "../lib/site-config";
import { selectMacRelease } from "../lib/releases";
const questions = [
  [
    "What do I need?",
    "An Apple silicon Mac running macOS 14.5 or later, with Cheese installed. The iPhone and iPad app requires iOS or iPadOS 17.5 or later and is coming to the App Store. You can also connect from another supported Mac.",
  ],
  [
    "Is Cheese free?",
    "Yes. Cheese is free to use. No subscription, no ads, and no Cheese account to create.",
  ],
  [
    "Can I connect away from home?",
    "Yes. Pair your devices nearby first, then enable Connect from anywhere in Cheese’s Remote Access settings on your Mac. Your Mac needs to stay awake, online, and running Cheese. Connection quality depends on both networks.",
  ],
  [
    "Can I use iPad and iPhone together?",
    "Yes. Stream your Mac to iPad, then connect iPhone to the same Mac and choose Controls only. Your iPhone becomes a trackpad and keyboard while your iPad keeps showing the stream.",
  ],
  [
    "Where do my apps run?",
    "On your Mac, just as they always do. Cheese lets you view and control an existing window or your entire desktop from another device.",
  ],
  [
    "How do updates work?",
    "Cheese for Mac includes signed automatic updates. You can also choose Check for Updates in the app. iPhone and iPad updates will come through the App Store once the app is available.",
  ],
];
export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [downloadURL, setDownloadURL] = useState(releasePage);
  const [version, setVersion] = useState<string | null>(null);
  useEffect(() => {
    const abort = new AbortController();
    fetch("https://api.github.com/repos/swi-parth-ft/cheese-releases/releases/latest", { signal: abort.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((r) => {
        const release = selectMacRelease(r);
        if (release) setDownloadURL(release.downloadURL);
        if (release?.version) setVersion(release.version);
      })
      .catch(() => {});
    const elements = root.current?.querySelectorAll("[data-reveal]") ?? [];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    elements.forEach((e) => {
      e.classList.add("will-reveal");
      observer.observe(e);
    });
    return () => {
      abort.abort();
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <SiteHeader />
      <main id="main" ref={root}>
        <section
          className="hero"
          aria-labelledby="hero-title"
          data-scroll-scene
        >
          <div className="hero-copy">
            <p className="hero-name">Cheese</p>
            <h1 id="hero-title">
              Your Mac.
              <br className="hero-break" /> Wherever you are.
            </h1>
            <p className="hero-subtitle">
              Stream and control it from iPhone, iPad, or another Mac.
            </p>
          </div>

          <div className="hero-actions">
            <a className="button" href={downloadURL}>
              Download for Mac
            </a>
            <p className="hero-availability">
              Free for Mac. iPhone and iPad coming soon.
            </p>
          </div>
          <div className="hero-product-scene">
            <img
              src="/devices/hero-cheese.jpg"
              alt="An iPad with Apple Pencil, an upright iPhone, and a foldable device in front."
              width={1280}
              height={1280}
              fetchPriority="high"
            />
          </div>
        </section>
        <section className="world-section" id="anywhere" data-scroll-scene>
          <div className="world-sticky">
            <div className="world-copy section-shell">
              <p className="section-kicker">Remote access</p>
              <h2>
                Your Mac stays.
                <br />
                You go.
              </h2>
            </div>
            <Hardware kind="world" />
            <div className="world-bottom section-shell">
              <p>
                <strong>Your desktop, wherever life takes you.</strong> Turn on
                Remote Access to reach your Mac away from home. Your apps and
                files stay on your Mac. You stay in control.
              </p>
              <a className="text-link" href="/support#connections">
                Explore connections <ChevronRight size={17} />
              </a>
              <small>Your Mac stays awake, online, and running Cheese.</small>
            </div>
          </div>
        </section>
        <section className="overview section-shell" id="overview" data-reveal>
          <h2>
            Your apps. Your files.
            <br />
            <span>Right where you need them.</span>
          </h2>
          <p>
            Bring a Mac window or your whole desktop to iPhone, iPad, or another
            Mac. Your apps keep running on your Mac. You pick up where you left
            off.
          </p>
        </section>
        <section className="showcase-section" id="experience">
          <div className="section-shell section-heading" data-reveal>
            <h2>Get the highlights.</h2>
          </div>
          <Highlights />
        </section>
        <section className="touch-section section-shell">
          <div className="touch-heading" data-reveal>
            <p className="section-kicker">Made to feel natural</p>
            <h2>
              Reach out.
              <br />
              <span>Get things done.</span>
            </h2>
          </div>
          <div className="touch-layout">
            <div className="touch-visual" data-reveal>
              <div className="keycap keycap-command">
                <Command size={41} />
              </div>
              <div className="keycap keycap-c">C</div>
              <div className="cursor-art">
                <MousePointer2 size={92} strokeWidth={1.2} fill="white" />
              </div>
              <div className="touch-rings">
                <i />
                <i />
                <i />
              </div>
              <span className="touch-label">
                Familiar, down to the shortcuts.
              </span>
            </div>
            <div className="touch-copy" data-reveal>
              <p>
                <strong>Mac power. A lighter touch.</strong> Click, scroll, and
                type from your iPhone or iPad. Use an onscreen trackpad for the
                finer details, or connect your keyboard and mouse.
              </p>
              <div className="detail-line">
                <Command />
                <p>
                  <strong>Copy here. Paste there.</strong>
                  <span>Share your clipboard between devices.</span>
                </p>
              </div>
              <div className="detail-line">
                <ArrowUpRight />
                <p>
                  <strong>Your files come along.</strong>
                  <span>Move files between your Mac and your device.</span>
                </p>
              </div>
              <div className="detail-line">
                <Volume2 />
                <p>
                  <strong>And so does the sound.</strong>
                  <span>Hear your Mac’s audio as you work.</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="trust-section section-shell" data-reveal>
          <div className="trust-symbols" aria-label="Touch ID, Face ID, and passcode">
            <img src="/symbols/touchid.png" alt="Touch ID" width={80} height={80} />
            <img src="/symbols/faceid.png" alt="Face ID" width={80} height={80} />
            <img src="/symbols/lock.rectangle.png" alt="Passcode" width={80} height={80} />
          </div>
          <h2>
            Yours.
            <br />
            And only yours.
          </h2>
          <p>
            Approve new devices on your Mac with Touch ID or your Mac password.
            Your connection is encrypted. Your trusted devices stay in your
            control.
          </p>
          <a className="text-link" href="/privacy">
            More about privacy <ChevronRight size={18} />
          </a>
        </section>
        <section className="setup-section" id="setup">
          <div className="section-shell">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Getting started</p>
              <h2>
                A few steps.
                <br />A lot more freedom.
              </h2>
            </div>
            <div className="setup-steps" data-reveal>
              <div>
                <span>1</span>
                <h3>Meet your Mac.</h3>
                <p>
                  Download Cheese. Open it on your Mac and follow the permission
                  prompts.
                </p>
              </div>
              <div>
                <span>2</span>
                <h3>Make a connection.</h3>
                <p>
                  Open Cheese on your other device. Choose your Mac and approve
                  the pairing.
                </p>
              </div>
              <div>
                <span>3</span>
                <h3>Make yourself at home.</h3>
                <p>
                  Choose a window or your desktop. Your Mac is ready when you
                  are.
                </p>
              </div>
            </div>
            <a className="text-link" href="/support">
              Read the setup guide <ChevronRight size={18} />
            </a>
          </div>
        </section>
        <section className="download-section" id="download">
          <div className="download-copy" data-reveal>
            <img
              src="/brand/cheese.png"
              width="82"
              height="82"
              alt="Cheese app icon"
            />
            <h2>Mac. Meet Cheese.</h2>
            <p>A little more freedom for the Mac you love.</p>
            <div className="download-actions">
              <a className="button" href={downloadURL}>
                Download for Mac <ArrowDown size={17} />
              </a>
              {appStoreURL ? (
                <a className="button button-outline" href={appStoreURL}>
                  Download on the App Store
                </a>
              ) : (
                <span className="store-soon">
                  iPhone and iPad
                  <br />
                  <strong>Coming to the App Store</strong>
                </span>
              )}
            </div>
            <div className="download-requirements">
              <span>Apple silicon · macOS 14.5 or later</span>
              <span>
                Free. No account needed.{version ? ` Version ${version}.` : ""}
              </span>
            </div>
            <a
              className="text-link release-link"
              href={releasePage}
              target="_blank"
              rel="noreferrer"
            >
              Release notes <ArrowUpRight size={13} />
            </a>
          </div>
        </section>
        <section className="faq-section section-shell">
          <h2>A few more things.</h2>
          <div className="faq-list">
            {questions.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={21} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <p className="faq-support">
            Need a hand?{" "}
            <a href="/support">
              We’ve got you. <ChevronRight size={14} />
            </a>
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
