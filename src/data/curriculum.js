// The full course outline. Each lesson points at a slug used in the URL.
// `ready: true` lessons have real written content in src/lessons.
// `ready: false` lessons show a friendly "coming soon" teaser.

export const curriculum = [
  {
    id: 'start-here',
    title: 'Start Here',
    icon: '👋',
    lessons: [
      { slug: 'welcome', title: 'Welcome!', ready: true },
      { slug: 'what-you-need', title: 'What Do I Need?', ready: true },
    ],
  },
  {
    id: 'javascript-basics',
    title: 'Part 1 · JavaScript Warm-Up',
    icon: '🧩',
    lessons: [
      { slug: 'variables', title: 'Variables: let and const', ready: true },
      { slug: 'functions', title: 'Functions & Arrow Functions', ready: true },
      { slug: 'arrays-objects', title: 'Arrays and Objects', ready: true },
      { slug: 'destructuring', title: 'Destructuring', ready: false },
      { slug: 'spread-rest', title: 'Spread and Rest', ready: false },
      { slug: 'modules', title: 'Imports and Exports', ready: false },
    ],
  },
  {
    id: 'meet-react',
    title: 'Part 2 · Meet React',
    icon: '⚛️',
    lessons: [
      { slug: 'what-is-react', title: 'What Is React?', ready: true },
      { slug: 'first-project', title: 'Your First Project', ready: true },
    ],
  },
  {
    id: 'jsx',
    title: 'Part 3 · JSX',
    icon: '📝',
    lessons: [
      { slug: 'what-is-jsx', title: 'What Is JSX?', ready: true },
      { slug: 'jsx-expressions', title: 'Putting Values Inside JSX', ready: false },
      { slug: 'jsx-rules', title: 'The Rules of JSX', ready: false },
    ],
  },
  {
    id: 'components',
    title: 'Part 4 · Components',
    icon: '🧱',
    lessons: [
      { slug: 'first-component', title: 'Your First Component', ready: true },
      { slug: 'props', title: 'Props: Passing Information', ready: true },
      { slug: 'composing', title: 'Combining Components', ready: false },
    ],
  },
  {
    id: 'events',
    title: 'Part 5 · Event Handling',
    icon: '🖱️',
    lessons: [
      { slug: 'click-events', title: 'Handling Clicks', ready: false },
      { slug: 'form-events', title: 'Handling Forms', ready: false },
    ],
  },
  {
    id: 'state',
    title: 'Part 6 · State',
    icon: '🎛️',
    lessons: [
      { slug: 'use-state', title: 'Remembering Things with useState', ready: true },
      { slug: 'updating-state', title: 'Updating State the Right Way', ready: false },
    ],
  },
  {
    id: 'hooks',
    title: 'Part 7 · Hooks',
    icon: '🪝',
    lessons: [
      { slug: 'use-effect', title: 'Doing Things with useEffect', ready: false },
      { slug: 'custom-hooks', title: 'Building Your Own Hook', ready: false },
    ],
  },
  {
    id: 'router',
    title: 'Part 8 · React Router',
    icon: '🧭',
    lessons: [
      { slug: 'basic-routing', title: 'Pages with React Router', ready: false },
      { slug: 'navigation', title: 'Linking Pages Together', ready: false },
    ],
  },
  {
    id: 'project',
    title: 'Part 9 · Build a Project',
    icon: '🚀',
    lessons: [
      { slug: 'mini-project', title: 'Build a To-Do List App', ready: false },
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
