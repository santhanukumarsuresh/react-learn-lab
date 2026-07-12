import { lazy } from 'react'

// Maps a lesson slug to its lazily-loaded content component.
// Only lessons marked `ready: true` in curriculum.js need an entry here.
export const lessonComponents = {
  welcome: lazy(() => import('./Welcome.jsx')),
  'what-you-need': lazy(() => import('./WhatYouNeed.jsx')),
  variables: lazy(() => import('./Variables.jsx')),
  functions: lazy(() => import('./Functions.jsx')),
  'arrays-objects': lazy(() => import('./ArraysObjects.jsx')),
  destructuring: lazy(() => import('./Destructuring.jsx')),
  'spread-rest': lazy(() => import('./SpreadRest.jsx')),
  modules: lazy(() => import('./Modules.jsx')),
  'what-is-react': lazy(() => import('./WhatIsReact.jsx')),
  'first-project': lazy(() => import('./FirstProject.jsx')),
  'what-is-jsx': lazy(() => import('./WhatIsJsx.jsx')),
  'jsx-expressions': lazy(() => import('./JsxExpressions.jsx')),
  'jsx-rules': lazy(() => import('./JsxRules.jsx')),
  'first-component': lazy(() => import('./FirstComponent.jsx')),
  props: lazy(() => import('./Props.jsx')),
  composing: lazy(() => import('./Composing.jsx')),
  'click-events': lazy(() => import('./ClickEvents.jsx')),
  'form-events': lazy(() => import('./FormEvents.jsx')),
  'use-state': lazy(() => import('./UseState.jsx')),
  'updating-state': lazy(() => import('./UpdatingState.jsx')),
  'use-effect': lazy(() => import('./UseEffect.jsx')),
  'custom-hooks': lazy(() => import('./CustomHooks.jsx')),
  'basic-routing': lazy(() => import('./BasicRouting.jsx')),
  navigation: lazy(() => import('./Navigation.jsx')),
  'mini-project': lazy(() => import('./MiniProject.jsx')),
}
