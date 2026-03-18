(function () {
    window.__registerTopic({

        id: "11B",
        theme: "Section IV: Waves",
        title: "Light II (Refraction)",
        cheatBlocks: [
          { title: "Refraction rules", points: [
            "Refraction: change in direction when light changes speed entering new medium.",
            "Into denser medium (higher n): slows, bends **towards** normal. Out: bends **away**.",
            "Frequency stays same; wavelength changes because v changes."
          ]},
          { title: "Refractive index (O-level)", points: [
            "Refractive index \(n = \\dfrac{\\sin i}{\\sin r}\\) for air→medium (Snell’s law).",
            "Also \(n \\approx c/v\\) (conceptual). Larger n → slower speed in medium.",
            "Critical angle and total internal reflection are often extension topics; keep core refraction solid."
          ]},
          { title: "Apparent depth + prisms", points: [
            "Apparent depth: object in water appears shallower due to refraction at surface.",
            "Prism disperses white light because n depends on wavelength (violet bends more)."
          ]},
        ],
        flashcards: [
          { front: "Refraction", back: "bending due to speed change between media" },
          { front: "Into denser medium bends…", back: "towards the normal" },
          { front: "Out of denser medium bends…", back: "away from the normal" },
          { front: "Snell’s law form", back: "n = sin i / sin r (air→medium)" },
          { front: "Frequency at refraction", back: "stays the same" },
          { front: "Wavelength in slower medium", back: "decreases" },
          { front: "Refractive index meaning", back: "how much light slows (and bends)" },
          { front: "Apparent depth", back: "looks shallower in water" },
          { front: "Dispersion", back: "splitting of white light into colours" },
          { front: "Which colour bends most", back: "violet" },
          { front: "Which bends least", back: "red" },
          { front: "Normal", back: "perpendicular to surface" },
        ],
        quiz: [
          { question: "Refraction occurs because light…", options: ["reflects", "changes speed", "changes frequency", "stops"], correctIndex: 1, explanation: "Speed change causes bending." },
          { question: "From air into glass, ray bends…", options: ["towards normal", "away from normal", "no bend", "backwards"], correctIndex: 0, explanation: "Slows → towards normal." },
          { question: "In refraction, frequency is…", options: ["changes", "same", "zero", "infinite"], correctIndex: 1, explanation: "Frequency stays constant." },
          { question: "Refractive index n equals…", options: ["sin r / sin i", "sin i / sin r", "i/r", "r/i"], correctIndex: 1, explanation: "n=sin i/sin r (air→medium)." },
          { question: "If i increases, generally r…", options: ["decreases", "increases", "same", "random"], correctIndex: 1, explanation: "Larger i gives larger r for fixed n." },
          { question: "If ray goes from glass to air, it bends…", options: ["towards normal", "away from normal", "no bend", "into glass"], correctIndex: 1, explanation: "Speeds up → away." },
          { question: "If n is larger, light in medium is…", options: ["faster", "slower", "same", "stopped"], correctIndex: 1, explanation: "Larger n means slower." },
          { question: "A pencil in water looks bent due to…", options: ["reflection", "refraction", "diffraction", "absorption"], correctIndex: 1, explanation: "Refraction at surface." },
          { question: "Apparent depth is… real depth", options: ["greater than", "less than", "equal", "negative"], correctIndex: 1, explanation: "Appears shallower." },
          { question: "Dispersion occurs because…", options: ["speed same for all colours", "n depends on wavelength", "frequency changes in air", "light is longitudinal"], correctIndex: 1, explanation: "Different colours refract differently." },
          { question: "Violet compared to red in glass bends…", options: ["less", "more", "same", "not at all"], correctIndex: 1, explanation: "Violet refracts more." },
          { question: "If i = 0°, r is…", options: ["90°", "0°", "depends", "180°"], correctIndex: 1, explanation: "Along normal, no deviation." },
          { question: "If sin i / sin r = 1.5, n is…", options: ["1.0", "1.5", "0.67", "3.0"], correctIndex: 1, explanation: "n=1.5." },
          { question: "When entering a slower medium, wavelength…", options: ["increases", "decreases", "same", "becomes zero"], correctIndex: 1, explanation: "v decreases; f constant → λ decreases." },
          { question: "Refractive index is NOT defined as…", options: ["sin i / sin r", "c/v", "ratio of angles", "measure of slowing"], correctIndex: 2, explanation: "Not ratio of angles; use sine ratio." },
          { question: "A ray bends towards normal means angle with normal…", options: ["increases", "decreases", "same", "random"], correctIndex: 1, explanation: "r smaller." },
        ],
        trueFalse: [
          { statement: "Refraction changes the speed of light.", correct: true, explain: "Different media, different speed." },
          { statement: "Refraction changes the frequency of light.", correct: false, explain: "Frequency stays constant." },
          { statement: "Light bends towards the normal entering a denser medium.", correct: true, explain: "Slows down." },
          { statement: "Apparent depth is greater than real depth.", correct: false, explain: "It appears shallower (smaller)." },
          { statement: "Dispersion is caused by different refraction for different wavelengths.", correct: true, explain: "n depends on λ." },
          { statement: "Violet bends less than red.", correct: false, explain: "Violet bends more." },
          { statement: "If i=0°, the ray does not deviate.", correct: true, explain: "Travels along normal." },
          { statement: "n = sin r / sin i for air→glass.", correct: false, explain: "n = sin i / sin r." },
          { statement: "When light speeds up, it bends away from the normal.", correct: true, explain: "Leaving denser medium." },
          { statement: "Refraction can occur only in water.", correct: false, explain: "Any boundary between media." },
        ],
      
    });
})();