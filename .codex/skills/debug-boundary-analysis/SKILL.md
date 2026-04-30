---
name: debug-boundary-analysis
description: Use when a software bug has survived multiple fixes, symptoms migrate between performance problems, crashes, stale state, rebuilds, cache invalidation, undo/redo, lifecycle bugs, native handles, UI state, or user feedback such as "same as before", "this got worse", "change approach", or "the fix moved the problem". This skill pauses symptom chasing, redraws state and lifecycle boundaries, identifies the principal contradiction, turns feedback into an engineering rule, proposes only the minimal code changes serving that rule, produces a verification matrix, and records unresolved residuals.
---

# 状态边界调试法

## Overview

Use this skill when ordinary patching starts moving the bug around. The core rule is:

`When a patch makes symptoms migrate, stop chasing symptoms and redraw the state boundaries.`

This skill translates 差结构学习法 into engineering debugging: distinguish state types first, inspect lifecycle boundaries, route feedback to the right layer, then verify with the smallest experiment that can fail.

## Do Not Use For

- A fresh, local, single-cause bug with a clear stack trace and obvious fix
- Pure formatting, copy, or dependency bumps
- Cases where domain documentation or API facts have not been checked yet

For those, use normal debugging first. Return here when fixes start trading one symptom for another.

## Trigger Signals

Use this skill when any of these appear:

- A bug returns after several plausible fixes.
- Fixing performance creates crashes, or fixing crashes causes slow rebuilds.
- Undo/redo, hot reload, navigation, session restore, cache reuse, reconnect, or native bridge state is involved.
- Long-lived runtime state is mixed with short-lived UI, scene, request, file, or cache state.
- User feedback says the change feels unchanged, worse, or pointed at the wrong problem.
- Logs show stale references, invalid handles, duplicate initialization, repeated rebuilds, or inconsistent cache hits.

## Workflow

### 1. Pause Patching

Stop adding local patches until the state boundary is named. Say explicitly what symptom chasing has already failed to explain.

### 2. Strengthen The Feedback

Convert the user report into the strongest system-level question before answering it.

Use this shape:

```text
Original feedback:

Strongest restatement:

Question type:

Hit point:
```

Good `Question type` values include lifecycle, state ownership, invalidation, feedback loop, boundary mismatch, cache coherence, concurrency, or verification gap.

### 3. List State Objects

Name every relevant state object before proposing code:

- File-level state
- Runtime-level state
- Scene or document state
- UI-level state
- Session-level state
- Cache-level state
- Native or external handle state
- Derived state such as depsgraph, memoized selectors, indexes, or computed views

Do not treat all objects called "cache", "runtime", "context", or "manager" as the same kind of state.

### 4. Classify Lifecycles

For each state object, answer:

- Who creates it
- Who owns it
- What event invalidates it
- Whether it may survive undo, reload, navigation, reconnect, or file changes
- Whether it can safely hold references to shorter-lived objects
- What must be re-resolved instead of retained

If an object survives longer than something it references, mark that as a candidate principal contradiction.

### 5. Find The Principal Contradiction

Pick the boundary confusion that explains the largest cluster of symptoms.

Prefer a statement like:

```text
Long-lived A is holding or assuming validity of short-lived B.
Fixing symptom X preserves A too aggressively, while fixing symptom Y rebuilds A too often.
```

This is the point where debugging should change from "fix this symptom" to "enforce this state discipline".

### 6. Generate An Engineering Rule

Turn the diagnosis into one rule that code can obey.

Examples:

- Keep long-lived runtime cores, but invalidate scene/RNA/depsgraph references after undo.
- Reuse expensive compiled artifacts, but re-resolve request/session handles per transaction.
- Preserve UI selection intent, but drop DOM node references after remount.
- Cache parsed file content by content hash, but invalidate derived indexes when schema version changes.

### 7. Make The Minimal Code Change

Only change code that serves the rule. Avoid opportunistic cleanup while the lifecycle boundary is still being stabilized.

Good changes usually look like:

- Split core state from environment-bound references.
- Add explicit invalidation for short-lived references.
- Add lazy re-resolution at the first safe use point.
- Add generation tokens, version checks, weak references, or ownership guards.
- Move rebuild triggers from broad events to the exact invalidation boundary.

### 8. Verify With A Matrix

Do not report only "fixed". Build a small matrix that tries to falsify the new boundary.

Use this shape:

```text
Scenario:
Expected retained state:
Expected invalidated state:
Observed:
Pass/fail:
```

Include the path that used to be slow, the path that used to crash, and one ordinary path that should remain unchanged.

### 9. Register Residuals

Record unsolved risk instead of smoothing it over:

```text
Residual name:
Node:
Problem type:
Current action:
Write-back location:
Next condition:
```

Residuals are not excuses. They are named future tests.

## Reflection Module

Use this module when feedback says "not solved" or "wrong direction".

```text
Q  = original question or complaint
Q* = strongest restatement
T  = type of challenge
H  = hit point
A  = action now
W  = write-back location
R/N = residual or next step
```

The important move is `Q -> Q*`: treat repeated negative feedback as a signal about the model of the bug, not merely as another symptom.

## Feedback Module

Use this module to turn logs, crashes, latency, or user reports into a closed loop:

```text
Difference exposed
Boundary and criteria
Sensing and record
Return channel
Adjustment action
Measure again
Retain if effective / dissipate if ineffective
```

If feedback does not change an engineering rule, it has not yet returned to structure.

## Output Shape

For substantial debugging tasks, prefer this compact report:

1. Strongest restatement
2. State objects and lifecycle classes
3. Principal contradiction
4. Engineering rule
5. Minimal code change
6. Verification matrix
7. Residual registry

## Blender / Undo Reference

If the bug involves Blender, undo/redo, depsgraph, RNA pointers, scene references, native bridge handles, or expensive RigLogic-like runtime objects, read [references/blender-undo-case.md](references/blender-undo-case.md).
