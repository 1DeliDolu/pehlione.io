export const hauptKategorien = ['foto', 'garten'] as const

export const unterKategorien: Record<string, string[]> = {
  foto: ['natur', 'herbst', 'blumen'],
  garten: ['herbst', 'ernte', 'gemuese'],
}

