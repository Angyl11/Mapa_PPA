const map = L.map("map", { minZoom: 14 }).setView([-12.9703, -39.2609], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/7945/7945007.png", 
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

function setupPopupHover(marker) {
  let markerHovered = false;
  let popupHovered = false;

  marker.on("mouseover", () => {
    markerHovered = true;
    marker.openPopup();
  });
  marker.on("mouseout", () => {
    markerHovered = false;
    setTimeout(() => {
      if (!markerHovered && !popupHovered) marker.closePopup();
    }, 100);
  });
  marker.on("popupopen", function () {
    const popupEl = marker.getPopup().getElement();
    popupEl.addEventListener("mouseenter", () => {
      popupHovered = true;
    });
    popupEl.addEventListener("mouseleave", () => {
      popupHovered = false;
      setTimeout(() => {
        if (!markerHovered && !popupHovered) marker.closePopup();
      }, 100);
    });
  });
}
function setupCarousel(popupEl) {
  popupEl.addEventListener("click", function (e) {
    if (e.target.matches("#next-btn1")) {
      popupEl.querySelector("#page1").style.display = "none";
      popupEl.querySelector("#page2").style.display = "block";
    } else if (e.target.matches("#next-btn2")) {
      popupEl.querySelector("#page2").style.display = "none";
      popupEl.querySelector("#page3").style.display = "block";
    } else if (e.target.matches("#prev-btn2")) {
      popupEl.querySelector("#page2").style.display = "none";
      popupEl.querySelector("#page1").style.display = "block";
    } else if (e.target.matches("#prev-btn3")) {
      popupEl.querySelector("#page3").style.display = "none";
      popupEl.querySelector("#page2").style.display = "block";
    }
  });
}

fetch("dadosCEFCM.json")
  .then(response => response.json())
  .then(cefcData => {
    const markerCEFCM = L.marker(cefcData.coordenadas, { icon: customIcon }).addTo(map);
    
    const page1Content = `
      <div class="popup-page" id="page1">
        <p><b>${cefcData.nome}</b></p>
        <p><strong>Tipo:</strong> ${cefcData.tipo}</p>
        <p><strong>Diretora:</strong> ${cefcData.diretora}</p>
        <p><strong>Localização:</strong> ${cefcData.endereco}</p>
        <p><strong>Contato:</strong> ${cefcData.contato}</p>
        <button id="next-btn1">Próximo &gt;</button>
      </div>
    `;
    const page2Content = `
      <div class="popup-page" id="page2" style="display: none;">
        <p><strong>Infraestrutura e Corpo Docente:</strong></p>
        <p>${cefcData.infraestrutura}</p>
        <button id="prev-btn2">&lt; Voltar</button>
        <button id="next-btn2">Próximo &gt;</button>
      </div>
    `;
    const page3Content = `
      <div class="popup-page" id="page3" style="display: none;">
        <p><strong>Projetos e Diferenciais:</strong></p>
        <p>${cefcData.projetos}</p>
        <button id="prev-btn3">&lt; Voltar</button>
      </div>
    `;
    
    const popupContentCEFCM = `
      <div id="popup-carousel">
        ${page1Content}
        ${page2Content}
        ${page3Content}
      </div>
    `;
    
    markerCEFCM.bindPopup(popupContentCEFCM);
    markerCEFCM.on("popupopen", function () {
      const popupEl = markerCEFCM.getPopup().getElement();
      setupCarousel(popupEl);
    });
    setupPopupHover(markerCEFCM);
  })
  .catch(error => console.error("Erro ao carregar dados do CEFCM:", error));

fetch("dadosSecretaria.json")
  .then(response => response.json())
  .then(secretaria => {
    console.log("Dados da Secretaria:", secretaria);
    const markerSecretaria = L.marker(secretaria.coordenadas, { icon: customIcon }).addTo(map);
    
    const page1Content = `
      <div class="popup-page" id="page1">
        <p><b>Secretaria de Educação</b></p>
        <p><strong>Secretária atual:</strong> ${secretaria.secretariaAtual}</p>
        <p><strong>Subsecretária:</strong> ${secretaria.subsecretaria}</p>
        <p><strong>Localização:</strong> ${secretaria.localizacao}</p>
        <p><strong>Telefone:</strong> ${secretaria.telefone}</p>
        <p><strong>Email:</strong> ${secretaria.email}</p>
        <button id="next-btn1">Próximo &gt;</button>
      </div>
    `;
    const page2Content = `
      <div class="popup-page" id="page2" style="display: none;">
        <p><strong>Políticas Públicas - Parte 1:</strong></p>
        <p>${secretaria.politicasParte1}</p>
        <button id="prev-btn2">&lt; Voltar</button>
        <button id="next-btn2">Próximo &gt;</button>
      </div>
    `;
    const page3Content = `
      <div class="popup-page" id="page3" style="display: none;">
        <p><strong>Políticas Públicas - Parte 2:</strong></p>
        <p>${secretaria.politicasParte2}</p>
        <button id="prev-btn3">&lt; Voltar</button>
      </div>
    `;
    
    const popupContentSecretaria = `
      <div id="popup-carousel">
        ${page1Content}
        ${page2Content}
        ${page3Content}
      </div>
    `;
    
    markerSecretaria.bindPopup(popupContentSecretaria);
    markerSecretaria.on("popupopen", function () {
      const popupEl = markerSecretaria.getPopup().getElement();
      setupCarousel(popupEl);
    });
    setupPopupHover(markerSecretaria);
  })
  .catch(error => console.error("Erro ao carregar dados da Secretaria:", error));
