(function () {
    window.__registerTopic({

        id: "7A",
        theme: "Section III: Thermal Physics",
        title: "Kinetic Particle Model of Matter I",
        cheatBlocks: [
          { title: "States of matter", points: [
            "Solid: particles closely packed, fixed positions, vibrate; fixed shape/volume.",
            "Liquid: close, random positions, slide; fixed volume, no fixed shape.",
            "Gas: far apart, random rapid motion; compressible; fills container."
          ]},
          { title: "Kinetic particle model", points: [
            "Temperature relates to **average kinetic energy** of particles (qualitative).",
            "Heating increases particle speed/KE; can cause expansion and change of state.",
            "Evaporation: surface particles escape at any temperature; boiling occurs throughout at fixed boiling point."
          ]},
        ],
        flashcards: [
          { front: "Gas compressible because…", back: "large spaces between particles" },
          { front: "Boiling vs evaporation", back: "boiling throughout at bp; evaporation at surface any T" },
          { front: "Diffusion faster in…", back: "gases (higher particle speed + spacing)" },
          { front: "Why solids have fixed shape", back: "particles in fixed lattice positions" },
          { front: "Effect of heating", back: "increases average KE" },
          { front: "Brownian motion shows…", back: "random particle motion in fluids" },
          { front: "Melting", back: "solid → liquid" },
          { front: "Freezing", back: "liquid → solid" },
          { front: "Condensation", back: "gas → liquid" },
          { front: "Sublimation", back: "solid → gas" },
          { front: "Boiling point depends on…", back: "external pressure" },
          { front: "Gas pressure caused by…", back: "collisions with container walls" },
        ],
        quiz: [
          { question: "In solids, particles mainly…", options: ["move freely far apart", "vibrate about fixed positions", "slide past easily", "do not move at all"], correctIndex: 1, explanation: "They vibrate around fixed positions." },
          { question: "Gases are compressible because…", options: ["particles are large", "particles are far apart", "particles attract strongly", "g is zero"], correctIndex: 1, explanation: "Large spaces allow compression." },
          { question: "Evaporation occurs…", options: ["only at boiling point", "at surface at any temperature", "throughout liquid only", "only in solids"], correctIndex: 1, explanation: "Surface escape." },
          { question: "Boiling occurs when…", options: ["vapour pressure equals external pressure", "temperature is 0°C", "density doubles", "pressure is zero"], correctIndex: 0, explanation: "Condition for boiling." },
          { question: "Diffusion fastest in…", options: ["solids", "liquids", "gases", "none"], correctIndex: 2, explanation: "Most rapid random motion and spacing." },
          { question: "Gas pressure is due to…", options: ["gravity", "collisions with walls", "magnetism", "light"], correctIndex: 1, explanation: "Wall collisions." },
          { question: "Heating a gas at constant volume increases pressure because…", options: ["mass increases", "particles hit walls more often/harder", "walls get thinner", "density decreases"], correctIndex: 1, explanation: "Higher KE → more forceful collisions." },
          { question: "When a liquid freezes, particles…", options: ["move faster", "arrange in fixed positions", "move infinitely", "become massless"], correctIndex: 1, explanation: "Form solid lattice." },
          { question: "Change of state at constant temperature involves…", options: ["no energy transfer", "latent heat", "only kinetic energy increase", "decrease in mass"], correctIndex: 1, explanation: "Latent heat changes potential energy arrangement." },
          { question: "Which is correct for liquids?", options: ["fixed shape", "fixed volume", "high compressibility", "particles far apart"], correctIndex: 1, explanation: "Liquids have fixed volume." },
          { question: "Condensation is…", options: ["liquid→gas", "gas→liquid", "solid→liquid", "solid→gas"], correctIndex: 1, explanation: "Gas to liquid." },
          { question: "Sublimation is…", options: ["solid→gas", "gas→solid", "liquid→solid", "liquid→gas"], correctIndex: 0, explanation: "Solid directly to gas." },
          { question: "At higher temperature, average particle KE is…", options: ["lower", "higher", "same", "zero"], correctIndex: 1, explanation: "Temperature relates to average KE." },
          { question: "During boiling at constant pressure, temperature…", options: ["rises continuously", "stays constant", "falls", "becomes negative"], correctIndex: 1, explanation: "Remains constant at bp while energy breaks bonds." },
          { question: "When a gas cools, particle speed…", options: ["increases", "decreases", "same", "random"], correctIndex: 1, explanation: "Lower average KE." },
          { question: "Which state has strongest intermolecular forces?", options: ["gas", "liquid", "solid", "plasma"], correctIndex: 2, explanation: "Solids have strongest attractions." },
        ],
        trueFalse: [
          { statement: "Gas particles are packed closely together.", correct: false, explain: "They are far apart." },
          { statement: "Evaporation happens only at the boiling point.", correct: false, explain: "Can happen at any temperature." },
          { statement: "Boiling occurs throughout the liquid.", correct: true, explain: "Bubbles form inside." },
          { statement: "Diffusion occurs because particles are moving randomly.", correct: true, explain: "Random motion causes mixing." },
          { statement: "Heating increases average kinetic energy.", correct: true, explain: "Temperature rises (outside change of state)." },
          { statement: "Liquids are easily compressed.", correct: false, explain: "Liquids are nearly incompressible." },
          { statement: "Gas pressure is due to collisions with the container.", correct: true, explain: "Collision force per area." },
          { statement: "During melting, temperature can stay constant while energy is absorbed.", correct: true, explain: "Latent heat of fusion." },
          { statement: "Solids have fixed volume and shape.", correct: true, explain: "Particles vibrate about fixed positions." },
          { statement: "Sublimation is liquid turning into solid.", correct: false, explain: "That is freezing." },
        ],
      
    });
})();