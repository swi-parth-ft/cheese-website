"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Device } from "./device";
import type { SceneController, SceneKind } from "../lib/hardware-scene";
function ProductFilm({ kind }: { kind: "hero" | "lineup" }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const requested = useRef(true);
  const refreshPlayback = useRef<() => void>(() => {});
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const portrait = matchMedia("(max-width: 600px)");
    let visible = false;
    const update = () => {
      const next = `/motion/${kind}${portrait.matches ? "-mobile" : ""}.mp4`;
      const currentSource = v.getAttribute("src");
      if (currentSource && currentSource !== next) {
        v.pause();
        v.removeAttribute("src");
        v.load();
        setReady(false);
      }
      if (reduced.matches) {
        v.pause();
        setReady(false);
        return;
      }
      if (visible && !document.hidden && requested.current) {
        if (v.getAttribute("src") !== next) {
          setReady(false);
          v.src = next;
          v.load();
        }
        void v.play().catch(() => {
          if (v.paused) setPlaying(false);
        });
      } else v.pause();
    };
    refreshPlayback.current = update;
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        update();
      },
      { rootMargin: "80px" },
    );
    observer.observe(v);
    document.addEventListener("visibilitychange", update);
    portrait.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      portrait.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      refreshPlayback.current = () => {};
      v.pause();
    };
  }, [kind]);
  return (
    <div
      className={`hardware hardware-${kind} product-film ${ready ? "film-ready" : ""}`}
      role="group"
      aria-label={
        kind === "hero"
          ? "MacBook and iPhone with replaceable app previews"
          : "A collection of Mac models"
      }
    >
      <picture aria-hidden="true">
        <source
          media="(max-width: 600px)"
          srcSet={`/motion/${kind}-mobile-poster.avif`}
        />
        <img
          src={`/motion/${kind}-poster.avif`}
          alt=""
          loading={kind === "hero" ? "eager" : "lazy"}
          fetchPriority={kind === "hero" ? "high" : "auto"}
        />
      </picture>
      <video
        ref={video}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        onLoadedData={() => setReady(true)}
        onPlay={() => setPlaying(true)}
        onPlaying={() => setReady(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setReady(false);
          setPlaying(false);
        }}
      />
      <button
        className="motion-control"
        aria-label={playing ? "Pause animation" : "Play animation"}
        onClick={() => {
          requested.current = !playing;
          refreshPlayback.current();
        }}
      >
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </div>
  );
}
function WorldScene() {
  const host = useRef<HTMLDivElement>(null),
    controller = useRef<SceneController | null>(null),
    requested = useRef(true);
  const [ready, setReady] = useState(false),
    [playing, setPlaying] = useState(true),
    [reduced, setReduced] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let dispose: undefined | (() => void);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    setPlaying(!media.matches && requested.current);
    const start = async () => {
      try {
        const { mountHardwareScene } = await import("../lib/hardware-scene");
        if (cancelled) return;
        const c = await mountHardwareScene(element, "world", media.matches);
        if (cancelled) {
          c.destroy();
          return;
        }
        controller.current = c;
        const motion = () => {
          setReduced(media.matches);
          setPlaying(!media.matches && requested.current);
          c.setReducedMotion(media.matches);
          c.setPlaying(!media.matches && requested.current);
        };
        media.addEventListener("change", motion);
        motion();
        setReady(true);
        dispose = () => {
          media.removeEventListener("change", motion);
          c.destroy();
        };
      } catch {
        if (!cancelled) setReady(false);
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          void start();
        }
      },
      { rootMargin: "500px" },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      dispose?.();
      controller.current = null;
    };
  }, []);
  return (
    <div className={`hardware hardware-world ${ready ? "is-ready" : ""}`}>
      <div className="hardware-fallback" aria-hidden="true">
        <div className="fallback-earth" />
        <Device kind="macbook" />
        <Device kind="iphone" />
      </div>
      <div
        className="hardware-canvas"
        ref={host}
        role="img"
        aria-label="A journey from a Mac on Earth to an iPhone on Mars. Screens are placeholders."
      />
      {ready && !reduced && (
        <>
          <button
            className="motion-control"
            style={{ right: 60 }}
            aria-label="Replay planet journey"
            onClick={() => {
              requested.current = true;
              setPlaying(true);
              controller.current?.replay();
            }}
          >
            <RotateCcw size={14} />
          </button>
          <button
            className="motion-control"
            aria-label={
              playing ? "Pause planet animation" : "Play planet animation"
            }
            onClick={() => {
              requested.current = !playing;
              setPlaying(!playing);
              controller.current?.setPlaying(!playing);
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </>
      )}
    </div>
  );
}
export function Hardware({ kind }: { kind: SceneKind }) {
  return kind === "world" ? <WorldScene /> : <ProductFilm kind={kind} />;
}
