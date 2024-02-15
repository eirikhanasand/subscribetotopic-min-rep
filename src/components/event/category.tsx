import { CategoryCircle, Title } from "@components/shared/category"
import ES from "@styles/eventStyles"
import { Text, View } from "react-native"
import { useSelector } from "react-redux"
import T from "@styles/text"

export default function Category() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { event:{category} } = useSelector((state: ReduxState) => state.event)
    const categoryName = lang ? category.name_en  : category.name_no

    return (
        <View style={{...ES.specificEventInfoView, top: 2.5}}>
            <Title />
            <CategoryCircle color={category.color} />
            <Text style={{...T.specificEventInfo, maxWidth: '60%', color: theme.textColor}}>
                {categoryName}
            </Text>
        </View>
    )
}