import { lazy } from 'react'

// Maps a lesson slug to its lazily-loaded content component.
// Only lessons marked `ready: true` in curriculum.js need an entry here.
export const lessonComponents = {
  welcome: lazy(() => import('./Welcome.jsx')),
  'what-you-need': lazy(() => import('./WhatYouNeed.jsx')),
  variables: lazy(() => import('./Variables.jsx')),
  functions: lazy(() => import('./Functions.jsx')),
  'arrays-objects': lazy(() => import('./ArraysObjects.jsx')),
  'what-is-react': lazy(() => import('./WhatIsReact.jsx')),
  'first-project': lazy(() => import('./FirstProject.jsx')),
  'what-is-jsx': lazy(() => import('./WhatIsJsx.jsx')),
  'first-component': lazy(() => import('./FirstComponent.jsx')),
  props: lazy(() => import('./Props.jsx')),
  'use-state': lazy(() => import('./UseState.jsx')),
}
