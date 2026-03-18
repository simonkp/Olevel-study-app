(function () {
    window.__registerTopic({

        id: "13",
        theme: "Section V: Electricity and Magnetism",
        title: "D.C. Circuits",
        cheatBlocks: [
          { title: "Series vs parallel", points: [
            "Series: same current; p.d. shares; resistances add \(R_T=R_1+R_2+...\\).",
            "Parallel: same p.d.; currents add; \(1/R_T = 1/R_1 + 1/R_2 + ...\\).",
            "Short circuit: very low resistance path → large current (danger)."
          ]},
          { title: "Circuit symbols + meters", points: [
            "Ammeter in series; voltmeter in parallel across component.",
            "Ideal ammeter: zero resistance; ideal voltmeter: infinite resistance.",
            "Use correct symbols: cell, battery, switch, resistor, lamp, diode, fuse."
          ]},
          { title: "Circuit reasoning", points: [
            "In series, adding a resistor increases total R → decreases current.",
            "In parallel, adding a branch decreases total R → increases total current from source.",
            "Power in component \(P = VI = I^2 R = V^2/R\\) (as needed)."
          ]},
        ],
        flashcards: [
          { front: "Series current", back: "same through all components" },
          { front: "Parallel p.d.", back: "same across each branch" },
          { front: "Series total resistance", back: "R_T = R1+R2+…" },
          { front: "Parallel total resistance", back: "1/R_T = 1/R1+1/R2+…" },
          { front: "Ammeter connection", back: "series" },
          { front: "Voltmeter connection", back: "parallel" },
          { front: "Ideal ammeter R", back: "0 Ω" },
          { front: "Ideal voltmeter R", back: "∞" },
          { front: "Adding resistor in series effect on current", back: "decreases current" },
          { front: "Adding branch in parallel effect on total current", back: "increases total current" },
          { front: "Power formula", back: "P=VI" },
          { front: "Fuse purpose", back: "melts to break circuit if current too high" },
        ],
        quiz: [
          { question: "In series circuit, current is…", options: ["different in each", "same everywhere", "zero", "infinite"], correctIndex: 1, explanation: "Series current same." },
          { question: "In parallel circuit, p.d. across branches is…", options: ["same", "different", "zero", "double"], correctIndex: 0, explanation: "Parallel shares same p.d." },
          { question: "Ammeter is connected…", options: ["in parallel", "in series", "anywhere", "not used"], correctIndex: 1, explanation: "Series." },
          { question: "Voltmeter is connected…", options: ["in series", "in parallel", "at battery only", "never"], correctIndex: 1, explanation: "Parallel across component." },
          { question: "Total resistance in series (2Ω and 3Ω)", options: ["0.4Ω", "1Ω", "5Ω", "6Ω"], correctIndex: 2, explanation: "Add: 5Ω." },
          { question: "Two 6Ω resistors in parallel give", options: ["12Ω", "6Ω", "3Ω", "0Ω"], correctIndex: 2, explanation: "Equal parallel halves: 3Ω." },
          { question: "Adding a resistor in series will… current", options: ["increase", "decrease", "no change", "reverse"], correctIndex: 1, explanation: "Total R increases." },
          { question: "Adding a branch in parallel will… total resistance", options: ["increase", "decrease", "same", "infinite"], correctIndex: 1, explanation: "More paths → lower RT." },
          { question: "Power is…", options: ["VI", "V/I", "I/V", "F/A"], correctIndex: 0, explanation: "P=VI." },
          { question: "If V=12V and R=6Ω in series alone, I=?", options: ["0.5A", "2A", "6A", "72A"], correctIndex: 1, explanation: "I=V/R=2A." },
          { question: "Ideal voltmeter has…", options: ["0Ω", "∞Ω", "1Ω", "6Ω"], correctIndex: 1, explanation: "So it draws negligible current." },
          { question: "Ideal ammeter has…", options: ["0Ω", "∞Ω", "high Ω", "variable"], correctIndex: 0, explanation: "So it doesn’t change circuit." },
          { question: "In parallel, total current equals…", options: ["sum of branch currents", "difference", "product", "zero"], correctIndex: 0, explanation: "Currents add." },
          { question: "If one bulb in series breaks, others…", options: ["stay on", "go off", "get brighter", "double current"], correctIndex: 1, explanation: "Circuit open → all off." },
          { question: "If one bulb in parallel breaks, others…", options: ["go off", "stay on", "short circuit always", "reverse"], correctIndex: 1, explanation: "Other branches still complete." },
          { question: "Fuse is placed…", options: ["in parallel", "in series with live wire", "across neutral", "across lamp"], correctIndex: 1, explanation: "Series to cut off supply." },
        ],
        trueFalse: [
          { statement: "Current splits in parallel circuits.", correct: true, explain: "Branches share current." },
          { statement: "Voltage splits in series circuits.", correct: true, explain: "p.d. shared across components." },
          { statement: "A voltmeter should be in series.", correct: false, explain: "It must be in parallel." },
          { statement: "Ammeter should have high resistance.", correct: false, explain: "Should be low to avoid changing current." },
          { statement: "Adding a parallel branch reduces total resistance.", correct: true, explain: "More paths." },
          { statement: "Two equal resistors in parallel have same total as series.", correct: false, explain: "Parallel is smaller than each." },
          { statement: "Power can be calculated by P=VI.", correct: true, explain: "Yes." },
          { statement: "If a series circuit breaks, all components stop working.", correct: true, explain: "Open circuit." },
          { statement: "Parallel circuits allow independent control of branches.", correct: true, explain: "Each branch is separate path." },
          { statement: "Short circuit has very high resistance.", correct: false, explain: "It has very low resistance." },
        ],
      
    });
})();