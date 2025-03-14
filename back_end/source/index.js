// Inicializa o mapa centralizado em Santo Antônio de Jesus, com zoom mínimo 14
const map = L.map("map", { minZoom: 14 }).setView([-12.9703, -39.2609], 15);

// Adiciona um tile layer ao mapa
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ícone customizado para os marcadores
const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/14090/14090489.png", // Novo ícone
  iconSize: [32, 32], // Ajuste o tamanho do ícone
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Lista fixa de marcadores (sem JSON)
const marcadores = [
  {
    nome: "Secretaria de Educação",
    coordenadas: [-12.967554, -39.259519],
    descricao: `
      <b>Secretária de Educação</b><br>
      <strong>Secretária atual:</strong> Maria Edileide De Castro<br>
      <strong>Subsecretária:</strong> Thaís Coutinho<br>
      <strong>Localização:</strong> Praça Me. Rosário, 219 - Centro<br>
      <strong>Telefone:</strong> (75) 3632-1330<br>
      <strong>Email:</strong> sme@saj.ba.gov.br
    `
  },
  {
    nome: "CEFCM",
    coordenadas: [-12.9704024, -39.2702005],
    descricao: `
      <b>Colégio Estadual Francisco da Conceição Menezes</b><br>
      <strong>Diretora:</strong> Joelma de Queiroz Nunes<br>
      <strong>Endereço:</strong> R. Machado Bitencourt, s/n - Andaia<br>
      <strong>Telefone:</strong> (75) 3631-3502 <br>
      <strong>Email:</strong> cefcm.9256@hotmail.com
    `
  },
  {
    nome: "Escola Municipal Deputado Luís Eduardo Maron Magalhães",
    coordenadas: [-12.9678899, -39.2677317],
    descricao: `
      <b>Escola Municipal Dep. Luís Eduardo Maron Magalhães</b><br>
      <strong>Localização:</strong> Vereador Ademario Francisco Dos Santos, SN - Centro<br>
      <strong>Contato:</strong> (75) 3632-4548<br>
      <strong>E-mail:</strong> escolaluiseduardo@hotmail.com
    `
  }
];

// Adiciona os marcadores no mapa
marcadores.forEach(item => {
  const marker = L.marker(item.coordenadas, { icon: customIcon }).addTo(map);
  marker.bindPopup(item.descricao);

  // Mantém o pop-up aberto enquanto o mouse estiver sobre o marcador ou popup
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
});
