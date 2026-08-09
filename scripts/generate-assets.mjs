import sharp from 'sharp';

const proofImages = [
  ['src/assets/ab_1024.png', 'src/assets/ab_1024.webp', 1024],
  ['src/assets/ab_1152.png', 'src/assets/ab_1152.webp', 1152],
  ['src/assets/ab_1280.png', 'src/assets/ab_1280.webp', 1280],
  ['src/assets/memory-graph.png', 'src/assets/memory-graph.webp', 1200],
];

await Promise.all(
  proofImages.map(([input, output, width]) =>
    sharp(input)
      .resize({ width: Number(width), withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(output),
  ),
);
