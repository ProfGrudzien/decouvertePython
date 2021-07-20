const tapis = document.querySelector(".tapis")
const pErreur = document.querySelector(".erreur")
const btnVerifier = document.getElementById('btnVerifier')
const couleurs = ["pique", "coeur", "trefle", "carreaux"]
const symboles = {"pique":"♠", "coeur":"♥", "trefle":"♣", "carreaux":"♦"}
const listeCartes = []
const cartesTirees = []
var nb_triee = 0
var fonction = choix_min
var carteChoisie = null

function dessinerCarte(carte, div) {
    Array.from(div.children).forEach(c => c.remove())
    const [valeur, couleur] = carte
    const pUp = document.createElement("p")
    pUp.className = `carte-haut ${(couleur == "pique" || couleur == "trefle") ? "noir" : "rouge"}`
    pUp.textContent = valeur + symboles[couleur]
    div.appendChild(pUp)
    
    const pCentre = document.createElement("p")
    pCentre.className = `carte-centre ${(couleur == "pique" || couleur == "trefle") ? "noir" : "rouge"}`
    pCentre.textContent = symboles[couleur]
    div.appendChild(pCentre)
    
    const pDown = document.createElement("p")
    pDown.className = `carte-bas ${(couleur == "pique" || couleur == "trefle") ? "noir" : "rouge"}`
    pDown.textContent = valeur + symboles[couleur]
    div.appendChild(pDown)
    
    div.valeur = valeur
    div.couleur = couleur
}

function choix_min(carte) {
    const cartesNonTriees = Array.from(tapis.children).filter(c => c.id >= nb_triee).map(c => parseInt(c.valeur))
    if (carte.valeur == Math.min(...cartesNonTriees)) {
        pErreur.textContent = ""
        carte.classList.add("levee")
        carteChoisie = carte
        fonction = choix_echange
    } else {
        pErreur.textContent = "Ce n'est pas la plus petite valeur de la partie non triée !"
    }
}

function choix_echange(carte) {
    if (carte.id == nb_triee) {
        pErreur.textContent = ""
        carteChoisie.classList.remove("levee")
        echangeCartes(carte, carteChoisie)
        carte.className = "carte triee"
        nb_triee += 1
        if (nb_triee < 9) {
            fonction = choix_min
        } else {
            document.getElementById("9").className = "carte triee"
            pErreur.style.color = "green"
            pErreur.textContent = "Félicitations, la liste est triée."
            document.querySelector(".consigne").textContent = ""
            fonction = (carte) => {}
        }
    } else {
        pErreur.textContent = "Ce n'est pas la première carte de la partie non triée !"
    }
}

function echangeCartes(carte1, carte2) {
    const valeur = carte1.valeur
    const couleur = carte1.couleur
    dessinerCarte([carte2.valeur, carte2.couleur], carte1)
    dessinerCarte([valeur, couleur], carte2)
}

function handleClick(event) {
    if (event.target.classList[0] == "carte") {
        fonction(event.target)
    } else if (event.target.parentNode.classList[0] == "carte") {
        fonction(event.target.parentNode)
    }
}

function verifier(event) {
    const inputEchanges = document.getElementById("nbEchanges")
    const spanEchanges = inputEchanges.nextElementSibling
    if (inputEchanges.value.replace(/ /g, "") == "n-1") {
        spanEchanges.textContent = "Vrai !"
        spanEchanges.className = "vert"
    } else {
        spanEchanges.textContent = "Faux !"
        spanEchanges.className = "rouge"
    }
    const inputComparaisonsMin = document.getElementById("nbComparaisonsMin")
    const spanComparaisonsMin = inputComparaisonsMin.nextElementSibling
    if (inputComparaisonsMin.value.replace(/ /g, "") == "k-1") {
        spanComparaisonsMin.textContent = "Vrai !"
        spanComparaisonsMin.className = "vert"
    } else {
        spanComparaisonsMin.textContent = "Faux !"
        spanComparaisonsMin.className = "rouge"
    }
    const inputComparaisons = document.getElementById("nbComparaisons")
    const spanComparaisons = inputComparaisons.nextElementSibling
    if (["n*(n-1)/2", "n(n-1)/2", "(n²-n)/2", "(n^2-n)/2", "(n*n-n)/2"].indexOf(inputComparaisons.value.replace(/ /g, "")) == -1) {
        spanComparaisons.textContent = "Faux !"
        spanComparaisons.className = "rouge"
    } else {
        spanComparaisons.textContent = "Vrai !"
        spanComparaisons.className = "vert"
    }
}

while (listeCartes.length < 10) {
    const valeur = Math.floor(2+Math.random()*8)
    const couleur = couleurs[Math.floor(Math.random() * 4)]
    if (cartesTirees.indexOf(valeur+couleur)==-1) {
        cartesTirees.push(valeur+couleur)
        listeCartes.push([valeur, couleur])
    }
}

for (let i=0; i<10; i++) {
    const div = document.getElementById(i)
    dessinerCarte(listeCartes[i], div)
}

tapis.addEventListener("click", handleClick)
btnVerifier.addEventListener("click", verifier)
