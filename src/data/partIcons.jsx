import {
  Flag,
  Puzzle,
  Atom,
  FileCode2,
  Blocks,
  MousePointerClick,
  SlidersHorizontal,
  Anchor,
  Compass,
  Rocket,
} from 'lucide-react'

// Maps each curriculum part id to a Lucide icon component.
export const partIcons = {
  'start-here': Flag,
  'javascript-basics': Puzzle,
  'meet-react': Atom,
  jsx: FileCode2,
  components: Blocks,
  events: MousePointerClick,
  state: SlidersHorizontal,
  hooks: Anchor,
  router: Compass,
  project: Rocket,
}
