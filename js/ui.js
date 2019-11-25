

const $content = document.querySelector('#content');
const $body = document.querySelector('body');

export function generateMainPage(characterList){
    $content.innerHTML = '';
    characterList.forEach((character) => {
        const $characterCard = document.createElement('div');
        $characterCard.classList.add('characterCard');
        $characterCard.setAttribute('char-id', character.id);

        const $characterImage = document.createElement('img');
        $characterImage.setAttribute('src',character.image);

        const $characterName = document.createElement('h2');
        $characterName.textContent = character.name;

        const $addToFavoritesBtn = document.createElement('div');
        $addToFavoritesBtn.classList.add('addToFavBtn');
        $addToFavoritesBtn.textContent = 'Add To Favorites';        

        $characterCard.append($characterImage, $characterName, $addToFavoritesBtn);

        $content.appendChild($characterCard);
    })
}

export function getAddtoFavBtns(){
    return document.querySelectorAll('.addToFavBtn');
}

export function generateInfoScreen(character){
    const $infoScreen = document.createElement('div');
    $infoScreen.setAttribute('id','infoScreen');

    const $container = document.createElement('div');

    const $offBtn = document.createElement('div');
    $offBtn.textContent = 'X';
    $offBtn.setAttribute('id', 'offBtn');

    const $characterImage = document.createElement('img');
    $characterImage.setAttribute('src',character.image);

    const $characterData = document.createElement('div');
    $characterData.setAttribute('id', 'characterData');

    const $characterName = document.createElement('h2');
    $characterName.textContent = character.name;

    $characterData.append($characterName);

    $container.append($characterImage, $characterData, $offBtn);

    $infoScreen.appendChild($container);

    $body.appendChild($infoScreen);
}

export function getCharacterCards(){
    return document.querySelectorAll('.characterCard');
}

export function removeInfoScreen(){
    const $infoScreen = document.getElementById('infoScreen');
    if($infoScreen){
        $body.removeChild($infoScreen);
    }
}

export function getInfoScreenOffBtn(){
    return document.getElementById('offBtn');
}

export function generateFavouritesList(characterList){
    const $favouriteList = document.createElement('div');
    //$favouriteList.setAttribute('id','test');

    characterList.forEach( (character) => {  
        const $character = document.createElement('div');
        $character.classList.add('favourite');

        const $characterName = document.createElement('span');
        $characterName.textContent = character.name;

        const $characterImage = document.createElement('img');
        $characterImage.setAttribute('src',character.image);

        const $removeBtn = document.createElement('div');
        $removeBtn.classList.add('remove');
        $removeBtn.textContent = 'Remove From Favorites';
        $removeBtn.setAttribute('char-id', character.id);
        
        $character.append($characterImage, $characterName, $removeBtn);
        $favouriteList.appendChild($character);
    });    
    $content.innerHTML = '';
    $content.appendChild($favouriteList);
}

export function getRemoveFromFavoritesBtns(){
    //console.log(document.querySelectorAll('.remove'))
    return document.querySelectorAll('.remove');
}

const MAX_PAGE = 25;

export function generatePageNavigation(pageNumber){
    const $nav = document.createElement('div');
    $nav.setAttribute('id', 'pageNavigation');
    
    const $pageNav = document.createElement('div');
    $pageNav.setAttribute('id', 'pageNumbers');

    const $previous = document.createElement('div');
    $previous.setAttribute('id', 'previous');
    $previous.classList.add('pageNum');
    $previous.textContent = '<';

    const $next = document.createElement('div');
    $next.setAttribute('id', 'next');
    $next.classList.add('pageNum');
    $next.textContent = '>';

    let start = pageNumber - 2;
    let end = pageNumber + 2;

    if(start <= 0){
        start = 1;
        end = 5;
    }
    if(end > MAX_PAGE){
        start = MAX_PAGE - 5;
        end = MAX_PAGE
    }
    for(let i = start; i <= end; i++){
        const $page = document.createElement('div');
        $page.classList.add('pageNum');
        if(i === pageNumber){
            $page.classList.add('selected');
        }
        $page.setAttribute('page-number', i);
        $page.textContent = i;               

        $pageNav.append($page);
    }
    $nav.append($previous, $pageNav, $next);

    $content.appendChild($nav);
}
export function getPageNav(){
    return document.querySelectorAll('.pageNum');
}
export function getPreviousAndNextBtn(){
    return {
        previous: document.getElementById('previous'),
        next: document.getElementById('next')
    }
}

export function getFavouritesBtn(){
    return document.getElementById('favouriteChracters');
}
export function getCharactersBtn(){
    return document.getElementById('characters');
}
export function generateEpisodesScreen(episodes){
    const $season1 = document.createElement('div');
    $season1.textContent = 'Season 1';
    const $season2 = document.createElement('div');
    $season2.textContent = 'Season 2';
    const $season3 = document.createElement('div');
    $season3.textContent = 'Season 3';

    episodes.forEach(episode => {
        const $episode = document.createElement('li');
        $episode.textContent = episode.name;
        if(episode.season === 1){
            $season1.appendChild($episode);
        }
        if(episode.season === 2){
            $season2.appendChild($episode);
        }
        if(episode.season === 3){
            $season3.appendChild($episode);
        }
    });
    $content.innerHTML = '';
    $content.append($season1, $season2, $season3)
}
export function getEpisodesBtn(){
    return document.getElementById('episodes');
}
export function getLocationsBtn(){
    return document.getElementById('locations');
}