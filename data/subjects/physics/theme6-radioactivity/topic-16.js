(function () {
    window.__registerTopic({

        id: "16",
        theme: "Section VI: Radioactivity",
        title: "Radioactivity",
        cheatBlocks: [
          { title: "Atomic structure recap", points: [
            "Atom: nucleus (protons + neutrons), electrons in shells.",
            "Proton number Z determines element; mass number A = p + n.",
            "Isotopes: same Z, different n; same chemical properties, different physical (mass)."
          ]},
          { title: "Types of radiation", points: [
            "Alpha (α): helium nucleus (2p+2n), +2 charge, very ionising, low penetration (stopped by paper).",
            "Beta (β): electron (β−) from nucleus, moderately ionising, medium penetration (stopped by thin aluminium).",
            "Gamma (γ): EM wave, weakly ionising, highly penetrating (needs thick lead/concrete)."
          ]},
          { title: "Decay + safety + uses", points: [
            "Radioactive decay is random; half-life: time for activity/count to halve.",
            "Safety: time, distance, shielding; avoid ingestion/inhalation; use tongs/lead.",
            "Uses: smoke detectors (α), thickness control (β), sterilisation and cancer treatment (γ) with control and precautions."
          ]},
        ],
        flashcards: [
          { front: "Mass number", back: "A = p + n" },
          { front: "Atomic number", back: "Z = number of protons" },
          { front: "Isotopes", back: "same protons, different neutrons" },
          { front: "Alpha nature", back: "helium nucleus (+2)" },
          { front: "Beta nature", back: "electron (β−)" },
          { front: "Gamma nature", back: "EM radiation" },
          { front: "Most ionising", back: "alpha" },
          { front: "Most penetrating", back: "gamma" },
          { front: "Stopped by paper", back: "alpha" },
          { front: "Stopped by thin aluminium", back: "beta" },
          { front: "Shield for gamma", back: "thick lead/concrete" },
          { front: "Half-life", back: "time for activity/count-rate to halve" },
        ],
        quiz: [
          { question: "Atomic number is number of…", options: ["neutrons", "protons", "electrons always", "nucleons"], correctIndex: 1, explanation: "Z = protons." },
          { question: "Mass number equals…", options: ["p+n", "p−n", "n−p", "p only"], correctIndex: 0, explanation: "A=p+n." },
          { question: "Alpha particle is…", options: ["electron", "photon", "helium nucleus", "neutron"], correctIndex: 2, explanation: "2p+2n." },
          { question: "Gamma radiation is…", options: ["particle", "EM wave", "ion", "atom"], correctIndex: 1, explanation: "Photon radiation." },
          { question: "Most penetrating", options: ["alpha", "beta", "gamma", "all same"], correctIndex: 2, explanation: "Gamma." },
          { question: "Most ionising", options: ["alpha", "beta", "gamma", "none"], correctIndex: 0, explanation: "Alpha." },
          { question: "Alpha is stopped by…", options: ["paper", "thin aluminium", "thick lead", "vacuum only"], correctIndex: 0, explanation: "Paper/skin." },
          { question: "Beta is stopped by…", options: ["paper", "thin aluminium", "air only", "glass always"], correctIndex: 1, explanation: "Aluminium." },
          { question: "Half-life is time for… to halve", options: ["mass", "temperature", "activity/count-rate", "speed"], correctIndex: 2, explanation: "Activity halves." },
          { question: "Safety principle NOT correct", options: ["increase time", "increase distance", "use shielding", "minimise time"], correctIndex: 0, explanation: "Minimise time near source." },
          { question: "Isotopes have same…", options: ["neutrons", "mass number", "proton number", "all"], correctIndex: 2, explanation: "Same protons define element." },
          { question: "Smoke detectors commonly use…", options: ["alpha", "beta", "gamma", "infrared"], correctIndex: 0, explanation: "Alpha source (e.g. Am-241) in some detectors." },
          { question: "Thickness control uses…", options: ["alpha", "beta", "gamma", "microwaves"], correctIndex: 1, explanation: "Beta penetrates thin sheets; absorption depends on thickness." },
          { question: "Sterilising medical equipment often uses…", options: ["alpha", "beta", "gamma", "sound"], correctIndex: 2, explanation: "Gamma." },
          { question: "If count rate is 800 and half-life is 2 h, after 6 h it is…", options: ["400", "200", "100", "50"], correctIndex: 2, explanation: "6h=3 half-lives: 800→400→200→100." },
          { question: "Ionising radiation danger is mainly…", options: ["DNA damage", "making things cold", "increasing mass", "creating sound"], correctIndex: 0, explanation: "Ionisation damages cells." },
        ],
        trueFalse: [
          { statement: "Radioactive decay is random.", correct: true, explain: "Unpredictable for a single nucleus." },
          { statement: "Alpha is the most penetrating.", correct: false, explain: "Alpha is least penetrating." },
          { statement: "Gamma is an electromagnetic wave.", correct: true, explain: "Photon radiation." },
          { statement: "Beta particles have +2 charge.", correct: false, explain: "Beta (β−) is electron, -1." },
          { statement: "Half-life is constant for a given isotope.", correct: true, explain: "Independent of conditions (basic syllabus)." },
          { statement: "Distance reduces exposure by spreading out radiation.", correct: true, explain: "Intensity falls with distance." },
          { statement: "Paper can stop gamma rays.", correct: false, explain: "Need thick lead/concrete." },
          { statement: "Isotopes have different chemical properties.", correct: false, explain: "Chemical depends on protons/electrons; isotopes differ mainly in physical." },
          { statement: "Ionising radiation can damage living tissue.", correct: true, explain: "Ionisation harms cells/DNA." },
          { statement: "Increasing shielding increases safety.", correct: true, explain: "Reduces exposure." },
        ],
      
    });
})();