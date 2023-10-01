import { nativeApplicationVersion } from "expo-application"
import { Navigation, ScreenProps } from "@interfaces"
import Feedback from "@shared/components/feedback"
import Cluster from "@shared/functions/cluster"
import Space from "@shared/components/utils"
import FetchColor from "@styles/fetchTheme"
import { CS } from "@styles/clusterStyles"
import { GS } from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import en from "@text/en/menu.json"
import no from "@text/no/menu.json"
import { T } from "@styles/text"
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import LogoNavigation from "@shared/functions/logoNavigation"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import InternalScreen from "./menu/internal"
import AboutScreen from "./menu/about"
import BusinessScreen from "./menu/business"
import LoginScreen from "./menu/profile/login"
import NotificationScreen from "./menu/notification/notifications"
import ProfileScreen from "./menu/profile/profile"
import ReportScreen from "./menu/report"
import SettingScreen from "./menu/settings"

type MenuItemProps = {
    index: number
    item: ItemProps
    navigation: Navigation
    theme: number
    lang: boolean
    setting: SettingProps[]
    feedback: boolean
    toggleFeedback: () => void
    login: boolean
}

type ItemProps = {
    id: number
    nav: string
    title: string
}

const MenuStack = createStackNavigator();
const screens = {
    "AboutScreen": AboutScreen,
    "BusinessScreen": BusinessScreen,
    "InternalScreen": InternalScreen,
    "LoginScreen": LoginScreen,
    "NotificationScreen": NotificationScreen,
    "ProfileScreen": ProfileScreen,
    "ReportScreen": ReportScreen,
    "SettingScreen": SettingScreen
}


export default function MenuScreen({ navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { login } = useSelector( (state: ReduxState) => state.login )
    const { theme } = useSelector( (state: ReduxState) => state.theme )
    const { id, name, image } = useSelector( (state: ReduxState) => 
    state.profile )
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false
    const profile = { id: 0, name: "Eirik Hanasand", image}
    const text = lang ? no : en

    // --- SET THE COMPONENTS OF THE HEADER ---
    useEffect(()=>{
        navigation.setOptions({
            headerComponents: {
                bottom: [],
                left: [LogoNavigation(navigation, isDark)],
                right: []
            }
        } as Partial<BottomTabNavigationOptions>)
    }, [navigation])

    // Feedback options visibility boolean
    const [feedback, setFeedback] = useState(false)

    // --- UPDATES FEEDBACK STATE ---
    function toggleFeedback() {
        setFeedback(prevFeedback => !prevFeedback)
    }

    return (
        <MenuStack.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}>
            <MenuStack.Screen 
                name="root">
                {({navigation})=>{
                    return(<View style={{
                        ...GS.content, 
                        backgroundColor: FetchColor({theme, variable: "DARKER"})
                    }}>
                        <FlatList
                        style={{minHeight: "100%"}}
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        keyExtractor={(item) => `${item.id}`}
                        data={text.setting}
                        renderItem={({item, index}) => (
                            <MenuItem 
                                index={index}
                                item={item}
                                navigation={navigation}
                                theme={theme}
                                lang={lang}
                                setting={text.setting}
                                feedback={feedback}
                                toggleFeedback={toggleFeedback}
                                login={login}
                            />
                            )}
                        />
                        {Space(Dimensions.get("window").height / 10)}
                    </View>)
                }}
            </MenuStack.Screen>
            {text.setting.map((item, index)=>{
                return (
                <MenuStack.Screen {...{key: index, name: item.nav, initialParams: item, component: screens[item.nav]}}></MenuStack.Screen>
            )})}
        </MenuStack.Navigator>
    )
}

function MenuItem({index, item, navigation, theme, lang, setting, feedback, 
toggleFeedback, login}: MenuItemProps) {
    const info = lang ? no : en

    return (
        <View>
            {index === 0 ? Space(Dimensions.get("window").height/8): null}
            {/* {index === 0 ? SmallProfile(navigation, theme, lang, 
                profile, login) : null} */}
            <TouchableOpacity onPress={() => item.id === 5 && login 
                ? navigation.navigate("InternalScreen", item) 
                : navigation.navigate(item.nav, item)}
            >
                <Cluster>
                    <View style={{...CS.clusterBack}}>
                        <View style={CS.twinLeft}>
                            <Text style={{
                                ...T.text20, 
                                color: FetchColor({theme, variable: 
                            "TEXTCOLOR"})}}>
                                    {item.title}
                            </Text>
                        </View>
                        <View style={CS.twinRight}>
                            <Image 
                                style={CS.arrowImage}
                                source={
                                    require("@assets/icons/dropdownBase.png")
                                }
                            />
                        </View>
                    </View>
                </Cluster>
            </TouchableOpacity>
            <View>
                {Space(10)}
                <Feedback
                    index={index}
                    setting={setting}
                    feedback={feedback}
                    theme={theme}
                    lang={lang}
                    toggleFeedback={toggleFeedback}
                />
            </View>
            {index === setting.length-1 
            ?   <Text style={{
                    ...T.contact, 
                    color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                }}>
                    {info.version}{nativeApplicationVersion}
                </Text>
            : null}
        </View>
    )
}