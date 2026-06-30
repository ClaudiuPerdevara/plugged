import { readdir, stat } from "node:fs/promises"
import { join, extname, basename } from "node:path"
import sharp from "sharp"

const ROOT = "public/catalog"

// Higher-quality pass: heroes render full-bleed so keep them large + crisp;
// covers/galleries are shown smaller. We never upscale (withoutEnlargement),
// so source detail is preserved; only compression quality changed (74 -> 90/88).
function settingsFor(file) {
  const name = basename(file).toLowerCase()
  if (name.startsWith("hero")) return { width: 2000, quality: 92 }
  if (name.startsWith("cover")) return { width: 1600, quality: 90 }
  return { width: 1500, quality: 88 }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) files.push(...(await walk(p)))
    else if (extname(e.name).toLowerCase() === ".png") files.push(p)
  }
  return files
}

const pngs = await walk(ROOT)
let before = 0
let after = 0

for (const src of pngs) {
  const out = src.replace(/\.png$/i, ".webp")
  const { width, quality } = settingsFor(src)
  const orig = (await stat(src)).size
  before += orig
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(out)
  const size = (await stat(out)).size
  after += size
}

console.log(
  `TOTAL ${pngs.length} files: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB`,
)
