export function generateNonExistentObjectId(): string {
  return 'x'.repeat(24).replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}