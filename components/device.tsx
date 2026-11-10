import { useId } from "react";
import geometry from "../lib/device-geometry.json";
import bzlsGeometry from "../lib/bzls-device-geometry.json";
/** Replace these images with your screenshots. Device bezels and masks remain untouched. */
export const screenshots = {
  macbook: "/devices/macbook-screen.jpg",
  ipad: "/devices/ipad-screen.jpg",
  iphone: "/devices/iphone-screen.jpg",
};
export type DeviceKind = keyof typeof screenshots;
export const controlsScreenshot = "/devices/iphone-controls-screen.jpg";
export function Device({
  kind,
  className = "",
  variant = "default",
  screen = screenshots[kind],
}: {
  kind: DeviceKind;
  className?: string;
  variant?: "default" | "bzls";
  screen?: string;
  eager?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const { d, prefix } =
    variant === "bzls" && kind !== "macbook"
      ? { d: bzlsGeometry[kind], prefix: "/devices/bzls" }
      : { d: geometry[kind], prefix: "/devices" };
  const [tl, tr, , bl] = d.screenQuad;
  const transform = `matrix(${(tr[0] - tl[0]) / d.screenWidth} ${(tr[1] - tl[1]) / d.screenWidth} ${(bl[0] - tl[0]) / d.screenHeight} ${(bl[1] - tl[1]) / d.screenHeight} ${tl[0]} ${tl[1]})`;
  const label =
    kind === "macbook"
      ? "MacBook"
      : kind === "ipad"
        ? variant === "bzls"
          ? "iPad with Magic Keyboard"
          : "iPad"
        : "iPhone";
  return (
    <svg
      className={`device-render ${className}`}
      viewBox={`0 0 ${d.width} ${d.height}`}
      width={d.width}
      height={d.height}
      role="img"
      aria-labelledby={`${id}-title`}
    >
      <title
        id={`${id}-title`}
      >{`${label} in 3D with a placeholder for a future Cheese screenshot`}</title>
      <defs>
        <mask
          id={`${id}-mask`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={d.width}
          height={d.height}
          style={{ maskType: "alpha" }}
        >
          <image
            href={`${prefix}/${kind}-screen-mask.png`}
            width={d.width}
            height={d.height}
          />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`}>
        <image
          href={screen}
          width={d.screenWidth}
          height={d.screenHeight}
          preserveAspectRatio="xMidYMid slice"
          transform={transform}
        />
      </g>
      <image
        href={`${prefix}/${kind}-bezel.png`}
        width={d.width}
        height={d.height}
      />
    </svg>
  );
}
