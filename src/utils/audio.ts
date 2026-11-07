// Audio & Speech Synthesis utility for elementary English learners

class SoundEffectManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playCorrect() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Bright happy major arpeggio: C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz)
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch {
      // AudioContext may be blocked by browser policy
    }
  }

  playIncorrect() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Gentle low descending tone: D4 (293Hz) -> Bb3 (233Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(293.66, now);
      osc.frequency.exponentialRampToValueAtTime(233.08, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // AudioContext may be blocked
    }
  }

  // Celebratory Trumpet Brass Fanfare (빵빠레)
  playBrassFanfare() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Trumpet fanfare notes: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const introNotes = [
        { freq: 523.25, time: 0, dur: 0.12 },
        { freq: 523.25, time: 0.12, dur: 0.1 },
        { freq: 659.25, time: 0.22, dur: 0.12 },
        { freq: 783.99, time: 0.34, dur: 0.18 },
        { freq: 1046.50, time: 0.52, dur: 1.1 } // Sustained triumphant high note
      ];

      // Master fanfare gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.22, now);
      masterGain.connect(ctx.destination);

      introNotes.forEach((n) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Brass characteristics: sawtooth + slight detuned triangle with resonant filter
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(n.freq, now + n.time);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(n.freq * 1.004, now + n.time); // rich ensemble chorus

        // Brass resonant lowpass envelope
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now + n.time);
        filter.frequency.linearRampToValueAtTime(3200, now + n.time + 0.04);
        filter.frequency.exponentialRampToValueAtTime(1600, now + n.time + n.dur);
        filter.Q.setValueAtTime(3.5, now + n.time);

        // Amplitude envelope
        noteGain.gain.setValueAtTime(0, now + n.time);
        noteGain.gain.linearRampToValueAtTime(0.2, now + n.time + 0.03); // punchy brass attack
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + n.time + n.dur);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);

        osc1.start(now + n.time);
        osc2.start(now + n.time);
        osc1.stop(now + n.time + n.dur + 0.05);
        osc2.stop(now + n.time + n.dur + 0.05);
      });

      // Harmony accompaniment chord on the sustained finish (E5 + G5 + C6)
      const chordTime = 0.52;
      const chordNotes = [659.25, 783.99, 1046.50];
      chordNotes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + chordTime);

        g.gain.setValueAtTime(0, now + chordTime);
        g.gain.linearRampToValueAtTime(0.12, now + chordTime + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, now + chordTime + 1.2);

        const chordFilter = ctx.createBiquadFilter();
        chordFilter.type = 'lowpass';
        chordFilter.frequency.setValueAtTime(2600, now + chordTime);

        osc.connect(chordFilter);
        chordFilter.connect(g);
        g.connect(masterGain);

        osc.start(now + chordTime);
        osc.stop(now + chordTime + 1.25);
      });

      // Cymbal / glitter shimmer
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(6000, now + chordTime);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, now + chordTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + chordTime + 0.55);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noise.start(now + chordTime);
    } catch {
      // AudioContext blocked
    }
  }

  // Synthesized energetic child vocal cheer ("와아아~!") using acoustic formants
  playKidCheerVoice() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Child pitch fundamental: starts ~420Hz, sweeps happily to 540Hz
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.25);
      osc.frequency.linearRampToValueAtTime(480, now + 0.65);

      // Child vocal formant 1 ("w" -> "ah": 400Hz -> 900Hz)
      const f1 = ctx.createBiquadFilter();
      f1.type = 'bandpass';
      f1.frequency.setValueAtTime(420, now);
      f1.frequency.linearRampToValueAtTime(920, now + 0.15);
      f1.Q.setValueAtTime(4.0, now);

      // Child vocal formant 2 (1000Hz -> 1450Hz)
      const f2 = ctx.createBiquadFilter();
      f2.type = 'bandpass';
      f2.frequency.setValueAtTime(950, now);
      f2.frequency.linearRampToValueAtTime(1450, now + 0.18);
      f2.Q.setValueAtTime(4.5, now);

      // Gain envelope
      const vocalGain = ctx.createGain();
      vocalGain.gain.setValueAtTime(0, now);
      vocalGain.gain.linearRampToValueAtTime(0.3, now + 0.08); // lively swell
      vocalGain.gain.linearRampToValueAtTime(0.25, now + 0.45);
      vocalGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(f1);
      osc.connect(f2);
      f1.connect(vocalGain);
      f2.connect(vocalGain);
      vocalGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.75);
    } catch {
      // AudioContext blocked
    }
  }

  // Grand Fanfare with Child Voice ("와~!") and celebratory Korean cheer
  playGrandFanfareWithCheer() {
    // 1. Play synthesized acoustic child "와~!" formant cheer
    this.playKidCheerVoice();

    // 2. Play grand trumpet brass fanfare simultaneously
    this.playBrassFanfare();

    // 3. Child speech synthesis "와! 다 맞았어! 정말 최고야!"
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setTimeout(() => {
        try {
          const utterance = new SpeechSynthesisUtterance('와! 다 맞았어! 정말 최고야!');
          utterance.lang = 'ko-KR';
          utterance.pitch = 1.7; // Bright child-like lively voice
          utterance.rate = 1.15; // Energetic child pace

          // Try to select a natural Korean voice
          const voices = window.speechSynthesis.getVoices();
          const koVoice = voices.find((v) => v.lang.startsWith('ko'));
          if (koVoice) {
            utterance.voice = koVoice;
          }
          window.speechSynthesis.speak(utterance);
        } catch {
          // Ignore
        }
      }, 550); // Speaks right as the fanfare reaches its triumphant peak!
    }
  }

  playFanfare() {
    this.playBrassFanfare();
  }

  playTap() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore
    }
  }
}

export const soundEffects = new SoundEffectManager();

/**
 * Text-to-speech for English pronunciation
 */
export function speakEnglish(
  text: string,
  options?: {
    rate?: number; // 0.75 for slow beginner mode, 1.0 for normal
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (options?.onError) options.onError();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = options?.rate ?? 0.9; // Friendly, clear pacing for kids
  utterance.pitch = 1.05; // Slightly cheerful, bright pitch

  // Try to find a natural English voice if available
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(
    (v) => (v.lang.startsWith('en-US') || v.lang.startsWith('en')) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  utterance.onstart = () => {
    if (options?.onStart) options.onStart();
  };

  utterance.onend = () => {
    if (options?.onEnd) options.onEnd();
  };

  utterance.onerror = () => {
    if (options?.onError) options.onError();
  };

  window.speechSynthesis.speak(utterance);
}
