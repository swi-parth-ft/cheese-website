import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../../components/site-chrome";

export const metadata: Metadata = {
  title: "Getting started & support — Cheese",
  description:
    "Set up Cheese for Mac, pair your devices, and find help with connections, permissions, updates, and file transfers.",
};

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <main className="document-page" id="main">
        <header className="document-intro">
          <a className="text-link" href="/">
            ← Back to Cheese
          </a>
          <p className="eyebrow">A little help</p>
          <h1>
            Make yourself
            <br />
            at home.
          </h1>
          <p>Everything you need to get your Mac a little closer.</p>
        </header>
        <div className="document-content">
          <section id="install">
            <h2>Start with your Mac.</h2>
            <p>
              Cheese for Mac requires an Apple silicon Mac running macOS 14.5 or
              later. The iPhone and iPad app requires iOS or iPadOS 17.5 or
              later.
            </p>
            <ol>
              <li>
                <a href="/#download">Download Cheese for Mac</a>. The current
                download is a ZIP archive.
              </li>
              <li>
                Open the ZIP, then move Cheese.app into your Applications
                folder.
              </li>
              <li>
                Open Cheese and follow the permission prompts. Cheese also stays
                available from its menu bar icon.
              </li>
            </ol>
            <p>
              Already have Cheese installed? Use its update controls below
              instead of replacing an active installation. The iPhone and iPad
              app is coming to the App Store; this website will link to its
              listing when it is available.
            </p>
          </section>
          <section id="permissions">
            <h2>Give your Mac permission.</h2>
            <p>
              On the Mac you want to control, allow{" "}
              <strong>Screen Recording</strong> so Cheese can show your windows,
              and <strong>Accessibility</strong> so it can click, scroll, and
              type. If macOS asks for <strong>Local Network</strong> access,
              allow it so nearby devices can find each other.
            </p>
            <p>
              You can review these in System Settings → Privacy &amp; Security.
              Follow any macOS instruction to quit and reopen the app after
              changing a permission. A Mac used only to view another Mac does
              not need screen-recording or accessibility permission for viewing.
            </p>
            <p>
              On iPhone and iPad, allow Local Network. Camera permission is only
              needed to scan a pairing code. Microphone permission is requested
              for dictation or optional microphone forwarding.
            </p>
          </section>
          <section id="pairing">
            <h2>Pair once. Come back anytime.</h2>
            <p>
              Start with both devices on the same local network. Open Cheese on
              your iPhone or iPad and select your Mac. Approve the request on
              your Mac with Touch ID or your Mac login password. Follow the
              in-app instructions if you use a pairing code or a cable instead.
            </p>
            <p>
              To control another Mac, open <strong>Computers</strong> from the
              Cheese menu, choose the other Mac, and follow the pairing
              instructions. Both Macs need Cheese.
            </p>
            <p>
              Only pair devices you trust. You can remove a paired controller in
              Cheese’s Devices settings on the host Mac. If an old app asks you
              to update before connecting, update both ends before trying again.
            </p>
          </section>
          <section id="iphone-controls">
            <h2>Your iPad, the screen. Your iPhone, the controls.</h2>
            <p>
              Use both together: your iPad shows the Mac stream while your
              iPhone becomes a trackpad and keyboard for the same Mac.
            </p>
            <ol>
              <li>Pair your iPad and iPhone with the same Mac.</li>
              <li>Start viewing your Mac on iPad.</li>
              <li>
                Connect from iPhone and select <strong>Controls only</strong> in
                the <strong>Choose a screen</strong> options. If you are already
                connected, open <strong>Connection mode</strong> and switch to
                <strong> Controls only</strong>.
              </li>
            </ol>
            <p>
              Move with one finger, scroll with two, and tap to click. The
              keyboard and shortcut controls let you type and use familiar Mac
              commands. Your iPad keeps streaming while iPhone handles input.
            </p>
          </section>
          <section id="connections">
            <h2>Connect nearby or away.</h2>
            <p>
              Nearby, Cheese works over your local network or a USB cable.
              Optional <strong>Direct Wireless Connection</strong> lets an
              iPhone or iPad connect to a nearby Mac without a shared network.
            </p>
            <p>
              Away from home, enable <strong>Connect from anywhere</strong> in
              the Mac’s Remote Access settings. Connect your paired device
              nearby after enabling it so its saved connection details are
              current. The built-in connection needs no extra account or VPN
              app. An already-configured Tailscale connection can serve as a
              backup.
            </p>
            <p>
              Your Mac must stay awake, online, and running Cheese. If a
              connection fails, check these first, then check that the device
              has Wi-Fi or cellular access. Network conditions affect picture
              quality and responsiveness. You can lower quality or resolution in
              the session settings.
            </p>
            <p>
              For a persistent remote connection problem, use{" "}
              <strong>Share Connection Report</strong> in the connection menu.
              Review the report before sharing it; Cheese does not automatically
              send it to anyone.
            </p>
          </section>
          <section id="power">
            <h2>Keep your Mac ready.</h2>
            <p>
              <strong>Keep awake while Remote Access is on</strong> prevents
              idle sleep between connections. Optional{" "}
              <strong>Power protection</strong> also handles power changes and
              closing the lid, and requires one-time approval in macOS.
            </p>
            <p>
              After enabling it, check that Cheese reports{" "}
              <strong>“Power protection is on.”</strong> Keep your Mac
              ventilated. Protection pauses at low battery, and it cannot make
              an offline or powered-off Mac available.
            </p>
            <p>
              If Cheese requests approval to repair its helper during an update,
              complete the approval while the existing app remains open.
              Cancelling leaves the current app open.
            </p>
          </section>
          <section id="updates">
            <h2>Stay up to date.</h2>
            <p>
              Choose <strong>Check for Updates</strong> from the Cheese menu.
              Automatic updates can be managed in Settings → General → Updates.
              An update briefly restarts Cheese and may interrupt a connection.
            </p>
            <p>
              For an older installation without the current updater, get{" "}
              <strong>Cheese-Update-Setup.zip</strong> from the{" "}
              <a
                href="https://github.com/swi-parth-ft/cheese-releases/releases/latest"
                target="_blank"
                rel="noreferrer"
              >
                official releases
              </a>
              , open Update Cheese.app, and follow its instructions. This setup
              app requires Cheese to already be installed in Applications.
            </p>
            <p>
              The latest release page also includes version information and
              checksums. The regular app ZIP is the download to use for a first
              installation.
            </p>
          </section>
          <section id="files">
            <h2>Bring your files along.</h2>
            <p>
              Use <strong>Files</strong> in your iPhone or iPad session to
              browse your Mac, download a file or folder, or send files from the
              system picker. Folders download as ZIP archives. Incoming files go
              to the Mac’s chosen receive folder; the default is
              Downloads/Cheese.
            </p>
            <p>
              Clipboard transfer happens when you choose a copy or paste action.
              The receiving app must accept the content type. Mac-to-Mac
              clipboard transfer supports text, links, and PNG images; it does
              not sync in the background.
            </p>
            <p>
              If a transfer is interrupted, reconnect and try it again. macOS
              file permissions still apply, so a protected folder may need
              permission on your Mac.
            </p>
          </section>
          <section>
            <h2>A note on privacy.</h2>
            <p>
              Your paired connections are encrypted. Remote discovery and relay
              providers may receive connection metadata. Read{" "}
              <a href="/privacy">how Cheese handles your data</a> for the
              details.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
