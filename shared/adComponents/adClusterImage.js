import { View, Image } from 'react-native';
import { AS } from '../../styles/adStyles';
import React from 'react';

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export default function AdClusterImage(props) {
    const bannerURL  = props.image

    return(
        <View style={AS.adClusterImage}>
            <Image style={AS.adBannerSmall} source={{uri: bannerURL ? bannerURL:'https://cdn.login.no/img/ads/adcompany.png'}}/>
        </View>
    );
};