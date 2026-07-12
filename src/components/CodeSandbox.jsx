import {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
  createContext,
  useMemo,
  useCallback,
  useLayoutEffect,
  useImperativeHandle,
  useId,
  useTransition,
  useDeferredValue,
  useSyncExternalStore,
  useDebugValue,
  use,
  useActionState,
  useOptimistic,
  memo,
  forwardRef,
  lazy,
  Suspense,
  Component,
} from 'react'
import { createPortal } from 'react-dom'
import {
  MemoryRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

export const baseScope = {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
  createContext,
  useMemo,
  useCallback,
  useLayoutEffect,
  useImperativeHandle,
  useId,
  useTransition,
  useDeferredValue,
  useSyncExternalStore,
  useDebugValue,
  use,
  useActionState,
  useOptimistic,
  memo,
  forwardRef,
  lazy,
  Suspense,
  Component,
  createPortal,
  MemoryRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
}

// A small live-editable code playground used inside lessons.
// Kids can change the code on the left and see the result update instantly.
export default function CodeSandbox({ code, noInline = true, scope }) {
  return (
    <LiveProvider
      code={code.trim()}
      noInline={noInline}
      scope={{ ...baseScope, ...scope }}
    >
      <div className="my-6 overflow-hidden rounded-xl border border-slate-700 shadow-lg">
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <span className="ml-2">Try it yourself — edit the code!</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-slate-900 p-4 text-sm">
            <LiveEditor className="font-mono" />
          </div>
          <div className="flex flex-col justify-center bg-white p-4">
            <LivePreview />
            <LiveError className="mt-2 text-xs text-red-600" />
          </div>
        </div>
      </div>
    </LiveProvider>
  )
}
