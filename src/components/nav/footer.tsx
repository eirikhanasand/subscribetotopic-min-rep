import { View, TouchableOpacity } from "react-native"
import FetchColor from "@styles/fetchTheme"
import { useSelector } from "react-redux"
import MS from "@styles/menuStyles"
import { BlurView } from "expo-blur"
import React from "react"
import { openBrowserAsync } from 'expo-web-browser';
import { SvgXml } from "react-native-svg"
import USBicon from "@assets/menu/USB-temp-icon.svg"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"

export default function Footer({ state, descriptors, navigation }: BottomTabBarProps): JSX.Element {
    // Get the current theme
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <>
                <BlurView style={MS.bMenu} intensity={30}/>
                <View style={{
                    ...MS.bMenu,
                    backgroundColor: FetchColor({theme,
                        variable: "TRANSPARENTANDROID"})
                }} />
            {/* Transparent container for the icons */}
            <View style={{
                    ...MS.bMenu,
                }}>
                {/* Create the icons based on options passed from stack.js */}
                {state.routes.map((route, 
                    index: number) => {
                    const { options } = descriptors[route.key]

                    const isFocused = state.index === index
                    // Emitt the normal tab events
                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the
                            // params inside the tab screen are preserved
                            navigation.navigate(route.name, {merge: true})
                        }
                    }
                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        })
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused
                                ? { selected: true }
                                : {}}
                            style={MS.bMenuIconTouchableOpacity}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            {options.tabBarIcon?options.tabBarIcon({focused: isFocused, color: '', size: 0}):null}
                        </TouchableOpacity>
                    )
                })}
                <TouchableOpacity
                    accessibilityRole="button"
                    style={{...MS.bMenuIconTouchableOpacity, paddingLeft: 20}}
                    onPress={async()=>{
                        openBrowserAsync("https://usb.login.no/").catch((error)=>{
                            console.log(error)
                        })
                    }}
                >
                    <SvgXml
                        width={MS.bMenuIconTouchableOpacity.width - 55}
                        height={MS.bMenuIconTouchableOpacity.height}
                        xml={USBicon}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}
