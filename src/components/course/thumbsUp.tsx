import { StyleProp, View, ViewStyle } from "react-native"
import { Svg, Path } from "react-native-svg"

export default function ThumbsUp({style, color}: {style?: StyleProp<ViewStyle>, color: string}) {
    return (
        <View style={style}>
            <Svg viewBox="0 0 48 48">
                <Path fill={color} d="M43.465,18.631c-1.335-1.672-3.328-2.631-5.466-2.631h-9.717l1.287-9.012c.307-2.195-.72-4.349-2.609-5.482-.543-.331-1.172-.506-1.821-.506-1.387,0-2.645,.819-3.204,2.083l-4.292,9.643c-.724,1.642-1.852,3.048-3.265,4.154-.709-1.125-1.953-1.881-3.379-1.881H7c-2.206,0-4,1.794-4,4v18c0,2.206,1.794,4,4,4h4c1.55,0,2.882-.895,3.546-2.188l3.529,.784c1.22,.268,2.459,.403,3.685,.403h13.96c3.29,0,6.096-2.24,6.825-5.447l2.28-10.001c.474-2.088-.022-4.246-1.359-5.92ZM13,37c0,1.103-.897,2-2,2H7c-1.103,0-2-.897-2-2V19c0-1.103,.897-2,2-2h4c1.103,0,2,.897,2,2v18Zm29.874-12.892l-2.28,10c-.521,2.291-2.525,3.892-4.875,3.892h-13.96c-1.081,0-2.177-.12-3.253-.356l-3.506-.78V19c0-.024-.007-.046-.007-.069,1.973-1.363,3.519-3.214,4.48-5.394L23.764,3.895c.355-.804,1.425-1.126,2.161-.677,1.207,.724,1.86,2.096,1.665,3.491l-1.45,10.15c-.041,.287,.044,.578,.234,.797,.19,.219,.465,.345,.755,.345h10.87c1.527,0,2.95,.685,3.903,1.879,.956,1.196,1.31,2.738,.972,4.229Z"/>
            </Svg>
        </View>
    )
}