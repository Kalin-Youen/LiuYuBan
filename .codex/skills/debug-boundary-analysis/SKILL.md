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

### 0. Anti-Loop Gate

Before touching code, check whether this is already a repeated failure.

If the same class of bug has survived two plausible fixes, or the user says the agent is "going in circles", "still wrong", "same as before", or "only adding patches", local patching is forbidden until the following four artifacts are written:

```text
Comparison object:
What are the two entrances, states, components, or lifecycles being compared?
What is the entrance difference of this bug?

State owner:
Which state belongs to the user or durable document?
Which state is only temporarily occupied by the operation?
Which code is allowed to write each state?

Executable success criterion:
What concrete observable facts prove success after the operation?
Use runtime facts, not prose. Example:
- bpy.context.mode == "POSE"
- active_object == body_rig/head_rig
- no project-path prompt appears unless the path truly cannot be inferred

Failure condition:
What exact observation means this repair failed?
Example:
- still in EDIT_ARMATURE after save
- head/body selects the wrong rig
- retry only moves the symptom to a different entry path
```

If any of the four artifacts is missing, do not edit. Investigate until it can be filled.

### 0.5 Breakthrough Requirement

When repeated fixes fail, the agent must propose at least one route that changes the level of attack. Do not only add another `if`, `try`, `finally`, or end-of-function reset.

Acceptable breakthrough moves include:

- Move from symptom patching to state ownership: change who owns the state and where writes are allowed.
- Move from end correction to lifecycle discipline: define enter -> temporary operation -> finally restore -> final forced state.
- Move from one entry path to entry unification: make invoke, execute, UI draw, command, and test enter through the same initializer.
- Move from retained reference to re-resolution: stop carrying stale object handles; resolve them at the first safe use point.
- Move from broad repair to executable invariant: enforce one small invariant at the boundary and test that invariant directly.
- Move from hidden assumption to logged feedback: add the smallest log/probe that proves which branch or state is actually active.

If no breakthrough move is plausible, say why and name the missing fact that blocks it.

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

For lifecycle bugs, draw the state path explicitly:

```text
Before entry:
Temporary operation state:
Finally/cleanup state:
Final forced state:
Owner after return:
```

The final forced state must be chosen from the success criterion, not from what is convenient at the end of the function.

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

Forbidden in repeated-failure mode:

- Adding another trailing mode switch, reset, or broad catch without changing ownership or lifecycle.
- Fixing only the last observed symptom while leaving another entry path with a different initialization rule.
- Saying "restore state" without naming which state is user-owned, which is temporary, and which final state is mandatory.
- Reporting success without an executable criterion.

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

1. Anti-loop gate: whether repeated failure mode is active
2. Four required artifacts: comparison object, state owner, executable success criterion, failure condition
3. Breakthrough move: what level of attack changed
4. Strongest restatement
5. State objects and lifecycle classes
6. Principal contradiction
7. Engineering rule
8. Minimal code change
9. Verification matrix
10. Residual registry

## Blender / Undo Reference

If the bug involves Blender, undo/redo, depsgraph, RNA pointers, scene references, native bridge handles, or expensive RigLogic-like runtime objects, read [references/blender-undo-case.md](references/blender-undo-case.md).
