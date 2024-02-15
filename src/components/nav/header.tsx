import GS from '@styles/globalStyles'
import React, { PropsWithChildren, ReactNode, useState } from 'react'
import { BlurView } from 'expo-blur'
import { Dimensions, Platform, View, Text, StatusBar } from 'react-native'
import { HeaderProps} from '@interfaces'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Image } from "react-native"
import MS from '@styles/menuStyles'
import { useDispatch } from 'react-redux'
import { setTag } from '@redux/event'

export default function Header({ options, route, navigation }: HeaderProps): ReactNode {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { event:{event}, tag } = useSelector((state: ReduxState) => state.event)
    const { ad } = useSelector((state: ReduxState) => state.ad )
    const dispatch = useDispatch()
    const SES = route.name === "SpecificEventScreen"
    const SAS = route.name === "SpecificAdScreen"
    const orangeIcon = require('@assets/icons/goback-orange.png')
    let title = route.name && (lang
            ? require('@text/no.json').screens[route.name]
            : require('@text/en.json').screens[route.name])
    
    if (!title && SES) title = event && (lang ? event.name_no : event.name_en)
    if (!title && SAS) title = lang ? ad.title_no : ad.title_en
    if (route.name === "ProfileScreen") return <></>

    const { isDark } = useSelector((state: ReduxState) => state.theme )
    const  [backIcon, setBackIcon] = useState(isDark 
        ? require('@assets/icons/goback777.png')
        : require('@assets/icons/goback111.png'))
    
    return (
        <BlurWrapper>
            <View style={{...GS.headerView, top: Dimensions.get("window").height / 17}}>
                <View style={GS.innerHeaderViewOne}>
                    {options.headerComponents?.left ? options.headerComponents?.left.map((node, index) => 
                        <View style={GS.logo} key={index}>{node}</View> 
                    ) : 
                    <TouchableOpacity onPress={() => {
                        setBackIcon(orangeIcon)
                        if (tag.title) dispatch(setTag({ title: "", body: "" }))
                        navigation.goBack()
                    }}>
                        <Image style={{...MS.tMenuIcon, left: 5}} source={backIcon}></Image>
                    </TouchableOpacity>
                    }
                </View>
                <Text style={{...GS.headerTitle, color: theme.titleTextColor, 
                            width: SES ? 300 : 150, textAlign: "center"}}>
                            {title}
                        </Text>
                    <View style={GS.innerHeaderViewTwo}>
                    {options.headerComponents?.right?.map((node, index) => (
                        <View style={index === 1
                            ? {...GS.customMenuIcon, width: Platform.OS === "ios" ? 28 : 5} 
                            : GS.customMenuIcon} key={index}>{node}
                        </View>
                    ))}
                </View>
            </View>
            {options.headerComponents?.bottom?.map((node, index) => 
                <View key={index}>{node}</View>
            )}
        </BlurWrapper>
    )
}

// Wraps the content in blur
function BlurWrapper(props: PropsWithChildren) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const event = useSelector((state: ReduxState) => state.event)
    const ad = useSelector((state: ReduxState) => state.ad)
    const route = useRoute()
    const defaultHeight = 
    Dimensions.get('window').height * 8 // Base decrementor for both platforms
    / (Platform.OS === 'ios' ? 85 // Base height of header on iOS
    : 100 // Base height of header on Android
    ) + (StatusBar.currentHeight ? StatusBar.currentHeight - 2 // Subtractor for Statusbar visible on Android
     : 0 // Defaults to 0 if no statusbar is visible on Android
    )
    const isSearchingEvents = event.search && route.name === "EventScreen"
    const isSearchingAds = ad.search && route.name === "AdScreen"
    const cat = lang ? event.categories.no : event.categories.en
    const categories = cat.length || 0 // Defaults to 0 categories
    const extraHeight = (isSearchingEvents && 6 // Base height for eventSearch on both platforms
        * categories) || (isSearchingAds && 9.5 // Base height for adSearch on both platforms
    * ad.skills.length) || 0 // Defaults to 0 skills
    const height = defaultHeight + extraHeight + (isSearchingEvents || isSearchingAds
        ? Platform.OS === "ios" 
            ? isSearchingEvents 
                ? 130 // Extraheight during eventSearch on iOS
                :  70 // Extraheight for adSearch on iOS
            : isSearchingEvents 
                ? 130 // Extraheight during eventSearch on Android
                :  59.5 // Extraheight during adSearch on Android
        : Platform.OS === "ios" 
            ? 20 // Extra base height for header on iOS while not searching
            : 5  // Extra base height for header on Android while not searching
        )

    return (
        <>
            <BlurView 
                style={{height}} 
                experimentalBlurMethod='dimezisBlurView' 
                intensity={Platform.OS === "ios" ? 30 : 20} 
            />
            <View style={{...GS.blurBackgroundView, height,
                backgroundColor: theme.transparentAndroid
            }}>{props.children}</View>
        </>
    )
}
