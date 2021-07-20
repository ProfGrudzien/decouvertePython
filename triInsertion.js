const tapis = document.querySelector(".tapis")
const pErreur = document.querySelector(".erreur")
const btnVerifier = document.getElementById("btnVerifier")
const couleurs = ["pique", "coeur", "trefle", "carreaux"]
const symboles = {"pique":"♠", "coeur":"♥", "trefle":"♣", "carreaux":"♦"}
const listeCartes = []
const cartesTirees = []
var nb_triee = 1
var choisirCarte = true
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

function choixCarte(carte) {
    if (carte.id == nb_triee) {
        pErreur.textContent = ""
        carte.classList.add("levee")
        carteChoisie = carte
        choisirCarte = false
        document.querySelector(".consigne").textContent = "Choisir l'endroit où insérer cette carte."
    } else {
        pErreur.textContent = "Ce n'est pas la première carte de la partie non triée !"
    }
}

function checkValeurs(sep) {
    if (sep.id=="sep-0") {
        const next = sep.nextElementSibling
        return(carteChoisie.valeur <= next.valeur)
    } else if (sep.id=="sep-10") {
        const prev =  sep.previousElementSibling
        return(carteChoisie.valeur >= prev.valeur)
    } else {
        const next = sep.nextElementSibling
        const prev = sep.previousElementSibling
        return(carteChoisie.valeur <= next.valeur && carteChoisie.valeur >= prev.valeur)
    }
}

function choixEspace(sep) {
    if (sep.id.split('-')[1] > carteChoisie.id) {
        pErreur.textContent = "Il faut insérer la carte dans la partie triée !"
    } else if (checkValeurs(sep)) {
        pErreur.textContent = ""
        carteChoisie.classList.remove("levee")
        insertionCarte(carteChoisie, sep.id.split("-")[1])
        nb_triee += 1
        document.querySelector(".consigne").textContent = "Cliquer pour sélectionner une carte."
        choisirCarte = true
        carteChoisie = null
        if (nb_triee == 10) {
            choisirCarte = false
            pErreur.style.color = "green"
            pErreur.textContent = "Félicitations, la liste est triée."
            document.querySelector(".consigne").textContent = ""
        }
    } else {
        pErreur.textContent = "Ce n'est pas le bon emplacement !"
    }
}

function insertionCarte(carte, n) {
    const valeur = carte.valeur
    const couleur = carte.couleur
    let i = carte.id
    while (i>n) {
        const dest = document.getElementById(i)
        const model = document.getElementById(i-1)
        dessinerCarte([model.valeur, model.couleur], dest)
        i -= 1
    }
    dessinerCarte([valeur, couleur], document.getElementById(n))
    document.getElementById(nb_triee).className = "carte triee"
    
}

function handleClick(event) {
    if (choisirCarte) {
        if (event.target.classList[0] == "carte") {
            choixCarte(event.target)
        } else if (event.target.parentNode.classList[0] == "carte") {
            choixCarte(event.target.parentNode)
        }
    } else {
        if (carteChoisie && event.target.className == "sep") {
            choixEspace(event.target)
        }
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
    if (inputComparaisonsMin.value.replace(/ /g, "") == "k") {
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
