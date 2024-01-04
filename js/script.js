const pokemonName = document.querySelector('.pokemon__name');
const pokemonID = document.querySelector('.pokemon__id');
const pokemonType = document.querySelector('.pokemon__type');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');
const pokemonAbility = document.querySelector('.pokemon__ability');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.pokemon__form');
const input = document.querySelector('.input__search');
const btn = document.querySelector('.btn__search');

let searchPokemon = 1;

const typesPokemon = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Planta",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Venenoso",
    ground: "Terra",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada"
};


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();

        return data;
    }
}

function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatNumber(number) {
    const string = number.toString()
    const numberString = string.length === 1 ? `0${string}` : string;

    const formattedNumber = numberString.slice(0, -1) + '.' + numberString.slice(-1);

    return formattedNumber;
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonID.innerHTML = '';
    pokemonType.innerHTML = '';
    pokemonHeight.innerHTML = '';
    pokemonWeight.innerHTML = '';
    pokemonAbility.innerHTML = '';
    pokemonImage.style.display = 'none';

    const data = await fetchPokemon(pokemon);

    const types = data.types;
    const pokemonTypes = types.map(x => typesPokemon[x.type.name]);

    const ability = data.abilities;
    const pokemonAbilities = ability.map(x => {
        const word = x.ability.name;
        return word[0].toUpperCase() + word.slice(1);
    });

    function abilitiesFormat(ability){
        switch (ability.length) {
            case 1:
                var abilities = 'Habilidade: ' + pokemonAbilities;
                return abilities;
            case 2:
                var abilities = 'Habilidades: ' + pokemonAbilities.join(' e ');
                return abilities;
            case 3:
                var abilities = 'Habilidades: ' + pokemonAbilities[0] + ', ' + pokemonAbilities[1] + ' e ' + pokemonAbilities[2];
                return abilities;
            default:
                var abilities = 'Erro ao carregar habilidades';
                return abilities;
        }
    }

    if (data) {
        
        pokemonName.innerHTML = 'Nome: ' + data.name.replace('-', ' ');
        pokemonID.innerHTML = 'ID: ' + data.id;
        pokemonType.innerHTML = `${types.length == 1 ? 'Tipo: ' : 'Tipos: '}` + pokemonTypes.join(' e ');
        pokemonHeight.innerHTML = 'Altura: ' + formatNumber(data.height) + 'm';
        pokemonWeight.innerHTML = 'Peso: ' + formatNumber(data.weight) + 'kg';
        pokemonAbility.innerHTML = abilitiesFormat(ability);
        pokemonImage.style.display = 'block';

        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] || data['sprites']['other']['official-artwork']['front_default'];
    
        input.value = '';
    } else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemonID.innerHTML = '';
        pokemonType.innerHTML = '';
        pokemonHeight.innerHTML = '';
        pokemonWeight.innerHTML = '';
        pokemonAbility.innerHTML = '';
        pokemonImage.style.display = 'none';
    }

}

input.addEventListener('input', () => {
   let textAccents = input.value;
   let textNoAccents = removeAccents(textAccents);
   input.value = textNoAccents;
});

form.addEventListener('submit', (event) => {  
    event.preventDefault();
    renderPokemon(input.value.toLowerCase().replace(' ', '-'));
});

btn.addEventListener('click', () => {  
    renderPokemon(input.value.toLowerCase().replace(' ', '-'));
});

renderPokemon(searchPokemon);
