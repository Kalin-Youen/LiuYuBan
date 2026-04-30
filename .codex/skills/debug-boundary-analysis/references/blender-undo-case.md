# Blender Undo Case

Use this reference when a Blender add-on, native bridge, RigLogic-style runtime, depsgraph, RNA pointer, scene object, UI panel, or undo/redo path shows performance regressions, stale references, or crashes.

## Case Pattern

```text
Original feedback:
After undo, switching controls is slow, runtime rebuilds, and some paths crash.

Strongest restatement:
The system mixes long-lived runtime state with Blender scene references that can become invalid after undo. Fixing slowness by retaining too much risks stale references and crashes; fixing crashes by rebuilding too broadly brings back the long rebuild.

Hit point:
State boundary / lifecycle / feedback return path.

Engineering rule:
Keep the expensive runtime core alive when safe, but invalidate Blender/RNA/depsgraph caches after undo and re-resolve scene-side references at the safe use point.

Residual:
Check whether any native bridge handle indirectly retains scene-side objects after undo.
```

## Lifecycle Split

- Runtime core: may survive undo if it does not own Blender-side references.
- Scene object, RNA pointer, depsgraph, evaluated object, UI context: treat as invalid after undo unless freshly resolved.
- Cache: split by owner. A core-data cache may survive; a scene-reference cache should be invalidated.
- Native handle: assume dangerous until proven it does not retain scene-side pointers.

## Verification Matrix

```text
Scenario: switch controls before undo
Expected retained state: runtime core
Expected invalidated state: none beyond normal per-use resolved references
Observed:
Pass/fail:

Scenario: undo then switch controls
Expected retained state: runtime core if input identity still matches
Expected invalidated state: Blender/RNA/depsgraph references
Observed:
Pass/fail:

Scenario: undo then force changed rig/mesh identity
Expected retained state: none if identity changed
Expected invalidated state: runtime core and all scene references
Observed:
Pass/fail:

Scenario: repeat undo/redo several times
Expected retained state: only state with explicit ownership and valid generation
Expected invalidated state: all scene-side references from prior generations
Observed:
Pass/fail:
```

## Red Flags

- A long-lived runtime object stores `bpy.context`, scene objects, RNA pointers, evaluated objects, or depsgraph references.
- Undo callbacks only clear "everything" or "nothing".
- The fix removes a crash by rebuilding expensive state on every UI interaction.
- A cache key does not include the identity or generation that actually invalidates its contents.
