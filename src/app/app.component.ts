import { Component, HostListener } from '@angular/core';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>Welcome to {{ title }}!</h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img
        width="300"
        alt="Angular Logo"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
      />
    </div>
    <h2>Here are some links to help you start:</h2>
    <ul>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://angular.io/tutorial"
            >Tour of Heroes</a
          >
        </h2>
      </li>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://angular.io/cli"
            >CLI Documentation</a
          >
        </h2>
      </li>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://blog.angular.io/"
            >Angular blog</a
          >
        </h2>
      </li>
    </ul>
    <dialog [id]="'capture'" style="width: 80vw; height: 80vh;"></dialog>
  `,
  styles: [
    `
      dialog {
        img {
          max-width: 100%;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'app-test';
  openDialog = false;
  @HostListener('document:keydown.control.q', ['$event'])
  async control_q(event: KeyboardEvent) {
    event.preventDefault();
    this.htmlToCanvas();
    // this.generate();
    this.takeSS();
  }

  async takeSS() {
    // take the screenshot
    const screenshotJpegBlob = await takeScreenshotJpegBlob();
    if (!screenshotJpegBlob) throw Error('Failed to get blob');
    // show preview with max size 300 x 300 px
    const previewCanvas = await blobToCanvas(screenshotJpegBlob, 1600, 800);
    if (!previewCanvas) throw Error('Failed to get canvas');
    previewCanvas.style.position = 'fixed';
    document.body.appendChild(previewCanvas);
    console.log('Completed!', {
      dataurl: previewCanvas.toDataURL(),
      l: previewCanvas.toDataURL().length,
    });
  }

  async htmlToCanvas() {
    const canvas = await html2canvas(
      document.querySelector('app-root') as HTMLElement,
      {
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
        ignoreElements: (element) => {
          // return element.id === 'capture';
          return false;
        },
      },
    );
    const container = document.getElementById('capture') as HTMLDialogElement;
    const oldImage = container.querySelector('img');
    if (oldImage) container.removeChild(oldImage);
    const image = new Image();
    image.src = canvas.toDataURL();
    container.appendChild(image);
    this.openDialog = true;
    container.showModal();
  }

  takeScreenshot() {
    const screenshot = document.documentElement.cloneNode(true) as HTMLElement;
    if (!screenshot) throw new Error('Failed to get element');
    screenshot.style.pointerEvents = 'none';
    screenshot.style.overflow = 'hidden';
    screenshot.style.webkitUserSelect = 'none';
    if ('mozUserSelect' in screenshot.style)
      screenshot.style.mozUserSelect = 'none';
    if ('msUserSelect' in screenshot.style)
      screenshot.style.msUserSelect = 'none';
    if ('oUserSelect' in screenshot.style)
      screenshot.style.oUserSelect = 'none';
    screenshot.style.userSelect = 'none';
    screenshot.dataset['scrollX'] = `${window.scrollX}`;
    screenshot.dataset['scrollY'] = `${window.scrollY}`;
    const blob = new Blob([screenshot.outerHTML], {
      type: 'text/html',
    });
    console.log({ blob });
    console.log(window.URL.createObjectURL(blob));
    return blob;
  }

  generate() {
    window.URL = window.URL || window.webkitURL;
    const url = window.URL.createObjectURL(this.takeScreenshot());
    console.log({ url });
    // window.open(url, '_blank');
  }
}

// docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
// see: https://www.webrtc-experiment.com/Pluginfree-Screen-Sharing/#20893521368186473
// see: https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Pluginfree-Screen-Sharing/conference.js

function getDisplayMedia(
  options: Parameters<typeof navigator.mediaDevices.getDisplayMedia>[0],
) {
  if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
    return navigator.mediaDevices.getDisplayMedia(options);
  }
  if ('getDisplayMedia' in navigator) {
    return (
      navigator.getDisplayMedia as typeof navigator.mediaDevices.getDisplayMedia
    )(options);
  }
  if ('webkitGetDisplayMedia' in navigator) {
    return (
      navigator.webkitGetDisplayMedia as typeof navigator.mediaDevices.getDisplayMedia
    )(options);
  }
  if ('mozGetDisplayMedia' in navigator) {
    return (
      navigator.mozGetDisplayMedia as typeof navigator.mediaDevices.getDisplayMedia
    )(options);
  }
  throw new Error('getDisplayMedia is not defined');
}

function getUserMedia(
  options: Parameters<typeof navigator.mediaDevices.getUserMedia>[0],
) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(options);
  }
  if ('getUserMedia' in navigator) {
    return (
      navigator.getUserMedia as typeof navigator.mediaDevices.getUserMedia
    )(options);
  }
  if ('webkitGetUserMedia' in navigator) {
    return (
      navigator.webkitGetUserMedia as typeof navigator.mediaDevices.getUserMedia
    )(options);
  }
  if ('mozGetUserMedia' in navigator) {
    return (
      navigator.mozGetUserMedia as typeof navigator.mediaDevices.getUserMedia
    )(options);
  }
  throw new Error('getUserMedia is not defined');
}

async function takeScreenshotStream() {
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/screen
  const width = screen.width * (window.devicePixelRatio || 1);
  const height = screen.height * (window.devicePixelRatio || 1);

  const errors = [];
  let stream;
  try {
    stream = await getDisplayMedia({
      audio: false,
      // see: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints/video
      video: {
        width,
        height,
        frameRate: 1,
      },
    });
  } catch (ex) {
    errors.push(ex);
  }

  // for electron js
  if (navigator.userAgent.indexOf('Electron') >= 0) {
    try {
      stream = await getUserMedia({
        audio: false,
        video: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          mandatory: {
            chromeMediaSource: 'desktop',
            // chromeMediaSourceId: source.id,
            minWidth: width,
            maxWidth: width,
            minHeight: height,
            maxHeight: height,
          },
        },
      });
    } catch (ex) {
      errors.push(ex);
    }
  }

  if (errors.length) {
    console.debug(...errors);
    if (!stream) {
      throw errors[errors.length - 1];
    }
  }

  return stream;
}

async function takeScreenshotCanvas() {
  const stream = await takeScreenshotStream();

  // from: https://stackoverflow.com/a/57665309/5221762
  if (!stream) throw Error('Stream not found');

  const video = document.createElement('video');
  const result = await new Promise<HTMLCanvasElement>((resolve, reject) => {
    video.onloadedmetadata = () => {
      video.play();
      video.pause();

      // from: https://github.com/kasprownik/electron-screencapture/blob/master/index.js
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (!context) throw Error('Failed to get context');
      // see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      resolve(canvas);
    };
    video.srcObject = stream;
  });

  stream.getTracks().forEach(function (track) {
    track.stop();
  });

  if (result == null) {
    throw new Error('Cannot take canvas screenshot');
  }

  return result;
}

// from: https://stackoverflow.com/a/46182044/5221762
function getJpegBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve, reject) => {
    // docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.95);
  });
}

async function getJpegBytes(canvas: HTMLCanvasElement) {
  const blob = await getJpegBlob(canvas);
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('loadend', function () {
      if (this.error) {
        reject(this.error);
        return;
      }
      resolve(this.result);
    });
    if (!blob) throw Error('Blob not generated');
    fileReader.readAsArrayBuffer(blob);
  });
}

async function takeScreenshotJpegBlob() {
  const canvas = await takeScreenshotCanvas();
  return getJpegBlob(canvas);
}

async function takeScreenshotJpegBytes() {
  const canvas = await takeScreenshotCanvas();
  return getJpegBytes(canvas);
}

function blobToCanvas(blob: Blob, maxWidth: number, maxHeight: number) {
  return new Promise<HTMLCanvasElement>((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const scale = Math.min(
        1,
        maxWidth ? maxWidth / img.width : 1,
        maxHeight ? maxHeight / img.height : 1,
      );
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw Error('Context didnot get');
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        canvas.width,
        canvas.height,
      );
      resolve(canvas);
    };
    img.onerror = () => {
      reject(new Error('Error load blob to Image'));
    };
    img.src = URL.createObjectURL(blob);
  });
}
