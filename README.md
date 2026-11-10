# Cheese website

Marketing website for https://cheesenmac.com. Native application sources are maintained separately.

## Development

Node 22 or later. Run `npm ci`, then `npm run dev`.
`npm run build` exports the complete static site into `out/`.
`npm run check` checks TypeScript and release selection.

Pushes to main deploy automatically through GitHub Pages. DNS is managed at Namecheap.
The download button resolves the latest full Apple silicon installer from the public Cheese releases API, with the release page as fallback.
Screenshots are intentional placeholders. Existing rendered device artwork and onboarding animation are preserved.
