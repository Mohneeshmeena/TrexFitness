import { createContext, useContext, useState, useCallback } from 'react';
import { customPlansApi } from '../lib/api';

export const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [customPlans, setCustomPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);

  const startWorkout = useCallback((workout) => {
    setActiveWorkout({
      workoutId: workout._id,
      workout,
      exerciseIndex: 0,
      timer: 0,
      isResting: false,
      startedAt: Date.now(),
    });
  }, []);

  const nextExercise = useCallback(() => {
    setActiveWorkout((prev) => {
      if (!prev) return null;
      const nextIndex = prev.exerciseIndex + 1;
      if (nextIndex >= prev.workout.exercises.length) return null;
      return { ...prev, exerciseIndex: nextIndex, isResting: false, timer: 0 };
    });
  }, []);

  const finishWorkout = useCallback(() => {
    setActiveWorkout(null);
  }, []);

  const loadCustomPlans = useCallback(async () => {
    setLoadingPlans(true);
    try {
      const res = await customPlansApi.getAll();
      setCustomPlans(res.data.plans || res.data || []);
    } catch (err) {
      console.error('Failed to load custom plans', err);
    } finally {
      setLoadingPlans(false);
    }
  }, []);

  const addPlan = useCallback(async (planData) => {
    const res = await customPlansApi.create(planData);
    const newPlan = res.data.plan || res.data;
    setCustomPlans((prev) => [...prev, newPlan]);
    return newPlan;
  }, []);

  const updatePlan = useCallback(async (id, updates) => {
    const res = await customPlansApi.update(id, updates);
    const updated = res.data.plan || res.data;
    setCustomPlans((prev) => prev.map((p) => (p._id === id ? updated : p)));
    return updated;
  }, []);

  const deletePlan = useCallback(async (id) => {
    await customPlansApi.delete(id);
    setCustomPlans((prev) => prev.filter((p) => p._id !== id));
  }, []);

  const toggleItem = useCallback(async (planId, itemId) => {
    const res = await customPlansApi.toggleItem(planId, itemId);
    const updated = res.data.plan || res.data;
    setCustomPlans((prev) => prev.map((p) => (p._id === planId ? updated : p)));
    return updated;
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        activeWorkout,
        startWorkout,
        nextExercise,
        finishWorkout,
        customPlans,
        loadingPlans,
        loadCustomPlans,
        addPlan,
        updatePlan,
        deletePlan,
        toggleItem,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error('useWorkout must be used within WorkoutProvider');
  return ctx;
}
