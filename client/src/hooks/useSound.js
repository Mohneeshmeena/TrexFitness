import { useRef, useCallback } from 'react';

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!window.__apexAudioCtx) {
      window.__apexAudioCtx = new AudioContextClass();
    }
    if (window.__apexAudioCtx.state === 'suspended') {
      window.__apexAudioCtx.resume().catch(() => {});
    }
    return window.__apexAudioCtx;
  } catch (e) {
    return null;
  }
}

function playTone({ type = 'sine', frequency = 440, duration = 0.1, volume = 0.3, attack = 0.01 } = {}) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

export function useSound() {
  const soundEnabled = useRef(true);
  const toggle = useCallback(() => { soundEnabled.current = !soundEnabled.current; }, []);

  const playClick = useCallback(() => {
    if (!soundEnabled.current) return;
    playTone({ type: 'square', frequency: 800, duration: 0.08, volume: 0.15 });
  }, []);

  const playSuccess = useCallback(() => {
    if (!soundEnabled.current) return;
    playTone({ frequency: 523, duration: 0.15, volume: 0.3 });
    setTimeout(() => playTone({ frequency: 659, duration: 0.15, volume: 0.3 }), 150);
    setTimeout(() => playTone({ frequency: 784, duration: 0.25, volume: 0.4 }), 300);
  }, []);

  const playBeep = useCallback((freq = 880) => {
    if (!soundEnabled.current) return;
    playTone({ type: 'sine', frequency: freq, duration: 0.12, volume: 0.25 });
  }, []);

  const playError = useCallback(() => {
    if (!soundEnabled.current) return;
    playTone({ type: 'sawtooth', frequency: 200, duration: 0.2, volume: 0.2 });
  }, []);

  const playHover = useCallback(() => {
    if (!soundEnabled.current) return;
    playTone({ type: 'sine', frequency: 600, duration: 0.05, volume: 0.08 });
  }, []);

  return { playClick, playSuccess, playBeep, playError, playHover, toggle };
}
