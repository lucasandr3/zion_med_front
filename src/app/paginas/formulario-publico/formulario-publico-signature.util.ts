const SIGNATURE_STROKE_COLOR = '#0a0a0a';

export function getSignatureCanvas(key: string): HTMLCanvasElement | null {
  return typeof document !== 'undefined'
    ? (document.getElementById('signature_' + key) as HTMLCanvasElement | null)
    : null;
}

function getSignaturePoint(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  if (e instanceof TouchEvent && e.touches.length) {
    return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
  }
  const me = e as MouseEvent;
  return { x: (me.clientX - rect.left) * scaleX, y: (me.clientY - rect.top) * scaleY };
}

function configureSignatureContext(ctx: CanvasRenderingContext2D): void {
  ctx.strokeStyle = SIGNATURE_STROKE_COLOR;
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}

export function startSignatureDraw(e: MouseEvent | TouchEvent, key: string): void {
  e.preventDefault();
  const canvas = getSignatureCanvas(key);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  configureSignatureContext(ctx);
  const pos = getSignaturePoint(e, canvas);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  (canvas as unknown as { _signing: boolean })._signing = true;
}

export function moveSignatureDraw(e: MouseEvent | TouchEvent, key: string): void {
  e.preventDefault();
  const canvas = getSignatureCanvas(key);
  if (!canvas || !(canvas as unknown as { _signing?: boolean })._signing) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  configureSignatureContext(ctx);
  const pos = getSignaturePoint(e, canvas);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

export function endSignatureDraw(key: string): string {
  const canvas = getSignatureCanvas(key);
  if (!canvas) return '';
  (canvas as unknown as { _signing: boolean })._signing = false;
  return canvas.toDataURL('image/png');
}

export function clearSignatureCanvas(key: string): void {
  const canvas = getSignatureCanvas(key);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
