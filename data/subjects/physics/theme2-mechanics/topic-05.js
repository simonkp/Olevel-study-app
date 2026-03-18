(function () {
    window.__registerTopic({

        id: "5",
        theme: "Section II: Newtonian Mechanics",
        title: "Turning Effects of Forces",
        cheatBlocks: [
          { title: "Moments", points: [
            "Moment (torque) about a pivot: \(\\tau = F \\times d_\\perp\\) where d is perpendicular distance from pivot to line of action.",
            "Clockwise moments = anticlockwise moments in equilibrium.",
            "Couple: two equal/opposite parallel forces separated by distance → pure turning effect."
          ]},
          { title: "Equilibrium", points: [
            "For equilibrium: resultant force = 0 **and** resultant moment = 0.",
            "Stable / unstable / neutral equilibrium based on centre of gravity (CoG) position change when displaced."
          ]},
          { title: "Centre of gravity", points: [
            "CoG: point where weight acts (resultant of gravitational forces).",
            "Lowering CoG and widening base increases stability.",
            "Finding CoG of lamina: suspend, draw plumb line; intersection is CoG."
          ]},
        ],
        flashcards: [
          { front: "Moment formula", back: "τ = F × perpendicular distance" },
          { front: "Equilibrium conditions", back: "ΣF=0 and Σmoment=0" },
          { front: "Define couple", back: "Two equal/opposite parallel forces causing rotation only" },
          { front: "Stable equilibrium", back: "CoG rises when displaced; tends to return" },
          { front: "Unstable equilibrium", back: "CoG lowers when displaced; moves away" },
          { front: "Neutral equilibrium", back: "CoG same height when displaced" },
          { front: "Stability increased by…", back: "lower CoG, wider base" },
          { front: "CoG of lamina method", back: "suspend + plumb line intersection" },
          { front: "Perpendicular distance means…", back: "shortest distance to line of action" },
          { front: "Unit of moment", back: "N·m" },
          { front: "Door handle far from hinge helps because…", back: "larger d → larger moment" },
          { front: "If Σmoment ≠ 0, object…", back: "rotates / tends to rotate" },
        ],
        quiz: [
          { question: "Moment about pivot is…", options: ["F/d", "F×d⊥", "F×A", "m/V"], correctIndex: 1, explanation: "Torque = force × perpendicular distance." },
          { question: "Unit of moment", options: ["N", "N/m", "N·m", "J"], correctIndex: 2, explanation: "N·m." },
          { question: "For equilibrium, ΣF and Σmoment are…", options: ["both zero", "both max", "ΣF zero only", "Σmoment zero only"], correctIndex: 0, explanation: "Need both." },
          { question: "A 10 N force acts 0.3 m from pivot. Moment?", options: ["3", "30", "0.03", "33"], correctIndex: 0, explanation: "10×0.3=3 N·m." },
          { question: "Opening a door is easier at handle because…", options: ["smaller force", "bigger d", "bigger mass", "less friction"], correctIndex: 1, explanation: "Larger distance → larger moment." },
          { question: "A couple produces…", options: ["translation only", "rotation only", "no effect", "always equilibrium"], correctIndex: 1, explanation: "Pure turning." },
          { question: "Stable equilibrium means CoG… when displaced", options: ["lowers", "rises", "stays same", "vanishes"], correctIndex: 1, explanation: "CoG rises → restoring tendency." },
          { question: "Wider base makes object…", options: ["less stable", "more stable", "no change", "weightless"], correctIndex: 1, explanation: "More stable." },
          { question: "If line of action of weight falls outside base, object…", options: ["stable", "topples", "floats", "shrinks"], correctIndex: 1, explanation: "It topples." },
          { question: "CoG can be found by…", options: ["measuring density", "suspending and drawing plumb lines", "using thermometer", "using ammeter"], correctIndex: 1, explanation: "Standard method." },
          { question: "Perpendicular distance is measured to…", options: ["pivot", "force arrow head", "line of action", "object edge"], correctIndex: 2, explanation: "Shortest distance to line of action." },
          { question: "If clockwise moment > anticlockwise, object turns…", options: ["anticlockwise", "clockwise", "no turn", "upwards"], correctIndex: 1, explanation: "Net clockwise." },
          { question: "A beam in equilibrium has Σmoment about any point…", options: ["zero", "max", "unknown", "negative"], correctIndex: 0, explanation: "Equilibrium implies zero about any pivot." },
          { question: "Shifting weight lower increases stability because…", options: ["less mass", "CoG lower", "force smaller", "area smaller"], correctIndex: 1, explanation: "Lower CoG harder to topple." },
          { question: "Moment arm equals…", options: ["distance along beam", "perpendicular distance to line of action", "height only", "mass"], correctIndex: 1, explanation: "Definition." },
          { question: "A spanner is longer to…", options: ["increase force", "increase moment for same force", "reduce pivot", "increase mass"], correctIndex: 1, explanation: "Larger d increases torque." },
        ],
        trueFalse: [
          { statement: "Moment depends on perpendicular distance.", correct: true, explain: "τ=F×d⊥." },
          { statement: "For equilibrium, only ΣF=0 is needed.", correct: false, explain: "Must also have Σmoment=0." },
          { statement: "A couple has zero resultant force.", correct: true, explain: "Forces cancel but cause turning." },
          { statement: "Lower CoG increases stability.", correct: true, explain: "Harder to topple." },
          { statement: "Stable equilibrium means CoG lowers when displaced.", correct: false, explain: "CoG rises when displaced." },
          { statement: "Moment unit is N/m.", correct: false, explain: "N·m." },
          { statement: "Wider base decreases stability.", correct: false, explain: "It increases stability." },
          { statement: "If weight’s line of action is within base, object will not topple.", correct: true, explain: "No toppling moment." },
          { statement: "CoG is always at geometric centre.", correct: false, explain: "Only for uniform symmetric objects." },
          { statement: "A door handle is far from hinge to increase turning effect.", correct: true, explain: "Larger moment arm." },
        ],
      
    });
})();