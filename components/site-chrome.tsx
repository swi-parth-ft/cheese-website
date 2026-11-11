"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <a className="brand" href="/" aria-label="Cheese home">
            <img src="/brand/cheese.png" width="25" height="25" alt="" />
            <span>Cheese</span>
          </a>
          <nav
            className={`main-nav ${open ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            <a href="/#anywhere" onClick={() => setOpen(false)}>
              Remote access
            </a>
            <a href="/#experience" onClick={() => setOpen(false)}>
              Experience
            </a>
            <a href="/support" onClick={() => setOpen(false)}>
              Support
            </a>
          </nav>
          <div className="nav-actions">
            <button
              className="menu-toggle"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <ChevronDown size={20} />
            </button>
            <a className="button button-small" href="/#download">
              Get Cheese
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-notes">
          <p>
            Cheese for Mac requires Apple silicon and macOS 14.5 or later.
            Cheese for iPhone and iPad requires iOS or iPadOS 17.5 or later and
            is coming to the App Store.
          </p>
          <p>
            Device displays are screenshot placeholders. Remote connections
            require your Mac to be awake, online, and running Cheese.
            Availability and performance depend on your devices and network.
          </p>
        </div>
        <div className="footer-nav">
          <a className="brand" href="/">
            <img src="/brand/cheese.png" width="22" height="22" alt="" />
            <span>Cheese</span>
          </a>
          <nav aria-label="Footer">
            <a href="/support">Support</a>
            <a href="/privacy">Privacy Policy</a>
            <a
              href="https://github.com/swi-parth-ft/cheese-releases/releases"
              target="_blank"
              rel="noreferrer"
            >
              Release notes
            </a>
          </nav>
        </div>
        <p className="footer-credit">
          Cheese is an independent app. Not affiliated with Apple.
        </p>
      </div>
    </footer>
  );
}
