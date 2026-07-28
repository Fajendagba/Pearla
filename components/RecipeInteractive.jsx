'use client';
import { useEffect, useState } from 'react';
import { scaleAmount } from '@/lib/scaleAmount';

const MIN_SERVINGS = 1;
const MAX_SERVINGS = 12;
const RECENT_KEY = 'pearla-recently-viewed';

export default function RecipeInteractive({ recipe }) {
  const storageKey = `pearla-cook-${recipe.slug}`;
  const [servings, setServings] = useState(recipe.servings);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [doneSteps, setDoneSteps] = useState({});
  const [loaded, setLoaded] = useState(false);

  // Restore saved progress and record this recipe as recently viewed.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
      if (saved) {
        if (saved.servings >= MIN_SERVINGS && saved.servings <= MAX_SERVINGS) setServings(saved.servings);
        setCheckedIngredients(saved.checkedIngredients ?? {});
        setDoneSteps(saved.doneSteps ?? {});
      }
      const recent = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]');
      const updated = [recipe.slug, ...recent.filter((s) => s !== recipe.slug)].slice(0, 6);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch { /* localStorage unavailable */ }
    setLoaded(true);
  }, [storageKey, recipe.slug]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ servings, checkedIngredients, doneSteps }));
    } catch { /* localStorage unavailable */ }
  }, [loaded, servings, checkedIngredients, doneSteps, storageKey]);

  const factor = servings / recipe.servings;

  const toggleIngredient = (key) =>
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleStep = (index) =>
    setDoneSteps((prev) => ({ ...prev, [index]: !prev[index] }));

  const allIngredientKeys = recipe.ingredients.flatMap((g) => g.items.map((i) => `${g.group}|${i.name}`));
  const checkedCount = allIngredientKeys.filter((k) => checkedIngredients[k]).length;
  const totalIngredients = allIngredientKeys.length;
  const doneCount = recipe.steps.filter((_, i) => doneSteps[i]).length;
  const totalSteps = recipe.steps.length;

  // Ingredients and steps both count toward progress, so the bar starts
  // moving from the very first ingredient ticked.
  const doneUnits = checkedCount + doneCount;
  const totalUnits = totalIngredients + totalSteps;
  const progressPct = Math.round((doneUnits / totalUnits) * 100);

  let progressMessage;
  if (doneUnits === 0) progressMessage = 'Tick off each thing you have, then tick off each cooking step as you finish it. We save your place for you.';
  else if (doneUnits === totalUnits) progressMessage = 'You are done. Serve it up and enjoy!';
  else if (doneCount === totalSteps) progressMessage = 'You finished cooking. A few things are still not ticked off up there.';
  else if (doneCount === 0 && checkedCount < totalIngredients) progressMessage = `Good start. You have ${checkedCount} out of ${totalIngredients} things so far.`;
  else if (doneCount === 0) progressMessage = 'You have everything. Now start cooking below.';
  else if (totalSteps - doneCount === 1) progressMessage = 'Just one step left. Your kitchen must smell good by now.';
  else progressMessage = `Going well. ${totalSteps - doneCount} steps left.`;

  return (
    <>
      <div className="cook-progress" role="status">
        <div className="cook-progress-top">
          <strong>
            {doneUnits === 0
              ? 'Ready to cook?'
              : `${checkedCount} of ${totalIngredients} things · ${doneCount} of ${totalSteps} steps`}
          </strong>
          <span>{progressPct}%</span>
        </div>
        <div className="cook-progress-track">
          <div className="cook-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="cook-progress-msg">{progressMessage}</p>
      </div>

      <div className="recipe-body-inner">
      {/* INGREDIENTS */}
      <aside className="ingredients-card">
        <h3 className="ingredients-card-title">Ingredients</h3>

        <div className="serving-scaler">
          <span className="serving-scaler-label">Servings</span>
          <div className="serving-stepper">
            <button
              type="button"
              onClick={() => setServings((s) => Math.max(MIN_SERVINGS, s - 1))}
              disabled={servings <= MIN_SERVINGS}
              aria-label="Fewer servings"
            >−</button>
            <span className="serving-value" aria-live="polite">{servings}</span>
            <button
              type="button"
              onClick={() => setServings((s) => Math.min(MAX_SERVINGS, s + 1))}
              disabled={servings >= MAX_SERVINGS}
              aria-label="More servings"
            >+</button>
          </div>
        </div>
        {servings !== recipe.servings && (
          <p className="serving-note">
            We changed the amounts for you. The recipe was written for {recipe.servings}.{' '}
            <button type="button" className="link-btn" onClick={() => setServings(recipe.servings)}>
              Put it back
            </button>
          </p>
        )}

        <p className="ingredients-hint">Tap each one as you get it ready.</p>

        {recipe.ingredients.map((group) => (
          <div key={group.group} className="ingredients-group">
            <div className="ingredients-group-title">{group.group}</div>
            <ul className="ingredients-list">
              {group.items.map((item) => {
                const key = `${group.group}|${item.name}`;
                const checked = !!checkedIngredients[key];
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      className={`ingredient-toggle${checked ? ' checked' : ''}`}
                      onClick={() => toggleIngredient(key)}
                      aria-pressed={checked}
                    >
                      <span className="ingredient-check" aria-hidden="true">{checked ? '✓' : ''}</span>
                      <span className="ingredient-name">{item.name}</span>
                      <span className="ingredient-amount">{scaleAmount(item.amount, factor)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {checkedCount > 0 && (
          <button type="button" className="link-btn clear-checklist" onClick={() => setCheckedIngredients({})}>
            Untick everything ({checkedCount})
          </button>
        )}
      </aside>

      {/* INSTRUCTIONS */}
      <div className="instructions-section">
        <h3>How to Make {recipe.title}</h3>

        {recipe.steps.map((step, i) => {
          const done = !!doneSteps[i];
          return (
            <div key={i} className={`step${done ? ' step-done' : ''}`}>
              <div className="step-number" aria-hidden="true">{done ? '✓' : i + 1}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.body}</p>
                <button
                  type="button"
                  className={`step-done-btn${done ? ' is-done' : ''}`}
                  onClick={() => toggleStep(i)}
                  aria-pressed={done}
                >
                  <span className="step-done-box" aria-hidden="true">{done ? '✓' : ''}</span>
                  {done ? `Step ${i + 1} done. Tap to undo` : `I finished step ${i + 1}`}
                </button>
              </div>
            </div>
          );
        })}

        <div className="tips-section">
          <h4>Things That Help</h4>
          <ul className="tips-list">
            {recipe.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </>
  );
}
