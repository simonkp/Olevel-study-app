(function () {
  window.__registerTopic({
    id: "5",
    theme: "Theme 1: Matter – Structures & Properties",
    title: "Chemical Bonding and Structure",
    cheatBlocks: [
        {
            "title": "Ionic",
            "points": [
                "Metal + non-metal → **electron transfer** → ions.",
                "**Giant ionic lattice** — high mp, brittle, insulators solid; conduct molten/aqueous."
            ]
        },
        {
            "title": "Covalent",
            "points": [
                "Share pairs; **simple molecular** (low mp, often insoluble in water) vs **giant covalent** (diamond, graphite, SiO₂).",
                "**Intermolecular forces** weak between molecules in simple covalent."
            ]
        },
        {
            "title": "Metallic",
            "points": [
                "**Sea of delocalised electrons** + fixed cations.",
                "Conduct heat/electricity, malleable."
            ]
        },
        {
            "title": "Elements, compounds, mixtures",
            "points": [
                "**Element** — one type of atom (e.g. O₂ is still element oxygen).",
                "**Compound** — fixed composition by chemical bonding (e.g. H₂O).",
                "**Mixture** — variable composition; can often be separated physically (filtration, distillation)."
            ]
        }
    ],
    infographics: [
      { image: "data/subjects/chemistry/images/matter-05-Bonding.jpg", caption: "Ionic, covalent and metallic bonding" },
      { svg: "<svg viewBox=\"0 0 280 110\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"280\" height=\"110\" fill=\"#1c222d\"/><text x=\"8\" y=\"18\" fill=\"#5eead4\" font-size=\"10\">IONIC</text><text x=\"10\" y=\"48\" fill=\"#a78bfa\" font-size=\"22\">Na⁺</text><text x=\"120\" y=\"48\" fill=\"#fb923c\" font-size=\"22\">Cl⁻</text><line x1=\"55\" y1=\"42\" x2=\"105\" y2=\"42\" stroke=\"#666\" stroke-width=\"2\"/><text x=\"8\" y=\"88\" fill=\"#5eead4\" font-size=\"10\">COVALENT</text><circle cx=\"200\" cy=\"82\" r=\"12\" fill=\"none\" stroke=\"#4ade80\" stroke-width=\"2\"/><circle cx=\"235\" cy=\"82\" r=\"12\" fill=\"none\" stroke=\"#4ade80\" stroke-width=\"2\"/><line x1=\"212\" y1=\"82\" x2=\"223\" y2=\"82\" stroke=\"#4ade80\" stroke-width=\"3\"/></svg>", caption: "Ionic vs covalent (simplified)" }
    ],
    flashcards: [
        {
            "front": "Why molten NaCl conducts?",
            "back": "Ions mobile."
        },
        {
            "front": "Diamond hardness?",
            "back": "Each C tetrahedral; giant covalent."
        },
        {
            "front": "Graphite conducts along layers?",
            "back": "Delocalised π electrons between planes."
        },
        {
            "front": "Metallic bond?",
            "back": "Cations in electron sea."
        },
        {
            "front": "CO₂ bp low?",
            "back": "Simple molecular; weak IM forces."
        },
        {
            "front": "SiO₂ mp very high?",
            "back": "Giant covalent network."
        },
        {
            "front": "Dative covalent bond?",
            "back": "Both electrons from one atom (e.g. NH₄⁺)."
        },
        {
            "front": "Polar covalent bond?",
            "back": "Unequal sharing — ΔEN."
        },
        {
            "front": "Hydrogen bonding?",
            "back": "Strong IM force; F,O,N with H."
        },
        {
            "front": "Ionic crystal brittle?",
            "back": "Ion layers slip → same charges align → repel."
        },
        {
            "front": "Alloys harder than pure metal?",
            "back": "Different size atoms disrupt layers."
        },
        {
            "front": "Fullerene?",
            "back": "Molecular carbon cages (e.g. C₆₀)."
        },
        {
            "front": "Graphene?",
            "back": "Single layer graphite; strong 2D."
        },
        {
            "front": "Van der Waals?",
            "back": "Weak forces all molecules; stronger for larger surface."
        }
    ],
    quiz: [
    {question:"Which conducts when solid:",options:["NaCl crystal","Diamond","Copper","Sulfur powder"],correctIndex:2,explanation:"Mobile electrons in metal."},
    {question:"Ionic compound in solid state:",options:["Conducts electricity","Ions fixed — no conduction","Always gas","Magnetic always"],correctIndex:1,explanation:"Lattice locked."},
    {question:"Covalent bond is:",options:["Transfer","Shared pair","Sea of electrons","Ion pair only"],correctIndex:1,explanation:"Non-metal + non-metal often."},
    {question:"Simple molecular iodine:",options:["Very high mp","Low mp — weak IM forces","Metallic","Ionic lattice"],correctIndex:1,explanation:"I₂ molecules."},
    {question:"Graphite lubricant because:",options:["Ionic layers","Weak forces between layers slide","Gas","Dissolves in water"],correctIndex:1,explanation:"Sheets slip."},
    {question:"Electronegativity across period:",options:["Decreases","Increases","Constant","Zero"],correctIndex:1,explanation:"Attraction for bonding e⁻."},
    {question:"Polar molecule example:",options:["Cl₂","HCl","N₂","O₂"],correctIndex:1,explanation:"ΔEN."},
    {question:"NH₄⁺ has:",options:["Only ionic bonds","Dative covalent to H⁺","Metallic bond","No bonds"],correctIndex:1,explanation:"Coordinate bond."},
    {question:"MgO vs NaCl melting point:",options:["MgO lower","MgO higher (stronger ionic attraction)","Same","Cannot compare"],correctIndex:1,explanation:"2+ and 2− vs 1+1−."},
    {question:"Hydrogen bond in ice:",options:["Makes denser","Open structure — ice floats","No H bonds","Only covalent"],correctIndex:1,explanation:"Expanded lattice."},
    {question:"Metallic bonding strength affects:",options:["Only colour","Melting point","Nothing","Only gas"],correctIndex:1,explanation:"Stronger bond → higher mp."},
    {question:"SiO₂ structure:",options:["Simple molecular","Giant covalent","Metallic","Ionic only"],correctIndex:1,explanation:"Network solid."},
    {question:"Which has highest bp at 1 atm:",options:["CH₄","H₂O","Ne","H₂"],correctIndex:1,explanation:"Hydrogen bonding."},
    {question:"Double bond:",options:["Two shared pairs","One pair","Three pairs","No electrons"],correctIndex:0,explanation:"e.g. O₂, CO₂."},
    {question:"Coordinate bond in CO (concept):",options:["Both e⁻ from O only","Both from C","One from each always","Ionic"],correctIndex:0,explanation:"Lone pair from O to C (A-level)."},
    {question:"Van der Waals increase with:",options:["Smaller surface","More electrons / larger molecule","Higher charge only","Ionic character"],correctIndex:1,explanation:"Polarisability."},
    {question:"Alloy brass is:",options:["Pure Cu","Cu + Zn","Fe + C","Na + Cl"],correctIndex:1,explanation:"Brass composition."},
    {question:"Why metals malleable:",options:["Layers slide without breaking metallic bond","Ionic shatter","Gas","Only gold"],correctIndex:0,explanation:"Sea rearranges."},
    {question:"C60 is:",options:["Giant covalent only","Molecular","Ionic","Metal"],correctIndex:1,explanation:"Discrete molecules."},
    {question:"Bond in NaCl crystal:",options:["Covalent network","Ionic","Metallic","Hydrogen"],correctIndex:1,explanation:"Electrostatic."},
    {question:"Dipole-dipole vs H-bond:",options:["Always same","H-bond stronger involving H-F,O,N","Dipole always stronger","Neither exists"],correctIndex:1,explanation:"H-bond special case."},
    {question:"Electronegativity difference large →:",options:["Non-polar covalent","Ionic character high","No bond","Only metal"],correctIndex:1,explanation:"Threshold ~1.7 rule of thumb."},
    {question:"Graphite electrode use:",options:["Insulator","Conductor along plane","Only liquid","Never"],correctIndex:1,explanation:"Electrons along layers."},
    {question:"Boiling HCl vs HF:",options:["HCl higher","HF higher (H-bonds)","Same","Neither boils"],correctIndex:1,explanation:"HF associates."},
    {question:"Ceramic (ionic giant) property:",options:["Ductile","Brittle","Liquid at 25°C","Conducts always"],correctIndex:1,explanation:"Shatters."},
    {question:"Metallic lustre due to:",options:["Photon absorption/re-emission by electron sea","Ion colour only","Gas","Water"],correctIndex:0,explanation:"Delocalised e⁻."},
    {question:"Intermolecular forces in liquid Br₂:",options:["Covalent bonds break","Weak IM forces between Br₂ molecules","Ionic","None"],correctIndex:1,explanation:"Molecular liquid."},
    {question:"Which has the higher boiling point: CH₄ or SiH₄?",options:["CH₄","SiH₄","They must be equal","Neither boils"],correctIndex:1,explanation:"Larger electron cloud → stronger London dispersion forces."},
    {question:"Solid NaCl does not conduct electricity because:",options:["It contains no ions","Ions are fixed and cannot move","Electrons swim freely","It is metallic"],correctIndex:1,explanation:"Charge carriers must be mobile."},
    {question:"In diamond, each carbon is approximately:",options:["sp hybridised","sp³ tetrahedral","sp² planar","ionic"],correctIndex:1,explanation:"Four strong covalent bonds in a giant lattice."},
    {question:"Why is MgO’s lattice stronger than NaCl’s (qualitative)?",options:["MgO is molecular","Higher ion charges (2+ and 2−) strengthen electrostatic attraction","NaCl has covalent character only","MgO has metallic bonding"],correctIndex:1,explanation:"Lattice energy scales strongly with ion charge."},
    {question:"Hydrogen fluoride can boil higher than HCl mainly because:",options:["HF is non-polar","HF can hydrogen-bond; HCl cannot","HCl is always ionic","HF has lower Mr"],correctIndex:1,explanation:"Strong intermolecular hydrogen bonding in HF."},
    {question:"Metals are ductile largely because:",options:["Ionic layers repel permanently","Layers of ions can slip while the electron sea maintains bonding","Covalent bonds break permanently","They are gases"],correctIndex:1,explanation:"Non-directional metallic bonding allows deformation."},
    {question:"Which is a giant covalent structure at room temperature?",options:["I₂","SiO₂","CO₂","H₂O"],correctIndex:1,explanation:"Quartz is a continuous network solid."},
    {question:"A ‘polar molecule’ must have:",options:["Only ionic bonds","An overall dipole from bond polarity and shape","Equal sharing in all bonds","No lone pairs"],correctIndex:1,explanation:"Vector sum of bond dipoles can be non-zero (e.g. H₂O)."},
    {question:"When NaCl dissolves in water, the main driving factor is:",options:["Covalent bond formation between Na and Cl","Ion–dipole interactions and hydration stabilising separated ions","NaCl becomes metallic","Water oxidises Na⁺"],correctIndex:1,explanation:"Hydration stabilises ions in solution."},
    {question:"Graphite conducts electricity but diamond does not mainly because:",options:["Diamond has fewer carbons","Graphite has delocalised π electrons between layers","Diamond is ionic","Graphite is a gas"],correctIndex:1,explanation:"Mobile electrons exist in graphite’s layered structure."},
    {id:"chem-T5-201",question:"A sample of air is best described as:",options:["A compound","An element","A mixture","A single molecule"],correctIndex:2,explanation:"Variable composition of gases."},
    {id:"chem-T5-202",question:"Which statement about a pure molecular substance (e.g. dry ice, CO₂) is most accurate?",options:["It must be a single atom","It consists of CO₂ molecules with covalent bonds; weak forces between molecules","It has a giant ionic lattice","It cannot sublime"],correctIndex:1,explanation:"Simple molecular — strong covalent bonds within molecules."},
    {id:"chem-T5-203",question:"Covalent character in a bond increases when:",options:["Electronegativity difference is very large","Electronegativity difference is very small","Ions are very large","Temperature is always 0 K"],correctIndex:1,explanation:"Very polar bonds approach ionic; small ΔEN → more covalent character."},
    {id:"chem-T5-204",question:"Compared to a single bond between the same atoms, a double bond is typically:",options:["Longer and weaker","Shorter and stronger","Same length and strength","Only found in ionic solids"],correctIndex:1,explanation:"More shared electron density pulls nuclei closer."},
    {id:"chem-T5-205",question:"Carbon nanotubes are structurally related to:",options:["Diamond only","Graphite layers rolled into cylinders","NaCl lattice","Liquid water"],correctIndex:1,explanation:"sp² carbon networks with exceptional strength along the tube."},
    {id:"chem-T5-206",question:"Molten CaCl₂ conducts electricity because:",options:["Electrons move in a sea","Mobile Ca²⁺ and Cl⁻ ions","It is a metal","Covalent bonds break into electrons"],correctIndex:1,explanation:"Ionic liquids conduct via ion motion."},
    {id:"chem-T5-207",question:"Which is NOT a property typical of simple molecular iodine (I₂) solid?",options:["Low melting point","Weak forces between molecules","I₂ molecules in the crystal","Very high electrical conductivity as solid"],correctIndex:3,explanation:"No mobile charge carriers in solid molecular iodine."},
    {id:"chem-T5-208",question:"A polar bond may still give a non-polar molecule if:",options:["The molecule is always linear","The bond dipoles cancel by symmetry (e.g. CO₂)","The molecule is ionic","Hydrogen bonding is absent"],correctIndex:1,explanation:"Shape matters for overall dipole."},
    {id:"chem-T5-209",question:"The main reason ionic crystals are often soluble in water is:",options:["Ionic bonds are weak","Hydration energy can overcome lattice energy","Water always oxidises the cation","Ions are gases"],correctIndex:1,explanation:"Solubility depends on balance of lattice energy vs hydration."}
    ],
    trueFalse: [
    {statement:"Diamond and graphite are both pure carbon but different structures.",correct:true,explain:"Allotropes."},
    {statement:"All covalent substances have low melting points.",correct:false,explain:"Giant covalent exceptions."},
    {statement:"Ionic compounds dissolve in water by ion-dipole interaction.",correct:true,explain:"Hydration of ions."},
    {statement:"Metals conduct electricity because ions move through the lattice.",correct:false,explain:"Electrons move."},
    {statement:"Hydrogen bonding is a type of covalent bond within a water molecule.",correct:false,explain:"Within molecule covalent; between molecules H-bond."},
    {statement:"NaCl vapour contains NaCl molecules.",correct:false,explain:"Vapour often ion pairs/molecules at high T — O-level: lattice breaks to ions in solution/melt."},
    {statement:"Greater charge density on ion tends to strengthen ionic attraction.",correct:true,explain:"Favour smaller highly charged ions."},
    {statement:"Graphite has only sp³ hybridised carbons.",correct:false,explain:"sp² in layers."},
    {statement:"London dispersion forces exist between all atoms/molecules.",correct:true,explain:"Instantaneous dipoles."},
    {statement:"Triple bond stronger than single bond.",correct:true,explain:"More shared electrons."},
    {statement:"Salt bridge in cell is ionic conduction.",correct:true,explain:"Completes circuit."},
    {statement:"Metallic radius increases down group.",correct:true,explain:"Extra electron shell."}
    ],
    });
})();
