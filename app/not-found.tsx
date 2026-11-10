import { SiteHeader, SiteFooter } from "../components/site-chrome";
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="document-page">
        <div className="document-intro">
          <p className="eyebrow">A little off course</p>
          <h1>
            This window
            <br />
            isn’t here.
          </h1>
          <p>Let’s get you back to Cheese.</p>
          <a className="button" href="/">
            Back to home
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
