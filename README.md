# Compose with the SDGs

This project is an interactive web prototype for exploring Sustainable Development Goal (SDG) data through map-based interaction, staff-based visual representation, and sound.

## 1. Data Status

The project currently uses real data covering 17 SDGs.

The SDG dataset used in this project was obtained on **December 13, 2025**. Because directly using the data API required too much time, the real data were manually processed and organized for use in the prototype.

The final data file used by the web application is stored in the `data/` folder:

- `data/sdg_data_mapped_real.json`

The data processing workflow is documented in:

- `analysis/Process/`

This folder includes the original downloaded data, intermediate processing notebooks, and the merged SDG dataset. More details can be found in:

- `analysis/Process/README.md`

### Principles for Selecting Sub-Datasets

The sub-indicators were selected based on the following principles:

1. Indicators that are preferably represented in percentage format.
2. Indicators with positive semantics, meaning that a higher value indicates better performance.
3. Indicators with as little missing data as possible.

When the user hovers over an SDG, the tooltip shows information about the selected sub-indicator.

## 2. Sound Design

The sound engine is built on the **Web Audio API**. Tone.js is used as a high-level wrapper for sample playback and pitch handling.

References:

- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- Tone.js: https://tonejs.github.io/

All sounds currently use a sample-based approach. For each instrument, a single sample at pitch C4 is used as the source sample, and SDG values are mapped to notes through Tone.js.

The instrument samples are sourced from the Philharmonia Orchestra sound sample library:

- https://philharmonia.co.uk/resources/sound-samples/

### Instrument Mapping

Each SDG is mapped to one instrument. The mapping follows the order from SDG 1 to SDG 17:

| SDG | Instrument |
|-----|------------|
| SDG 1 | Banjo |
| SDG 2 | Bass Clarinet |
| SDG 3 | Bassoon |
| SDG 4 | Cello |
| SDG 5 | Clarinet |
| SDG 6 | Contrabassoon |
| SDG 7 | Cor Anglais |
| SDG 8 | Double Bass |
| SDG 9 | Flute |
| SDG 10 | French Horn |
| SDG 11 | Guitar |
| SDG 12 | Mandolin |
| SDG 13 | Oboe |
| SDG 14 | Percussion |
| SDG 15 | Saxophone |
| SDG 16 | Trombone |
| SDG 17 | Trumpet |

These instrument samples are used to sonify selected SDG values in the web prototype.

## 3. Scale / Value-to-Note Mapping

The prototype provides two scale modes, and the mode can be switched by the user:

- **C Major** default mode
- **C Minor**

SDG values are first mapped into 10 fixed value bands:

| Value range | Staff class |
|-------------|-------------|
| 0–10 | `note-value-0-10` |
| 11–20 | `note-value-11-20` |
| 21–30 | `note-value-21-30` |
| 31–40 | `note-value-31-40` |
| 41–50 | `note-value-41-50` |
| 51–60 | `note-value-51-60` |
| 61–70 | `note-value-61-70` |
| 71–80 | `note-value-71-80` |
| 81–90 | `note-value-81-90` |
| 91–100 | `note-value-91-100` |

### C Major Mode

In C Major mode, the 10 value bands are mapped to notes from C4 to E5:

| Value range | Note | Frequency Hz |
|-------------|------|--------------|
| 0–10 | C4 | 261.63 |
| 11–20 | D4 | 293.66 |
| 21–30 | E4 | 329.63 |
| 31–40 | F4 | 349.23 |
| 41–50 | G4 | 392.00 |
| 51–60 | A4 | 440.00 |
| 61–70 | B4 | 493.88 |
| 71–80 | C5 | 523.25 |
| 81–90 | D5 | 587.33 |
| 91–100 | E5 | 659.25 |

### C Minor Mode

In C Minor mode, the same 10 value bands are used, but scale degrees 3, 6, and 7 are flattened.

| Value range | Note | Frequency Hz |
|-------------|------|--------------|
| 0–10 | C4 | 261.63 |
| 11–20 | D4 | 293.66 |
| 21–30 | Eb4 | 311.13 |
| 31–40 | F4 | 349.23 |
| 41–50 | G4 | 392.00 |
| 51–60 | Ab4 | 415.30 |
| 61–70 | Bb4 | 466.16 |
| 71–80 | C5 | 523.25 |
| 81–90 | D5 | 587.33 |
| 91–100 | Eb5 | 622.25 |

When minor mode is active, the key signature is also updated to show B-flat, E-flat, and A-flat.

## 4. Notes on Missing Data

Some SDG values are missing for specific countries or years. In the prototype, missing data are treated as unavailable values rather than estimated values. This avoids introducing artificial data into the sonification process.

When data are unavailable, the interface does not generate a corresponding SDG note for that value.