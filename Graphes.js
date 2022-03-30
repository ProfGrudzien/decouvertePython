const rouge = "#f1948a"
const vert = "#58d68d"

function sommet(ctx, x, y, couleur, label) {
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = couleur;
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(label, x-3.5, y+3.5)
    ctx.stroke();
}

const canvasPCC = document.getElementById('PCC');
const btnPCC = document.getElementById('btnPCC');
const divPCC = document.getElementById('divPCC');
const filePCC = document.getElementById('filePCC');
const sommetPCC = document.getElementById('sommetPCC');
const resetPCC = document.getElementById('resetPCC');
var noPCC = 0

function setUpPCC(event) {
    if (canvasPCC.getContext){
        var ctx = canvasPCC.getContext('2d');
        noPCC = 0
        if (event == null) {
            const scaleFactor = 4
            canvasPCC.width = Math.ceil(canvasPCC.width * scaleFactor);
            canvasPCC.height = Math.ceil(canvasPCC.height * scaleFactor);
            ctx.scale(scaleFactor, scaleFactor);
        }
        ctx.beginPath();
        ctx.moveTo(50, 60);
        ctx.lineTo(50, 100);
        ctx.lineTo(100, 100);
        ctx.lineTo(160, 100);
        ctx.lineTo(220, 80);
        ctx.lineTo(150, 60);
        ctx.lineTo(100, 50);
        ctx.lineTo(50, 60);
        ctx.lineTo(100, 100);
        ctx.lineTo(100, 50);
        ctx.lineTo(160, 100);
        ctx.lineTo(150, 60);
        ctx.stroke();
        sommet(ctx,50,60,"white","A")
        sommet(ctx,50,100,"white","B")
        sommet(ctx,100,100,"white","C")
        sommet(ctx,100,50,"white","D")
        sommet(ctx,150,60,"white","E")
        sommet(ctx,160,100,"white","F")
        sommet(ctx,220,80,"white","G")
        divPCC.innerHTML = "<p>Dictionnaire :</p>"
        filePCC.textContent = ""
        sommetPCC.textContent = ""
    } else {
        canvasPCC.textContent = 'Canvas non supporté par ce navigateur.'
    }
}

function animPCC(event) {
    var ctx = canvasPCC.getContext('2d');
    const modifs = [
        () => {
            sommet(ctx,50,60,rouge,"A")
            sommet(ctx,50,100,rouge,"B")
            sommet(ctx,100,100,rouge,"C")
            sommet(ctx,100,50,rouge,"D")
            sommet(ctx,150,60,rouge,"E")
            sommet(ctx,160,100,rouge,"F")
            sommet(ctx,220,80,rouge,"G")
        },
        () => {
            sommet(ctx,50,60,vert,"A")
            filePCC.textContent = "A"
            const p = document.createElement("p")
            p.textContent += "A : [A]"
            p.style.paddingLeft = "20px"
            p.style.margin = "0px"
            divPCC.appendChild(p)
        },
        () => {
            filePCC.textContent = ""
            sommetPCC.textContent = "A"
        },
        () => {
            sommet(ctx,50,100,vert,"B")
            filePCC.textContent = "B"
            const p = document.createElement("p")
            p.textContent += "B : [A, B]"
            p.style.paddingLeft = "20px"
            p.style.margin = "0px"
            divPCC.appendChild(p)
        },
        () => {
            sommet(ctx,100,100,vert,"C")
            filePCC.textContent = "B, C"
            const p = document.createElement("p")
            p.textContent += "C : [A, C]"
            p.style.paddingLeft = "20px"
            p.style.margin = "0px"
            divPCC.appendChild(p)
        },
        () => {
            sommet(ctx,100,50,vert,"D")
            filePCC.textContent = "B, C, D"
            const p = document.createElement("p")
            p.textContent += "D : [A, D]"
            p.style.paddingLeft = "20px"
            p.style.margin = "0px"
            divPCC.appendChild(p)
        },
        () => {
            filePCC.textContent = "C, D"
            sommetPCC.textContent = "B"
        },
        () => {
            filePCC.textContent = "D"
            sommetPCC.textContent = "C"
        },
        () => {
            sommet(ctx,160,100,vert,"F")
            filePCC.textContent = "D, F"
            const p = document.createElement("p")
            p.textContent += "F : [A, C, F]"
            p.style.paddingLeft = "20px"
            p.style.margin = "0px"
            divPCC.appendChild(p)
        },
        () => {
            filePCC.textContent = "F"
            sommetPCC.textContent = "D"
        },
        () => {
            sommet(ctx,150,60,vert,"E")
            filePCC.textContent = "F, E"
            const p = document.createElement("p")
            p.textContent += "E : [A, D, E]"
            p.style.paddingLeft = "20px"
            p.style.margin = "0px"
            divPCC.appendChild(p)
        },
        () => {
            filePCC.textContent = "E"
            sommetPCC.textContent = "F"
        },
        () => {
            sommet(ctx,220,80,vert,"G")
            filePCC.textContent = "E, G"
            const p = document.createElement("p")
            p.textContent += "G : [A, C, F, G]"
            p.style.paddingLeft = "20px"
            p.style.margin = "0px"
            divPCC.appendChild(p)
        },
        () => {
            filePCC.textContent = "G"
            sommetPCC.textContent = "E"
        },
        () => {
            filePCC.textContent = ""
            sommetPCC.textContent = "G"
        },
    ]
    if (noPCC < modifs.length) {
        modifs[noPCC]()
        noPCC += 1
    }
}

btnPCC.addEventListener("click", animPCC)
resetPCC.addEventListener("click", setUpPCC)

setUpPCC(null)
