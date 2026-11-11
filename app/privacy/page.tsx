import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../../components/site-chrome";

export const metadata: Metadata = {
  title: "Privacy Policy — Cheese",
  description:
    "How Cheese handles encrypted connections, remote discovery, permissions, files, clipboard contents, and updates.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="document-page" id="main">
        <header className="document-intro">
          <a className="text-link" href="/">
            ← Back to Cheese
          </a>
          <p className="eyebrow">Your devices. Your business.</p>
          <h1>Privacy Policy</h1>
          <p>
            How Cheese handles your connections and the information you choose
            to share.
          </p>
        </header>
        <div className="document-content">
          <p className="document-date">Updated November 10, 2026</p>
          <section>
            <h2>No Cheese account required.</h2>
            <p>
              Cheese connects devices you pair with a Mac. The apps include no
              advertising or analytics SDK. Your preferences and paired-device
              information stay on your devices; pairing keys and saved
              authentication credentials use the system keychain.
            </p>
            <p>
              A paired controller can view and control the Mac and access files
              available to its logged-in user. Pair only devices you trust.
              Remove a controller in the Mac’s Devices settings to revoke its
              access. Keep pairing required unless you understand the effect of
              disabling that setting.
            </p>
          </section>
          <section>
            <h2>Encrypted connections. Clear boundaries.</h2>
            <p>
              Nearby devices can connect over a local network, USB, or Direct
              Wireless. Built-in internet access uses Iroh discovery to find
              connection addresses and attempts a direct encrypted connection.
              When a direct route is unavailable, it may use an encrypted relay.
            </p>
            <p>
              Discovery and relay operators can receive network metadata,
              including IP addresses, endpoint identifiers, connection times,
              and traffic volume. Your paired-session contents remain encrypted
              in transit. These services do not receive readable screen,
              password, clipboard, or file contents.
            </p>
            <p>
              If ordinary discovery fails, iPhone and iPad can query Iroh
              discovery over HTTPS and use Cloudflare DNS-over-HTTPS to resolve
              the discovery service. Cloudflare receives that hostname lookup
              and the device’s network address. The lookup does not contain your
              screen, clipboard, files, or password.
            </p>
            <p>
              An optional VPN backup, such as Tailscale, is subject to that
              provider’s services and privacy practices. The built-in connection
              does not require a Tailscale account.
            </p>
          </section>
          <section>
            <h2>What moves between your devices.</h2>
            <p>
              A session carries the picture and your input. Depending on the
              features you use, it can also carry Mac audio, microphone audio,
              menu and window information, device names, model information, and
              stream settings.
            </p>
            <p>
              Files and clipboard contents move when you choose the relevant
              transfer, copy, or paste action. Folder and file names are
              exchanged when you browse Mac Files. Saved Mac passwords are sent
              only as part of an authentication or unlock action through the
              authenticated, encrypted connection.
            </p>
            <p>
              Transfers use local temporary files. Completed uploads remain in
              the Mac folder you selected. Clipboard files may remain in a local
              cache so another app can finish using them. Cleanup is performed
              during later use, rather than at a guaranteed time. Files you save
              or share with another app follow that app’s storage rules.
            </p>
          </section>
          <section>
            <h2>Permissions have a purpose.</h2>
            <p>
              Screen Recording lets the host Mac share its picture.
              Accessibility lets Cheese send input and inspect supported app
              controls. Local Network access enables nearby discovery. Camera
              access is used to scan pairing codes; Cheese does not save the
              camera feed.
            </p>
            <p>
              Microphone access is used for optional forwarding or dictation.
              Trackpad dictation on supported devices uses Apple’s on-device
              speech models; Apple may supply a language-model download. The
              audio is processed on your iPhone or iPad, and recognized text
              goes to the paired Mac. Microphone forwarding instead sends audio
              to the Mac when you enable it.
            </p>
            <p>
              You can review or revoke permissions in your device’s system
              settings.
            </p>
          </section>
          <section>
            <h2>Diagnostics stay local unless you share them.</h2>
            <p>
              Local logs can contain app or window names, device names, network
              addresses, connection errors, and performance information. Cheese
              does not automatically upload these logs to its developer. Review
              a log or connection report before sharing it.
            </p>
            <p>
              Apple may provide crash reports when you use TestFlight or enable
              developer analytics sharing in system settings. Those services are
              governed by Apple’s settings and privacy practices.
            </p>
          </section>
          <section>
            <h2>Downloads, updates, and this website.</h2>
            <p>
              Mac downloads and update checks use GitHub. GitHub and its
              download providers receive ordinary request metadata, such as your
              IP address. Update requests do not include your pairing keys,
              password, screen, clipboard, or files. You can turn automatic
              updates off in Cheese.
            </p>
            <p>
              This website links to GitHub for Mac downloads. The future iPhone
              and iPad download link will open Apple’s App Store. These are
              separate services with their own privacy practices. Website
              hosting also necessarily processes requests to deliver these pages
              and assets.
            </p>
          </section>
          <section>
            <h2>Removing your information.</h2>
            <p>
              Forget a Mac on your controlling device, remove paired controllers
              on the host Mac, and remove saved passwords in Cheese. Deleting an
              app does not necessarily delete its keychain entries. Revoking the
              pairing on the host Mac prevents those keys from reconnecting.
            </p>
            <p>
              On Mac, preferences, logs, receive folders, clipboard caches, and
              update recovery files are stored separately from the app and may
              remain after removing it. Files you deliberately saved elsewhere
              must be removed from those locations.
            </p>
            <p>
              For setup and troubleshooting information, visit{" "}
              <a href="/support">Cheese support</a>.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
