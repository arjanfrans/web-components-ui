import { register, variable } from "../../framework/register";

export class CardMedia extends HTMLElement {
  private styleElement: HTMLStyleElement;
  private mediaElement: HTMLElement;

  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element
    this.styleElement = document.createElement("style");
    this.styleElement.textContent = `
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
                height: ${variable("card-media-size-sm")};
            }
            .medium {
                height: ${variable("card-media-size-md")};
            }
            .large {
                height: ${variable("card-media-size-lg")};
            }
        `;
    shadow.appendChild(this.styleElement);

    // Create a container for media elements
    this.mediaElement = document.createElement("div");
    this.mediaElement.style.position = "relative";
    this.mediaElement.style.width = "100%";
    this.mediaElement.style.height = "100%";
    this.mediaElement.style.display = "flex";
    shadow.appendChild(this.mediaElement);
  }

  static get observedAttributes() {
    return ["src", "size", "loading"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue !== newValue) {
      if (CardMedia.observedAttributes.includes(name)) {
        this.updateMedia();
      }
    }
  }

  updateMedia() {
    const src = this.getAttribute("src");
    const loading = this.getAttribute("loading") || undefined;
    const size = this.getAttribute("size") || undefined;
    const type = this.detectMediaType(src);

    if (src && type) {
      this.mediaElement.innerHTML = ""; // Clear previous content

      const mediaElement =
        type === "image"
          ? document.createElement("img")
          : document.createElement("video");

      mediaElement.src = src;

      if (type === "image") {
        (mediaElement as HTMLImageElement).loading =
          loading === "lazy" ? loading : "eager";
      }

      if (size) {
        mediaElement.className = size;
      }

      if (type === "video") {
        const videoElement = mediaElement as HTMLVideoElement;

        videoElement.muted = true;
        videoElement.controls = false;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.playsInline = true;

        this.mediaElement.appendChild(videoElement);
      } else {
        this.mediaElement.appendChild(mediaElement);
      }
    }
  }

  detectMediaType(src: string | null): string | null {
    if (!src) return null;
    const extension = src.split(".").pop()?.toLowerCase();

    if (extension) {
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
      const videoExtensions = ["mp4", "webm", "ogg"];

      if (imageExtensions.includes(extension)) {
        return "image";
      } else if (videoExtensions.includes(extension)) {
        return "video";
      }
    }

    return "image";
  }

  // Getters and setters for attributes
  get src() {
    return this.getAttribute("src");
  }

  set src(value) {
    if (value) {
      this.setAttribute("src", value);
    } else {
      this.removeAttribute("src");
    }
  }

  get size() {
    return this.getAttribute("size");
  }

  set size(value) {
    if (value) {
      this.setAttribute("size", value);
    } else {
      this.removeAttribute("size");
    }
  }
}

register("card-media", CardMedia);
