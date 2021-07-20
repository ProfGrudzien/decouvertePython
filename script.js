function copier(event) {
    if (event.target.className=="copier") {
      function listener(e) {
        e.clipboardData.setData("text/plain", txt);
        e.preventDefault();
      }
      const str = event.target.parentNode.children[1].textContent
      const lst = str.split("\n").slice(1, -1).map(str => str.replace(/^[ ]*/gm, '')).map(str => str.split(' ').join(' '))
      const txt = lst.join("\n")
      document.addEventListener("copy", listener);
      document.execCommand("copy");
      document.removeEventListener("copy", listener);
    }
};

document.addEventListener("click", copier)
