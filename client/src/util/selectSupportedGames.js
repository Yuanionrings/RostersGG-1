import React from 'react';

export const supportedGames = [
    'League of Legends',
    'Call of Duty: Mordern Warfare',
    'Overwatch',
    'Counter Strike: Global Offensive',
    'Dota 2',
    'Rainbow Six: Seige',
    'Mordhau',
    'Chivalry II',
    'Valorant',
    'Hearthstone',
    'Heroes of the Storm',
    'Apex Legends',
    'Fortnite',
    'Minecraft'
];

export function supportedGamesList(supportedGames) {
    return supportedGames.map(function(currentGame, i){
        return <option value={currentGame} key={i}>{currentGame}</option>;
    })
}
