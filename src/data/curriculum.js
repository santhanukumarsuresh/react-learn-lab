// The full course outline. Each lesson points at a slug used in the URL.
// `ready: true` lessons have real written content in src/lessons.
// `ready: false` lessons (none currently) show a friendly "coming soon" teaser.

export const curriculum = [
  {
    id: 'start-here',
    title: 'Start Here',
    lessons: [
      { slug: 'welcome', title: 'Welcome!', ready: true },
      { slug: 'what-you-need', title: 'What Do I Need?', ready: true },
    ],
  },
  {
    id: 'javascript-basics',
    title: 'Part 1 · JavaScript Warm-Up',
    lessons: [
      { slug: 'variables', title: 'Variables: let and const', ready: true },
      { slug: 'functions', title: 'Functions & Arrow Functions', ready: true },
      { slug: 'arrays-objects', title: 'Arrays and Objects', ready: true },
      { slug: 'destructuring', title: 'Destructuring', ready: true },
      { slug: 'spread-rest', title: 'Spread and Rest', ready: true },
      { slug: 'modules', title: 'Imports and Exports', ready: true },
    ],
  },
  {
    id: 'meet-react',
    title: 'Part 2 · Meet React',
    lessons: [
      { slug: 'what-is-react', title: 'What Is React?', ready: true },
      { slug: 'first-project', title: 'Your First Project', ready: true },
    ],
  },
  {
    id: 'jsx',
    title: 'Part 3 · JSX',
    lessons: [
      { slug: 'what-is-jsx', title: 'What Is JSX?', ready: true },
      { slug: 'jsx-expressions', title: 'Putting Values Inside JSX', ready: true },
      { slug: 'jsx-rules', title: 'The Rules of JSX', ready: true },
    ],
  },
  {
    id: 'components',
    title: 'Part 4 · Components',
    lessons: [
      { slug: 'first-component', title: 'Your First Component', ready: true },
      { slug: 'props', title: 'Props: Passing Information', ready: true },
      { slug: 'composing', title: 'Combining Components', ready: true },
    ],
  },
  {
    id: 'events',
    title: 'Part 5 · Event Handling',
    lessons: [
      { slug: 'click-events', title: 'Handling Clicks', ready: true },
      { slug: 'form-events', title: 'Handling Forms', ready: true },
    ],
  },
  {
    id: 'state',
    title: 'Part 6 · State',
    lessons: [
      { slug: 'use-state', title: 'Remembering Things with useState', ready: true },
      { slug: 'updating-state', title: 'Updating State the Right Way', ready: true },
    ],
  },
  {
    id: 'hooks',
    title: 'Part 7 · Hooks',
    lessons: [
      { slug: 'use-effect', title: 'Doing Things with useEffect', ready: true },
      { slug: 'custom-hooks', title: 'Building Your Own Hook', ready: true },
    ],
  },
  {
    id: 'router',
    title: 'Part 8 · React Router',
    lessons: [
      { slug: 'basic-routing', title: 'Pages with React Router', ready: true },
      { slug: 'navigation', title: 'Linking Pages Together', ready: true },
    ],
  },
  {
    id: 'project',
    title: 'Part 9 · Build a Project',
    lessons: [
      { slug: 'mini-project', title: 'Build a To-Do List App', ready: true },
    ],
  },
]

export function findLesson(partId, lessonSlug) {
  const part = curriculum.find((p) => p.id === partId)
  if (!part) return null
  const lessonIndex = part.lessons.findIndex((l) => l.slug === lessonSlug)
  if (lessonIndex === -1) return null
  return { part, lesson: part.lessons[lessonIndex], lessonIndex }
}

export function flattenLessons() {
  return curriculum.flatMap((part) =>
    part.lessons.map((lesson, i) => ({ part, lesson, lessonIndex: i }))
  )
}

export function getAdjacentLessons(partId, lessonSlug) {
  const flat = flattenLessons()
  const index = flat.findIndex(
    (item) => item.part.id === partId && item.lesson.slug === lessonSlug
  )
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  }
}

export const totalLessons = curriculum.reduce((sum, p) => sum + p.lessons.length, 0)
