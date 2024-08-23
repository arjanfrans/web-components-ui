let A = "x";
function X(s) {
  A = s;
}
function d(s, t, i) {
  window.customElements.define(
    `${A}-${s}`,
    t,
    i
  );
}
function l() {
  return A;
}
function o(s) {
  return `var(--${l()}-${s})`;
}
function G() {
  document.addEventListener("DOMContentLoaded", function() {
    const s = `${l()}-theme`, t = document.querySelector(s);
    if (!t)
      throw new Error(`Not theme tag found: ${s}`);
    if (t.style.display !== "none")
      throw new Error(
        'Theme tag needs inline style of "display: none"  for the wait functionality to work.'
      );
    t && customElements.get(s) ? t.style.display = "" : customElements.whenDefined(s).then(() => {
      t.style.display = "";
    });
  });
}
var g = /* @__PURE__ */ ((s) => (s[s.XS = 480] = "XS", s[s.MD = 600] = "MD", s[s.LG = 960] = "LG", s[s.XL = 1280] = "XL", s))(g || {});
function p(s) {
  let t = 0, i = 0, e = 0;
  return s.length === 4 ? (t = parseInt(s[1] + s[1], 16), i = parseInt(s[2] + s[2], 16), e = parseInt(s[3] + s[3], 16)) : s.length === 7 && (t = parseInt(s[1] + s[2], 16), i = parseInt(s[3] + s[4], 16), e = parseInt(s[5] + s[6], 16)), `${t}, ${i}, ${e}`;
}
function h(s, t) {
  let i = !1;
  s[0] === "#" && (s = s.slice(1), i = !0);
  const e = parseInt(s, 16);
  let n = (e >> 16) + t;
  n = n > 255 ? 255 : n < 0 ? 0 : n;
  let a = (e >> 8 & 255) + t;
  a = a > 255 ? 255 : a < 0 ? 0 : a;
  let r = (e & 255) + t;
  return r = r > 255 ? 255 : r < 0 ? 0 : r, (i ? "#" : "") + (16777216 + (n << 16) + (a << 8) + r).toString(16).slice(1);
}
function O(s, t, i, e, n) {
  function a(r, c, u, m) {
    const v = m ? 60 : -60, k = p(r), w = p(c), $ = p(u);
    return {
      primary: {
        50: h(r, 100),
        100: h(r, 70),
        200: h(r, 50),
        300: h(r, 30),
        400: h(r, 20),
        500: r,
        600: h(r, -10),
        700: h(r, -20),
        800: h(r, -30),
        900: h(r, -50)
      },
      secondary: {
        50: h(r, -100),
        100: h(r, -70),
        200: h(r, -50),
        300: h(r, -30),
        400: h(r, -20),
        500: h(r, -10),
        600: h(r, -20),
        700: h(r, -30),
        800: h(r, -40),
        900: h(r, -50)
      },
      background: {
        50: h(c, 100),
        100: h(c, 70),
        200: h(c, 50),
        300: h(c, 30),
        400: h(c, 20),
        500: c,
        600: h(c, -10),
        700: h(c, -20),
        800: h(c, -30),
        900: h(c, -50),
        1e3: h(c, -80)
      },
      neutral: {
        background: c,
        text: u,
        border: h(c, v)
      },
      rgb: {
        primary: k,
        secondary: p(h(r, -20)),
        background: w,
        text: $,
        border: p(h(c, v))
      }
    };
  }
  return {
    light: a(
      s,
      i,
      t,
      !1
    ),
    dark: a(s, n, e, !0)
  };
}
function W(s) {
  function t(e) {
    const { primary: n, secondary: a, neutral: r, rgb: c, background: u } = s[e];
    return `
      --${e}-primary-50: ${n[50]};
      --${e}-primary-100: ${n[100]};
      --${e}-primary-200: ${n[200]};
      --${e}-primary-300: ${n[300]};
      --${e}-primary-400: ${n[400]};
      --${e}-primary-500: ${n[500]};
      --${e}-primary-600: ${n[600]};
      --${e}-primary-700: ${n[700]};
      --${e}-primary-800: ${n[800]};
      --${e}-primary-900: ${n[900]};


      --${e}-primary-100_rgb: ${p(n[100])};
      --${e}-primary-900_rgb: ${p(n[900])};

      --${e}-secondary-50: ${a[50]};
      --${e}-secondary-100: ${a[100]};
      --${e}-secondary-200: ${a[200]};
      --${e}-secondary-300: ${a[300]};
      --${e}-secondary-400: ${a[400]};
      --${e}-secondary-500: ${a[500]};
      --${e}-secondary-600: ${a[600]};
      --${e}-secondary-700: ${a[700]};
      --${e}-secondary-800: ${a[800]};
      --${e}-secondary-900: ${a[900]};

      --${e}-background-50: ${u[50]};
      --${e}-background-100: ${u[100]};
      --${e}-background-200: ${u[200]};
      --${e}-background-300: ${u[300]};
      --${e}-background-400: ${u[400]};
      --${e}-background-500: ${u[500]};
      --${e}-background-600: ${u[600]};
      --${e}-background-700: ${u[700]};
      --${e}-background-800: ${u[800]};
      --${e}-background-900: ${u[900]};
      --${e}-background-1000: ${u[1e3]};

      --${e}-background: ${r.background};
      --${e}-text: ${r.text};
      --${e}-border: ${r.border};

      --${e}-primary_rgb: ${c.primary};
      --${e}-secondary_rgb: ${c.secondary};
      --${e}-background_rgb: ${c.background};
      --${e}-text_rgb: ${c.text};
      --${e}-border_rgb: ${c.border};
    `;
  }
  function i(e) {
    const n = e === "light" ? "dark" : "light";
    return `
      --semantic-stroke-default: var(--${e}-border);
      --semantic-text-default: var(--${e}-text);
      --semantic-text-inverted: var(--${n}-text);
      --semantic-background-default: var(--${e}-background-500);
      --semantic-background-inverted: var(--${n}-background-500);
      --semantic-stroke-highlight: var(--${e}-primary-500);
      --semantic-text-highlight: var(--${e}-primary-500);
      --semantic-background-highlight: var(--${e}-primary-500);

      --semantic-stroke-default_rgb: var(--${e}-border_rgb);
      --semantic-text-default_rgb: var(--${e}-text_rgb);
      --semantic-text-inverted_rgb: var(--${n}-text_rgb);
      --semantic-background-default_rgb: var(--${e}-background_rgb);
      --semantic-background-inverted_rgb: var(--${n}-background_rgb);
      --semantic-stroke-highlight_rgb: var(--${e}-primary_rgb);
      --semantic-text-highlight_rgb: var(--${e}-primary_rgb);
      --semantic-background-highlight_rgb: var(--${e}-primary_rgb);

      --semantic-background-alternate: ${e === "dark" ? `var(--${e}-background-300)` : `var(--${e}-background-700)`};
          
      --semantic-text-hover: ${e === "dark" ? `var(--${e}-primary-100)` : `var(--${e}-primary-900)`};
      
      --semantic-stroke-hover: ${e === "dark" ? `var(--${e}-primary-100)` : `var(--${e}-primary-900)`};

            
      --semantic-stroke-light: ${e === "dark" ? `var(--${e}-background-200)` : `var(--${e}-background-800)`};

      --semantic-background-hover: ${e === "dark" ? `var(--${e}-primary-100)` : `var(--${e}-primary-900)`};

       --semantic-text-hover_rgb: ${e === "dark" ? `var(--${e}-primary-100_rgb)` : `var(--${e}-primary-900_rgb)`};

      --semantic-stroke-hover_rgb: ${e === "dark" ? `var(--${e}-primary-100_rgb)` : `var(--${e}-primary-900_rgb)`};

      --semantic-background-hover_rgb: ${e === "dark" ? `var(--${e}-primary-100_rgb)` : `var(--${e}-primary-900_rgb)`};
      
      
    `;
  }
  return `
    :host {
      ${t("light")}
      ${t("dark")}
    }

    :host([theme='light']) {
      ${i("light")}
    }

    :host([theme='dark']) {
      ${i("dark")}
    }
  `;
}
class U extends HTMLElement {
  constructor() {
    super(), this.styleElement = void 0, this.defaultStyles = {
      fontSizeTitle: "4.25rem",
      fontSizeXxl: "2rem",
      // Heading 2 / Extra Extra Large
      fontSizeXl: "1.75rem",
      // Heading 3 / Extra Large
      fontSizeLg: "1.5rem",
      // Heading 4 / Large
      fontSizeMd: "1.125rem",
      fontSizeSm: "0.975rem",
      fontSizeXs: "0.85rem",
      fontSizeDefault: "1rem",
      // Default font size
      fontFamilyDefault: "sans-serif",
      fontFamilyHeading: "arial",
      colorPrimary: "#ed1c24",
      colorTextLight: "#000000",
      colorTextDark: "#ffffff",
      colorBackgroundLight: "#ffffff",
      colorBackgroundDark: "#000000",
      cardMediaSizeSmall: "24px",
      // Card media size small
      cardMediaSizeMedium: "64px",
      // Card media size medium
      cardMediaSizeLarge: "128px",
      // Card media size large
      appBarHeight: "64px",
      bottomNavigationHeight: "72px"
    }, this.shadow = this.attachShadow({ mode: "open" });
    const t = document.createElement("slot");
    this.shadow.append(t), this.updateStyles();
  }
  static get observedAttributes() {
    return [
      "font-family-heading",
      "font-family-default",
      "font-size-title",
      "font-size-xxl",
      "font-size-xl",
      "font-size-lg",
      "font-size-md",
      "font-size-sm",
      "font-size-default",
      "color-primary",
      "color-text-dark",
      "color-background-dark",
      "color-text-light",
      "color-background-light",
      "card-media-size-sm",
      "card-media-size-md",
      "card-media-size-lg",
      "app-bar-height",
      "bottom-navigation-height"
    ];
  }
  attributeChangedCallback() {
    this.updateStyles();
  }
  updateStyles() {
    const t = this.getAttribute("font-size-title") || this.defaultStyles.fontSizeTitle, i = this.getAttribute("font-size-xxl") || this.defaultStyles.fontSizeXxl, e = this.getAttribute("font-size-xl") || this.defaultStyles.fontSizeXl, n = this.getAttribute("font-size-lg") || this.defaultStyles.fontSizeLg, a = this.getAttribute("font-size-md") || this.defaultStyles.fontSizeMd, r = this.getAttribute("font-size-sm") || this.defaultStyles.fontSizeSm, c = this.getAttribute("font-size-xs") || this.defaultStyles.fontSizeXs, u = this.getAttribute("font-size-default") || this.defaultStyles.fontSizeDefault, m = this.getAttribute("font-family-default") || this.defaultStyles.fontFamilyDefault, v = this.getAttribute("font-family-heading") || this.defaultStyles.fontFamilyHeading, k = this.getAttribute("color-primary") || this.defaultStyles.colorPrimary, w = this.getAttribute("color-text-light") || this.defaultStyles.colorTextLight, $ = this.getAttribute("color-text-dark") || this.defaultStyles.colorTextDark, P = this.getAttribute("color-background-light") || this.defaultStyles.colorBackgroundLight, I = this.getAttribute("color-background-dark") || this.defaultStyles.colorBackgroundDark, q = this.getAttribute("card-media-size-lg") || this.defaultStyles.cardMediaSizeLarge, N = this.getAttribute("card-media-size-md") || this.defaultStyles.cardMediaSizeMedium, _ = this.getAttribute("card-media-size-sm") || this.defaultStyles.cardMediaSizeSmall, j = this.getAttribute("app-bar-height") || this.defaultStyles.appBarHeight, D = this.getAttribute("bottom-navigation-height") || this.defaultStyles.bottomNavigationHeight, R = O(
      k,
      // Primary color
      w,
      // Light mode text color
      P,
      // Light mode background color
      $,
      // Dark mode text color
      I
      // Dark mode background color
    ), F = W(R);
    this.styleElement && this.shadow.removeChild(this.styleElement), this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      :host {
        display: flex;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        height: 100%;
        width: 100%;

        --${l()}-shadow-light: 0 2px 4px rgba(0,0,0,0.05);
        --${l()}-shadow-dark: 0 2px 4px rgba(0,0,0,0.3);

        --${l()}-font-family-default: ${m};
        --${l()}-font-family-heading: ${v};
        --${l()}-font-size-default: ${u};
        --${l()}-font-size-title: ${t};
        --${l()}-font-size-xxl: ${i};
        --${l()}-font-size-xl: ${e};
        --${l()}-font-size-lg: ${n};
        --${l()}-font-size-md: ${a};
        --${l()}-font-size-sm: ${r};
        --${l()}-font-size-xs: ${c};

        --${l()}-border-xs: 4px;
        --${l()}-border-sm: 15px;

        /* Spacing Variables */
        --${l()}-spacing-xs: 4px; 
        --${l()}-spacing-sm: 8px;    
        --${l()}-spacing-md: 12px;  
        --${l()}-spacing-lg: 16px;     
        --${l()}-spacing-xl: 20px;   
        --${l()}-spacing-2xl: 24px;   
        --${l()}-spacing-3xl: 28px;  
        --${l()}-spacing-4xl: 32px;    
        --${l()}-spacing-5xl: 40px;  

        /* Media Sizes */
        --${l()}-card-media-size-sm: ${_};
        --${l()}-card-media-size-md: ${N};
        --${l()}-card-media-size-lg: ${q};

        --${l()}-app-bar-height: ${j};
        --${l()}-bottom-navigation-height: ${D};
      }

      @media (min-width: ${g.MD}px) {
        :host {
          /* Desktop Spacing Variables in rem */
          --${l()}-spacing-xs: 8px;    
          --${l()}-spacing-sm: 16px;    
          --${l()}-spacing-md: 24px;   
          --${l()}-spacing-lg: 32px;   
          --${l()}-spacing-xl: 40px;   
          --${l()}-spacing-2xl: 48px;   
          --${l()}-spacing-3xl: 56px;  
          --${l()}-spacing-4xl: 64px;   
          --${l()}-spacing-5xl: 72px;   
        }
      }

      ${F}
    `, this.shadow.appendChild(this.styleElement);
  }
}
d("theme", U);
async function K() {
  return window.matchMedia("(display-mode: standalone)").matches || "standalone" in window.navigator && window.navigator.standalone ? !0 : "getInstalledRelatedApps" in navigator && typeof navigator.getInstalledRelatedApps == "function" ? (await navigator.getInstalledRelatedApps()).length > 0 : !1;
}
class Y extends HTMLElement {
  constructor() {
    super(), this.installPromptEvent = null;
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    (async () => {
      if (await K())
        return;
      i.textContent = `
      :host {
        display: block;
        background-color: var(--semantic-background-default);
        color: var(--semantic-text-default);
        font-family: ${o("font-family-default")};
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    `, t.appendChild(i);
      const e = document.createElement("slot");
      t.appendChild(e);
      const n = document.querySelector(
        `${l()}-container`
      );
      n && (n.style.display = "none");
      const a = this.querySelector("#install");
      window.addEventListener("beforeinstallprompt", (c) => {
        c.preventDefault(), this.installPromptEvent = c, a && (a.style.display = "block", a.addEventListener("click", (u) => {
          u.stopPropagation(), this.installPromptEvent && (this.installPromptEvent.prompt(), this.installPromptEvent.userChoice.then((m) => {
            if (m.outcome === "accepted")
              console.log("User accepted the A2HS prompt"), this.showAppContainer();
            else {
              console.log("User dismissed the A2HS prompt"), window.location.reload();
              return;
            }
            this.installPromptEvent = null, this.showAppContainer();
          }));
        }));
      });
      const r = this.querySelector("#no-install");
      r && r.addEventListener("click", () => {
        this.showAppContainer();
      });
    })();
  }
  showAppContainer() {
    const t = document.querySelector(
      `${l()}-container`
    );
    if (t)
      t.style.display = "block", this.style.display = "none";
    else
      throw new Error("No app container found");
  }
}
d("install", Y);
var b = /* @__PURE__ */ ((s) => (s[s.TOP = 10] = "TOP", s[s.DEFAULT = 0] = "DEFAULT", s[s.BOTTOM = -10] = "BOTTOM", s))(b || {});
class Q extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: block;
        width: 100%;
        position: relative; /* Ensure positioning context for inner divs */
      }

      /* Fixed/Sticky bar styles */
      .app-bar {
        width: 100%;
        background-color: var(--semantic-background-highlight);
        color: var(--semantic-text-inverted);
        padding: ${o("spacing-sm")};
        box-sizing: border-box;
        position: var(--app-bar-position, sticky);
        top: 0;
        left: 0;
        box-shadow: ${o("shadow-dark")};
        transition: top 0.3s ease-in-out;
        height: ${o("app-bar-height")};
        display: flex;
        align-items: center;
      }

      .spacer {
        height: ${o("app-bar-height")};
      }

      :host([fixed]) .app-bar {
        position: fixed;
        z-index: ${b.TOP};
      }

      :host([static]) .app-bar {
        position: static;
      }
    `, t.appendChild(i);
    const e = document.createElement("div");
    e.className = "spacer";
    const n = document.createElement("div");
    n.className = "app-bar";
    const a = document.createElement("slot");
    n.appendChild(a), t.appendChild(e), t.appendChild(n);
  }
  static get observedAttributes() {
    return ["fixed", "static"];
  }
}
d("app-bar", Q);
class J extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                align-items: center;
                border: 1px solid var(--semantic-stroke-default);
                border-radius: ${o("border-sm")};
                display: flex;
                justify-content: center;
                text-align: center;
                text-decoration: none;
                text-overflow: ellipsis;
                transition: background-color .1s, color .1s, border-color .1s;
                white-space: nowrap;
                width: max-content;
                height: max-content;
            }

            :host(:hover),
            :host([active]) {
                color: var(--semantic-text-inverted);
                background-color: var(--semantic-stroke-highlight);
            }
            
            :host([size="small"]) {
                font-size: ${o("font-size-sm")};
                padding-block: ${o("spacing-xs")};
                padding-inline: ${o("spacing-sm")};
            }
            
            :host([size="large"]) {
                font-size: ${o("font-size-md")};
                padding-block: ${o("spacing-sm")};
                padding-inline: ${o("spacing-md")};
            }
        `, t.appendChild(i), this.chipContent = document.createElement("div"), t.appendChild(this.chipContent), this.updateContent(), this.hasAttribute("size") || this.setAttribute("size", "small");
  }
  // Observe changes to 'value' and 'active' attributes
  static get observedAttributes() {
    return ["value", "active", "size"];
  }
  // Handle changes to attributes
  attributeChangedCallback(t, i, e) {
    t === "value" && i !== e ? this.updateContent() : t === "active" && i !== e ? this.updateActiveState() : t === "size" && i !== e && this.updateSize();
  }
  updateContent() {
    this.chipContent.textContent = this.value;
  }
  updateActiveState() {
    this.active ? this.setAttribute("active", "") : this.removeAttribute("active");
  }
  updateSize() {
    this.size ? this.setAttribute("size", this.size) : this.removeAttribute("size");
  }
  set active(t) {
    t ? this.setAttribute("active", "") : this.removeAttribute("active");
  }
  get active() {
    return this.hasAttribute("active");
  }
  set value(t) {
    this.setAttribute("value", t);
  }
  get value() {
    return this.getAttribute("value") || "";
  }
  set size(t) {
    this.setAttribute("size", t);
  }
  get size() {
    return this.getAttribute("size") || "small";
  }
}
d("chip", J);
class T extends Error {
  constructor(t, i) {
    super(
      `${t.tagName.toLowerCase()} can only have the following direct children: ${i.join(
        ", "
      )}`
    );
  }
}
class Z extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host table {
                width: 100%;
                border: 0;
                border-spacing: 0;
            }

            :host table th {
                border-bottom: 2px solid rgba(var(--semantic-stroke-highlight_rgb), 0.4);
                color: var(--semantic-text-default);
            }

            :host table th, :host table td  {
                text-align: left;
                border-collapse: collapse;
                padding: ${o("spacing-xs")};
                border-right: 1px solid var(--semantic-stroke-default);
                color: var(--semantic-text-default);
            }

            :host table > tbody > tr > td {
                border-bottom: 1px solid var(--semantic-stroke-default);
                color: var(--semantic-text-default);
            }

            :host table tbody > tr:hover {
                background-color: rgba(var(--semantic-stroke-highlight_rgb), 0.05);
            }

            :host table tr:last-child td {
                border-bottom: 0;
            }

            :host table tr td:last-child, table tr th:last-child {
                border-right: 0;
            }
        `, t.appendChild(i);
    const e = this.querySelector("table");
    if (!e)
      throw new T(this, ["table"]);
    t.appendChild(e);
  }
}
d("table", Z);
class V extends HTMLElement {
  constructor() {
    super(), this.anchorElement = void 0;
    const t = this.attachShadow({ mode: "open" });
    this.style.display = "inline", this.style.width = "max-content", this.tooltip = document.createElement("div"), this.tooltip.classList.add("tooltip");
    const i = document.createElement("style");
    i.textContent = `
      .tooltip {
        position: absolute;
        background-color: rgba(var(--semantic-background-inverted_rgb), 0.9);
        color: var(--semantic-text-inverted);
        padding: 5px;
        font-size: ${o("font-size-small")};
        z-index: ${b.TOP}; /* Ensure it appears on top */
        max-width: 200px;
        display: none; /* Hide by default */
        pointer-events: none; /* Ensure it doesn't interfere with mouse events */
      }
    `, t.append(i, this.tooltip);
    const e = document.createElement("slot");
    t.appendChild(e), this.addEventListener("mouseenter", this.showTooltip.bind(this)), this.addEventListener("mouseleave", this.hideTooltip.bind(this)), this.addEventListener("touchstart", this.handleTouchStart.bind(this)), this.addEventListener("touchend", this.handleTouchEnd.bind(this));
  }
  connectedCallback() {
    this.anchorElement = this.querySelector("span") || this, this.anchorElement.addEventListener(
      "mouseenter",
      this.showTooltip.bind(this)
    ), this.anchorElement.addEventListener(
      "mouseleave",
      this.hideTooltip.bind(this)
    ), this.anchorElement.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this)
    ), this.anchorElement.addEventListener(
      "touchend",
      this.handleTouchEnd.bind(this)
    );
  }
  showTooltip() {
    if (this.anchorElement) {
      const t = this.anchorElement.getBoundingClientRect(), i = this.tooltip.getBoundingClientRect(), e = window.innerWidth, n = window.innerHeight, a = window.scrollX, r = window.scrollY;
      this.tooltip.textContent = this.getAttribute("text") || "Tooltip content";
      let c = t.left + a + (t.width - i.width) / 2, u = t.top + r - i.height - 5;
      u < r && (u = t.bottom + r + 5), c + i.width > e + a && (c = Math.max(t.left + a, 10)), u + i.height > n + r && (u = Math.max(
        t.top + r - i.height - 5,
        10
      )), c < a && (c = 10), this.tooltip.style.left = `${c}px`, this.tooltip.style.top = `${u}px`, this.tooltip.style.display = "block";
    }
  }
  hideTooltip() {
    this.tooltip.style.display = "none";
  }
  handleTouchStart(t) {
    t.preventDefault(), this.showTooltip(), this.touchStartTimeout = window.setTimeout(() => this.hideTooltip(), 3e3);
  }
  handleTouchEnd() {
    this.touchStartTimeout && clearTimeout(this.touchStartTimeout);
  }
}
d("tooltip", V);
class tt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                width: max-content;
            }

            :host .label {
                font-weight: bold;
            }

            :host .container {
                position: relative;
                display: flex;
                height: 2em;
                border-radius: .25em;
                overflow: hidden;
            }

            :host .container::after {
                --icon-offset: 6px;
                content: '\\25BC';
                position: absolute;
                top: 0;
                right: 0;
                padding: var(--icon-offset);
                background: rgba(var(--semantic-background-inverted_rgb), 0.1);
                transition: .25s all ease;
                pointer-events: none;
            }

            :host .container:hover::after {
                color: var(--semantic-text-highlight);
            }

            :host select {
                --select-offset: calc(${o("spacing-sm")} + 26px);
                /* Reset Select */
                appearance: none;
                outline: 10px red;
                border: 0;
                box-shadow: none;
                width: 100%;
                font-size: 1em;

                /* Personalize */
                flex: 1;
                padding-inline: ${o("spacing-md")};
                padding-block: 0;
                color: var(--text-default);
                background: rgba(var(--semantic-background-inverted_rgb), 0.1);
                background-image: none;
                cursor: pointer;

                padding-right: var(--select-offset);
            }
        `;
    const e = document.createElement("div");
    e.classList.add("label");
    const n = this.querySelector("select"), a = document.createElement("div");
    if (a.classList.add("container"), !n)
      throw new T(this, ["select"]);
    a.append(n), t.append(i, e, a);
  }
}
d("select", tt);
class M extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                padding: ${o("spacing-sm")};
                flex: 1;
            }
        `, t.appendChild(i);
    const e = document.createElement("slot");
    t.appendChild(e);
  }
}
d("card-content", M);
class et extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                border: 1px solid var(--semantic-stroke-default);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                max-width: 100%;
                box-shadow: ${o("shadow-light")};
                height: 100%; /* Ensure the card takes full height */
            }

            card-content {
                flex: 1; /* Allows the content to grow and fill space */
            }
            
            card-media {
                display: block;
                width: 100%;
            }
        `, t.appendChild(i), this.querySelector("x-");
    const e = this.querySelector(`${l()}-card-content`) || this.querySelector(`${l()}-card-media`) || this.querySelector(`${l()}-card-footer`), n = document.createElement("slot");
    if (e)
      t.appendChild(n);
    else {
      const a = new M();
      a.append(n), t.append(a);
    }
  }
}
d("card", et);
class z extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" });
    this.styleElement = document.createElement("style"), this.styleElement.textContent = `
            :host {
                display: block;
                width: 100%;
                position: relative;
                overflow: hidden;
            }
            
            img, video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .small {
                height: ${o("card-media-size-sm")};
            }
            .medium {
                height: ${o("card-media-size-md")};
            }
            .large {
                height: ${o("card-media-size-lg")};
            }
        `, t.appendChild(this.styleElement), this.mediaElement = document.createElement("div"), this.mediaElement.style.position = "relative", this.mediaElement.style.width = "100%", this.mediaElement.style.height = "100%", this.mediaElement.style.display = "flex", t.appendChild(this.mediaElement);
  }
  static get observedAttributes() {
    return ["src", "size"];
  }
  attributeChangedCallback(t, i, e) {
    i !== e && z.observedAttributes.includes(t) && this.updateMedia();
  }
  updateMedia() {
    const t = this.getAttribute("src"), i = this.getAttribute("size") || "medium", e = this.detectMediaType(t);
    if (t && e) {
      this.mediaElement.innerHTML = "";
      const n = e === "image" ? document.createElement("img") : document.createElement("video");
      if (n.src = t, n.className = i, e === "video") {
        const a = n;
        a.muted = !0, a.controls = !1, a.autoplay = !0, a.loop = !0, a.playsInline = !0, this.mediaElement.appendChild(a);
      } else
        this.mediaElement.appendChild(n);
    }
  }
  detectMediaType(t) {
    var e;
    if (!t)
      return null;
    const i = (e = t.split(".").pop()) == null ? void 0 : e.toLowerCase();
    if (i) {
      const n = ["jpg", "jpeg", "png", "gif", "bmp", "webp"], a = ["mp4", "webm", "ogg"];
      if (n.includes(i))
        return "image";
      if (a.includes(i))
        return "video";
    }
    return null;
  }
  // Getters and setters for attributes
  get src() {
    return this.getAttribute("src");
  }
  set src(t) {
    t ? this.setAttribute("src", t) : this.removeAttribute("src");
  }
  get size() {
    return this.getAttribute("size");
  }
  set size(t) {
    t ? this.setAttribute("size", t) : this.removeAttribute("size");
  }
}
d("card-media", z);
class it extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: ${o("spacing-sm")};
                border-top: 1px solid var(--semantic-stroke-default);
                background-color: var(--card-footer-background, transparent);
                flex-shrink: 0; /* Prevent footer from shrinking */
            }
        `, t.appendChild(i);
    const e = document.createElement("slot");
    t.appendChild(e);
  }
}
d("card-footer", it);
class st extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                display: inline-block;
                width: 50px;
                height: 50px;
                overflow: hidden;
            }

            :host([size="small"]) {
                width: 30px;
                height: 30px;
            }

            :host([size="large"]) {
                width: 70px;
                height: 70px;
            }

            svg {
                width: 100%;
                height: 100%;
                animation: rotate 2s linear infinite;
            }

            circle {
                fill: none;
                stroke-width: 4;
                stroke: var(--semantic-stroke-highlight);
                stroke-dasharray: 150, 200;
                stroke-dashoffset: 0;
                animation: dash 1.5s ease-in-out infinite;
            }

            @keyframes rotate {
                100% {
                    transform: rotate(360deg);
                }
            }

            @keyframes dash {
                0% {
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 100, 200;
                    stroke-dashoffset: -50;
                }
                100% {
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: -150;
                }
            }
        `;
    const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    e.setAttribute("viewBox", "0 0 50 50");
    const n = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    n.setAttribute("cx", "25"), n.setAttribute("cy", "25"), n.setAttribute("r", "20"), e.appendChild(n), t.appendChild(i), t.appendChild(e);
  }
  static get observedAttributes() {
    return ["size", "color"];
  }
  attributeChangedCallback(t, i, e) {
    t === "size" && i !== e && this.updateSize(), t === "color" && i !== e && this.updateColor();
  }
  updateSize() {
    this.setAttribute("size", this.size);
  }
  updateColor() {
    this.style.setProperty("--spinner-color", this.color);
  }
  set size(t) {
    this.setAttribute("size", t);
  }
  get size() {
    return this.getAttribute("size") || "small";
  }
  set color(t) {
    this.setAttribute("color", t);
  }
  get color() {
    return this.getAttribute("color") || "#000";
  }
}
d("spinner", st);
class nt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            ::slotted(a) {
                color: var(--semantic-text-highlight);
                text-decoration: none;
            }
            
            ::slotted(a:hover) {
                color: var(--semantic-text-highlight);
                text-decoration: underline;
            }
            
            ::slotted(a:active) {
                color: var(--semantic-text-highlight);
                text-decoration: none;
            }
            
            ::slotted(a:visited) {
                color: var(--semantic-text-highlight);
                text-decoration: none;
            }
        `, t.appendChild(i);
    const e = document.createElement("slot");
    t.append(e);
  }
}
d("link", nt);
class f extends HTMLElement {
  constructor() {
    super(), this.shadow = this.attachShadow({ mode: "open" });
    const t = document.createElement("style");
    t.textContent = `          
            :host {
              display: inline;
            }
            
            /* General reset for slotted elements */
            ::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(h6),
            ::slotted(p) {
              margin: 0;
              padding: 0;
              color: inherit;
              text-align: inherit;
            }

            :host([display="title"]) ::slotted(*), :host([display="title"]) {
                font-family: ${o("font-family-heading")};
                font-size: ${o("font-size-title")}; /* Large font size */
                font-weight: 400;
                line-height: 1.2;
                letter-spacing: 0em;
            }
            
            /* Heading 1 */
            :host([display="h1"]) ::slotted(*), :host([display="h1"]) {
                font-family: ${o("font-family-heading")};
                font-size: ${o("font-size-xxl")}; /* Large font size */
                font-weight: 400;
                line-height: 1.167;
                letter-spacing: -0.01562em;
            }
            
            /* Heading 2 */
            :host([display="h2"]) ::slotted(*), :host([display="h2"]) {
                font-family: ${o("font-family-heading")};
                font-size: ${o("font-size-xl")}; /* Extra-large font size */
                font-weight: 300;
                line-height: 1.2;
                letter-spacing: -0.00833em;
            }
            
            /* Heading 3 */
            :host([display="h3"]) ::slotted(*), :host([display="h3"]) {
                font-family: ${o("font-family-heading")};
                font-size: ${o("font-size-lg")}; /* Large font size */
                font-weight: 400;
                line-height: 1.167;
                letter-spacing: 0em;
            }
            
            /* Heading 4 */
            :host([display="h4"]) ::slotted(*), :host([display="h4"]) {
                font-family: ${o("font-family-heading")};
                font-size: ${o("font-size-md")}; /* Medium font size */
                font-weight: 400;
                line-height: 1.235;
                letter-spacing: 0.00735em;
            }
            
            /* Heading 5 */
            :host([display="h5"]) ::slotted(*), :host([display="h5"]) {
                font-family: ${o("font-family-heading")};
                font-size: ${o("font-size-sm")}; /* Small font size */
                font-weight: 400;
                line-height: 1.334;
                letter-spacing: 0em;
            }
            
            /* Heading 6 */
            :host([display="h6"]) ::slotted(*), :host([display="h6"]) {
                font-family: ${o("font-family-heading")};
                font-size: ${o("font-size-xs")}; /* Small font size */
                font-weight: 500;
                line-height: 1.6;
                letter-spacing: 0.0075em;
            }
            
            /* Subtitle 1 */
            :host([display="subtitle1"]) ::slotted(*), :host([display="subtitle1"]) {
                font-family: ${o("font-family-default")};
                font-size: ${o("font-size-md")}; /* Medium font size */
                font-weight: 400;
                line-height: 1.75;
                letter-spacing: 0.00938em;
            }
            
            /* Subtitle 2 */
            :host([display="subtitle2"]) ::slotted(*), :host([display="subtitle2"]) {
                font-family: ${o("font-family-default")};
                font-size: ${o("font-size-sm")}; /* Small font size */
                font-weight: 500;
                line-height: 1.57;
                letter-spacing: 0.00714em;
            }
            
            /* Body 1 */
            :host([display="body1"]) ::slotted(*), :host([display="body1"]) {
                font-family: ${o("font-family-default")};
                font-size: ${o("font-size-default")}; /* Medium font size */
                font-weight: 400;
                line-height: 1.5;
                letter-spacing: 0.00938em;
            }
            
            /* Body 2 */
            :host([display="body2"]) ::slotted(*), :host([display="body2"]) {
                font-family: ${o("font-family-default")};
                font-size: ${o("font-size-sm")}; /* Small font size */
                font-weight: 400;
                line-height: 1.43;
                letter-spacing: 0.01071em;
            }
            
            /* Button */
            :host([display="button"]) ::slotted(*), :host([display="button"]) {
                font-family: ${o("font-family-default")};
                font-size: ${o("font-size-sm")}; /* Small font size */
                font-weight: 500;
                line-height: 1.75;
                letter-spacing: 0.02857em;
                text-transform: uppercase;
            }
            
            /* Caption */
            :host([display="caption"]) ::slotted(*), :host([display="caption"]) {
                font-family: ${o("font-family-default")};
                font-size: ${o("font-size-sm")}; /* Extra-small font size */
                font-weight: 400;
                line-height: 1.66;
                letter-spacing: 0.03333em;
            }
            
            /* Overline */
            :host([display="overline"]) ::slotted(*), :host([display="overline"]) {
                font-family: ${o("font-family-default")};
                font-size: ${o("font-size-xs")}; /* Extra-small font size */
                font-weight: 400;
                line-height: 2.66;
                letter-spacing: 0.08333em;
                text-transform: uppercase;
            }
        `, this.shadow.appendChild(t);
    const i = document.createElement("slot");
    this.shadow.appendChild(i);
  }
  set display(t) {
    this.setAttribute("display", t);
  }
  get display() {
    return this.getAttribute("display") || "";
  }
  static get observedAttributes() {
    return ["display"];
  }
}
d("typography", f);
class ot extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                display: block;
                background-color: var(--semantic-background-default);
                color: var(--semantic-text-default);
                font-family: ${o("font-family-default")};
                width: 100%;
            }
        `, t.appendChild(i);
    const e = document.createElement("slot");
    t.append(e);
  }
}
d("container", ot);
class S extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" });
    this.styleElement = document.createElement("style"), t.appendChild(this.styleElement);
    const i = document.createElement("slot");
    t.append(i), this.updateStyles();
  }
  static get observedAttributes() {
    return ["xs", "md", "lg", "xl"];
  }
  attributeChangedCallback(t, i, e) {
    S.observedAttributes.includes(t) && i !== e && this.updateStyles();
  }
  updateStyles() {
    const t = this.getAttribute("xs") || "1", i = this.getAttribute("md") || "1", e = this.getAttribute("lg") || "1", n = this.getAttribute("xl") || "1";
    this.styleElement.textContent = `
            :host {
                display: grid;
                gap: ${o("spacing-md")};
                grid-template-columns: repeat(${t}, 1fr);
            }

            @media (min-width: ${g.XS}px) {
                :host([xs]) {
                    grid-template-columns: repeat(${t}, 1fr);
                }
            }

            @media (min-width: ${g.MD}px) {
                :host([md]) {
                    grid-template-columns: repeat(${i}, 1fr);
                }
            }

            @media (min-width: ${g.LG}px) {
                :host([lg]) {
                    grid-template-columns: repeat(${e}, 1fr);
                }
            }

            @media (min-width: ${g.XL}px) {
                :host([xl]) {
                    grid-template-columns: repeat(${n}, 1fr);
                }
            }
        `;
  }
  // Getters and setters for attributes
  get xs() {
    return this.getAttribute("xs");
  }
  set xs(t) {
    t ? this.setAttribute("xs", t) : this.removeAttribute("xs");
  }
  get md() {
    return this.getAttribute("md");
  }
  set md(t) {
    t ? this.setAttribute("md", t) : this.removeAttribute("md");
  }
  get lg() {
    return this.getAttribute("lg");
  }
  set lg(t) {
    t ? this.setAttribute("lg", t) : this.removeAttribute("lg");
  }
  get xl() {
    return this.getAttribute("xl");
  }
  set xl(t) {
    t ? this.setAttribute("xl", t) : this.removeAttribute("xl");
  }
}
d("grid", S);
class C extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" });
    this.styleElement = document.createElement("style"), t.appendChild(this.styleElement);
    const i = document.createElement("slot");
    t.append(i), this.updateStyles();
  }
  static get observedAttributes() {
    return [
      "direction",
      "gap",
      "margin-inline",
      "margin-block",
      "justify-content",
      "stretch"
    ];
  }
  attributeChangedCallback(t, i, e) {
    C.observedAttributes.includes(t) && i !== e && this.updateStyles();
  }
  updateStyles() {
    const t = this.getAttribute("direction") || "vertical", i = this.getGapVariable(
      this.getAttribute("gap") || "none"
    ), e = this.getMarginVariable(
      this.getAttribute("margin-inline") || "none"
    ), n = this.getMarginVariable(
      this.getAttribute("margin-block") || "none"
    ), a = this.getAttribute("justify-content") || "flex-start";
    this.styleElement.textContent = `
            :host {
                display: flex;
                flex-direction: ${t === "horizontal" ? "row" : "column"};
                gap: ${i};
                padding-inline: ${e};
                padding-block: ${n};
                justify-content: ${a};
                flex-wrap: wrap;
                box-sizing: border-box;
            }

            :host([stretch][direction="horizontal"]) {
                width: 100%;
            }

            :host([stretch][direction="vertical"]) {
                height: 100%;
            }
        `;
  }
  getGapVariable(t) {
    switch (t) {
      case "none":
        return "0px";
      case "small":
        return o("spacing-sm");
      case "medium":
        return o("spacing-md");
      case "large":
        return o("spacing-lg");
      case "extra-large":
        return o("spacing-xl");
      default:
        return o("spacing-md");
    }
  }
  getMarginVariable(t) {
    return this.getGapVariable(t);
  }
  // Getters and setters for attributes
  get direction() {
    return this.getAttribute("direction");
  }
  set direction(t) {
    t ? this.setAttribute("direction", t) : this.removeAttribute("direction");
  }
  get gap() {
    return this.getAttribute("gap") || "none";
  }
  set gap(t) {
    t ? this.setAttribute("gap", t) : this.removeAttribute("gap");
  }
  get marginInline() {
    return this.getAttribute("margin-inline") || "none";
  }
  set marginInline(t) {
    t ? this.setAttribute("margin-inline", t) : this.removeAttribute("margin-inline");
  }
  get marginBlock() {
    return this.getAttribute("margin-block") || "none";
  }
  set marginBlock(t) {
    t ? this.setAttribute("margin-block", t) : this.removeAttribute("margin-block");
  }
  get justifyContent() {
    return this.getAttribute("justify-content") || "flex-start";
  }
  set justifyContent(t) {
    t ? this.setAttribute("justify-content", t) : this.removeAttribute("justify-content");
  }
}
d("stack", C);
class at extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("slot");
    t.appendChild(i);
  }
}
d("block", at);
class rt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" });
    this.button = document.createElement("button"), this.button.classList.add("button");
    const i = document.createElement("style");
    i.textContent = `
      :host {
        width: max-content;
        height: max-content;
      }

      .button {
        border: none;
        border-radius: ${o("border-xs")};
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: ${o("spacing-md")};
        text-align: center;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        touch-action: manipulation; /* Helps with touch interactions */
      }

      :host([stretch]) {
        width: 100%;
      }

      :host([stretch]) .button {
        width: 100%;
      }
      
      :host([variant="filled"]) .button {
        background-color: var(--semantic-background-highlight);
        color: var(--semantic-text-inverted);
      }

      :host([variant="filled"]:hover) .button,
      :host([variant="filled"]:active) .button {
        background-color: var(--semantic-background-hover);
        color: var(--semantic-text-inverted);
        box-shadow: ${o("shadow-light")};
      }

      :host([variant="outlined"]) .button {
        background-color: transparent;
        border: 1px solid var(--semantic-stroke-highlight);
        color: var(--semantic-text-highlight);
      }

      :host([variant="outlined"]:hover) .button,
      :host([variant="outlined"]:active) .button {
        border-color: var(--semantic-stroke-hover);
        color: var(--semantic-text-hover);
        background-color: rgba(var(--semantic-background-highlight_rgb), 0.1);
      }

      :host([size="small"]) .button {
        padding-block: ${o("spacing-xs")};
        padding-inline: ${o("spacing-sm")};
      }

      :host([size="medium"]) .button {
        padding-block: ${o("spacing-sm")};
        padding-inline: ${o("spacing-md")};
      }

      :host([size="large"]) .button {
        padding-block: ${o("spacing-md")};
        padding-inline: ${o("spacing-lg")};
      }

      .button:focus {
        outline: 2px solid var(--button-focus-outline);
      }
    `, t.appendChild(i);
    const e = new f();
    e.display = "button";
    const n = document.createElement("slot");
    e.append(n), this.button.appendChild(e), t.appendChild(this.button), this.hasAttribute("variant") || this.setAttribute("variant", "filled"), this.hasAttribute("size") || this.setAttribute("size", "medium"), this.button.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this)
    ), this.button.addEventListener("touchend", this.handleTouchEnd.bind(this)), this.button.addEventListener("touchcancel", this.handleTouchEnd.bind(this));
  }
  handleTouchStart() {
    this.button.classList.add("button-active");
  }
  handleTouchEnd() {
    this.button.classList.remove("button-active");
  }
  // Observe changes to 'variant' and 'size' attributes
  static get observedAttributes() {
    return ["variant", "size", "stretch"];
  }
  // Handle changes to attributes
  attributeChangedCallback(t, i, e) {
    t === "variant" && i !== e ? this.updateVariant() : t === "size" && i !== e && this.updateSize();
  }
  updateVariant() {
    this.setAttribute("variant", this.variant);
  }
  updateSize() {
    this.setAttribute("size", this.size);
  }
  set variant(t) {
    this.setAttribute("variant", t);
  }
  get variant() {
    return this.getAttribute("variant") || "filled";
  }
  set size(t) {
    this.setAttribute("size", t);
  }
  get size() {
    return this.getAttribute("size") || "medium";
  }
}
d("button", rt);
class lt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                display: inline-flex;
                align-items: center;
                width: max-content;
            }

            .toggle-switch {
                width: 42px;
                height: 24px;
                background-color: var(--semantic-stroke-default);
                border-radius: 12px;
                position: relative;
                transition: background-color 0.2s;
                flex-shrink: 0;
                cursor: pointer;
            }

            .switch-knob {
                width: 20px;
                height: 20px;
                background-color: var(--semantic-background-default);
                border-radius: 50%;
                position: absolute;
                top: 2px;
                left: 2px;
                transition: left 0.2s;
            }

            :host([checked]) .toggle-switch {
                background-color: var(--semantic-stroke-highlight);
            }

            :host([checked]) .switch-knob {
                left: 20px;
            }

            :host([disabled]) .toggle-switch {
                cursor: not-allowed;
                opacity: 0.6;
            }

            input {
                display: none;
            }

            .label {
                margin-left: 8px;
                white-space: nowrap;
                cursor: auto;
            }

            .required-asterisk::after {
                content: " *";
                color: red; /* Optional: To highlight the asterisk */
            }
        `, t.appendChild(i), this.inputElement = document.createElement("input"), this.inputElement.type = "checkbox", t.appendChild(this.inputElement), this.toggleSwitch = document.createElement("div"), this.toggleSwitch.classList.add("toggle-switch"), t.appendChild(this.toggleSwitch), this.switchKnob = document.createElement("div"), this.switchKnob.classList.add("switch-knob"), this.toggleSwitch.appendChild(this.switchKnob), this.labelElement = new f(), this.labelElement.display = "body1", this.labelElement.classList.add("label"), t.appendChild(this.labelElement), this.toggleSwitch.addEventListener("click", () => {
      this.disabled || (this.checked = !this.checked, this.dispatchEvent(new Event("change")));
    }), this.hasAttribute("checked") || (this.checked = !1), this.hasAttribute("disabled") || (this.disabled = !1), this.updateLabel();
  }
  static get observedAttributes() {
    return ["checked", "disabled", "name", "value", "required", "label"];
  }
  attributeChangedCallback(t, i, e) {
    t === "checked" && i !== e ? this.updateCheckedState() : t === "disabled" && i !== e ? this.updateDisabledState() : t === "name" && i !== e ? this.inputElement.name = e || "" : t === "value" && i !== e ? this.inputElement.value = e || "" : t === "required" && i !== e ? (this.inputElement.required = e !== null, this.updateLabel()) : t === "label" && i !== e && this.updateLabel();
  }
  updateCheckedState() {
    this.inputElement.checked = this.checked, this.checked ? this.setAttribute("checked", "") : this.removeAttribute("checked");
  }
  updateDisabledState() {
    this.inputElement.disabled = this.disabled, this.disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  updateLabel() {
    this.labelElement.textContent = this.label, this.required ? this.labelElement.classList.add("required-asterisk") : this.labelElement.classList.remove("required-asterisk");
  }
  set checked(t) {
    t ? this.setAttribute("checked", "") : this.removeAttribute("checked");
  }
  get checked() {
    return this.hasAttribute("checked");
  }
  set disabled(t) {
    t ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  get name() {
    return this.getAttribute("name") || "";
  }
  set value(t) {
    this.setAttribute("value", t);
  }
  get value() {
    return this.getAttribute("value") || "";
  }
  set required(t) {
    t ? this.setAttribute("required", "") : this.removeAttribute("required");
  }
  get required() {
    return this.hasAttribute("required");
  }
  set label(t) {
    this.setAttribute("label", t);
  }
  get label() {
    return this.getAttribute("label") || "";
  }
  // Provide form-like behavior by returning the input element
  get form() {
    return this.inputElement.form;
  }
  // Required for form submission
  get validity() {
    return this.inputElement.validity;
  }
  get validationMessage() {
    return this.inputElement.validationMessage;
  }
  checkValidity() {
    return this.inputElement.checkValidity();
  }
  reportValidity() {
    return this.inputElement.reportValidity();
  }
  // Support setting focus on the component
  focus() {
    this.inputElement.focus();
  }
}
d("switch", lt);
class ct extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: inline;
        width: max-content;
        position: relative;
      }

      .content-wrapper {
        display: inline-block;
        position: relative;
      }

      .badge {
        position: absolute;
        top: 0;
        right: 0;
        background-color: var(--semantic-background-highlight);
        color: var(--semantic-text-inverted);
        border-radius: 15px;
        padding: 0 6px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: bold;
        transform: translate(75%, -50%);
        z-index: 1;
      }

      :host([hidden]) .badge {
        display: none;
      }
    `, t.appendChild(i), this.contentWrapper = document.createElement("div"), this.contentWrapper.className = "content-wrapper", t.appendChild(this.contentWrapper);
    const e = document.createElement("slot");
    this.contentWrapper.appendChild(e), this.badgeElement = document.createElement("span"), this.badgeElement.className = "badge", t.appendChild(this.badgeElement), this.updateBadge();
  }
  static get observedAttributes() {
    return ["content", "hidden"];
  }
  attributeChangedCallback(t, i, e) {
    t === "content" && i !== e ? this.updateBadge() : t === "hidden" && i !== e && this.updateVisibility();
  }
  updateBadge() {
    this.badgeElement.textContent = this.getAttribute("content") || "";
  }
  updateVisibility() {
    const t = this.hasAttribute("hidden");
    this.badgeElement.style.display = t ? "none" : "flex";
  }
  // Property setters and getters
  set content(t) {
    this.setAttribute("content", t);
  }
  get content() {
    return this.getAttribute("content") || "";
  }
  set hidden(t) {
    t ? this.setAttribute("hidden", "") : this.removeAttribute("hidden");
  }
  get hidden() {
    return this.hasAttribute("hidden");
  }
}
d("badge", ct);
class dt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${o("spacing-sm")};
        font-family: sans-serif;
        width: max-content;
      }

      .color-container {
        position: relative;
      }

      .color-preview {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid #ccc;
        background-color: #ffffff;
        box-shadow: 0 0 3px rgba(var(--semantic-background-inverted_rgb), 0.2);
        cursor: pointer;
      }

      .icon {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px; /* Reduced size */
        height: 16px; /* Reduced size */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: var(--semantic-background-default);
        border-radius: 50%;
        border: 1px solid var(--semantic-stroke-default);
        box-shadow: 0 0 1px rgba(var(--semantic-background-inverted_rgb), 0.3);
        transform: translate(30%, 30%); /* Adjust badge position */
        pointer-events: all;
      }

      .icon svg {
        fill: currentColor;
        width: 12px; /* Adjusted size */
        height: 12px; /* Adjusted size */
      }

      input[type="color"] {
        z-index: ${b.TOP};
        opacity: 0;
        position: absolute;
        width: 32px;
        height: 32px;
        transform: translate(-1px, -1px);
        cursor: pointer;
      }
    `, t.appendChild(i), this.colorInput = document.createElement("input"), this.colorInput.type = "color", t.appendChild(this.colorInput);
    const e = document.createElement("div");
    e.classList.add("color-container"), this.colorPreview = document.createElement("div"), this.colorPreview.classList.add("color-preview"), e.appendChild(this.colorPreview), this.iconElement = document.createElement("div"), this.iconElement.classList.add("icon"), this.iconElement.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.66 2c-.94 0-1.85.37-2.54 1.06L5.17 13l.89.88a4.004 4.004 0 0 0-1.06 3.73c.23 1.08.87 2.02 1.8 2.64.66.44 1.42.67 2.18.68.76 0 1.53-.23 2.18-.68l8.95-8.95c1.42-1.42 1.42-3.72 0-5.14-.68-.68-1.59-1.06-2.53-1.06zm0 2c.36 0 .71.14.97.4.55.55.55 1.39 0 1.94L9.82 16.54a2.008 2.008 0 0 1-2.84 0 2.008 2.008 0 0 1 0-2.84L15.79 5.4c.25-.26.6-.4.97-.4zm-4.6 7.6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
      </svg>
    `, e.appendChild(this.iconElement), t.appendChild(e), this.colorInput.addEventListener(
      "input",
      this.handleColorChange.bind(this)
    ), this.colorPreview.addEventListener("click", () => this.colorInput.click()), this.iconElement.addEventListener("click", () => this.colorInput.click()), this.updateColor(this.getAttribute("value") || "#ffffff");
  }
  static get observedAttributes() {
    return ["value", "label"];
  }
  attributeChangedCallback(t, i, e) {
    t === "value" && i !== e ? this.updateColor(e) : t === "label" && i !== e && this.updateLabel();
  }
  handleColorChange(t) {
    const e = t.target.value;
    this.colorPreview.style.backgroundColor = e, this.dispatchEvent(new CustomEvent("color-change", { detail: { color: e } }));
  }
  updateColor(t) {
    t = t || "#ffffff", this.value = t, this.colorPreview.style.backgroundColor = t, this.colorInput.value = t;
  }
  updateLabel() {
    var i;
    const t = this.getAttribute("label") || "";
    this.labelElement || (this.labelElement = new f(), this.labelElement.display = "body1", (i = this.shadowRoot) == null || i.appendChild(this.labelElement)), this.labelElement.textContent = t;
  }
  set value(t) {
    this.setAttribute("value", t);
  }
  get value() {
    return this.getAttribute("value") || "#ffffff";
  }
  set label(t) {
    this.setAttribute("label", t);
  }
  get label() {
    return this.getAttribute("label") || "";
  }
}
d("color-picker", dt);
class ht extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: block;
        width: 100%;
        margin: 0;
        box-sizing: border-box;
      }

      .divider {
        height: 1px;
        background-color: var(--semantic-stroke-default);
        margin-left: 0;
        margin-right: 0;
        box-sizing: border-box;
        transition: background-color 0.3s;
      }

      :host([vertical]) {
        display: inline-block;
        width: 1px;
        height: 100%; /* Take up the full height of the parent */
        margin: 0; /* Remove horizontal margins for vertical divider */
      }

      :host([vertical]) .divider {
        width: 1px;
        height: 100%; /* Ensure it fills the parent height */
      }

      :host([light]) .divider {
        background-color: var(--semantic-stroke-light);
      }

      :host([fade]) .divider {
        background-color: inherit;
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(90deg,var(--semantic-stroke-highlight),transparent 50%);
        border-image-slice: 1;
      }
    `, t.appendChild(i), this.dividerElement = document.createElement("div"), this.dividerElement.className = "divider", t.appendChild(this.dividerElement);
  }
  static get observedAttributes() {
    return ["vertical", "light"];
  }
  // Property setters and getters
  set vertical(t) {
    t ? this.setAttribute("vertical", "") : this.removeAttribute("vertical");
  }
  get vertical() {
    return this.hasAttribute("vertical");
  }
  set light(t) {
    t ? this.setAttribute("light", "") : this.removeAttribute("light");
  }
  get light() {
    return this.hasAttribute("light");
  }
}
d("divider", ht);
function ut(s, t) {
  return Object.keys(s).filter((i) => isNaN(Number(i))).map((i) => t(s[i]));
}
var H = /* @__PURE__ */ ((s) => (s.CENTER = "center", s.LEFT = "start", s.RIGHT = "end", s.EVEN = "space-evenly", s.BETWEEN = "space-between", s))(H || {});
class pt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
            }

            ${ut(H, (n) => `
                        :host([justify-content="${n}"]) {
                            justify-content: ${n};
                        }
                    `).join("")}

            :host([margin-inline="small"]) {
                margin-inline: ${o("spacing-sm")};
            }

            :host([margin-block="small"]) {
                margin-block: ${o("spacing-sm")};
            }

            :host([margin-inline="medium"]) {
                margin-inline: ${o("spacing-md")};
            }

            :host([margin-block="medium"]) {
                margin-block: ${o("spacing-md")};
            }

            :host([margin-inline="large"]) {
                margin-inline: ${o("spacing-lg")};
            }

            :host([margin-block="large"]) {
                margin-block: ${o("spacing-lg")};
            }

            :host([margin-inline="extra-large"]) {
                margin-inline: ${o("spacing-xl")};
            }

            :host([margin-block="extra-large"]) {
                margin-block: ${o("spacing-xl")};
            }


            :host([margin-block="extra-large"]) {
                margin-block: ${o("spacing-xl")};
            }
        `, t.appendChild(i);
    const e = document.createElement("slot");
    t.append(e);
  }
  static get observedAttributes() {
    return ["margin-inline", "margin-block", "justify-content"];
  }
}
d("box", pt);
class L extends HTMLElement {
  constructor() {
    super(), this.toggleCheckbox = () => {
      this.checkboxElement.disabled || (this.checked = !this.checkboxElement.checked);
    };
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${o("spacing-xs")};
        cursor: pointer;
        width: max-content;
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .checkbox {
        appearance: none;
        width: 2em;
        height: 2em;
        border: 2px solid var(--semantic-stroke-default);
        border-radius: ${o("border-xs")};
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s, border-color 0.3s;
        cursor: pointer;
      }

      .checkbox:checked {
        background-color: var(--semantic-background-highlight);
        border-color: var(--semantic-background-highlight);
      }

      .checkbox:checked::before {
        content: "";
        width: 1em;
        height: 1em;
        background-color: var(--semantic-background-default);
        clip-path: polygon(14% 44%, 0% 65%, 50% 100%, 100% 18%, 80% 0%, 43% 62%);
      }

      .checkbox:disabled {
        background-color: rgba(var(--semantic-background-inverted_rgb), 0.2);
        border-color: var(--semantic-stroke-default);
        cursor: not-allowed;
      }
    `, t.appendChild(i), this.checkboxElement = document.createElement("input"), this.checkboxElement.type = "checkbox", this.checkboxElement.className = "checkbox", t.appendChild(this.checkboxElement);
    const e = document.createElement("div");
    e.className = "label";
    const n = document.createElement("slot");
    e.appendChild(n), t.append(e), this.addEventListener("click", this.toggleCheckbox), this.addEventListener("pointerdown", (a) => a.preventDefault()), this.checkboxElement.addEventListener(
      "click",
      (a) => a.stopPropagation()
    ), this.updateCheckbox();
  }
  static get observedAttributes() {
    return ["checked", "disabled"];
  }
  attributeChangedCallback(t, i, e) {
    L.observedAttributes.includes(t) && i !== e && this.updateCheckbox();
  }
  updateCheckbox() {
    this.checkboxElement.checked = this.hasAttribute("checked"), this.checkboxElement.disabled = this.hasAttribute("disabled"), this.checkboxElement.disabled ? this.classList.add("disabled") : this.classList.remove("disabled");
  }
  // Property setters and getters
  set checked(t) {
    t ? this.setAttribute("checked", "") : this.removeAttribute("checked");
  }
  get checked() {
    return this.hasAttribute("checked");
  }
  set disabled(t) {
    t ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
}
d("checkbox", L);
var x = /* @__PURE__ */ ((s) => (s.HIGHLIGHT = "highlight", s.DEFAULT = "default", s.INVERTED = "inverted", s))(x || {});
const B = class y extends HTMLElement {
  constructor() {
    super(), this.shadow = this.attachShadow({ mode: "open" });
    const t = document.createElement("style");
    t.textContent = `
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        --icon-color: var(--semantic-text-default);
      }

      :host([color="${x.DEFAULT}"]) {
        --icon-color: var(--semantic-text-default);
      }

      :host([color="${x.INVERTED}"]) {
        --icon-color: var(--semantic-text-inverted);
      }

      :host([color="${x.HIGHLIGHT}"]) {
        --icon-color: var(--semantic-text-highlight);
      }

      svg {
        fill: var(--icon-color);
        display: block;
        object-fit: contain;
        width: 100%;
        height: 100%;
      }

      :host([size="small"]) svg {
        width: 16px;
        height: 16px;
      }

      :host([size="medium"]) svg {
        width: 32px;
        height: 32px;
      }

      :host([size="large"]) svg {
        width: 64px;
        height: 64px;
      }

      :host([size="none"]) svg {
        width: 100%;
        height: 100%;
      }
    `, this.shadow.appendChild(t);
    const i = document.createElement("slot");
    this.shadow.appendChild(i);
  }
  static get observedAttributes() {
    return ["size", "svg"];
  }
  attributeChangedCallback(t, i, e) {
    t === "svg" && i !== e && e && this.loadSvg(e);
  }
  async loadSvg(t) {
    try {
      if (y.svgCache.has(t))
        this.setSvgContent(y.svgCache.get(t));
      else {
        const i = await fetch(t);
        if (!i.ok)
          throw new Error(`Failed to load SVG: ${i.statusText}`);
        const e = await i.text();
        y.svgCache.set(t, e), this.setSvgContent(e);
      }
    } catch (i) {
      console.error("Error loading SVG:", i);
    }
  }
  setSvgContent(t) {
    const i = document.createElement("div");
    i.innerHTML = t;
    const e = i.querySelector("svg");
    if (e) {
      if (e.removeAttribute("width"), e.removeAttribute("height"), !e.hasAttribute("viewBox")) {
        const a = e.getAttribute("width") || "100", r = e.getAttribute("height") || "100";
        e.setAttribute("viewBox", `0 0 ${a} ${r}`);
      }
      const n = this.shadow.querySelector("slot");
      n && n.remove(), this.shadow.appendChild(e);
    } else
      console.error("No valid SVG element found in the provided content.");
  }
};
B.svgCache = /* @__PURE__ */ new Map();
let E = B;
d("icon", E);
class gt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: block;
        padding: 0;
        margin: 0;
        width: max-content;
      }

      /* Style the slotted list (ul or ol) */
      ::slotted(ul),
      ::slotted(ol) {
        margin: 0;
        padding: 0;
        list-style-position: inside; /* Ensures the markers are inside */
      }

      /* Custom bullet styling for unordered lists */
      ::slotted(ul) {
        list-style-type: disc; /* Use a bullet for unordered lists */
      }

      /* Style list items inside the slotted ul/ol */
      ::slotted(ul li),
      ::slotted(ol li) {
        padding: 0.5em 0;
        border-bottom: 1px solid #ddd;
      }

      /* Custom numbering for ordered lists */
      ::slotted(ol) {
        list-style-type: decimal; /* Use numbers for ordered lists */
        counter-reset: item; /* Reset counter for custom numbering */
      }

      ::slotted(ol li) {
        counter-increment: item;
      }

      ::slotted(ol li::before) {
        content: counters(item, ".") " ";
        font-weight: bold;
        margin-right: 0.5em;
      }
    `, t.appendChild(i);
    const e = document.createElement("slot");
    t.appendChild(e);
  }
}
d("list", gt);
class mt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        width: 100%;
      }
    `, t.appendChild(i);
    const e = document.createElement("slot");
    t.appendChild(e), this.initializeTabs = this.initializeTabs.bind(this);
  }
  connectedCallback() {
    this.initializeTabs();
  }
  initializeTabs() {
    var n;
    const t = Array.from(
      this.querySelectorAll(`${l()}-tab-button`)
    ), i = Array.from(
      this.querySelectorAll(`${l()}-tab-panel`)
    );
    if (t.length === 0 || i.length === 0) {
      console.error("No tab buttons or panels found.");
      return;
    }
    t.forEach((a) => {
      const r = a.getAttribute("id");
      r && a.addEventListener("click", () => this.selectTab(r));
    });
    const e = this.getAttribute("selected") || ((n = t[0]) == null ? void 0 : n.getAttribute("id")) || "";
    e ? this.selectTab(e) : t.length > 0 && this.selectTab(t[0].getAttribute("id") || "");
  }
  selectTab(t) {
    const i = Array.from(
      this.querySelectorAll(`${l()}-tab-button`)
    ), e = Array.from(
      this.querySelectorAll(`${l()}-tab-panel`)
    );
    i.forEach((a) => {
      a.getAttribute("id") === t ? a.setAttribute("active", "") : a.removeAttribute("active");
    }), e.forEach((a) => {
      a.getAttribute("id") === t ? a.setAttribute("active", "") : a.removeAttribute("active");
    });
    const n = this.querySelector(
      `${l()}-tab-buttons`
    );
    n && typeof n.updateActiveIndicator == "function" && n.updateActiveIndicator();
  }
}
d("tabs", mt);
class bt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: none;
        padding: 10px;
        background: var(--semantic-background-default);
      }

      :host([active]) {
        display: block;
      }
    `, t.appendChild(i);
    const e = document.createElement("slot");
    t.appendChild(e);
  }
}
d("tab-panel", bt);
class ft extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
      }

      .tab-panel {
        position: absolute;
        top: 0;
        left: 100%;
        width: 100%;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateX(100%);
      }

      .tab-panel[active] {
        position: relative;
        left: 0;
        opacity: 1;
        transform: translateX(0%);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
    `, t.appendChild(i);
    const e = document.createElement("slot");
    t.appendChild(e);
  }
}
d("tab-panels", ft);
class vt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background: var(--tab-button-bg, transparent);
        cursor: pointer;
        transition: background 0.3s;
      }

      :host([active]) {
        font-weight: bold;
      }

      :host(:hover) {
        background: #e0e0e0;
      }
    `, t.appendChild(i);
    const e = document.createElement("slot");
    t.appendChild(e);
  }
}
d("tab-button", vt);
class xt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        position: relative;
        display: flex;
        border-bottom: 1px solid var(--semantic-stroke-default);
        margin: 0;
        padding: 0;
        list-style: none;
        overflow: hidden;
        width: 100%;
      }

      ::slotted(x-tab-button) {
        flex: 1;
        padding: 10px;
        text-align: center;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: background 0.3s;
        position: relative;
        z-index: 1;
      }

      .active-indicator {
        position: absolute;
        bottom: 0;
        height: 2px;
        background-color: var(--tab-button-active-border-color, var(--semantic-stroke-highlight));
        transition: left 0.3s ease, width 0.3s ease;
        z-index: 0;
      }
    `, t.appendChild(i);
    const e = document.createElement("slot");
    t.appendChild(e);
    const n = document.createElement("div");
    n.className = "active-indicator", t.appendChild(n);
  }
  connectedCallback() {
    requestAnimationFrame(() => {
      this.updateActiveIndicator();
    }), this.addEventListener("slotchange", () => this.updateActiveIndicator());
  }
  updateActiveIndicator() {
    var n, a;
    const t = (n = this.shadowRoot) == null ? void 0 : n.querySelector("slot"), e = ((t == null ? void 0 : t.assignedElements()) || []).find(
      (r) => r.hasAttribute("active")
    );
    if (e) {
      const r = (a = this.shadowRoot) == null ? void 0 : a.querySelector(
        ".active-indicator"
      ), c = e.getBoundingClientRect(), u = this.getBoundingClientRect();
      r.style.left = `${c.left - u.left}px`, r.style.width = `${c.width}px`;
    }
  }
}
d("tab-buttons", xt);
class yt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
            :host {
                display: none;
            }
        `, t.appendChild(i);
    const e = document.querySelector(`${l()}-loading`);
    e && document.body.removeChild(e);
  }
}
d("loading", yt);
class kt extends HTMLElement {
  constructor() {
    super();
    const t = this.attachShadow({ mode: "open" }), i = document.createElement("style");
    i.textContent = `
      :host {
        display: block;
        width: 100%;
        position: relative; /* Ensure positioning context for inner divs */  
      }

      /* Fixed/Sticky navigation styles */
      .bottom-nav {
        width: 100%;
        justify-content: space-evenly;
        background-color: var(--semantic-background-alternate);
        border-top: 1px solid var(--semantic-stroke-default);
        color: var(--semantic-text-default);
        padding: ${o("spacing-sm")};
        box-sizing: border-box;
        position: var(--bottom-nav-position, sticky);
        bottom: 0;
        left: 0;
        transition: bottom 0.3s ease-in-out;
        height: ${o("bottom-navigation-height")};
        display: flex;
        align-items: center;
      }

      .spacer {
        height: ${o("bottom-navigation-height")};
      }


      :host([fixed]) {
        z-index: ${b.TOP};
      }

      :host([fixed]) .bottom-nav {
        position: fixed;
      }

      :host([static]) .bottom-nav {
        position: static;
      }
    `, t.appendChild(i);
    const e = document.createElement("div");
    e.className = "spacer";
    const n = document.createElement("div");
    n.className = "bottom-nav";
    const a = document.createElement("slot");
    n.appendChild(a), t.appendChild(e), t.appendChild(n);
  }
  static get observedAttributes() {
    return ["fixed", "static"];
  }
}
d("bottom-navigation", kt);
class wt extends HTMLElement {
  constructor() {
    super(), this.shadow = this.attachShadow({ mode: "open" });
    const t = document.createElement("style");
    t.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${o("spacing-xs")};
        justify-content: center;
        padding: ${o("spacing-xs")};
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
        transition: color 0.18s ease-in-out;
        height: calc(${o("bottom-navigation-height")} - 4px); /* Fixed height */
        width: auto; /* Allow width to adjust based on content */
      }

      :host(:hover) {
        color: var(--semantic-text-highlight, #007bff); /* Highlight color on hover */
      }

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%; /* Fixed height as a percentage of the container height */
        overflow: hidden;
      }

      .icon {
        object-fit: contain; /* Ensure proper scaling */
      }

      .label {
        width: 100%;
        text-align: center;
      }

      /* Hide label if not provided */
      :host([no-label]) .label {
        display: none;
      }
    `;
    const i = this.getAttribute("svg");
    if (i) {
      const n = document.createElement("div");
      n.className = "icon-container", this.icon = new E(), this.icon.setAttribute("svg", i), this.icon.setAttribute("size", "none"), this.icon.className = "icon", n.appendChild(this.icon), this.shadow.appendChild(n);
    }
    const e = new f();
    e.className = "label", e.setAttribute("display", "h6"), e.textContent = this.getAttribute("label") || "", this.getAttribute("label") || this.setAttribute("no-label", ""), this.shadow.appendChild(t), this.shadow.appendChild(e);
  }
  static get observedAttributes() {
    return ["svg"];
  }
  attributeChangedCallback(t, i, e) {
    if (t === "svg" && i !== e) {
      const n = this.shadow.querySelector(".icon-container");
      this.icon ? e ? this.icon.setAttribute("svg", e) : (n && n.removeChild(this.icon), this.icon = void 0) : e && (this.icon = new E(), this.icon.setAttribute("svg", e), this.icon.className = "icon", n && n.appendChild(this.icon));
    }
  }
}
d("bottom-navigation-action", wt);
X("x");
G();
"serviceWorker" in navigator && window.addEventListener("load", () => {
  navigator.serviceWorker.register("/service-worker.js").then((s) => {
    console.log(
      "ServiceWorker registration successful with scope: ",
      s.scope
    );
  }).catch((s) => {
    console.log("ServiceWorker registration failed: ", s);
  });
});
export {
  Q as AppBar,
  ct as Badge,
  at as Block,
  kt as BottomNavigation,
  wt as BottomNavigationAction,
  pt as Box,
  rt as Button,
  et as Card,
  M as CardContent,
  it as CardFooter,
  z as CardMedia,
  L as Checkbox,
  J as Chip,
  dt as ColorPicker,
  ot as Container,
  ht as Divider,
  S as Grid,
  E as Icon,
  Y as Install,
  nt as Link,
  gt as List,
  yt as Loading,
  tt as Select,
  st as Spinner,
  C as Stack,
  lt as Switch,
  vt as TabButton,
  xt as TabButtons,
  bt as TabPanel,
  ft as TabPanels,
  Z as Table,
  mt as Tabs,
  U as Theme,
  V as Tooltip,
  f as Typography
};
