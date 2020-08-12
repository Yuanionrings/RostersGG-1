import React from 'react';

export const supportedGames = [
    'Mordhau', 'Call of Duty: Mordern Warfare', 'DOTA 2',
    'League of Legends', 'Overwatch', 'Hearthstone', 'Heroes of the Storm',
    'Chivalry I', 'Civalry II', 'CS:GO', 'Valorant', 'Fortnite' 
];

export function supportedGamesList(supportedGames) {
    return supportedGames.map(function(currentGame, i){
        return <option value={currentGame} key={i}>{currentGame}</option>;
    })
}
