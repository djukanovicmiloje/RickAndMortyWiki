const fetchedChacterPages = [];

export async function fetchCharacters(page){

    const pageNumber = parseInt(page);
    for(let i = 0; i < fetchedChacterPages.length; i++){
        if(fetchedChacterPages[i][0].page === pageNumber){
            return fetchedChacterPages[i];
        }
    }

    const url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;

    const response = await fetch(url);     

    const data = await response.json();

    //console.log(response instanceof Promise)   

    const characters = data.results;

    characters[0].page = pageNumber;

    fetchedChacterPages.push(characters)

    return characters;
}
const fetchedChacters = []

export async function fetchSingleCharacter(id){    
    
    const characterID = parseInt(id);
    
    for(let i = 0; i < fetchedChacters.length; i++){                              
        if(fetchedChacters[i].id === characterID){
            return fetchedChacters[i];            
        }
    }
    
    
    const url = `https://rickandmortyapi.com/api/character/${characterID}`;

    const response = await fetch(url);

    const character = await response.json();

    fetchedChacters.push(character);

    return character;
}
export function addToFavourites(id){
    let listIDs = localStorage.getItem('fav-char-ids');

    if(listIDs){
        listIDs += `,${id}`;
    } else {
        listIDs = `${id}`;
    }
    
    localStorage.setItem('fav-char-ids', listIDs);
}
export function removeFromFavourites(id){
    const listIDs = localStorage.getItem('fav-char-ids').split(',');
    
    const newList = listIDs.filter(ID => parseInt(ID) !== parseInt(id));
    console.log(listIDs);
    localStorage.setItem('fav-char-ids', newList.join(','));
}
export async function fetchFavorites(){
    const favouriteIDs = localStorage.getItem('fav-char-ids');

    if(!favouriteIDs) return [];

    const IDs = favouriteIDs.split(',');
    const favorites = [];

    for(let i = 0; i < IDs.length; i++){
        const character = await fetchSingleCharacter(parseInt(IDs[i]));
        favorites.push(character);
    }
    return favorites;      
}
const fetchedLocationPages = [];

export async function fetchLocations(page){
    const pageNumber = parseInt(page);
    console.log(fetchedLocationPages);
    
    for(let i = 0; i < fetchedLocationPages.length; i++){
        console.log(fetchedLocationPages[i][0].page);
        
        if(fetchedLocationPages[i][0].page === pageNumber){
            return fetchedLocationPages[i];
        }
    }

    const url = `https://rickandmortyapi.com/api/location/?page=${pageNumber}`;

    const response = await fetch(url);

    const data = await response.json();

    const locations = data.results;

    locations[0].page = pageNumber;

    fetchedLocationPages.push(locations)

    return locations;
}

class Episode{
    constructor(name, airDate, season, charactersIDs){
        this.name = name;
        this.airDate = airDate;
        this.season = season;
        this.charactersIDs = charactersIDs;
    }
}
const EPISODE_PAGES = 2;
export const episodeList = [];

export async function fetchEpisodes(){
    for(let i = 1; i <= EPISODE_PAGES; i++){
        const url = `https://rickandmortyapi.com/api/episode/?page=${i}`;
        const response = await fetch(url);
        const data = await response.json();
        const episodes = data.results;
        episodes.forEach(episode => {
            const name = episode.name;
            const airDate = episode.air_date;
            const season = parseInt(episode.episode.split('S').pop());
            const charactersIDs = [];
            episode.characters.forEach( characterURL => {
                const id = characterURL.split('https://rickandmortyapi.com/api/character/').pop();
                charactersIDs.push(parseInt(id));
            });
            episodeList.push(new Episode(name, airDate, season, charactersIDs));
        })
    }
}