const btnNext = document.getElementById("next")
const btnPrev = document.getElementById("prev")
const pLvl1 = document.getElementById("lvl1")
const pLvl2 = document.getElementById("lvl2")
const pLvl3 = document.getElementById("lvl3")
const pLvl4 = document.getElementById("lvl4")
const pLvl5 = document.getElementById("lvl5")
var etape = 1

pLvl2.style.visibility = "hidden"
pLvl3.style.visibility = "hidden"
pLvl4.style.visibility = "hidden"
pLvl5.style.visibility = "hidden"
btnNext.style.visibility = "visible"

function next(event) {
    btnPrev.style.visibility = "visible"
    const pList = [pLvl1, pLvl2, pLvl3, pLvl4, pLvl5]
    const texts = ["maximum([10, 8, 4, 9, 7]) = max(10, 9) = 10", "maximum([8, 4, 9, 7]) = max(8, 9) = 9", "maximum([4, 9, 7]) = max(4, 9) = 9", "maximum([9, 7]) = max(9, 7) = 9", "maximum([7]) = 7"]
    if (etape < 5) {
        pList[etape].style.visibility = "visible"
    } else {
        pList[9-etape].textContent = texts[9-etape]
    }
    if (etape == 9) {
        btnNext.style.visibility = "hidden"
    }
    etape += 1
}

function prev(event) {
    btnNext.style.visibility = "visible"
    const pList = [pLvl1, pLvl2, pLvl3, pLvl4, pLvl5]
    const texts = ["maximum([10, 8, 4, 9, 7])", "maximum([8, 4, 9, 7])", "maximum([4, 9, 7])", "maximum([9, 7])", "maximum([7])"]
    etape -= 1
    if (etape == 1) {
        btnPrev.style.visibility = "hidden"
    }
    if (etape < 5) {
        pList[etape].style.visibility = "hidden"
    } else {
        pList[9-etape].textContent = texts[9-etape]
    }
}

btnNext.addEventListener("click", next)
btnPrev.addEventListener("click", prev)
