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
      { slug: 'promises-async-await', title: 'Promises and Async/Await', ready: true },
      { slug: 'template-literals', title: 'Template Literals', ready: true },
      { slug: 'modules', title: 'Imports and Exports', ready: true },
    ],
  },
  {
    id: 'meet-react',
    title: 'Part 2 · Meet React',
    lessons: [
      { slug: 'what-is-react', title: 'What Is React?', ready: true },
      { slug: 'first-project', title: 'Your First Project', ready: true },
      { slug: 'rendering-to-the-dom', title: 'Rendering to the Page', ready: true },
    ],
  },
  {
    id: 'jsx',
    title: 'Part 3 · JSX',
    lessons: [
      { slug: 'what-is-jsx', title: 'What Is JSX?', ready: true },
      { slug: 'jsx-expressions', title: 'Putting Values Inside JSX', ready: true },
      { slug: 'jsx-rules', title: 'The Rules of JSX', ready: true },
      { slug: 'conditional-rendering', title: 'Conditional Rendering', ready: true },
      { slug: 'rendering-lists', title: 'Rendering Lists', ready: true },
    ],
  },
  {
    id: 'components',
    title: 'Part 4 · Components',
    lessons: [
      { slug: 'first-component', title: 'Your First Component', ready: true },
      { slug: 'importing-exporting', title: 'Importing and Exporting Components', ready: true },
      { slug: 'props', title: 'Props: Passing Information', ready: true },
      { slug: 'composing', title: 'Combining Components', ready: true },
      { slug: 'ui-as-a-tree', title: 'Your UI as a Tree', ready: true },
      { slug: 'pure-components', title: 'Keeping Components Pure', ready: true },
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
      { slug: 'render-and-commit', title: 'Render and Commit', ready: true },
      { slug: 'state-snapshot', title: 'State Is a Snapshot', ready: true },
      { slug: 'updating-state', title: 'Updating State the Right Way', ready: true },
      { slug: 'updating-objects', title: 'Updating Objects in State', ready: true },
      { slug: 'updating-arrays-in-state', title: 'Updating Arrays in State', ready: true },
      { slug: 'lifting-state-up', title: 'Sharing State Between Components', ready: true },
      { slug: 'choosing-state-structure', title: 'Choosing the State Structure', ready: true },
      { slug: 'preserving-resetting-state', title: 'Preserving and Resetting State', ready: true },
    ],
  },
  {
    id: 'hooks',
    title: 'Part 7 · Hooks',
    lessons: [
      { slug: 'use-effect', title: 'Doing Things with useEffect', ready: true },
      { slug: 'you-might-not-need-an-effect', title: 'You Might Not Need an Effect', ready: true },
      { slug: 'effect-timing', title: 'When Effects Run', ready: true },
      { slug: 'effect-dependencies', title: 'Getting Effect Dependencies Right', ready: true },
      { slug: 'use-ref', title: 'Referencing Values with useRef', ready: true },
      { slug: 'use-reducer', title: 'Extracting Logic with useReducer', ready: true },
      { slug: 'use-context', title: 'Passing Data Deeply with Context', ready: true },
      { slug: 'use-memo', title: 'Caching Values with useMemo', ready: true },
      { slug: 'use-callback', title: 'Caching Functions with useCallback', ready: true },
      { slug: 'use-layout-effect', title: 'useLayoutEffect', ready: true },
      { slug: 'use-imperative-handle', title: 'useImperativeHandle', ready: true },
      { slug: 'use-id', title: 'useId', ready: true },
      { slug: 'use-transition', title: 'useTransition', ready: true },
      { slug: 'use-deferred-value', title: 'useDeferredValue', ready: true },
      { slug: 'use-sync-external-store', title: 'useSyncExternalStore', ready: true },
      { slug: 'use-hook', title: 'The use() Function', ready: true },
      { slug: 'use-action-state', title: 'useActionState', ready: true },
      { slug: 'use-optimistic', title: 'useOptimistic', ready: true },
      { slug: 'other-hooks', title: 'A Few Rare Hooks', ready: true },
      { slug: 'custom-hooks', title: 'Building Your Own Hook', ready: true },
    ],
  },
  {
    id: 'router',
    title: 'Part 8 · React Router',
    lessons: [
      { slug: 'basic-routing', title: 'Pages with React Router', ready: true },
      { slug: 'navigation', title: 'Linking Pages Together', ready: true },
      { slug: 'route-parameters', title: 'Working with Route Parameters', ready: true },
    ],
  },
  {
    id: 'project',
    title: 'Part 9 · Build a Project',
    lessons: [
      { slug: 'mini-project', title: 'Build a To-Do List App', ready: true },
    ],
  },
  {
    id: 'course-catalog-project',
    title: 'Part 10 · Build a Course Catalog',
    lessons: [
      { slug: 'course-catalog-overview', title: 'Rendering the Course List', ready: true },
      { slug: 'course-form', title: 'A Validated Course Form', ready: true },
      { slug: 'course-interactivity', title: 'Favorites and Enrollment', ready: true },
      { slug: 'course-api-submission', title: 'Real API Submission with Promises', ready: true },
      { slug: 'course-statistics', title: 'Computed Statistics with useMemo', ready: true },
      { slug: 'course-detail-pages', title: 'Dedicated Pages with useFetch', ready: true },
    ],
  },
  {
    id: 'bonus',
    title: 'Part 11 · Bonus',
    lessons: [
      { slug: 'intro-to-typescript', title: 'A Peek at TypeScript', ready: true },
    ],
  },

  // --- Advanced Track ---
  // Hard, senior-level topics. Kept as a separate, opt-in track selected via
  // the tier toggle in the Sidebar/HomePage, rather than mixed into the main
  // beginner-to-mid course above.
  {
    id: 'adv-performance',
    title: 'Advanced · Performance Engineering',
    tier: 'advanced',
    lessons: [
      { slug: 'react-memo', title: 'React.memo and Re-render Control', ready: true },
      { slug: 'code-splitting-suspense', title: 'Code Splitting with lazy() and Suspense', ready: true },
    ],
  },
  {
    id: 'adv-resilience',
    title: 'Advanced · Resilience & Escape Hatches',
    tier: 'advanced',
    lessons: [
      { slug: 'error-boundaries', title: 'Error Boundaries', ready: true },
      { slug: 'portals', title: 'Portals', ready: true },
    ],
  },
  {
    id: 'adv-patterns',
    title: 'Advanced · Component Design Patterns',
    tier: 'advanced',
    lessons: [
      { slug: 'compound-components', title: 'Compound Components', ready: true },
      { slug: 'higher-order-components', title: 'Higher-Order Components', ready: true },
    ],
  },
  {
    id: 'adv-concurrent',
    title: 'Advanced · Concurrent React',
    tier: 'advanced',
    lessons: [
      { slug: 'concurrent-rendering', title: 'Concurrent Rendering, Deeply', ready: true },
    ],
  },
  {
    id: 'adv-quality',
    title: 'Advanced · Testing & Accessibility',
    tier: 'advanced',
    lessons: [
      { slug: 'testing-react', title: 'Testing React Components', ready: true },
      { slug: 'accessibility', title: 'Accessibility (a11y) in Depth', ready: true },
    ],
  },
  {
    id: 'adv-architecture',
    title: 'Advanced · Modern Architecture',
    tier: 'advanced',
    lessons: [
      { slug: 'server-components', title: 'Server Components & Streaming SSR', ready: true },
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

export function partsForTier(tier) {
  return curriculum.filter((p) => (p.tier || 'core') === tier)
}

export function totalLessonsForTier(tier) {
  return partsForTier(tier).reduce((sum, p) => sum + p.lessons.length, 0)
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
