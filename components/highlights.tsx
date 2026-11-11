"use client";

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type KeyboardEvent,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DeviceKind } from "./device";

export type Highlight = {
  id: string;
  device: DeviceKind | "pair";
  eyebrow: string;
  title: readonly [string, string];
  description: string;
};

const defaultHighlights: readonly Highlight[] = [
  {
    id: "iphone",
    device: "iphone",
    eyebrow: "Cheese on iPhone",
    title: ["A whole Mac.", "In your hands."],
    description:
      "Bring your Mac desktop to iPhone, with touch controls and an onscreen trackpad.",
  },
  {
    id: "ipad",
    device: "ipad",
    eyebrow: "Cheese on iPad",
    title: ["One window.", "Room to focus."],
    description:
      "Open a single Mac window on iPad, or take in your entire desktop.",
  },
  {
    id: "controls",
    device: "pair",
    eyebrow: "iPad + iPhone",
    title: ["Mac on iPad.", "iPhone in control."],
    description:
      "Keep your Mac stream on iPad. Use iPhone to move, scroll, click, and type.",
  },
  {
    id: "macbook",
    device: "macbook",
    eyebrow: "Cheese on Mac",
    title: ["Your other Mac.", "Right at home."],
    description:
      "Connect to another paired Mac with the keyboard and trackpad you already know.",
  },
];

function ControlsPair() {
  return (
    <img
      className="controls-composed"
      src="/devices/controls-landscape.png"
      alt="An iPad with Apple Pencil and a landscape iPhone lying in front as a trackpad controller. Screens are placeholders."
      loading="lazy"
    />
  );
}

/** Large, directly draggable product panels. Navigation is always user initiated. */
export function HighlightsCarousel({
  items = defaultHighlights,
  label = "Explore Cheese on your devices",
}: {
  items?: readonly Highlight[];
  label?: string;
}) {
  const id = useId().replace(/:/g, "");
  const viewportId = `${id}-highlights`;
  const [viewportRef, api] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: false,
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false,
    duration: 32,
    breakpoints: {
      "(prefers-reduced-motion: reduce)": { duration: 0 },
    },
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncSelection = (carousel: EmblaCarouselType) => {
      setSelected(carousel.selectedScrollSnap());
    };
    // Embla's drag release has its own inertia duration. Snap immediately
    // after a gesture when reduced motion is requested, as button navigation does.
    const settleGesture = (carousel: EmblaCarouselType) => {
      if (reduced.matches)
        carousel.scrollTo(carousel.selectedScrollSnap(), true);
    };
    syncSelection(api);
    api.on("select", syncSelection);
    api.on("reInit", syncSelection);
    api.on("pointerUp", settleGesture);
    return () => {
      api.off("select", syncSelection);
      api.off("reInit", syncSelection);
      api.off("pointerUp", settleGesture);
    };
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (
        !api ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      const target = event.target as HTMLElement;
      const isCarousel = target.hasAttribute("data-carousel-viewport");
      const isControl = target.closest("[data-carousel-control]");
      if (!isCarousel && !isControl) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        api.scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        api.scrollNext();
      }
    },
    [api],
  );

  return (
    <div
      className="highlights-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      <div
        className="highlights-viewport"
        id={viewportId}
        ref={viewportRef}
        tabIndex={0}
        data-carousel-viewport
        aria-label="Highlights. Use the left and right arrow keys to explore."
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="highlights-track">
          {items.map((item, index) => (
            <article
              className={`highlight-slide highlight-${item.device}`}
              key={item.id}
              id={`${id}-slide-${item.id}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}: ${item.eyebrow}`}
              data-active={selected === index ? "true" : "false"}
            >
              <div className="highlight-copy">
                <p className="highlight-eyebrow">{item.eyebrow}</p>
                <h3>
                  {item.title[0]}
                  <br />
                  {item.title[1]}
                </h3>
                <p className="highlight-description">{item.description}</p>
              </div>
              <div className="highlight-art">
                {item.device === "pair" ? (
                  <ControlsPair />
                ) : (
                  <img
                    className="highlight-composed"
                    src={`/devices/${item.device}-composed.avif`}
                    alt={`${item.eyebrow}: ${item.device === "iphone" ? "an upright iPhone" : "hardware resting on a surface"}, with a replaceable screenshot placeholder.`}
                    loading="lazy"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div
        className="highlights-controls"
        role="group"
        aria-label="Highlight navigation"
      >
        <div
          className="highlights-dots"
          role="group"
          aria-label="Choose a highlight"
        >
          {items.map((item, index) => (
            <button
              type="button"
              key={item.id}
              data-carousel-control
              aria-label={`Show highlight ${index + 1} of ${items.length}: ${item.eyebrow}`}
              aria-current={selected === index ? "true" : undefined}
              aria-controls={`${id}-slide-${item.id}`}
              onClick={() => api?.scrollTo(index)}
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="highlights-arrows">
          <button
            type="button"
            data-carousel-control
            aria-label="Previous highlight"
            aria-controls={viewportId}
            onClick={() => api?.scrollPrev()}
            disabled={items.length < 2}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <ChevronLeft size={21} aria-hidden="true" />
          </button>
          <button
            type="button"
            data-carousel-control
            aria-label="Next highlight"
            aria-controls={viewportId}
            onClick={() => api?.scrollNext()}
            disabled={items.length < 2}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <ChevronRight size={21} aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="highlights-note">App previews are placeholders.</p>
      <span
        className="highlights-status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      >
        {items[selected]
          ? `Highlight ${selected + 1} of ${items.length}. ${items[selected].title.join(" ")}`
          : ""}
      </span>
    </div>
  );
}

/** Short alias for the product page. */
export const Highlights = HighlightsCarousel;
