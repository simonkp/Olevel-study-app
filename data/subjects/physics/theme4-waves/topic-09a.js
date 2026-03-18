(function () {
    window.__registerTopic({

        id: "9A",
        theme: "Section IV: Waves",
        title: "General Properties of Waves I",
        cheatBlocks: [
          { title: "Wave basics", points: [
            "Waves transfer **energy** without net transfer of matter.",
            "Transverse: oscillations ⟂ direction of travel (light, water surface).",
            "Longitudinal: oscillations ∥ travel (sound in air).",
            "Amplitude A, wavelength λ, period T, frequency f, wave speed v."
          ]},
          { title: "Key relations", points: [
            "Frequency \(f = 1/T\\).",
            "Wave speed \(v = f\\lambda\\).",
            "Bigger amplitude → more energy (qualitative).",
            "Reflection and refraction are wave behaviours (details in light/EM)."
          ]},
          { title: "Describing waves", points: [
            "Crests/troughs (transverse), compressions/rarefactions (longitudinal).",
            "Phase: points one wavelength apart are in phase.",
            "Sketching: label amplitude and wavelength clearly."
          ]},
        ],
        flashcards: [
          { front: "Wave speed equation", back: "v = fλ" },
          { front: "Frequency", back: "cycles per second (Hz)" },
          { front: "Period", back: "time for one cycle (s)" },
          { front: "Transverse example", back: "light; water surface" },
          { front: "Longitudinal example", back: "sound in air" },
          { front: "Compression", back: "region of high pressure/density in longitudinal wave" },
          { front: "Rarefaction", back: "region of low pressure/density" },
          { front: "Wavelength", back: "distance between adjacent in-phase points" },
          { front: "Amplitude", back: "maximum displacement from equilibrium" },
          { front: "Energy vs amplitude", back: "larger amplitude → more energy (qualitative)" },
          { front: "Hz equals…", back: "s⁻¹" },
          { front: "Phase difference λ/2", back: "180° (out of phase)" },
        ],
        quiz: [
          { question: "Wave speed is…", options: ["v=f/λ", "v=fλ", "v=λ/f", "v=f+λ"], correctIndex: 1, explanation: "v=fλ." },
          { question: "Frequency is measured in…", options: ["m", "s", "Hz", "N"], correctIndex: 2, explanation: "Hz." },
          { question: "Period is…", options: ["1/f", "f", "λ/v", "v/λ"], correctIndex: 0, explanation: "T=1/f." },
          { question: "A longitudinal wave has…", options: ["crests", "troughs", "compressions", "polarisation"], correctIndex: 2, explanation: "Compressions/rarefactions." },
          { question: "Wavelength is distance between…", options: ["any two points", "adjacent crests", "crest and trough", "two random points"], correctIndex: 1, explanation: "Adjacent in-phase points e.g. crest to crest." },
          { question: "If f doubles and λ stays same, v…", options: ["halves", "doubles", "same", "zero"], correctIndex: 1, explanation: "v=fλ." },
          { question: "If λ halves and f constant, v…", options: ["halves", "doubles", "same", "unknown"], correctIndex: 0, explanation: "v proportional to λ." },
          { question: "Amplitude is related to…", options: ["speed", "energy", "frequency only", "wavelength only"], correctIndex: 1, explanation: "Greater amplitude → more energy." },
          { question: "For a given medium, wave speed depends mainly on…", options: ["medium properties", "amplitude", "colour", "observer"], correctIndex: 0, explanation: "Speed set by medium (for mechanical waves)." },
          { question: "Wave transfers…", options: ["matter", "energy", "mass", "volume"], correctIndex: 1, explanation: "Energy." },
          { question: "Hz is equivalent to…", options: ["m/s", "s⁻¹", "kg", "N"], correctIndex: 1, explanation: "Per second." },
          { question: "Two points are in phase if separated by…", options: ["λ/2", "λ", "λ/4", "any distance"], correctIndex: 1, explanation: "One wavelength gives same phase." },
          { question: "Transverse oscillations are… to direction of travel", options: ["parallel", "perpendicular", "random", "circular"], correctIndex: 1, explanation: "Perpendicular." },
          { question: "Wave speed in a medium is constant if…", options: ["medium unchanged", "frequency changes", "amplitude changes", "wavelength changes"], correctIndex: 0, explanation: "Medium properties unchanged." },
          { question: "If v=12 m/s and f=3 Hz, λ=?", options: ["4 m", "9 m", "36 m", "0.25 m"], correctIndex: 0, explanation: "λ=v/f=12/3=4." },
          { question: "If λ=2 m and f=5 Hz, v=?", options: ["2.5", "3", "7", "10"], correctIndex: 3, explanation: "v=5×2=10." },
        ],
        trueFalse: [
          { statement: "Waves transfer energy.", correct: true, explain: "Energy propagation is key." },
          { statement: "Longitudinal waves have crests and troughs.", correct: false, explain: "They have compressions and rarefactions." },
          { statement: "v = fλ.", correct: true, explain: "Wave equation." },
          { statement: "Period is the reciprocal of frequency.", correct: true, explain: "T=1/f." },
          { statement: "Amplitude affects frequency.", correct: false, explain: "Amplitude is independent of frequency (basic model)." },
          { statement: "Two points one wavelength apart are in phase.", correct: true, explain: "Same cycle position." },
          { statement: "A wave transfers matter forward permanently.", correct: false, explain: "Particles oscillate about equilibrium." },
          { statement: "Frequency is number of oscillations per second.", correct: true, explain: "Hz." },
          { statement: "If frequency increases, wavelength increases in same medium.", correct: false, explain: "v constant → λ decreases." },
          { statement: "Sound in air is longitudinal.", correct: true, explain: "Pressure oscillations parallel to travel." },
        ],
      
    });
})();