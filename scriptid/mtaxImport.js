//Pea elemendid
const abiNupp = document.getElementById("abiBtn");
const puuliigitiNupp = document.getElementById("puuliigitiNupp");
const keskmineNupp = document.getElementById("keskmineNupp");
const koguKehaPl = document.getElementById("koguKehaPl");
const koguKehaKesk = document.getElementById("koguKehaKesk");
//Puuliigiti elemendid - kokkuarvutamine
const liigitiEnamusPlk = document.getElementById("liigitiEnamusPlk");
const liigitiInputPind = document.getElementById("liigitiInputPind");
const liigitiGkokku = document.getElementById("liigitiGkokku");
const liigitiTkokku = document.getElementById("liigitiTkokku");
const liigitiMkokkuHa = document.getElementById("liigitiMkokkuHa");
const liigitiMkokkuPind = document.getElementById("liigitiMkokkuPind");
const liigitiKooseis = document.getElementById("liigitiKooseis");
//Keskmine elemendid - kokkuarvutamine
const keskEnamusPlk = document.getElementById("keskEnamusPlk");
const keskInputPind = document.getElementById("keskInputPind");
const keskGkokku = document.getElementById("keskGkokku");
const keskTkokku = document.getElementById("keskTkokku");
const keskMkokkuHa = document.getElementById("keskMkokkuHa");
const keskMkokkuPind = document.getElementById("keskMkokkuPind");
const keskKooseis = document.getElementById("keskKooseis");
//Puuliigiti - Lisa puuliigi paneel nupp
const liigitiLisapuuBtn = document.getElementById("liigitiLisapuuBtn");
//Keskmine - Lisa puuliigi paneel nupp
const keskLisapuuBtn = document.getElementById("keskLisapuuBtn");
//Puuliigiti puuliigi peakonteiner, kus asuvad arvuta kokku nupud ja puuliigi konteiner
const liigitiValipuuMainCont = document.getElementById(
  "liigitiValipuuMainCont",
);
//Keskmine puuliigi peakonteiner, kus asuvad arvuta kokku nupud ja puuliigi konteiner
const keskValipuuMainCont = document.getElementById("keskValipuuMainCont");
//Puuliigiti konteiner, kus puuliigi paneel/paneelid
const liigitiValiPuuContainer = document.getElementById(
  "liigitiValiPuuContainer",
);
//Keskmine konteiner, kus puuliigi paneel/paneelid
const keskValiPuuContainer = document.getElementById("keskValiPuuContainer");
//Puuliigiti paneel, kus asuvad puuliigi andmed
const liigitiValiPuuPanel = document.querySelector(".valiLiigitiPuuPanel");
//Keskmine paneel, kus asuvad puuliigi andmed
const keskValiPuuPanel = document.querySelector(".valiKeskPuuPanel");
const liigitiValiPuuContent = liigitiValiPuuPanel.innerHTML;
const keskValiPuuContent = keskValiPuuPanel.innerHTML;

//Puuliigiti arvuta kokku ja tühista nupud
const liigitiTuhistaBtn = document.getElementById("liigitiTuhistaBtn");
const liigitiArvutaKokkuBtn = document.getElementById("liigitiArvutaKokkuBtn");
const liigitiAlgusesseBtn = document.getElementById("liigitiAlgusesseBtn");
//Keskmine arvuta kokku ja tühista nupud
const keskTuhistaBtn = document.getElementById("keskTuhistaBtn");
const keskArvutaKokkuBtn = document.getElementById("keskArvutaKokkuBtn");
const keskAlgusesseBtn = document.getElementById("keskAlgusesseBtn");
// indeksid data objekti sisenemiseks
const hIndex = 0;
const mIndex = 1;
const gIndex = 2;
// listid puuliigiti andmete kokku arvutamiseks
const liigitiGlist = [];
const liigitiMlist = [];
const liigitiTlist = [];
const liigitiPuulist = [];
const keskPuuList = [];
const keskKoefList = [];
const keskHlist = [];
//piirab puuliigi paneelide arvu konteineris
let puuliigitiCount = 0;
let keskCount = 0;
let keskpuudOnkinnitatud = true;
// data import
import { standardData as data } from "./mtaxExport.js";

//tühjenda alguses puuliigi konteiner
function removeLiigitiContainerPanels() {
  liigitiValiPuuContainer.innerHTML = "";
}
function removeKeskContainerPanels() {
  const inputs = document.querySelectorAll("Inputs");
  keskValiPuuContainer.innerHTML = "";
  keskpuudOnkinnitatud = true;
}
function restoreAllStyleChanges() {
  document.querySelectorAll("input").forEach((input) => {
    input.style.borderColor = "rgb(110, 106, 84)";
  });
}
function restoreHead() {
  koguKehaPl.style.visibility = "hidden";
  koguKehaKesk.style.visibility = "hidden";
  keskmineNupp.disabled = false;
  puuliigitiNupp.disabled = false;
  abiNupp.disabled = false;
}
removeLiigitiContainerPanels();
removeKeskContainerPanels();

//Algsätted nuppudele ja paneelidele mis peidetud või varjatud
koguKehaPl.style.visibility = "hidden";
koguKehaKesk.style.visibility = "hidden";
liigitiTuhistaBtn.disabled = true;
liigitiArvutaKokkuBtn.disabled = true;
liigitiAlgusesseBtn.disabled = true;
keskTuhistaBtn.disabled = true;
keskArvutaKokkuBtn.disabled = true;
keskAlgusesseBtn.disabled = true;

//põhifunktsioonid

function is_number_and_notNotEmpty(inp) {
  if (inp === "") return false;
  /* let regex = new RegExp(/[^0-9]/, "g");  täisnumber*/
  let regex = new RegExp(/[^0-9]*(\.[^0-9])/, "g"); //float punktiga
  return inp.match(regex) === null;
}
function is_fullNumber_and_notNotEmpty(inp) {
  if (inp === "") return false;
  let regex = new RegExp(/[^0-9]/, "g");
  return inp.match(regex) === null;
}
// Kui input väli on tühi
function validateField(field) {
  if (!field.validity.valid) {
    field.style.borderColor = "red";
    return false;
  }
  field.style.borderColor = "rgb(110, 106, 84)";
  return true;
}

function resetLiigitiData() {
  puuliigitiCount = 0;
  liigitiTuhistaBtn.disabled = true;
  liigitiArvutaKokkuBtn.disabled = true;
  liigitiAlgusesseBtn.disabled = true;
  liigitiGlist.splice(0, liigitiGlist.length);
  liigitiMlist.splice(0, liigitiMlist.length);
  liigitiTlist.splice(0, liigitiTlist.length);
  liigitiPuulist.splice(0, liigitiPuulist.length);
  liigitiEnamusPlk.textContent = "";
  liigitiInputPind.value = "0";
  liigitiGkokku.textContent = "";
  liigitiTkokku.textContent = "";
  liigitiMkokkuHa.textContent = "";
  liigitiMkokkuPind.textContent = "";
  liigitiKooseis.textContent = "";
}
function resetKeskData() {
  keskCount = 0;
  keskTuhistaBtn.disabled = true;
  keskArvutaKokkuBtn.disabled = true;
  keskAlgusesseBtn.disabled = true;
  keskPuuList.splice(0, keskPuuList.length);
  keskKoefList.splice(0, keskKoefList.length);
  keskHlist.splice(0, keskHlist.length);
  keskEnamusPlk.textContent = "";
  keskInputPind.value = "0";
  keskGkokku.value = "0";
  keskTkokku.textContent = "";
  keskMkokkuHa.textContent = "";
  keskMkokkuPind.textContent = "";
  keskKooseis.textContent = "";
}
function renderPuuliigiti(e) {
  e.target.disabled = true;
  keskmineNupp.disabled = true;
  abiNupp.disabled = true;
  koguKehaPl.style.order = "2";
  koguKehaKesk.style.order = "3";
  koguKehaPl.style.visibility = "visible";
}
function renderKeskmine(e) {
  e.target.disabled = true;
  puuliigitiNupp.disabled = true;
  abiNupp.disabled = true;
  koguKehaKesk.style.order = "2";
  koguKehaPl.style.order = "3";
  koguKehaKesk.style.visibility = "visible";
}
function renderplkData(plk, h, g, t, m) {
  data.forEach((elem) => {
    if (elem[plk]) {
      if (elem[plk][hIndex] == h) {
        liigitiPuulist.push(plk);
        liigitiGlist.push(Number(g));
        const standardM = elem[plk][mIndex];
        const inputG = g;
        const standardG = elem[plk][gIndex];
        const outputT = inputG / standardG;
        liigitiTlist.push(outputT);
        t.textContent = outputT.toFixed(2);
        const outputM = outputT * standardM;
        liigitiMlist.push(outputM);
        m.textContent = outputM.toFixed(2);
      }
    }
  });
}
function addKeskData(plk, koef, h) {
  keskPuuList.push(plk);
  keskKoefList.push(koef);
  keskHlist.push(h);
}
function addNewLiigitiPanel() {
  liigitiTuhistaBtn.disabled = false;
  liigitiArvutaKokkuBtn.disabled = false;
  liigitiAlgusesseBtn.disabled = false;
  const newliigitiPanel = document.createElement("div");
  newliigitiPanel.classList.add("valiLiigitiPuuPanel");
  newliigitiPanel.innerHTML = liigitiValiPuuContent;
  liigitiValiPuuContainer.appendChild(newliigitiPanel);
  newliigitiPanel.lastElementChild.addEventListener("click", (e) => {
    const elements = e.target.parentElement.children;
    const plk = elements[0].value;
    let h = elements[1].value;
    let g = elements[2].value;
    const t = elements[3];
    const m = elements[4];
    if (is_number_and_notNotEmpty(h)) {
      h = Number(Math.round(h));
      if (is_number_and_notNotEmpty(g)) {
        if (g.includes(",")) {
          g = Number(g.replace(/,/g, "."));
        } else {
          g = Number(g);
        }
        if (h >= 6 && h <= 35) {
          renderplkData(plk, h, g, t, m);
          e.target.disabled = true;
        }
      }
    }
  });
}
function addNewKeskPanel() {
  keskTuhistaBtn.disabled = false;
  keskArvutaKokkuBtn.disabled = false;
  keskAlgusesseBtn.disabled = false;
  const newKeskPanel = document.createElement("div");
  newKeskPanel.classList.add("valiKeskPuuPanel");
  newKeskPanel.innerHTML = keskValiPuuContent;
  keskValiPuuContainer.appendChild(newKeskPanel);
  newKeskPanel.lastElementChild.addEventListener("click", (e) => {
    const elements = e.target.parentElement.children;
    const plk = elements[0].value;
    const koefElem = elements[1];
    const hElem = elements[2];
    validateField(koefElem);
    validateField(hElem);
    validateField(keskGkokku);
    let koef = koefElem.value;
    let h = hElem.value;
    if (is_number_and_notNotEmpty(h) && h >= 6 && h <= 35) {
      h = Number(Math.round(h));
      if (is_fullNumber_and_notNotEmpty(koef)) {
        koef = Number(koef);
        addKeskData(plk, koef, h);
        e.target.disabled = true;
      }
    }
  });
}
function liigitiArvutaKokku() {
  if (
    liigitiGlist.length &&
    liigitiTlist.length &&
    liigitiMlist.length &&
    liigitiPuulist.length
  ) {
    liigitiGkokku.textContent = liigitiGlist.reduce((g, i) => g + i).toFixed(2);
    liigitiTkokku.textContent = liigitiTlist.reduce((t, i) => t + i).toFixed(2);

    let pind = liigitiInputPind.value;
    if (pind.includes(",")) {
      pind = Number(pind.replace(/,/g, "."));
    } else {
      pind = Number(pind);
    }
    const maxIndexFromMlist = liigitiMlist.indexOf(
      liigitiMlist.reduce((prev, curr) => Math.max(prev, curr)),
    );
    const mkokkuHa = liigitiMlist.reduce((m, i) => m + i);
    const mkokkuPind = mkokkuHa * pind;
    liigitiMkokkuHa.textContent = mkokkuHa.toFixed(2);
    liigitiMkokkuPind.textContent = mkokkuPind.toFixed(2);
    liigitiEnamusPlk.textContent = liigitiPuulist[maxIndexFromMlist];

    //Koosseis: 1. ühenda kaks listi 2d listiks
    const joinedList = liigitiMlist.map((v, i) => {
      return [v, liigitiPuulist[i]];
    });
    //Tee 2d sort list kus tagavarad kahanevas järjekorras
    const sortedList = joinedList.slice().sort((a, b) => b[0] - a[0]);
    //sorditud listi tagavarade summa
    const mSum = sortedList.reduce((a, b) => (a += b[0]), 0);
    //Tee list kuhu kogud tagavarad protsentides
    const percentageList = sortedList.map((el) => {
      return Number(((el[0] / mSum) * 100).toFixed(0));
    });
    //Vaheta sort listis tagavarad protsentideks
    for (let i = 0; i < sortedList.length; i++) {
      sortedList[i][0] = percentageList[i];
    }
    //Lisa andmed stringi
    let liikKoosseisStr = "";
    sortedList.forEach((e) => (liikKoosseisStr += `${e} `));
    liikKoosseisStr = liikKoosseisStr.replaceAll(`,`, ``);
    liigitiKooseis.textContent = liikKoosseisStr;
  }
}
function keskArvutaKokku() {
  const kinnitaBtns = document.querySelectorAll(".keskKinnitaBtns");
  kinnitaBtns.forEach((elem) => {
    if (elem.disabled === false) {
      keskpuudOnkinnitatud = false;
    } else {
      keskpuudOnkinnitatud = true;
    }
  });
  if (keskpuudOnkinnitatud) {
    validateField(keskGkokku);
    const koefSum = keskKoefList.reduce((k, i) => k + i);
    let inputG = keskGkokku.value;
    let inputPind = keskInputPind.value;
    if (
      koefSum === 100 &&
      is_number_and_notNotEmpty(inputG) &&
      is_number_and_notNotEmpty(inputPind)
    ) {
      if (inputG.includes(",")) {
        inputG = Number(inputG.replace(/,/g, "."));
      } else {
        inputG = Number(inputG);
      }
      if (inputPind.includes(",")) {
        inputPind = Number(inputPind.replace(/,/g, "."));
      } else {
        inputPind = Number(inputPind);
      }
      const maxKoefIndex = keskKoefList.indexOf(
        keskKoefList.reduce((prev, curr) => Math.max(prev, curr)),
      );
      const keskEnamusPuu = keskPuuList[maxKoefIndex];
      const dominantH = keskHlist[maxKoefIndex];
      keskEnamusPlk.textContent = keskEnamusPuu;
      data.forEach((elem) => {
        if (elem[keskEnamusPuu]) {
          if (elem[keskEnamusPuu][hIndex] == dominantH) {
            const standardM = elem[keskEnamusPuu][mIndex];
            const standardG = elem[keskEnamusPuu][gIndex];
            const outputT = inputG / standardG;
            keskTkokku.textContent = outputT.toFixed(2);
            const outputM = outputT * standardM;
            keskMkokkuHa.textContent = outputM.toFixed(2);
            const mkokkuPind = outputM * inputPind;
            keskMkokkuPind.textContent = mkokkuPind.toFixed(2);
          }
        }
      });
    }
  }
}

puuliigitiNupp.addEventListener("click", renderPuuliigiti);
keskmineNupp.addEventListener("click", renderKeskmine);

liigitiLisapuuBtn.addEventListener("click", () => {
  if (puuliigitiCount < 10) {
    addNewLiigitiPanel();
  }
  puuliigitiCount++;
});
keskLisapuuBtn.addEventListener("click", () => {
  validateField(keskGkokku);
  if (keskCount < 10) {
    addNewKeskPanel();
  }
  keskCount++;
});
liigitiArvutaKokkuBtn.addEventListener("click", () => {
  liigitiArvutaKokku();
});
keskArvutaKokkuBtn.addEventListener("click", () => {
  keskArvutaKokku();
});
liigitiTuhistaBtn.addEventListener("click", () => {
  removeLiigitiContainerPanels();
  resetLiigitiData();
  restoreAllStyleChanges();
});
keskTuhistaBtn.addEventListener("click", () => {
  removeKeskContainerPanels();
  resetKeskData();
  restoreAllStyleChanges();
});
liigitiAlgusesseBtn.addEventListener("click", () => {
  removeLiigitiContainerPanels();
  resetLiigitiData();
  restoreAllStyleChanges();
  restoreHead();
});
keskAlgusesseBtn.addEventListener("click", () => {
  removeKeskContainerPanels();
  resetKeskData();
  restoreAllStyleChanges();
  restoreHead();
});
