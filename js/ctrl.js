import {fetchEpisodes ,episodeList as episodes ,fetchCharacters, fetchSingleCharacter , fetchFavorites , fetchLocations , addToFavourites, removeFromFavourites} from './data.js';
import {generateMainPage , generateInfoScreen , getCharacterCards , removeInfoScreen , getInfoScreenOffBtn , getAddtoFavBtns , getPreviousAndNextBtn, getRemoveFromFavoritesBtns} from './ui.js';
import {getLocationsBtn, generateEpisodesScreen, getEpisodesBtn, generatePageNavigation , getPageNav , generateFavouritesList , getFavouritesBtn, getCharactersBtn} from './ui.js';
function onAddToFavClick(e){
    e.stopPropagation();
    const characterID = this.parentNode.getAttribute('char-id');
    addToFavourites(characterID);
}
async function onCharacterCardClick(){
    const characterID = this.getAttribute('char-id');
    const character = await fetchSingleCharacter(characterID);   
    generateInfoScreen(character);
    getInfoScreenOffBtn().addEventListener('click', removeInfoScreen);
}
async function onPageNavClick(){
    const pageNumber = this.getAttribute('page-number');
    if(pageNumber){
        const characters = await fetchCharacters(parseInt(pageNumber));
        const page = characters[0].page;
        mainPage(characters, page);
    }
}
function pageNavigation(page){
    generatePageNavigation(page);
    getPageNav().forEach( pageNum => {
        pageNum.addEventListener('click', onPageNavClick);
    });
    const btns = getPreviousAndNextBtn();

    const previousPage = page - 1 ? page - 1 : 1;
    const nextPage = page === 25 ? 25 : page + 1;

    async function onPreviousClick(){
        const characters = await fetchCharacters(previousPage);
        mainPage(characters, previousPage);
    }
    async function onNextClick(){
        const characters = await fetchCharacters(nextPage);
        mainPage(characters, nextPage);
    }

    btns.previous.addEventListener('click', onPreviousClick);
    btns.next.addEventListener('click', onNextClick);
}


function mainPage(characters, page){
    generateMainPage(characters);
    getCharacterCards().forEach((characterCard) => {
        characterCard.addEventListener('click', onCharacterCardClick);
    });
    getAddtoFavBtns().forEach(btn => btn.addEventListener('click', onAddToFavClick));
    pageNavigation(page);
}

async function init(){
    const characters = await fetchCharacters(1);
    const page = characters[0].page;
    mainPage(characters, page);
}

init();
fetchEpisodes();

async function onFavBtnClick(){
    const characters = await fetchFavorites();
    generateFavouritesList(characters);
    const $removeBtns = getRemoveFromFavoritesBtns();
    console.log($removeBtns);
    for(let i = 0; i < $removeBtns.length; i++){
        $removeBtns[i].addEventListener('click', () => {
            const charID = this.getAttribute('char-id');
            removeFromFavourites(charID);
            //this.parentNode.parentNode.remove(this.parentNode);
        })
    }
}

getFavouritesBtn().addEventListener('click', onFavBtnClick);

getEpisodesBtn().addEventListener('click', () => {generateEpisodesScreen(episodes)});

getCharactersBtn().addEventListener('click', init);

//sgetLocationsBtn().addEventListener('clik',);


