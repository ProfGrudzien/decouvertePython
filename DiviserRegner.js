var index = 0
const etapes = []
const pile = []
const divPile = document.getElementById("pile")
const btnPrev = document.getElementById("btn-prev")
const btnNext = document.getElementById("btn-next")
const range = document.getElementById("index")
btnNext.addEventListener("click", next)
btnPrev.addEventListener("click", prev)
range.addEventListener("input", changeRange)
function lastElement(liste) {
    if (liste.length == 0) {
        return null
    } else {
        return liste[liste.length - 1]
    }
}
function changeRange(event) {
    index = range.value
    afficher(index)
}
function next(event) {
    index++
    afficher(index)
}
function prev(event) {
    index--
    afficher(index)
}
function afficher(i) {
    if (i<0) {
        index = 0
    } else if (i >= etapes.length) {
        index = etapes.length - 1
    } else {
        document.getElementById("nbComparaisons").textContent = etapes[i].nbComparaisons
        for(col=0; col<16; col++) {
            for(row=0; row<5; row++) {
                const td = document.getElementById(`${row}-${col}`)
                td.textContent = etapes[i].valeurs[`${row}-${col}`]
                td.className = etapes[i].classes[`${row}-${col}`]
            }
        }
        divPile.innerHTML = ""
        if (!etapes[i].out && i>0 && etapes[i].pile.length < etapes[i-1].pile.length) {
            var p = document.createElement('p')
            p.textContent = etapes[i-1].pile[etapes[i-1].pile.length-1]
            p.className = "depile"
            divPile.appendChild(p)
        }
        var p = document.createElement('p')
        p.textContent = etapes[i].pile[etapes[i].pile.length-1]
        if (i==0) {
            p.className = "empile"
        } else if (etapes[i].out) {
            p.className = "depile"
        } else if (etapes[i-1].out || etapes[i].pile.length > etapes[i-1].pile.length) {
            p.className = "empile"
        }
        divPile.appendChild(p)
        for (k=etapes[i].pile.length-2; k>=0; k--) {
            const p = document.createElement('p')
            p.textContent = etapes[i].pile[k]
            divPile.appendChild(p)
        }
        p = document.createElement('p')
        p.textContent = "Pile d’appels récursifs"
        p.className = "centrer"
        divPile.appendChild(p)
    }
    range.value = index
}
function nouvelleEtape() {
    const e = {nbComparaisons:0, valeurs:{}, classes:{}, pile:JSON.parse(JSON.stringify(pile)), out: false}
    if (etapes.length == 0) {
        for(col=0; col<16; col++) {
            for(row=0; row<5; row++) {
                e.valeurs[`${row}-${col}`] = ""
                e.classes[`${row}-${col}`] = ""
            }
        }
    } else {
        const last = etapes[etapes.length-1]
        e.nbComparaisons = last.nbComparaisons
        e.valeurs = JSON.parse(JSON.stringify(last.valeurs))
        e.classes = JSON.parse(JSON.stringify(last.classes))
    }
    etapes.push(e)
    return e
}

function fusion(L1, L2, row, col_0) {
    const e = nouvelleEtape()
    var i = 0
    var j = 0
    const L = new Array(L1.length + L2.length);
    while (i < L1.length && j < L2.length) {  
        if (L1[i] < L2[j]) {  
            L[i+j] = L1[i];  
            i++;  
        } else {  
            L[i+j] = L2[j];
            j++;
        }
        e.nbComparaisons += 1
    }  
    while (i < L1.length) {  
        L[i+j] = L1[i];
        i++;  
    }  
    while (j < L2.length) {  
        L[i+j] = L2[j];
        j++;
    }
    e.out = true
    for (col=0; col<L.length; col++) {
        e.valeurs[`${row}-${col+col_0}`] = L[col]
        e.valeurs[`${row+1}-${col+col_0}`] = ""
        e.classes[`${row}-${col+col_0}`] = "green"
    }
    return L
}
function tri(L, row, col_0, left) {
    pile.push(`tri([${L.join(', ')}])`)
    var e = nouvelleEtape()
    if (left) {
        e.classes[`${row-1}-${col_0+L.length-1}`] += " cut_left"
        e.classes[`${row-1}-${col_0+L.length}`] += " cut_right"
        e = nouvelleEtape()
    }
    for (col=0; col<L.length; col++) {
        e.valeurs[`${row}-${col+col_0}`] = L[col]
    }
    if (L.length == 1) {
        e = nouvelleEtape()
        e.classes[`${row}-${col_0}`] = "green"
        e.out = true
        pile.pop()
        return L
    } else {
        const L1 = tri(L.slice(0,L.length/2), row+1, col_0, true);
        const L2 = tri(L.slice(L.length/2), row+1, col_0+L.length/2, false);
        const R = fusion(L1, L2, row, col_0)
        
        pile.pop()
        return R
    }
}
tri([11, -4, 14, -3, 8, 18, -3, 11, 13, 13, 15, 6, 1, 8, 2, 15], 0, 0, false)
pile.pop()
nouvelleEtape()
range.max = etapes.length - 1
afficher(0)
