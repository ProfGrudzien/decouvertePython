const rouge = "#f1948a"
const vert = "#58d68d"
const orange =  "#fad7a0"
const divPCC = document.getElementById('divPCC');
const filePCC = document.getElementById('filePCC');
const sommetPCC = document.getElementById('sommetPCC');
const pPCC = document.getElementById('pPCC');
const suivantPCC = document.getElementById('suivantPCC');
const precedentPCC = document.getElementById('precedentPCC');
const resetPCC = document.getElementById('resetPCC');
const pDijkstra = document.getElementById('pDijkstra');
const suivantDijkstra = document.getElementById('suivantDijkstra');
const precedentDijkstra = document.getElementById('precedentDijkstra');
const resetDijkstra = document.getElementById('resetDijkstra');
var noPCC = 0
var noDijkstra = 0

function ajouterDictionnairePCC(texte) {
    const p = document.createElement("p")
    p.textContent += texte
    divPCC.appendChild(p)
} 

function setUpPCC(event) {
    noPCC = 0
    const noms = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    noms.forEach(nom => {
        const S = document.getElementById(nom+"PCC")
        S.style.fill = "white"
    })
    divPCC.innerHTML = ""
    filePCC.textContent = ""
    sommetPCC.textContent = ""
    pPCC.textContent = ""
}

function animPCC(event) {
    const modifs = [
        () => {
            const noms = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
            noms.forEach(nom => {
                const S = document.getElementById(nom+"PCC")
                S.style.fill = rouge
            })
            pPCC.textContent = "Tous les sommets sont coloriés en rouge."
        },
        () => {
            document.getElementById("APCC").style.fill = vert
            filePCC.textContent = "A"
            ajouterDictionnairePCC("A : [A]")
            pPCC.textContent = "On ajoute le sommet de départ dans le dictionnaire et on enfile ce sommet."
        },
        () => {
            filePCC.textContent = ""
            sommetPCC.textContent = "A"
            pPCC.textContent = "On défile un sommet."
        },
        () => {
            document.getElementById("BPCC").style.fill = vert
            filePCC.textContent = "B"
            ajouterDictionnairePCC("B : [A, B]")
            pPCC.textContent = "On traite un des successeurs de A non colorié en vert : le sommet B."
        },
        () => {
            document.getElementById("CPCC").style.fill = vert
            filePCC.textContent = "B, C"
            ajouterDictionnairePCC("C : [A, C]")
            pPCC.textContent = "On traite un des successeurs de A non colorié en vert : le sommet C."
        },
        () => {
            document.getElementById("DPCC").style.fill = vert
            filePCC.textContent = "B, C, D"
            ajouterDictionnairePCC("D : [A, D]")
            pPCC.textContent = "On traite un des successeurs de A non colorié en vert : le sommet D."
        },
        () => {
            filePCC.textContent = "C, D"
            sommetPCC.textContent = "B"
            pPCC.textContent = "A n'a plus de successeur encore rouge, on défile un sommet."
        },
        () => {
            filePCC.textContent = "D"
            sommetPCC.textContent = "C"
            pPCC.textContent = "B n'a aucun successeur encore rouge, on défile un sommet."
        },
        () => {
            document.getElementById("FPCC").style.fill = vert
            filePCC.textContent = "D, F"
            ajouterDictionnairePCC("F : [A, C, F]")
            pPCC.textContent = "On traite un des successeurs de C non colorié en vert : le sommet F."
        },
        () => {
            filePCC.textContent = "F"
            sommetPCC.textContent = "D"
            pPCC.textContent = "C n'a plus de successeur encore rouge, on défile un sommet."
        },
        () => {
            document.getElementById("EPCC").style.fill = vert
            filePCC.textContent = "F, E"
            ajouterDictionnairePCC("E : [A, D, E]")
            pPCC.textContent = "On traite un des successeurs de D non colorié en vert : le sommet E."
        },
        () => {
            filePCC.textContent = "E"
            sommetPCC.textContent = "F"
            pPCC.textContent = "D n'a plus de successeur encore rouge, on défile un sommet."
        },
        () => {
            document.getElementById("GPCC").style.fill = vert
            filePCC.textContent = "E, G"
            ajouterDictionnairePCC("G : [A, C, F, G]")
            pPCC.textContent = "On traite un des successeurs de F non colorié en vert : le sommet G."
        },
        () => {
            filePCC.textContent = "G"
            sommetPCC.textContent = "E"
            pPCC.textContent = "F n'a plus de successeur encore rouge, on défile un sommet."
        },
        () => {
            filePCC.textContent = ""
            sommetPCC.textContent = "G"
            pPCC.textContent = "E n'a aucun successeur encore rouge, on défile un sommet."
        },
        () => {
            filePCC.textContent = ""
            sommetPCC.textContent = ""
            pPCC.textContent = "Il n'y a plus de sommets à défiler, le parcours est terminé"
        },
    ]
    if (noPCC < modifs.length) {
        modifs[noPCC]()
        noPCC += 1
    }
}

function animPredPCC(event) {
    if (noPCC > 0) {
        const j = noPCC -1 
        setUpPCC(null)
        for (let i = 0 ; i < j ; i++) {
            animPCC(null)
        }
    }
}

function setUpDijkstra(event) {
    noDijkstra = 0
    const noms = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    noms.forEach(nom => {
        const S = document.getElementById(nom+"Dijkstra")
        S.style.fill = "white"
        noms.forEach(n => {document.getElementById(nom+n).textContent = ""})
    })
    pDijkstra.textContent = ""
}

function animDijkstra(event) {
    console.log("Dijkstra")
    const modifs = [
        () => {
            const noms = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
            noms.forEach(nom => {
                const S = document.getElementById(nom+"Dijkstra")
                S.style.fill = rouge
            })
            pDijkstra.textContent = "Tous les sommets sont coloriés en rouge."
        },
        () => {
            pDijkstra.textContent = "Le sommet A est ajouté au tableau : distance 0 en passant par A. Les autres lignes de la colonne A sont bloquées."
            document.getElementById('AA').textContent = "0.A";
            const noms = ['B', 'C', 'D', 'E', 'F', 'G']
            noms.forEach(nom => {
                document.getElementById(nom+'A').textContent = "/"
            })
            document.getElementById("ADijkstra").style.fill = vert
        },
        () => {
            pDijkstra.textContent = "La ligne est complétée par les distances avec tous les successeurs de A."
            document.getElementById('AB').textContent = "4.A";
            document.getElementById('AC').textContent = "3.A";
            document.getElementById('AD').textContent = "2.A";
            document.getElementById("BDijkstra").style.fill = orange
            document.getElementById("CDijkstra").style.fill = orange
            document.getElementById("DDijkstra").style.fill = orange
        },
        () => {
            pDijkstra.textContent = "Parmi les sommets orange, on cherche le plus proche de A. Il s'agît du sommet D à une distance égale à 2."
        },
        () => {
            pDijkstra.textContent = "Le sommet D est ajouté au tableau : distance 2 en passant par A. Les autres lignes de la colonne D sont bloquées."
            document.getElementById('BD').textContent = "2.A";
            const noms = ['C', 'D', 'E', 'F', 'G']
            noms.forEach(nom => {
                document.getElementById(nom+'D').textContent = "/"
            })
            document.getElementById("DDijkstra").style.fill = vert
        },
        () => {
            pDijkstra.textContent = "La ligne est complétée par les distances entre A et chaque successeur de D, en passant par D."
            document.getElementById('BB').textContent = "7.D";
            document.getElementById('BC').textContent = "5.D";
            document.getElementById('BF').textContent = "6.D";
            document.getElementById("FDijkstra").style.fill = orange
        },
        () => {
            pDijkstra.textContent = "Parmi les sommets orange, on cherche le plus proche de A. Il s'agît du sommet C à une distance égale à 3."
        },
        () => {
            pDijkstra.textContent = "Le sommet C est ajouté au tableau : distance 3 en passant par A. Les autres lignes de la colonne C sont bloquées."
            document.getElementById('CC').textContent = "3.A";
            const noms = ['D', 'E', 'F', 'G']
            noms.forEach(nom => {
                document.getElementById(nom+'C').textContent = "/"
            })
            document.getElementById("CDijkstra").style.fill = vert
        },
        () => {
            pDijkstra.textContent = "La ligne est complétée par les distances entre A et chaque successeur de C, en passant par C."
            document.getElementById('CE').textContent = "7.C";
            document.getElementById('CF').textContent = "5.C";
            document.getElementById("EDijkstra").style.fill = orange
        },
        () => {
            pDijkstra.textContent = "Parmi les sommets orange, on cherche le plus proche de A. Il s'agît du sommet B à une distance égale à 4."
        },
        () => {
            pDijkstra.textContent = "Le sommet B est ajouté au tableau : distance 4 en passant par A. Les autres lignes de la colonne B sont bloquées."
            document.getElementById('DB').textContent = "4.A";
            const noms = ['E', 'F', 'G']
            noms.forEach(nom => {
                document.getElementById(nom+'B').textContent = "/"
            })
            document.getElementById("BDijkstra").style.fill = vert
        },
        () => {
            pDijkstra.textContent = "La ligne est complétée par les distances entre A et chaque successeur de B, en passant par B."
        },
        () => {
            pDijkstra.textContent = "Parmi les sommets orange, on cherche le plus proche de A. Il s'agît du sommet F à une distance égale à 5 en passant par C."
        },
        () => {
            pDijkstra.textContent = "Le sommet F est ajouté au tableau : distance 5 en passant par C. Les autres lignes de la colonne F sont bloquées."
            document.getElementById('EF').textContent = "5.C";
            const noms = ['F', 'G']
            noms.forEach(nom => {
                document.getElementById(nom+'F').textContent = "/"
            })
            document.getElementById("FDijkstra").style.fill = vert
        },
        () => {
            pDijkstra.textContent = "La ligne est complétée par les distances entre A et chaque successeur de F, en passant par F."
            document.getElementById('EE').textContent = "10.F";
            document.getElementById('EG').textContent = "9.F";
            document.getElementById("GDijkstra").style.fill = orange
        },
        () => {
            pDijkstra.textContent = "Parmi les sommets orange, on cherche le plus proche de A. Il s'agît du sommet E à une distance égale à 7 en passant par C."
        },
        () => {
            pDijkstra.textContent = "Le sommet E est ajouté au tableau : distance 7 en passant par C. La dernière ligne de la colonne E est bloquée."
            document.getElementById('FE').textContent = "7.C";
            document.getElementById('GE').textContent = "/"
            document.getElementById("EDijkstra").style.fill = vert
        },
        () => {
            pDijkstra.textContent = "La ligne est complétée par les distances entre A et chaque successeur de E, en passant par E."
            document.getElementById('FG').textContent = "8.E";
        },
        () => {
            pDijkstra.textContent = "Parmi les sommets orange, on cherche le plus proche de A. Il s'agît du sommet G à une distance égale à 8 en passant par E."
        },
        () => {
            pDijkstra.textContent = "Le sommet G est ajouté au tableau : distance 8 en passant par E."
            document.getElementById('GG').textContent = "8.E";
            document.getElementById("GDijkstra").style.fill = vert
        },
        () => {
            pDijkstra.textContent = "Il n'y a plus de sommets orange, le parcours est terminé."
        },
        () => {
            pDijkstra.textContent = "On peut maintenant établir le plus cours chemin pour rejoindre un sommet en partant de A."
        },
        () => {
            pDijkstra.innerHTML = "Par exemple pour rejoindre G :<ul><li>la colonne de G nous dit qu'il faut passer par E</li><li>la colonne de E nous dit qu'il faut passer par C</li><li>la colonne de C nous dit qu'il faut passer par A</li></ul>Le plus cours chemin est donc A ; C ; E ; G pour une distance totale de 8."
        },
    ]
    if (noDijkstra < modifs.length) {
        modifs[noDijkstra]()
        noDijkstra += 1
    }
}

function animPredDijkstra(event) {
    if (noDijkstra > 0) {
        const j = noDijkstra - 1
        setUpDijkstra(null)
        for (let i = 0 ; i < j ; i++) {
            animDijkstra(null)
        }
    }
}

suivantPCC.addEventListener("click", animPCC)
precedentPCC.addEventListener("click", animPredPCC)
resetPCC.addEventListener("click", setUpPCC)
suivantDijkstra.addEventListener("click", animDijkstra)
precedentDijkstra.addEventListener("click", animPredDijkstra)
resetDijkstra.addEventListener("click", setUpDijkstra)

setUpPCC(null)
setUpDijkstra(null)
