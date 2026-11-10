import * as THREE from "three";
import geometry from "./planet-sprite-geometry.json";
export type SceneKind = "hero" | "world" | "lineup";
export type SceneController = {
  replay: () => void;
  setPlaying: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  destroy: () => void;
};
const clamp = (n: number) => Math.min(1, Math.max(0, n));
async function deviceSprite(kind: "macbook" | "iphone") {
  const d = geometry[kind];
  // Exact native model poses and normalization are baked into these sprites.
  const texture = await new THREE.TextureLoader().loadAsync(
    `/devices/planet-${kind}.png`,
  );
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      toneMapped: false,
      alphaTest: 0.01,
    }),
  );
  sprite.scale.set(d.planeWidth, d.planeHeight, 1);
  sprite.position.set(d.planeOffsetX, d.planeOffsetY, 0);
  const group = new THREE.Group();
  group.add(sprite);
  return group;
}
function sphere(
  radius: number,
  color: THREE.ColorRepresentation,
  roughness = 0.65,
) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, 64, 48),
    new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 }),
  );
}

/** Geometry and colors mirror iOSClient/OnboardingPlanets.swift. */
function earth() {
  const globe = new THREE.Group();
  globe.add(sphere(0.78, 0x1f8ae0, 0.38));
  const outlines = [
    [
      [-40, 47],
      [-22, 60],
      [-9, 55],
      [-5, 43],
      [-16, 29],
      [-12, 14],
      [-27, 7],
      [-37, 20],
      [-43, 32],
    ],
    [
      [-25, 8],
      [-10, 4],
      [-3, -13],
      [-14, -32],
      [-23, -49],
      [-31, -28],
      [-35, -9],
    ],
    [
      [16, 12],
      [34, 18],
      [47, 7],
      [45, -13],
      [33, -33],
      [23, -21],
      [19, -4],
    ],
    [
      [12, 25],
      [19, 43],
      [37, 49],
      [48, 62],
      [65, 56],
      [78, 39],
      [71, 18],
      [54, 15],
      [42, 28],
      [29, 22],
    ],
    [
      [65, -28],
      [78, -23],
      [86, -34],
      [78, -42],
      [67, -40],
    ],
  ];
  const direction = ([lon, lat]: number[]) =>
    new THREE.Vector3(
      Math.sin(THREE.MathUtils.degToRad(lon)) *
        Math.cos(THREE.MathUtils.degToRad(lat)),
      Math.sin(THREE.MathUtils.degToRad(lat)),
      Math.cos(THREE.MathUtils.degToRad(lon)) *
        Math.cos(THREE.MathUtils.degToRad(lat)),
    );
  const landMaterial = new THREE.MeshStandardMaterial({
    color: 0x66c470,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  for (const outline of outlines) {
    const center = outline
      .reduce((sum, point) => [sum[0] + point[0], sum[1] + point[1]], [0, 0])
      .map((n) => n / outline.length);
    const points = [center, ...outline].map(direction),
      vertices: number[] = [],
      normals: number[] = [];
    const triangle = (
      a: THREE.Vector3,
      b: THREE.Vector3,
      c: THREE.Vector3,
      depth: number,
    ) => {
      if (depth) {
        const ab = a.clone().add(b).normalize(),
          bc = b.clone().add(c).normalize(),
          ca = c.clone().add(a).normalize();
        triangle(a, ab, ca, depth - 1);
        triangle(ab, b, bc, depth - 1);
        triangle(ca, bc, c, depth - 1);
        triangle(ab, bc, ca, depth - 1);
        return;
      }
      for (const n of [a, b, c]) {
        normals.push(n.x, n.y, n.z);
        vertices.push(n.x * 0.792, n.y * 0.792, n.z * 0.792);
      }
    };
    for (let index = 1; index <= outline.length; index++)
      triangle(
        points[0],
        points[index],
        points[index === outline.length ? 1 : index + 1],
        3,
      );
    const mesh = new THREE.BufferGeometry();
    mesh.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    mesh.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    globe.add(new THREE.Mesh(mesh, landMaterial));
  }
  const pole = sphere(0.22, 0xffffff);
  pole.scale.set(1.6, 0.16, 1.1);
  pole.position.set(0, -0.75, 0);
  globe.add(pole);
  for (let index = 0; index < 7; index++) {
    const angle = index * 0.87 + 0.4,
      cloud = new THREE.Group();
    for (let puff = 0; puff < 3; puff++) {
      const part = sphere(0.075 + (puff % 2) * 0.015, 0xffffff);
      part.scale.set(1.25, 0.48, 0.6);
      part.position.x = (puff - 1) * 0.085;
      cloud.add(part);
    }
    const latitude = ((index % 3) - 1) * 0.33;
    cloud.position.set(
      Math.sin(angle) * Math.cos(latitude) * 0.85,
      Math.sin(latitude) * 0.85,
      Math.cos(angle) * Math.cos(latitude) * 0.85,
    );
    cloud.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      cloud.position.clone().normalize(),
    );
    globe.add(cloud);
  }
  return globe;
}
function mars() {
  const planet = new THREE.Group();
  planet.add(sphere(0.66, 0xd96640));
  for (let index = 0; index < 15; index++) {
    const longitude = index * 2.4,
      latitude = ((index % 5) - 2) * 0.28;
    const normal = new THREE.Vector3(
      Math.sin(longitude) * Math.cos(latitude),
      Math.sin(latitude),
      Math.cos(longitude) * Math.cos(latitude),
    );
    const crater = new THREE.Group();
    const rim = sphere(0.065 + (index % 3) * 0.018, 0xf08554);
    rim.scale.set(1, 1, 0.18);
    crater.add(rim);
    const basin = sphere(0.049 + (index % 3) * 0.014, 0xad4a33);
    basin.scale.set(1, 1, 0.09);
    basin.position.z = 0.014;
    crater.add(basin);
    crater.position.copy(normal).multiplyScalar(0.655);
    crater.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    planet.add(crater);
  }
  return planet;
}

/** Direct port of OnboardingPlanets.Coordinator.update, standard iPhone variant. */
function planetFrame(
  elapsed: number,
  aspect: number,
  wide: boolean,
  reduced: boolean,
) {
  const raw = reduced ? 1 : clamp((elapsed - 1) / 3.2);
  const progress = raw ** 3 * (raw * (raw * 6 - 15) + 10);
  const tangent = Math.tan(Math.PI / 10);
  const near = Math.max(3.6, 1.18 / (aspect * tangent)),
    far = near * 14;
  const marsScale = 2.3,
    marsRadius = 0.66 * marsScale;
  const planetCoverage = Math.min(aspect, 1.25) * 0.82;
  const foregroundDistance = marsRadius / (tangent * planetCoverage);
  const cameraDepth = near + (far - near) * progress,
    cameraHalfHeight = cameraDepth * tangent;
  const camera = new THREE.Vector3(
    cameraHalfHeight * aspect * 0.5 * progress,
    0.2 * (1 - progress) + (-0.28 - cameraHalfHeight * 0.46) * progress,
    cameraDepth,
  );
  const reveal = clamp((progress - 0.2) / 0.8),
    arrival = reveal * reveal * (3 - 2 * reveal);
  const marsDepth = far * 2 * (1 - arrival) + foregroundDistance * arrival;
  const marsHalfHeight = marsDepth * tangent;
  const verticalPosition = -1.6 * (1 - arrival) + (wide ? -1 : -0.26) * arrival;
  const marsPosition = camera
    .clone()
    .add(
      new THREE.Vector3(
        marsHalfHeight * aspect * 1.6 * (1 - arrival),
        marsHalfHeight * verticalPosition,
        -marsDepth,
      ),
    );
  return {
    progress,
    arrival,
    camera,
    marsPosition,
    marsScale,
    earthRotation: -0.1 + (reduced ? 0 : elapsed * 0.12),
    marsRotation: 0.12 + (reduced ? 0 : elapsed * 0.15),
    phoneY: 1.0 + (reduced ? 0 : Math.sin(elapsed * 1.2) * 0.015),
  };
}

export async function mountHardwareScene(
  host: HTMLElement,
  _kind: SceneKind,
  reduced: boolean,
): Promise<SceneController> {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(36, 1, 0.01, 1000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xa3b4c1, 1.2));
  for (const position of [
    [-3, 5, 6],
    [4, 2, 1],
  ]) {
    const light = new THREE.DirectionalLight(0xffffff, 2.6);
    light.position.set(...(position as [number, number, number]));
    scene.add(light);
  }
  let playing = true,
    visible = false,
    started = false,
    disposed = false,
    raf = 0,
    elapsed = 0,
    last = 0;
  let mac: THREE.Group, phone: THREE.Group;
  try {
    [mac, phone] = await Promise.all([
      deviceSprite("macbook"),
      deviceSprite("iphone"),
    ]);
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  const earthGroup = new THREE.Group(),
    marsGroup = new THREE.Group();
  const earthSurface = earth(),
    marsSurface = mars();
  earthGroup.add(earthSurface, mac);
  earthGroup.position.set(0, -0.28, 0);
  marsGroup.add(marsSurface, phone);
  mac.position.set(0, 1.12, 0);
  phone.position.set(0, 1.0, 0);
  scene.add(earthGroup, marsGroup);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  function draw(time: number) {
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min(0.1, (time - last) / 1000 || 0);
    last = time;
    if (playing && started && !reduced) elapsed += dt;
    const frame = planetFrame(
      elapsed,
      camera.aspect,
      camera.aspect > 1,
      reduced,
    );
    camera.position.copy(frame.camera);
    camera.quaternion.identity();
    marsGroup.scale.setScalar(frame.marsScale);
    marsGroup.position.copy(frame.marsPosition);
    earthSurface.rotation.y = frame.earthRotation;
    marsSurface.rotation.y = frame.marsRotation;
    phone.position.y = frame.phoneY;
    renderer.render(scene, camera);
    if (playing && started && !reduced) raf = requestAnimationFrame(draw);
  }
  function resume() {
    cancelAnimationFrame(raf);
    if (disposed || !visible || document.hidden) return;
    last = performance.now();
    draw(last);
  }
  const resize = new ResizeObserver((entries) => {
    const r = entries[0].contentRect;
    if (!r.width || !r.height) return;
    renderer.setSize(r.width, r.height);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
    resume();
  });
  resize.observe(host);
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      visible = entry.isIntersecting;
      if (entry.intersectionRatio >= 0.35) started = true;
      if (visible) resume();
      else cancelAnimationFrame(raf);
    },
    { rootMargin: "0px", threshold: [0, 0.35] },
  );
  observer.observe(host);
  const visibility = () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (visible) resume();
  };
  document.addEventListener("visibilitychange", visibility);
  return {
    replay() {
      elapsed = 0;
      started = true;
      playing = true;
      resume();
    },
    setPlaying(value) {
      playing = value;
      resume();
    },
    setReducedMotion(value) {
      reduced = value;
      resume();
    },
    destroy() {
      disposed = true;
      cancelAnimationFrame(raf);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      renderer.dispose();
      renderer.domElement.remove();
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>(),
        textures = new Set<THREE.Texture>();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) geometries.add(o.geometry);
        if (o instanceof THREE.Mesh || o instanceof THREE.Sprite) {
          const list = Array.isArray(o.material) ? o.material : [o.material];
          list.forEach((m: THREE.Material) => {
            materials.add(m);
            const map = (m as THREE.MeshStandardMaterial).map;
            if (map) textures.add(map);
          });
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    },
  };
}
