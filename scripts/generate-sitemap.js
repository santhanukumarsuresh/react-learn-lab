import { writeFileSync } from 'node:fs'
import { curriculum } from '../src/data/curriculum.js'

const BASE_URL = 'https://santhanukumarsuresh.github.io/react-learn-lab'

const urls = ['/', ...curriculum.flatMap((part) => part.lessons.map((l) => `/learn/${part.id}/${l.slug}`))]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${BASE_URL}${path}</loc></url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('../dist/sitemap.xml', import.meta.url), xml)
console.log(`Generated sitemap.xml with ${urls.length} URLs`)
