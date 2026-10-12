interface FsDocument extends Document {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  mozCancelFullScreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
}
interface FsElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
}
export const FULLSCREEN_EVENTS = [
  "fullscreenchange", "webkitfullscreenchange",
  "mozfullscreenchange", "MSFullscreenChange",
] as const;

export function isFullscreenActive(): boolean {
  const doc = document as FsDocument;
  return !!(doc.fullscreenElement || doc.webkitFullscreenElement ||
    doc.mozFullScreenElement || doc.msFullscreenElement);
}

export async function toggleFullscreen(): Promise<void> {
  const doc = document as FsDocument;
  const el = document.documentElement as FsElement;
  try {
    if (isFullscreenActive()) {
      if (doc.exitFullscreen) await doc.exitFullscreen();
      else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
      else if (doc.mozCancelFullScreen) await doc.mozCancelFullScreen();
      else if (doc.msExitFullscreen) await doc.msExitFullscreen();
    } else {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) await el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
    }
  } catch (error) {
    console.error("Error toggling fullscreen:", error);
  }
}
