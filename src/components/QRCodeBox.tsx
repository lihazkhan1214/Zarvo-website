import { useCallback, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

type Props = {
  value: string;
  size?: number; // px
  label?: string;
  downloadable?: boolean; // show download buttons
};

export default function QRCodeBox({
  value,
  size = 180,
  label,
  downloadable = true,
}: Props) {
  // We render the QR and then query the <svg> inside this container.
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getSvgElement = useCallback((): SVGSVGElement | null => {
    if (!containerRef.current) return null;
    return containerRef.current.querySelector("svg");
  }, []);

  const downloadSVG = useCallback(() => {
    const svgEl = getSvgElement();
    if (!svgEl) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);

    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qr.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // cleanup
    URL.revokeObjectURL(url);
  }, [getSvgElement]);

  const downloadPNG = useCallback(() => {
    const svgEl = getSvgElement();
    if (!svgEl) return;

    // Serialize SVG
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgEl);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Draw SVG onto a canvas and export PNG
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const w = size;
      const h = size;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear and draw
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "qr.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      URL.revokeObjectURL(svgUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  }, [getSvgElement, size]);

  return (
    <div className="w-full rounded-lg bg-black/20 p-6 grid place-items-center">
      <div ref={containerRef}>
        <QRCodeSVG value={value} includeMargin size={size} />
      </div>

      <div className="mt-3 w-full flex items-center justify-between gap-3">
        <div className="text-xs text-[#98A2B3] truncate">{label}</div>

        {downloadable && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={downloadPNG}
              className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
            >
              Download PNG
            </button>
            <button
              type="button"
              onClick={downloadSVG}
              className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
            >
              SVG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
