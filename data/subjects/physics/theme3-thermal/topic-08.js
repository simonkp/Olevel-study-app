(function () {
    window.__registerTopic({

        id: "8",
        theme: "Section III: Thermal Physics",
        title: "Thermal Processes",
        cheatBlocks: [
          { title: "Thermal equilibrium + temperature", points: [
            "Temperature is a measure of hotness; in equilibrium, bodies have same temperature.",
            "Heat flows from higher temperature to lower temperature until equilibrium.",
            "Thermometer needs **good thermal contact** and small heat capacity for fast response."
          ]},
          { title: "Conduction, convection, radiation", points: [
            "**Conduction** (solids): energy transfer by particle collisions and free electrons (metals).",
            "**Convection** (fluids): bulk motion due to density changes (warm fluid rises).",
            "**Radiation**: infrared EM waves; no medium needed; all objects emit IR."
          ]},
          { title: "Absorption/emission + applications", points: [
            "Dull black surfaces are good **absorbers/emitters** of IR; shiny surfaces are poor.",
            "Vacuum flask reduces conduction (vacuum), convection (vacuum), radiation (silvered surfaces).",
            "Insulation: trapped air (poor conductor), double glazing, reflective foil."
          ]},
        ],
        flashcards: [
          { front: "Thermal equilibrium", back: "No net heat flow; same temperature." },
          { front: "Conduction happens mainly in…", back: "solids (esp. metals via electrons)" },
          { front: "Convection happens in…", back: "liquids and gases (fluids)" },
          { front: "Radiation requires medium?", back: "No; travels through vacuum." },
          { front: "Good IR absorber", back: "dull black surface" },
          { front: "Good IR reflector", back: "shiny/silver surface" },
          { front: "Why warm air rises", back: "expands → density decreases → buoyant upthrust" },
          { front: "Vacuum flask: vacuum reduces…", back: "conduction + convection" },
          { front: "Double glazing reduces heat loss by…", back: "trapping air reduces conduction/convection" },
          { front: "Main radiation from hot objects", back: "infrared" },
          { front: "Metals good conductors because…", back: "free electrons transfer energy fast" },
          { front: "Convection current direction", back: "hot rises, cool sinks" },
        ],
        quiz: [
          { question: "Heat flows from…", options: ["cold to hot", "hot to cold", "high density to low density", "low pressure to high"], correctIndex: 1, explanation: "Energy transfers down temperature gradient." },
          { question: "Convection occurs in…", options: ["solids only", "fluids only", "vacuum only", "all states equally"], correctIndex: 1, explanation: "Convection needs fluid motion." },
          { question: "Radiation can travel through…", options: ["vacuum", "solids only", "liquids only", "cannot travel"], correctIndex: 0, explanation: "EM waves travel in vacuum." },
          { question: "Best IR absorber", options: ["shiny silver", "white glossy", "dull black", "transparent"], correctIndex: 2, explanation: "Black/dull absorbs well." },
          { question: "Metals conduct by…", options: ["convection", "free electrons", "only radiation", "no mechanism"], correctIndex: 1, explanation: "Electrons carry energy." },
          { question: "In a vacuum flask, vacuum reduces…", options: ["radiation", "conduction & convection", "only convection", "only conduction"], correctIndex: 1, explanation: "No particles → no conduction/convection." },
          { question: "Silvered surfaces reduce…", options: ["conduction", "convection", "radiation", "density"], correctIndex: 2, explanation: "Reflect IR." },
          { question: "Warm air rises because it becomes…", options: ["denser", "less dense", "more massive", "colder"], correctIndex: 1, explanation: "Expansion lowers density." },
          { question: "A draught in a room is due to…", options: ["conduction", "convection currents", "radiation only", "evaporation"], correctIndex: 1, explanation: "Moving air from convection." },
          { question: "Which reduces heat loss most by radiation?", options: ["vacuum", "thick glass", "shiny foil", "fan"], correctIndex: 2, explanation: "Reflects IR." },
          { question: "Thermal equilibrium means…", options: ["same heat", "same temperature", "same mass", "same density"], correctIndex: 1, explanation: "No net heat flow." },
          { question: "A good conductor is also a good…", options: ["IR emitter", "insulator", "convector only", "vacuum"], correctIndex: 0, explanation: "Often metallic surfaces emit/absorb depending on surface finish; but conduction is separate. (Exam usually: dull black best emitter.)" },
          { question: "Dull black surfaces are good emitters because…", options: ["reflect IR", "absorb/emit IR effectively", "stop convection", "increase density"], correctIndex: 1, explanation: "High emissivity." },
          { question: "Conduction in non-metals mainly by…", options: ["electron flow", "particle vibrations/collisions", "bulk motion", "photons only"], correctIndex: 1, explanation: "Lattice vibrations." },
          { question: "Sea breeze forms because land…", options: ["heats faster", "heats slower", "is denser", "absorbs less"], correctIndex: 0, explanation: "Land warms air → rises → cooler sea air moves in." },
          { question: "IR stands for…", options: ["internal resistance", "infrared", "ionic radiation", "inverse ratio"], correctIndex: 1, explanation: "Infrared." },
        ],
        trueFalse: [
          { statement: "Radiation requires particles to travel.", correct: false, explain: "EM radiation travels in vacuum." },
          { statement: "Convection cannot occur in solids.", correct: true, explain: "No bulk flow." },
          { statement: "Shiny surfaces are good emitters of IR.", correct: false, explain: "They are poor emitters; dull black is best." },
          { statement: "Thermal equilibrium means no net heat flow.", correct: true, explain: "Definition." },
          { statement: "Metals are good conductors due to free electrons.", correct: true, explain: "Electron conduction." },
          { statement: "Vacuum flask reduces convection by vacuum.", correct: true, explain: "No fluid to circulate." },
          { statement: "Warm fluid is denser than cool fluid.", correct: false, explain: "Warm fluid usually less dense." },
          { statement: "Radiation from a heater is mainly infrared.", correct: true, explain: "IR dominates." },
          { statement: "Conduction transfers heat by bulk movement.", correct: false, explain: "That’s convection." },
          { statement: "Black surfaces reflect IR strongly.", correct: false, explain: "Black absorbs strongly." },
        ],
      
    });
})();