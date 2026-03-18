(function () {
    window.__registerTopic({

        id: "11A",
        theme: "Section IV: Waves",
        title: "Light I (Reflection)",
        cheatBlocks: [
          { title: "Laws of reflection", points: [
            "Angle of incidence \(i\\) equals angle of reflection \(r\\).",
            "Incident ray, reflected ray and normal are in the same plane.",
            "Normal is drawn perpendicular to mirror at point of incidence."
          ]},
          { title: "Plane mirrors", points: [
            "Image is **virtual**, upright, laterally inverted, same size, same distance behind mirror as object in front.",
            "Ray diagram: use at least two rays (e.g. parallel + through focal? plane mirror: reflect with i=r)."
          ]},
          { title: "Practical", points: [
            "Periscope uses two reflections.",
            "To locate image: extend reflected rays backward (dashed lines)."
          ]},
        ],
        flashcards: [
          { front: "Law of reflection", back: "i = r" },
          { front: "Normal definition", back: "perpendicular to surface at point of incidence" },
          { front: "Plane mirror image type", back: "virtual, upright" },
          { front: "Laterally inverted means…", back: "left-right reversed" },
          { front: "Image distance in plane mirror", back: "equal to object distance" },
          { front: "Virtual image", back: "rays appear to come from it; cannot be formed on screen" },
          { front: "Real image", back: "formed by actual convergence; can be on screen" },
          { front: "Two rays for construction", back: "enough to locate intersection/extension" },
          { front: "Periscope uses…", back: "two plane mirrors" },
          { front: "Incident angle measured from…", back: "the normal" },
          { front: "Reflection in rough surface", back: "diffuse reflection" },
          { front: "Reflection in smooth surface", back: "specular reflection" },
        ],
        quiz: [
          { question: "Angle of incidence equals…", options: ["angle to mirror", "angle of reflection", "angle to ray", "angle of refraction"], correctIndex: 1, explanation: "i=r." },
          { question: "Angles are measured from the…", options: ["mirror surface", "normal", "horizon", "object"], correctIndex: 1, explanation: "From the normal." },
          { question: "Plane mirror image is…", options: ["real", "virtual", "inverted", "magnified always"], correctIndex: 1, explanation: "Virtual and upright." },
          { question: "Lateral inversion means…", options: ["up-down flipped", "left-right flipped", "bigger", "smaller"], correctIndex: 1, explanation: "Left-right reversal." },
          { question: "Object 2 m in front of mirror → image is… behind mirror", options: ["1 m", "2 m", "4 m", "0 m"], correctIndex: 1, explanation: "Same distance behind." },
          { question: "A virtual image…", options: ["can be projected on screen", "cannot be projected on screen", "always inverted", "always real"], correctIndex: 1, explanation: "No real convergence." },
          { question: "In reflection, incident ray and reflected ray lie in…", options: ["different planes", "same plane with normal", "no plane", "a circle"], correctIndex: 1, explanation: "Law of reflection." },
          { question: "Specular reflection occurs on…", options: ["rough", "smooth", "powder", "fog"], correctIndex: 1, explanation: "Smooth surface gives clear image." },
          { question: "Diffuse reflection produces…", options: ["sharp image", "scattered rays", "no reflection", "refraction"], correctIndex: 1, explanation: "Scattered due to roughness." },
          { question: "If i = 35°, then r = …", options: ["55°", "35°", "70°", "145°"], correctIndex: 1, explanation: "i=r." },
          { question: "Normal is…", options: ["parallel to surface", "perpendicular to surface", "45° to surface", "random"], correctIndex: 1, explanation: "Perpendicular." },
          { question: "Plane mirror image size is…", options: ["smaller", "same", "larger", "depends"], correctIndex: 1, explanation: "Same size." },
          { question: "Plane mirror forms image by…", options: ["converging rays", "diverging rays", "apparent extension", "absorption"], correctIndex: 2, explanation: "Rays appear to come from behind mirror." },
          { question: "Two mirrors in periscope are usually…", options: ["parallel", "perpendicular", "random", "curved"], correctIndex: 0, explanation: "Parallel at 45° to tube axis." },
          { question: "Angle between incident ray and reflected ray is… when i=30°", options: ["30°", "60°", "90°", "120°"], correctIndex: 1, explanation: "Angle = 2i = 60°." },
          { question: "If mirror rotates by 5°, reflected ray rotates by…", options: ["5°", "10°", "2.5°", "15°"], correctIndex: 1, explanation: "Reflected ray rotates twice the mirror angle (geometry)." },
        ],
        trueFalse: [
          { statement: "Angles of incidence and reflection are measured from the mirror surface.", correct: false, explain: "Measured from the normal." },
          { statement: "Plane mirror image is virtual.", correct: true, explain: "Cannot be formed on screen." },
          { statement: "i = r.", correct: true, explain: "Law of reflection." },
          { statement: "Plane mirror image is laterally inverted.", correct: true, explain: "Left-right reversed." },
          { statement: "A rough surface reflects light in many directions.", correct: true, explain: "Diffuse reflection." },
          { statement: "A virtual image is formed by actual convergence of rays.", correct: false, explain: "It’s apparent, not actual." },
          { statement: "Image distance equals object distance in a plane mirror.", correct: true, explain: "Symmetry." },
          { statement: "Reflected ray always lies in different plane from incident ray.", correct: false, explain: "Same plane with normal." },
          { statement: "Specular reflection gives clear images.", correct: true, explain: "Smooth surface." },
          { statement: "Refraction is the same as reflection.", correct: false, explain: "Refraction is bending in a medium change." },
        ],
      
    });
})();