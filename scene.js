/* Anvesha's Café — 3D scenes (Three.js r128)
   CafeScene.hero(el, labelsEl)  full pour-over scene on the landing page
   CafeScene.beans(el)           slow ambient beans behind the café menu heading
   CafeScene.cup(el)             turnable cup with steam on the Coffee Chat page
   Each returns a dispose() function, or null when WebGL is unavailable. */
(function () {
  const T = window.THREE;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function webgl() {
    if (!T) return false;
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }
  const supported = webgl();
  const col = (h) => new T.Color(h).convertSRGBToLinear();

  /* ---------- shared helpers ---------- */
  function renderer(el, o) {
    o = o || {};
    const r = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, o.dpr || 1.75));
    r.outputEncoding = T.sRGBEncoding;
    r.toneMapping = T.ACESFilmicToneMapping;
    r.toneMappingExposure = o.exposure || 1.0;
    r.setClearColor(0x000000, 0);
    if (o.shadows) { r.shadowMap.enabled = true; r.shadowMap.type = T.PCFSoftShadowMap; }
    r.domElement.setAttribute('aria-hidden', 'true');
    el.appendChild(r.domElement);
    return r;
  }

  function environment(r) {
    const pm = new T.PMREMGenerator(r);
    const s = new T.Scene();
    s.background = col('#b89c82');
    const g = new T.PlaneGeometry(1, 1);
    const panel = (c, k, p, rot, sc) => {
      const m = new T.Mesh(g, new T.MeshBasicMaterial({ color: col(c).multiplyScalar(k), side: T.DoubleSide }));
      m.position.set(p[0], p[1], p[2]); m.rotation.set(rot[0], rot[1], rot[2]); m.scale.set(sc[0], sc[1], 1); s.add(m);
    };
    panel('#fff1de', 7, [-5, 3, 2], [0, Math.PI / 2, 0], [5, 4]);     // window, left
    panel('#ffe7cf', 2.2, [0, 6, 0], [Math.PI / 2, 0, 0], [9, 9]);    // ceiling bounce
    panel('#fff8ee', 1.6, [5, 2, 3], [0, -Math.PI / 2, 0], [4, 3]);   // soft fill, right
    panel('#5a4032', 1, [0, -3, 0], [Math.PI / 2, 0, 0], [12, 12]);   // table / floor
    const tex = pm.fromScene(s, 0.035).texture;
    pm.dispose();
    return tex;
  }

  function canvasTexture(w, h, draw) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new T.CanvasTexture(c);
    t.encoding = T.sRGBEncoding; t.anisotropy = 4;
    t.wrapS = T.RepeatWrapping; t.wrapT = T.RepeatWrapping;
    return t;
  }

  function rand(seed) { // small deterministic PRNG so textures look the same every visit
    let s = seed >>> 0;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function woodTexture(base, seed) {
    const R = rand(seed || 7);
    return canvasTexture(512, 256, (g, w, h) => {
      g.fillStyle = base; g.fillRect(0, 0, w, h);
      for (let i = 0; i < 170; i++) {
        const x = R() * w, a = 0.04 + R() * 0.16, dark = R() < 0.6;
        g.strokeStyle = dark ? `rgba(105,66,38,${a})` : `rgba(232,196,152,${a})`;
        g.lineWidth = 0.6 + R() * 2.6;
        g.beginPath(); g.moveTo(x, 0);
        for (let y = 0; y <= h; y += 6) g.lineTo(x + Math.sin(y * 0.025 + i) * 2.5 + (R() - 0.5), y);
        g.stroke();
      }
    });
  }

  function speckleTexture() {
    const R = rand(11);
    return canvasTexture(512, 512, (g, w, h) => {
      g.fillStyle = '#efe6d9'; g.fillRect(0, 0, w, h);
      for (let i = 0; i < 1400; i++) {
        const r = R() < 0.92 ? 0.5 + R() * 1.1 : 1.6 + R() * 1.6;
        g.fillStyle = `rgba(${90 + R() * 50},${55 + R() * 30},${35 + R() * 20},${0.25 + R() * 0.55})`;
        g.beginPath(); g.arc(R() * w, R() * h, r, 0, Math.PI * 2); g.fill();
      }
    });
  }

  function dotTexture() {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.55, 'rgba(255,255,255,.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(c);
  }

  function lathe(points, segs) {
    return new T.LatheGeometry(points.map((p) => new T.Vector2(p[0], p[1])), segs || 72);
  }

  /* ---------- objects ---------- */
  let beanGeo = null;
  function beanGeometry() {
    if (beanGeo) return beanGeo;
    const g = new T.SphereGeometry(1, 44, 30);
    const p = g.attributes.position, v = new T.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      let x = v.x * 0.64, y = v.y, z = v.z * 0.5;
      if (z > 0) {
        z *= 0.78;
        const d = x - 0.08 * Math.sin(y * 2.4);
        const groove = Math.exp(-(d * d) / 0.0055) * (1 - Math.pow(Math.abs(y), 5));
        z -= groove * 0.17;
      }
      p.setXYZ(i, x, y, z);
    }
    g.computeVertexNormals();
    beanGeo = g;
    return g;
  }

  function beanMaterials(env) {
    return ['#4b2617', '#5a2e1a', '#3f2014'].map((c) => new T.MeshPhysicalMaterial({
      color: col(c), roughness: 0.38, metalness: 0, clearcoat: 0.45, clearcoatRoughness: 0.35, envMap: env, envMapIntensity: 0.9
    }));
  }

  function makeBean(mats, i) {
    const m = new T.Mesh(beanGeometry(), mats[i % mats.length]);
    return m;
  }

  function grinder(env) {
    const g = new T.Group();
    const wood = new T.MeshStandardMaterial({ map: woodTexture('#b88a5f', 3), roughness: 0.62, envMap: env, envMapIntensity: 0.6 });
    const metal = new T.MeshStandardMaterial({ color: col('#2c2724'), metalness: 0.85, roughness: 0.32, envMap: env, envMapIntensity: 1.2, side: T.DoubleSide });
    const knobWood = new T.MeshStandardMaterial({ map: woodTexture('#8a5a38', 9), roughness: 0.5, envMap: env, envMapIntensity: 0.7 });

    const base = new T.Mesh(new T.CylinderGeometry(0.96, 1.0, 1.75, 72), wood);
    base.position.y = 0.875;
    const neck = new T.Mesh(new T.CylinderGeometry(0.8, 0.86, 0.12, 64), metal);
    neck.position.y = 1.8;
    const bowl = new T.Mesh(lathe([[0, 0.12], [0.72, 0], [0.8, 0.06], [0.98, 0.22], [1.12, 0.45], [1.17, 0.57], [1.13, 0.58], [1.06, 0.47], [0.9, 0.28], [0.5, 0.15], [0, 0.13]]), metal);
    bowl.position.y = 1.84;
    const axle = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.6, 24), metal);
    axle.position.y = 2.2;
    const crank = new T.Group();
    crank.position.y = 2.5;
    const cap = new T.Mesh(new T.CylinderGeometry(0.14, 0.14, 0.14, 32), metal);
    const arm = new T.Mesh(new T.BoxGeometry(1.15, 0.07, 0.13), metal);
    arm.position.x = -0.56;
    const stem = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.24, 16), metal);
    stem.position.set(-1.1, 0.13, 0);
    const knob = new T.Mesh(new T.SphereGeometry(0.15, 32, 24), knobWood);
    knob.scale.y = 1.15; knob.position.set(-1.1, 0.32, 0);
    crank.add(cap, arm, stem, knob);
    [base, neck, bowl, axle, cap, arm, stem, knob].forEach((m) => { m.castShadow = true; m.receiveShadow = true; });
    g.add(base, neck, bowl, axle, crank);
    return { group: g, crank };
  }

  function glassMaterial(env, opacity) {
    // fresnel glass: clear in the middle, defined at the edges, with a window highlight
    return new T.ShaderMaterial({
      transparent: true, depthWrite: false, side: T.DoubleSide,
      uniforms: { uBase: { value: opacity || 0.06 } },
      vertexShader: `varying vec3 vN; varying vec3 vV;
        void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform float uBase; varying vec3 vN; varying vec3 vV;
        void main(){ vec3 n = normalize(vN); float f = pow(1.0 - abs(dot(n, normalize(vV))), 2.0);
          float hl = smoothstep(0.82, 0.98, abs(dot(n, normalize(vec3(-0.75, 0.25, 0.6)))));
          float hl2 = smoothstep(0.9, 1.0, abs(dot(n, normalize(vec3(0.8, 0.2, 0.55))))) * 0.5;
          vec3 c = mix(vec3(0.99, 0.97, 0.94), vec3(0.36, 0.29, 0.24), f * 0.6);
          c = mix(c, vec3(1.0), clamp(hl + hl2, 0.0, 1.0));
          gl_FragColor = vec4(c, clamp(uBase + f * 0.5 + (hl + hl2) * 0.55, 0.0, 0.85)); }`
    });
  }

  function coffeeMaterial(env) {
    return new T.MeshPhysicalMaterial({ color: col('#1f0f07'), roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.15, envMap: env, envMapIntensity: 0.35 });
  }

  function pourOver(env) {
    const g = new T.Group();
    const glass = glassMaterial(env, 0.05);
    const coffee = coffeeMaterial(env);
    const carafe = new T.Mesh(lathe([[0, 0.005], [0.56, 0.005], [0.74, 0.05], [0.96, 0.3], [1.03, 0.56], [0.96, 0.86], [0.72, 1.2], [0.47, 1.5], [0.44, 1.62]]), glass);
    carafe.renderOrder = 3;
    const liquid = new T.Mesh(lathe([[0, 0.03], [0.53, 0.03], [0.7, 0.07], [0.92, 0.3], [0.985, 0.56], [0.975, 0.64], [0, 0.64]]), coffee);
    liquid.castShadow = true;
    const collar = new T.Mesh(lathe([[0, 1.56], [0.47, 1.56], [0.52, 1.6], [0.53, 1.9], [0.5, 1.96], [0, 1.96]], 64),
      new T.MeshStandardMaterial({ map: woodTexture('#c49a6c', 5), roughness: 0.55, envMap: env, envMapIntensity: 0.6 }));
    collar.castShadow = true;
    const coneGeo = lathe([[0.4, 1.9], [0.5, 2.05], [0.78, 2.55], [1.06, 3.06], [1.1, 3.1]], 96);
    const cp = coneGeo.attributes.position;
    for (let i = 0; i < cp.count; i++) { // vertical ribs
      const x = cp.getX(i), z = cp.getZ(i), a = Math.atan2(z, x), k = 1 + 0.022 * Math.cos(a * 28);
      cp.setX(i, x * k); cp.setZ(i, z * k);
    }
    coneGeo.computeVertexNormals();
    const cone = new T.Mesh(coneGeo, glassMaterial(env, 0.07));
    cone.renderOrder = 4;
    const bed = new T.Mesh(new T.ConeGeometry(0.56, 0.42, 48, 1, false), new T.MeshStandardMaterial({ color: col('#5e3822'), roughness: 0.95 }));
    bed.rotation.x = Math.PI; bed.position.y = 2.3;
    const rimMat = new T.MeshBasicMaterial({ color: col('#fffaf2'), transparent: true, opacity: 0.55, depthWrite: false });
    const rim = new T.Mesh(new T.TorusGeometry(1.1, 0.014, 8, 96), rimMat);
    rim.rotation.x = Math.PI / 2; rim.position.y = 3.1;
    const stream = new T.Mesh(new T.CylinderGeometry(0.022, 0.03, 0.94, 12), new T.MeshPhysicalMaterial({ color: col('#3a1b0c'), roughness: 0.1, clearcoat: 1, transparent: true, opacity: 0.92 }));
    stream.position.y = 1.1;
    const shadowCatch = new T.Mesh(new T.CylinderGeometry(0.98, 1.0, 0.02, 48), new T.ShadowMaterial({ opacity: 0 }));
    shadowCatch.castShadow = true; shadowCatch.position.y = 0.6; // lets the carafe cast a soft shadow
    g.add(liquid, collar, bed, stream, carafe, cone, rim, shadowCatch);
    return { group: g, stream, liquid };
  }

  function cup(env) {
    const g = new T.Group();
    const ceramic = new T.MeshStandardMaterial({ map: speckleTexture(), roughness: 0.5, envMap: env, envMapIntensity: 0.8, side: T.DoubleSide });
    const body = new T.Mesh(lathe([[0, 0.01], [0.52, 0.01], [0.6, 0.04], [0.76, 0.2], [0.86, 0.5], [0.9, 0.84], [0.915, 1.05], [0.87, 1.05], [0.85, 0.84], [0.81, 0.5], [0.7, 0.22], [0, 0.15]]), ceramic);
    const rim = new T.Mesh(new T.TorusGeometry(0.893, 0.024, 12, 96), new T.MeshStandardMaterial({ color: col('#b98a60'), roughness: 0.55 }));
    rim.rotation.x = Math.PI / 2; rim.position.y = 1.05;
    const surface = new T.Mesh(new T.CircleGeometry(0.85, 64), coffeeMaterial(env));
    surface.rotation.x = -Math.PI / 2; surface.position.y = 0.9;
    const handle = new T.Mesh(new T.TorusGeometry(0.31, 0.075, 20, 48, Math.PI * 1.25), ceramic);
    handle.rotation.z = -Math.PI * 0.625; handle.position.set(0.98, 0.58, 0);
    [body, handle].forEach((m) => { m.castShadow = true; m.receiveShadow = true; });
    g.add(body, rim, surface, handle);
    return g;
  }

  const NOISE = `
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x), mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y); }
    float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.03; a *= 0.5; } return v; }`;

  function steam(width, height, opacity) {
    const geo = new T.PlaneGeometry(width, height, 16, 64);
    geo.translate(0, height / 2, 0);
    const mat = new T.ShaderMaterial({
      transparent: true, depthWrite: false, side: T.DoubleSide,
      uniforms: { uTime: { value: 0 }, uColor: { value: new T.Color('#fffaf3') }, uOpacity: { value: opacity || 0.5 } },
      vertexShader: `uniform float uTime; varying vec2 vUv; ${NOISE}
        void main(){ vUv = uv; vec3 p = position;
          float t = noise(vec2(0.5, uv.y*0.9 - uTime*0.12));
          p.x += (t - 0.5) * 0.9 * pow(uv.y, 1.3);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
      fragmentShader: `uniform float uTime; uniform vec3 uColor; uniform float uOpacity; varying vec2 vUv; ${NOISE}
        void main(){ vec2 uv = vUv;
          float s = fbm(vec2(uv.x*3.2, uv.y*1.4 - uTime*0.28));
          s = smoothstep(0.42, 0.95, s);
          float edge = smoothstep(0.0, 0.28, uv.x) * smoothstep(1.0, 0.72, uv.x);
          float v = smoothstep(0.0, 0.12, uv.y) * smoothstep(1.0, 0.45, uv.y);
          float core = mix(1.0 - smoothstep(0.0, 0.32, abs(uv.x - 0.5)), 1.0, smoothstep(0.0, 0.5, uv.y));
          gl_FragColor = vec4(uColor, s * edge * v * core * uOpacity); }`
    });
    return new T.Mesh(geo, mat);
  }

  function lights(scene, o) {
    o = o || {};
    scene.add(new T.HemisphereLight(col('#fff3e4'), col('#8a6a52'), 0.55));
    const key = new T.DirectionalLight(col('#fff0dc'), o.key || 1.25);
    key.position.set(o.x || -9, o.y || 11, o.z || 7);
    if (o.shadow) {
      key.castShadow = true;
      key.shadow.mapSize.set(o.map || 2048, o.map || 2048);
      const c = key.shadow.camera; c.left = -12; c.right = 12; c.top = 9; c.bottom = -6; c.near = 1; c.far = 40;
      key.shadow.radius = 6; key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
    }
    scene.add(key);
    const rimL = new T.DirectionalLight(col('#ffe2c4'), 0.35);
    rimL.position.set(7, 5, -6);
    scene.add(rimL);
    return key;
  }

  function loop(r, frame, el) {
    let raf = 0, last = performance.now(), t0 = last, running = true, visible = true;
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) kick(); }) : null;
    if (io) io.observe(el);
    function tick(now) {
      raf = 0;
      if (!running || document.hidden || !visible) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      frame((now - t0) / 1000, dt);
      if (!reduce) raf = requestAnimationFrame(tick);
    }
    function kick() { if (!raf && running) { last = performance.now(); raf = requestAnimationFrame(tick); } }
    const onVis = () => { if (!document.hidden) kick(); };
    document.addEventListener('visibilitychange', onVis);
    kick();
    return () => { running = false; if (raf) cancelAnimationFrame(raf); if (io) io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }

  function disposeAll(scene, r) {
    scene.traverse((o) => {
      if (o.geometry && o.geometry !== beanGeo) o.geometry.dispose();
      if (o.material) [].concat(o.material).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
    });
    r.dispose();
    if (r.forceContextLoss) r.forceContextLoss();
    if (r.domElement.parentNode) r.domElement.parentNode.removeChild(r.domElement);
  }

  /* ---------- landing: the pour-over scene ---------- */
  function hero(el, labelsEl) {
    if (!supported) return null;
    const small = Math.min(window.innerWidth, window.innerHeight) < 600;
    const r = renderer(el, { shadows: true, exposure: 1.02, dpr: small ? 1.5 : 1.75 });
    const env = environment(r);
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(30, 1, 0.1, 120);
    lights(scene, { shadow: true, map: small ? 1024 : 2048, key: 1.3 });

    // a stone tabletop, and a wall that only catches shadows (the room itself is painted in CSS)
    const marble = canvasTexture(1024, 256, (g, w, h) => {
      const R = rand(5);
      g.fillStyle = '#e4d5c4'; g.fillRect(0, 0, w, h);
      g.filter = 'blur(2px)';
      for (let i = 0; i < 26; i++) {
        g.strokeStyle = `rgba(${150 + R() * 40},${130 + R() * 30},${110 + R() * 25},${0.05 + R() * 0.12})`;
        g.lineWidth = 0.6 + R() * 2.2;
        g.beginPath(); let x = R() * w, y = R() * h; g.moveTo(x, y);
        for (let k = 0; k < 12; k++) { x += 20 + R() * 60; y += (R() - 0.5) * 40; g.lineTo(x, y); }
        g.stroke();
      }
      g.filter = 'none';
    });
    marble.repeat.set(5, 1);
    const table = new T.Mesh(new T.BoxGeometry(60, 0.6, 10.6), new T.MeshStandardMaterial({ map: marble, color: col('#e2d2c0'), roughness: 0.4, metalness: 0, envMap: env, envMapIntensity: 0.35 }));
    table.position.set(0, -0.3, 2.7); table.receiveShadow = true;
    const wall = new T.Mesh(new T.PlaneGeometry(60, 30), new T.ShadowMaterial({ opacity: 0.06 }));
    wall.position.set(0, 10, -2.6); wall.receiveShadow = true;
    // soft occlusion where the table meets the wall
    const ao = new T.Mesh(new T.PlaneGeometry(60, 1.6), new T.MeshBasicMaterial({
      color: col('#6b4a34'), transparent: true, opacity: 0.22, depthWrite: false,
      map: canvasTexture(4, 64, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); })
    }));
    ao.rotation.x = -Math.PI / 2; ao.position.set(0, 0.004, -1.8);
    scene.add(table, wall, ao);

    const G = grinder(env), P = pourOver(env), C = cup(env);
    scene.add(G.group, P.group, C);
    const steamA = steam(1.5, 3.4, 0.95), steamB = steam(1.1, 2.8, 0.6);
    steamB.rotation.y = 0.9;
    scene.add(steamA, steamB);

    const mats = beanMaterials(env);
    // falling beans
    const falling = [];
    for (let i = 0; i < 11; i++) {
      const b = makeBean(mats, i);
      b.userData = { off: i / 11, axis: new T.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(), spin: 2 + Math.random() * 3, jx: (Math.random() - 0.5) * 0.9, jz: (Math.random() - 0.5) * 0.6 };
      falling.push(b); scene.add(b);
    }
    // labelled beans that drift in place
    const LABELS = [
      { text: 'AI', side: 'r' }, { text: 'Research', side: 'r' }, { text: 'Product', side: 'l' }, { text: 'Leadership', side: 'l' }
    ];
    const floating = LABELS.map((l, i) => {
      const b = makeBean(mats, i + 1);
      b.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      scene.add(b);
      return b;
    });
    const labelNodes = labelsEl ? Array.from(labelsEl.children) : [];

    // grounds arc (GPU particles)
    const N = small ? 1100 : 2000;
    const gGeo = new T.BufferGeometry();
    const pos = new Float32Array(N * 3), phase = new Float32Array(N), seed = new Float32Array(N * 3), scl = new Float32Array(N), clr = new Float32Array(N * 3);
    const shades = ['#5b3019', '#6e3c1f', '#4a2614', '#7d4a28', '#3d1f10'].map(col);
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    for (let i = 0; i < N; i++) {
      phase[i] = Math.random();
      seed[i * 3] = gauss(); seed[i * 3 + 1] = gauss(); seed[i * 3 + 2] = gauss() * 0.6;
      scl[i] = 0.5 + Math.pow(Math.random(), 2) * 1.3;
      const c = shades[(Math.random() * shades.length) | 0];
      clr[i * 3] = c.r; clr[i * 3 + 1] = c.g; clr[i * 3 + 2] = c.b;
    }
    gGeo.setAttribute('position', new T.BufferAttribute(pos, 3));
    gGeo.setAttribute('aPhase', new T.BufferAttribute(phase, 1));
    gGeo.setAttribute('aSeed', new T.BufferAttribute(seed, 3));
    gGeo.setAttribute('aScale', new T.BufferAttribute(scl, 1));
    gGeo.setAttribute('aColor', new T.BufferAttribute(clr, 3));
    gGeo.boundingSphere = new T.Sphere(new T.Vector3(0, 3, 0), 30);
    const gMat = new T.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uTime: { value: 0 }, uA: { value: new T.Vector3() }, uB: { value: new T.Vector3() }, uC: { value: new T.Vector3() }, uSize: { value: 0.05 }, uPx: { value: 600 }, uMap: { value: dotTexture() } },
      vertexShader: `uniform float uTime, uSize, uPx; uniform vec3 uA, uB, uC;
        attribute float aPhase, aScale; attribute vec3 aSeed, aColor; varying vec3 vColor; varying float vAlpha;
        void main(){ float u = fract(uTime * 0.2 + aPhase);
          vec3 p = mix(mix(uA, uB, u), mix(uB, uC, u), u);
          float s = sin(3.14159 * u);
          p += aSeed * (0.07 + s * 0.42);
          p.y -= s * s * abs(aSeed.y) * 0.3;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * aScale * uPx / -mv.z;
          vColor = aColor; vAlpha = smoothstep(0.0, 0.07, u) * (1.0 - smoothstep(0.9, 1.0, u)); }`,
      fragmentShader: `uniform sampler2D uMap; varying vec3 vColor; varying float vAlpha;
        void main(){ float a = texture2D(uMap, gl_PointCoord).a; if (a < 0.05) discard; gl_FragColor = vec4(vColor, a * vAlpha); }`
    });
    const grounds = new T.Points(gGeo, gMat);
    grounds.frustumCulled = false;
    scene.add(grounds);

    // grounds scattered on the table beside the carafe
    const S = 420, sGeo = new T.BufferGeometry(), sPos = new Float32Array(S * 3);
    sGeo.setAttribute('position', new T.BufferAttribute(sPos, 3));
    const scatter = new T.Points(sGeo, new T.PointsMaterial({ color: col('#5a301a'), size: 0.045, map: dotTexture(), transparent: true, depthWrite: false, alphaTest: 0.1 }));
    scene.add(scatter);

    // drops falling from the cone
    const drop = new T.Mesh(new T.SphereGeometry(0.04, 12, 10), coffeeMaterial(env));
    scene.add(drop);

    const layout = { cam: new T.Vector3(), look: new T.Vector3(), labels: false, path: {} };
    function place(w, h) {
      const aspect = w / h, portrait = aspect < 0.95;
      camera.aspect = aspect;
      const fov = 30, tan = Math.tan((fov / 2) * Math.PI / 180);
      camera.fov = fov;
      let gx, px, cx, cupS, needW, tableF, cz = 0;
      if (portrait) { gx = -2.45; px = 0.55; cx = 3.25; cupS = 1.05; needW = 8.7; tableF = 0.88; cz = 0.9; }
      else if (aspect < 1.45) { gx = -3.4; px = 0.9; cx = 4.9; cupS = 1.25; needW = 14.2; tableF = 0.88; }
      else { gx = -3.3; px = 1.45; cx = 5.75; cupS = 1.38; needW = 19; tableF = 0.885; }
      let dist = needW / (2 * tan * aspect);
      if (!portrait) dist = Math.max(dist, 18.5);
      const hh = dist * tan;
      const lookY = (tableF - 0.5) * 2 * hh;
      layout.look.set(0.6 * (gx + cx) * 0.25, lookY, 0);
      layout.cam.set(layout.look.x, lookY + 1.1, dist);
      G.group.position.set(gx, 0, 0);
      G.group.rotation.y = 0.35;
      P.group.position.set(px, 0, 0.1);
      P.group.scale.setScalar(portrait ? 0.92 : 0.95);
      C.position.set(cx, 0, cz); C.scale.setScalar(cupS); C.rotation.y = -0.15;
      steamA.position.set(cx - 0.05, 1.05 * cupS, cz); steamA.scale.setScalar(cupS);
      steamB.position.set(cx + 0.05, 1.05 * cupS, cz - 0.05); steamB.scale.setScalar(cupS);
      // bean path: from upper left into the grinder bowl
      const bowl = new T.Vector3(gx, 2.42, 0);
      layout.path = { start: new T.Vector3(gx - (portrait ? 1.4 : 0.85), portrait ? 5.6 : 5.75, 0), ctrl: new T.Vector3(gx - (portrait ? 0.7 : 0.35), portrait ? 4.4 : 4.4, 0), end: bowl };
      const spots = portrait
        ? [[gx - 1.3, 5.2, 0.3], [gx + 0.5, 4.5, 0.2], [gx - 2.0, 4.1, 0], [gx - 0.6, 3.5, 0.4]]
        : [[gx - 3.25, 5.0, 0.3], [gx - 1.95, 4.55, 0.2], [gx - 2.65, 3.85, 0], [gx - 1.75, 3.2, 0.4]];
      floating.forEach((b, i) => { b.userData.home = new T.Vector3(spots[i][0], spots[i][1], spots[i][2]); b.scale.setScalar(portrait ? 0.2 : 0.23); });
      falling.forEach((b) => b.scale.setScalar(portrait ? 0.19 : 0.22));
      layout.labels = aspect >= 1.45 && w >= 760;
      if (labelsEl) labelsEl.style.display = layout.labels ? '' : 'none';
      // grounds arc: grinder bowl → over the top → into the cone
      const coneTop = new T.Vector3(px - 0.05, 2.75, 0.1);
      gMat.uniforms.uA.value.set(gx + 0.35, 2.45, 0.05);
      gMat.uniforms.uC.value.copy(coneTop);
      gMat.uniforms.uB.value.set((gx + px) / 2 - 0.3, portrait ? 5.0 : 5.25, 0.1);
      gMat.uniforms.uPx.value = (h * r.getPixelRatio()) / (2 * tan);
      const R = rand(21);
      for (let i = 0; i < S; i++) {
        const t = R(), spread = (R() + R() - 1);
        sPos[i * 3] = px - 1.5 + t * 4.2 + spread * 0.3;
        sPos[i * 3 + 1] = 0.012;
        sPos[i * 3 + 2] = 0.9 + spread * 0.7 * (1 - t * 0.6);
      }
      sGeo.attributes.position.needsUpdate = true;
      scatter.material.size = 0.05;
      P.stream.position.x = 0;
      camera.updateProjectionMatrix();
      r.setSize(w, h, false);
    }
    function resize() { const b = el.getBoundingClientRect(); place(Math.max(1, b.width), Math.max(1, b.height)); }
    resize();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(el); else window.addEventListener('resize', resize);

    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const onMove = (e) => { mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener('pointermove', onMove, { passive: true });

    const tmp = new T.Vector3(), q = new T.Quaternion();
    const bez = (a, b, c, u, out) => out.set(
      (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * b.x + u * u * c.x,
      (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * b.y + u * u * c.y,
      (1 - u) * (1 - u) * a.z + 2 * (1 - u) * u * b.z + u * u * c.z);

    function frame(t, dt) {
      const time = reduce ? 2.2 : t;
      // gentle intro dolly
      const intro = reduce ? 1 : Math.min(1, t / 2.2), ease = 1 - Math.pow(1 - intro, 3);
      mouse.sx += (mouse.x - mouse.sx) * 0.05; mouse.sy += (mouse.y - mouse.sy) * 0.05;
      camera.position.set(layout.cam.x + mouse.sx * 0.55, layout.cam.y - mouse.sy * 0.3 + (1 - ease) * 0.6, layout.cam.z + (1 - ease) * 2.2);
      camera.lookAt(layout.look);

      G.crank.rotation.y = time * 1.6;
      const p = layout.path;
      falling.forEach((b) => {
        const d = b.userData, u = (time * 0.34 + d.off) % 1, e = Math.pow(u, 1.45);
        bez(p.start, p.ctrl, p.end, e, tmp);
        tmp.x += d.jx * (1 - e); tmp.z += d.jz * (1 - e);
        b.position.copy(tmp);
        const s0 = b.scale.x || 0.22, base = layout.labels || camera.aspect >= 0.95 ? 0.22 : 0.19;
        const k = Math.min(1, u / 0.08) * (u > 0.94 ? Math.max(0, (1 - u) / 0.06) : 1);
        b.scale.setScalar(base * k);
        q.setFromAxisAngle(d.axis, time * d.spin + d.off * 6);
        b.quaternion.copy(q);
        void s0;
      });
      floating.forEach((b, i) => {
        const h = b.userData.home;
        b.position.set(h.x + Math.sin(time * 0.5 + i) * 0.06, h.y + Math.sin(time * 0.8 + i * 1.7) * 0.09, h.z);
        b.rotation.x += dt * 0.25; b.rotation.y += dt * (0.18 + i * 0.04);
      });
      gMat.uniforms.uTime.value = time;
      steamA.material.uniforms.uTime.value = time;
      steamB.material.uniforms.uTime.value = time + 7.3;
      // drip
      const pg = P.group, dp = (time * 0.9) % 1;
      drop.position.set(pg.position.x, (1.56 - dp * 0.92) * pg.scale.y, pg.position.z);
      drop.visible = dp < 0.96;
      P.stream.scale.x = P.stream.scale.z = 0.85 + Math.sin(time * 9) * 0.12;

      r.render(scene, camera);

      if (layout.labels && labelNodes.length) {
        const w = el.clientWidth, hh = el.clientHeight;
        floating.forEach((b, i) => {
          tmp.copy(b.position).project(camera);
          const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * hh;
          const n = labelNodes[i];
          if (n) n.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
        });
      }
    }
    const stop = loop(r, frame, el);
    if (labelsEl) labelsEl.classList.add('ready');
    return () => {
      stop();
      if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      env.dispose();
      disposeAll(scene, r);
    };
  }

  /* ---------- café menu: ambient beans ---------- */
  function beans(el) {
    if (!supported) return null;
    const r = renderer(el, { exposure: 1.05, dpr: 1.5 });
    const env = environment(r);
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(32, 1, 0.1, 60);
    camera.position.set(0, 0, 14);
    lights(scene, { key: 1.1, x: -6, y: 8, z: 8 });
    const mats = beanMaterials(env);
    // [fraction of half-width, y, z, scale]: kept clear of the centred heading
    const spots = [[-0.66, 1.6, -2, 0.62], [-0.8, -1.4, 1, 0.5], [-0.92, -2.6, -4, 0.45], [-0.74, 2.7, -5, 0.36], [0.68, 1.9, -1, 0.58], [0.82, -1.6, 1.4, 0.48], [0.93, -2.3, -4, 0.44], [0.75, 2.8, -5, 0.34]];
    const list = spots.map((s, i) => {
      const b = makeBean(mats, i);
      b.userData = { fx: s[0], x: 0, y: s[1], z: s[2], s: s[3], ph: Math.random() * 6, rs: 0.15 + Math.random() * 0.25 };
      b.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      scene.add(b);
      return b;
    });
    function resize() {
      const w = Math.max(1, el.clientWidth), h = Math.max(1, el.clientHeight);
      camera.aspect = w / h;
      const tan = Math.tan(16 * Math.PI / 180);
      camera.position.z = 14;
      camera.updateProjectionMatrix();
      r.setSize(w, h, false);
      list.forEach((b) => {
        const d = b.userData, half = (camera.position.z - d.z) * tan * camera.aspect;
        d.x = d.fx * half;
        b.visible = w >= 900 || Math.abs(d.fx) > 0.85;
      });
    }
    resize();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(el);
    let my = 0, mx = 0;
    const onMove = (e) => { mx = (e.clientX / window.innerWidth - 0.5); my = (e.clientY / window.innerHeight - 0.5); };
    window.addEventListener('pointermove', onMove, { passive: true });
    const stop = loop(r, (t, dt) => {
      list.forEach((b) => {
        const d = b.userData, sc = d.s * (camera.aspect < 1 ? 0.8 : 1);
        b.scale.setScalar(sc);
        b.position.set(d.x + mx * (d.z + 6) * 0.08, d.y + Math.sin(t * 0.6 + d.ph) * 0.25 - my * (d.z + 6) * 0.06, d.z);
        b.rotation.x += dt * d.rs; b.rotation.y += dt * d.rs * 0.7;
      });
      r.render(scene, camera);
    }, el);
    return () => { stop(); if (ro) ro.disconnect(); window.removeEventListener('pointermove', onMove); env.dispose(); disposeAll(scene, r); };
  }

  /* ---------- coffee chat: a cup you can turn ---------- */
  function cupScene(el) {
    if (!supported) return null;
    const r = renderer(el, { shadows: true, exposure: 1.05, dpr: 2 });
    const env = environment(r);
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 2.3, 6.0);
    camera.lookAt(0, 1.15, 0);
    const key = lights(scene, { shadow: true, map: 1024, key: 1.3, x: -5, y: 9, z: 6 });
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3;
    const ground = new T.Mesh(new T.CircleGeometry(4, 48), new T.ShadowMaterial({ opacity: 0.18 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
    scene.add(ground);
    const holder = new T.Group();
    const c = cup(env);
    c.position.x = -0.12;
    holder.add(c);
    scene.add(holder);
    const st = steam(1.3, 2.6, 0.75);
    st.position.set(-0.12, 1.06, 0);
    scene.add(st);
    st.material.uniforms.uColor.value = new T.Color('#ffffff');
    st.material.uniforms.uOpacity.value = 0.9;
    function resize() { const s = Math.max(1, el.clientWidth); camera.aspect = 1; camera.updateProjectionMatrix(); r.setSize(s, s, false); }
    resize();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(el);
    let rot = -0.5, vel = 0.25, drag = false, lastX = 0;
    const down = (e) => { drag = true; lastX = e.clientX; el.setPointerCapture && el.setPointerCapture(e.pointerId); el.classList.add('dragging'); };
    const move = (e) => { if (!drag) return; const dx = e.clientX - lastX; lastX = e.clientX; rot += dx * 0.012; vel = dx * 0.6; };
    const up = () => { drag = false; el.classList.remove('dragging'); };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    const stop = loop(r, (t, dt) => {
      if (!drag) { vel += (0.25 - vel) * 0.03; rot += vel * dt; }
      holder.rotation.y = rot;
      st.material.uniforms.uTime.value = t;
      r.render(scene, camera);
    }, el);
    return () => { stop(); if (ro) ro.disconnect(); env.dispose(); disposeAll(scene, r); };
  }

  window.CafeScene = { supported, hero, beans, cup: cupScene };
})();
