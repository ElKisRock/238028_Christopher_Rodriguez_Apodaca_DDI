const url = "https://pokeapi.co/api/v2/pokemon";
const contenedor = document.getElementById("contenedor");

fetch(url)
    .then(res => res.json())
    .then(data => {

        // Creamos un array de promesas
        const promesas = data.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
        );

        // Esperamos que TODAS terminen
        return Promise.all(promesas);
    })
    .then(pokemones => {

        // Ordenamos por ID
        pokemones.sort((a, b) => a.id - b.id);

        // Renderizamos
        pokemones.forEach(pokemon => {
            crearTarjeta(pokemon);
        });
    })
    .catch(error => console.error(error));


function crearTarjeta(pokemon) {

    const card = document.createElement("div");
    card.classList.add("card");

    const tipos = pokemon.types
        .map(t => `<span>${t.type.name}</span>`)
        .join("");

    const habilidades = pokemon.abilities
        .map(a => a.ability.name)
        .join(", ");

    card.innerHTML = `
        <h2>#${pokemon.id} ${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Altura:</strong> ${pokemon.height}</p>
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Experiencia:</strong> ${pokemon.base_experience}</p>
        <p><strong>Habilidades:</strong> ${habilidades}</p>
        <div class="tipos">${tipos}</div>
    `;

    contenedor.appendChild(card);
}