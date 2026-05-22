// ========== 音符映射模块 (0-100 → 10个音符) ==========

// 全局调式状态
let currentMode = 'major'; // 'major' 或 'minor'

/**
 * 设置当前调式
 * @param {string} mode - 'major' 或 'minor'
 */
export function setMode(mode) {
  if (mode === 'major' || mode === 'minor') {
    currentMode = mode;
    console.log('Mode switched to: ' + (mode === 'major' ? 'C major' : 'C minor'));
  }
}

/**
 * 获取当前调式
 * @returns {string} - 当前调式
 */
export function getMode() {
  return currentMode;
}

/**
 * 将 0-100 的数值映射到音符
 * @param {number} value - SDG 分数 (0-100)
 * @param {string} mode - 调式 ('major' 或 'minor')
 * @returns {Object} - 音符信息对象
 */
export function valueToNote(value, mode = null) {
  const useMode = mode || currentMode;
  const clampedValue = Math.max(0, Math.min(100, value));

  let noteName, frequency, octave, positionClass, needsLedgerLine;

  if (clampedValue <= 10) {
    noteName = 'C';
    frequency = 261.63;
    octave = 4;
    positionClass = 'note-value-0-10';
    needsLedgerLine = 'below';
  } else if (clampedValue <= 20) {
    noteName = 'D';
    frequency = 293.66;
    octave = 4;
    positionClass = 'note-value-11-20';
    needsLedgerLine = false;
  } else if (clampedValue <= 30) {
    if (useMode === 'minor') {
      noteName = 'Eb';
      frequency = 311.13;
    } else {
      noteName = 'E';
      frequency = 329.63;
    }
    octave = 4;
    positionClass = 'note-value-21-30';
    needsLedgerLine = false;
  } else if (clampedValue <= 40) {
    noteName = 'F';
    frequency = 349.23;
    octave = 4;
    positionClass = 'note-value-31-40';
    needsLedgerLine = false;
  } else if (clampedValue <= 50) {
    noteName = 'G';
    frequency = 392.00;
    octave = 4;
    positionClass = 'note-value-41-50';
    needsLedgerLine = false;
  } else if (clampedValue <= 60) {
    if (useMode === 'minor') {
      noteName = 'Ab';
      frequency = 415.30;
    } else {
      noteName = 'A';
      frequency = 440.00;
    }
    octave = 4;
    positionClass = 'note-value-51-60';
    needsLedgerLine = false;
  } else if (clampedValue <= 70) {
    if (useMode === 'minor') {
      noteName = 'Bb';
      frequency = 466.16;
    } else {
      noteName = 'B';
      frequency = 493.88;
    }
    octave = 4;
    positionClass = 'note-value-61-70';
    needsLedgerLine = false;
  } else if (clampedValue <= 80) {
    noteName = 'C';
    frequency = 523.25;
    octave = 5;
    positionClass = 'note-value-71-80';
    needsLedgerLine = false;
  } else if (clampedValue <= 90) {
    noteName = 'D';
    frequency = 587.33;
    octave = 5;
    positionClass = 'note-value-81-90';
    needsLedgerLine = false;
  } else {
    if (useMode === 'minor') {
      noteName = 'Eb';
      frequency = 622.25;
    } else {
      noteName = 'E';
      frequency = 659.25;
    }
    octave = 5;
    positionClass = 'note-value-91-100';
    needsLedgerLine = false;
  }

  return {
    noteName,
    frequency,
    octave,
    fullNoteName: `${noteName}${octave}`,
    positionClass,
    needsLedgerLine,
    value: clampedValue,
    mode: useMode
  };
}

/**
 * 批量值转音符
 */
export function sdgValuesToNotes(sdgValues) {
  const notes = [];
  for (const [sdg, value] of Object.entries(sdgValues)) {
    if (typeof value === 'number') {
      const noteInfo = valueToNote(value);
      noteInfo.sdg = sdg;
      notes.push(noteInfo);
    }
  }
  notes.sort((a, b) => a.frequency - b.frequency);
  return notes;
}

/**
 * 获取音程（半音差）
 */
export function getInterval(value1, value2) {
  const note1 = valueToNote(value1);
  const note2 = valueToNote(value2);
  return Math.round(12 * Math.log2(note2.frequency / note1.frequency));
}

/**
 * 判断是否和谐音程
 */
export function isHarmonic(value1, value2) {
  const interval = Math.abs(getInterval(value1, value2));
  const harmonicIntervals = [0, 3, 4, 5, 7, 8, 9, 12];
  return harmonicIntervals.includes(interval);
}

// ========== Tone.js 采样器（全部17个SDG） ==========

let toneReady = typeof Tone !== 'undefined';

//创建reverb效果
let reverb = null;

if (toneReady) {
  reverb = new Tone.Reverb({
    decay: 2.5,    // 混响衰减时间（秒）
    wet: 0.3       // 干湿比（0=纯干声，1=纯湿声）
  }).toDestination();
}

// 创建17个采样器的数组
const samplers = {};

// if (toneReady) {
//   for (let i = 1; i <= 17; i++) {
//     samplers[i] = new Tone.Sampler({
//       urls: { C4: `sdg${i}.mp3` },
//       baseUrl: './samples/'
//     }).toDestination();
//   }
// }

if (toneReady) {
  for (let i = 1; i <= 17; i++) {
    samplers[i] = new Tone.Sampler({
      urls: { C4: `sdg${i}.mp3` },
      baseUrl: './samples/'
    }).connect(reverb);
  }
}


// 播放采样音色
function playSample(sdgNumber, noteName, duration = 0.5) {
  if (!toneReady || !samplers[sdgNumber]) {
    console.log(`Sampler for SDG ${sdgNumber} not ready`);
    return;
  }
  samplers[sdgNumber].triggerAttackRelease(noteName, duration);
}

// ========== 综合播放接口 ==========

export function warmupAudioContext() {
  // Tone.js会自动管理音频上下文
  if (toneReady) {
    Tone.start();
  }
}

export function playValueNote(value, sdg = '1', duration = 0.5) {
  const note = valueToNote(value);
  const sdgNumber = parseInt(sdg);
  playSample(sdgNumber, note.fullNoteName, duration);
}

export function playValueChord(notesData, duration = 0.5) {
  notesData.forEach(n => {
    playValueNote(n.value, n.sdg, duration);
  });
}

// 音色名称（用于显示）
const TIMBRE_NAMES = {
  '1': 'Banjo',
  '2': 'Bass Clarinet',
  '3': 'Bassoon',
  '4': 'Cello',
  '5': 'Clarinet',
  '6': 'Contrabassoon',
  '7': 'Cor Anglais',
  '8': 'Double Bass',
  '9': 'Flute',
  '10': 'French Horn',
  '11': 'Guitar',
  '12': 'Mandolin',
  '13': 'Oboe',
  '14': 'Tuba',
  '15': 'Saxophone',
  '16': 'Trombone',
  '17': 'Trumpet'
};

export function getTimbreName(sdg) {
  return TIMBRE_NAMES[sdg] || 'Default';
}

export function getTimbreDescription(sdg) {
  return TIMBRE_NAMES[sdg] || 'Default timbre';
}

export function getAllTimbres() {
  return Object.entries(TIMBRE_NAMES).map(([sdg, name]) => ({
    sdg,
    name,
    description: name
  }));
}

export function hasTimbre(sdg) {
  return TIMBRE_NAMES.hasOwnProperty(sdg);
}

// ========== MIDI 音高转换 ==========

/**
 * 音符名到MIDI音高的映射
 * MIDI标准：C4 = 60 (中央C)
 */
const NOTE_TO_MIDI_BASE = {
  'C': 0, 'C#': 1, 'Db': 1,
  'D': 2, 'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4,
  'F': 5, 'F#': 6, 'Gb': 6,
  'G': 7, 'G#': 8, 'Ab': 8,
  'A': 9, 'A#': 10, 'Bb': 10,
  'B': 11, 'Cb': 11
};

/**
 * 将音符名（如 "C4", "Eb5"）转换为 MIDI 音高值
 * @param {string} noteName - 音符名，如 "C4", "D#5", "Bb4"
 * @returns {number} - MIDI 音高值 (0-127)
 */
export function noteNameToMidi(noteName) {
  // 解析音符名和八度
  const match = noteName.match(/^([A-Ga-g][#b]?)(\d+)$/);
  if (!match) {
    console.warn(`Invalid note name: ${noteName}`);
    return null;
  }
  
  const note = match[1].charAt(0).toUpperCase() + match[1].slice(1);
  const octave = parseInt(match[2]);
  
  const noteBase = NOTE_TO_MIDI_BASE[note];
  if (noteBase === undefined) {
    console.warn(`Unknown note: ${note}`);
    return null;
  }
  
  // MIDI公式：C4 = 60, 所以 MIDI = 12 * (octave + 1) + noteBase
  const midiNumber = 12 * (octave + 1) + noteBase;
  
  return midiNumber;
}

/**
 * 将SDG值直接转换为MIDI音高
 * @param {number} value - SDG分数 (0-100)
 * @param {string} mode - 调式 ('major' 或 'minor')
 * @returns {number} - MIDI 音高值
 */
export function valueToMidi(value, mode = null) {
  const noteInfo = valueToNote(value, mode);
  return noteNameToMidi(noteInfo.fullNoteName);
}