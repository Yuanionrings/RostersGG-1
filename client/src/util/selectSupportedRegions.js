import React from 'react';

export const supportedRegions = [
    'US Eastern', 'US Central', 'US Mountain', 'US Pacific',
    'EU Eastern', 'EU Western', 'Asia', 'Oceanic'
];

export function supportedRegionsList(supportedRegions) {
    return supportedRegions.map(function(currentRegion, i){
        return <option value={currentRegion} key={i}>{currentRegion}</option>;
    })
}