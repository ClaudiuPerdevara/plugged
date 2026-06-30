import { readdir, stat } from "node:fs/promises"
import { join, extname, basename } from "node:path"
import sharp from "sharp"

const ROOT = "public/catalog"

// Hero images render full-bleed → allow more width. Everything else is shown
// in cards / galleries at far smaller sizes.
function maxWidthFor(file) {
  const name = basename(file).toLowerCase()
  if (name.startsWith("hero")) return 1600
  if (name.startsWith("cover")) return 1100
  return 1080
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
  const maxW = maxWidthFor(src)
  const orig = (await stat(src)).size
  before += orig
  await sharp(src)
    .resize({ width: maxW, withoutEnlargement: true })
    .webp({ quality: 74, effort: 5 })
    .toFile(out)
  const size = (await stat(out)).size
  after += size
  console.log(
    `${src}  ${(orig / 1024).toFixed(0)}KB -> ${(size / 1024).toFixed(0)}KB`,
  )
}

console.log(
  `\nTOTAL ${pngs.length} files: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB`,
)
