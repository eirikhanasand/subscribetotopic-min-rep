import notificationArray from "@/utils/notificationArray"
import EventCardLocation from "@components/event/eventCardLocation"
import CategorySquare from "@/components/shared/category"
import topic from "@/utils/topic"
import Space, { Month } from "@/components/shared/utils"
import BellIcon from "@components/event/bellIcon"
import Cluster from "@/components/shared/cluster"
import FetchColor from "@styles/fetchTheme"
import ES from "@styles/eventStyles"
import { Navigation } from "@interfaces"
import T from "@styles/text"
import React from "react"
import {
    TouchableOpacity,
    Dimensions,
    FlatList,
    Text,
    View,
    Platform,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { setClickedEvents } from "@redux/event"

type EventListProps = {
    navigation: Navigation
    notification: NotificationProps
    ErrorMessage: React.FC<ErrorMessageProps>
}

type EventCardProps = {
    navigation: Navigation
    notification: NotificationProps
    item: EventProps
    index: number
}

type ListFooterProps = {
    index: number
}

type FullCategorySquareProps = {
    item: EventProps
    height?: number
}

type BellProps = {
    item: EventProps
    notification: NotificationProps
}

/**
 * Displays the event list
 */
export default function EventList ({navigation, notification, ErrorMessage}: 
EventListProps): JSX.Element {
    const { events, search, renderedEvents } = useSelector((state: ReduxState) => state.event)

    if (!renderedEvents.length && !search) {
        return <ErrorMessage argument="wifi" />
    }

    else if (renderedEvents.length > 0) {
        return (
            <View>
                <FlatList
                    style={{minHeight: "100%"}}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item) => `${item.eventID}`}
                    data={renderedEvents}
                    renderItem={({item, index}) => (
                        <EventCard
                            navigation={navigation}
                            notification={notification}
                            item={item}
                            index={index}
                        />
                    )}
                />
            </View>
        )
    } else {
        return <ErrorMessage argument={!events.length ? "wifi" : "nomatch"} />
    }
}

/**
 * Displays one element of the event card array
 */
function EventCard ({navigation, notification, item, index}: EventCardProps): 
JSX.Element {
    const { search } = useSelector((state: ReduxState) => state.event)

    return (
        <View>
            <TouchableOpacity onPress={() => {
                navigation.navigate("SpecificEventScreen", {item: item})
            }}>
                {index === 0
                    ? search === false
                        ? <Space height={Dimensions.get("window").height / (Platform.OS === "ios" ? 8.4 : 8)} />
                        : <Space height={Platform.OS === "ios" 
                        ? Dimensions.get("window").height / 4
                        : Dimensions.get("window").height / 3.6} />
                    : null}
                <Cluster marginVertical={8}>
                    <View style={ES.eventBack}>
                        <FullCategorySquare item={item} />
                        <EventCardLocation item={item} />
                        <Bell item={item} notification={notification} />
                    </View>
                </Cluster>
                <ListFooter index={index} />
            </TouchableOpacity>
        </View>
    )
}

/**
 * Displays the footer last fetch time item
 */
export function ListFooter ({index}: ListFooterProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { search, lastFetch, renderedEvents, categories } = useSelector((state: ReduxState) => state.event)

    return (
        <>
            {index === renderedEvents.length-1 && <Text style={{...T.contact, 
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>
                    {lang ? "Oppdatert kl:":"Updated:"} {lastFetch}.
                </Text>}
            {index === renderedEvents.length - 1 && 
                <Space height={Dimensions.get("window").height / 3 + 20}/>}
            {index === renderedEvents.length - 1 && search === true &&
                <Space height={40 * (Math.ceil(categories.length / 3)) + 152.5} />}
        </>
    )
}

/**
 * Displays the category square to the left of each event in the list on the EventScreen
 */
export function FullCategorySquare({item, height}: FullCategorySquareProps): JSX.Element {
    const day = "startt" in item ? `${item.startt[8]}${item.startt[9]}` : new Date().getDate()
    const month = "startt" in item ? parseInt(item.startt[5] + item.startt[6]) : new Date().getMonth() + 1
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View>
            <CategorySquare category={item.category} height={height} />

            <Text style={{
                ...ES.eventCardDayText,
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>{day}</Text>

            <Month
                month={month}
                color={FetchColor({theme, variable: "TEXTCOLOR"})}
            />
        </View>
    )
}

/**
 * Displays the bell to the right of every event in the eventlist
 */
function Bell({item, notification}: BellProps): JSX.Element {
    const { clickedEvents } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const dispatch = useDispatch()
    const isOrange = clickedEvents.some(event => event.eventID === item.eventID) 
        ? true 
        : false
    
    return (
        <View style={ES.view3}>
            <TouchableOpacity onPress={() => {
                topic({topicID: `${item.eventID}`, lang, status: false, 
                    category: (item.category).toLowerCase(), catArray: 
                    notificationArray({notification, category: item.category})})
                dispatch(setClickedEvents(
                    clickedEvents.some(event => event.eventID === item.eventID)
                    ? clickedEvents.filter((x) => x.eventID !== item.eventID)
                    : [...clickedEvents, item]
                ))
            }}>
                <View style={ES.bellPosition} >
                    <BellIcon orange={isOrange} />
                </View>
            </TouchableOpacity>
        </View>
    )
}
