import GreenLight, { RedLight } from "@shared/eventComponents/light"
import { CardSmaller } from "@shared/functions/card"
import Check from "@shared/eventComponents/check"
import Button from "@shared/functions/button"
import Space from "@shared/components/utils"
import FetchColor from "@styles/fetchTheme"
import { ScreenProps } from "@interfaces"
import { SS } from "@styles/settingStyles"
import { GS } from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React, { useState } from "react"
import TopMenu from "@shared/topMenu"
import { T } from "@styles/text"
import {
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Alert,
    View,
    Text,
} from "react-native"

{/* ========================= APP START ========================= */}

export default function ReportScreen( { navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { theme } = useSelector( (state: ReduxState) => state.theme )

  const sendForm = () => {
    if (data.name === data.name) {
      lang ? Alert.alert("Denne funksjonen kommer snart", "Midlertidig løsning:\nMail: kontakt@login.no\nDiscord: eirikhanasand") : Alert.alert("This function is coming soon.", "Temporary solution:\nMail: kontakt@login.no\nDiscord: eirikhanasand") // Takk for beskjed. / Thanks for letting us know.
    } else {
      lang ? Alert.alert("Feil! Vennligst send varslingen som anonym epost til kontakt@login.no") : Alert.alert("Error! Please send the report as an anonymous email to kontakt@login.no")
    }
  }

const [data, setData] = useState({
    name: "",
    contact: "",
    content: "",
    check_nameInputChange: false,
    check_contactInputChange: false,
    check_contentInputChange: false,
})

const [database] = useState({
    name: "admin",
    pass: "admin"
})

const inputName = (val: string) => {
  if(val.length > 1) {
    setData({
      ...data,
      name: val,
      check_nameInputChange: true
    })
  }else{
    setData({
      ...data,
      name: val,
      check_nameInputChange: false
    })
  }
}

const inputContact = (val: string) => {
  if(val.length > 1) {
    setData({
      ...data,
      contact: val,
      check_contactInputChange: true
    })
  }else{
    setData({
      ...data,
      content: val,
      check_contactInputChange: false
    })
  }
}

const inputContent = (val: string) => {
  if(val.length > 20) {
    setData({
      ...data,
      content: val,
      check_contentInputChange: true
    })
  }else{
    setData({
      ...data,
      content: val,
      check_contentInputChange: false
    })
  }
}

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View>
      {/* ========================= DISPLAY CONTENT ========================= */}
      <View style={{...GS.content, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
        <View>
          {Space((Dimensions.get("window").height/8.1)+40)}
          <Text style={{...T.centered, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Anonymt og sikkert. Alltid." : "Anonymous and secure. Always."}</Text>
          {Space(30)}

          <View style={SS.loginView}>
            <CardSmaller>
              <View style={SS.loginView}>
                    <TextInput
                        style={{...GS.inputText, backgroundColor: FetchColor({theme, variable: "DARKER"}), color: FetchColor({theme, variable: "TEXTCOLOR"})}}
                        placeholder = {lang ? "Kontaktinformasjon varsler (frivillig)" : "Contact info reporter (voluntary)"}
                        placeholderTextColor={FetchColor({theme, variable: "TITLETEXTCOLOR"})}
                        textAlign="center"
                        onChangeText={(val) => inputName(val)}
                        selectionColor={FetchColor({theme, variable: "ORANGE"})}
                    />
                    {data.check_nameInputChange ?
                        <View>
                            <View style = {SS.greenLight}><GreenLight/></View>
                            <View style = {SS.checkContent}><Check/></View>
                        </View>
                    :
                        <View>
                            <View style = {SS.greenLight}><RedLight/></View>
                            <View style = {SS.checkContent}><Check/></View>
                        </View>
                    }
              </View>
            </CardSmaller>
          </View>

          {Space(20)}

          <View style={SS.loginView}>
            <CardSmaller>
              <View style={SS.loginView}>
                <TextInput
                style={{...GS.inputText, backgroundColor: FetchColor({theme, variable: "DARKER"}), color: FetchColor({theme, variable: "TEXTCOLOR"})}}
                placeholder = {lang ? "Hvem angår hendelsen? (frivillig)" : "Who is affected? (voluntary"}
                placeholderTextColor={FetchColor({theme, variable: "TITLETEXTCOLOR"})}
                textAlign="center"
                onChangeText={(val) => inputContact(val)}
                selectionColor={FetchColor({theme, variable: "ORANGE"})}
                />
                  {data.check_contactInputChange ?
                <View>
                <View style = {SS.greenLight}><GreenLight/></View>
                <View style = {SS.checkContent}><Check/></View>
                </View>
                :
                <View>
                <View style = {SS.greenLight}><RedLight/></View>
                <View style = {SS.checkContent}><Check/></View>
                </View>
                }
              </View>
            </CardSmaller>
          </View>

          {Space(20)}

            <View style={SS.reportContentView}>
              <CardSmaller>
                <View style={SS.reportContentView}>
                    <TextInput
                    multiline={true}
                    style={{...GS.reportInputContentText, color: FetchColor({theme, variable: "TEXTCOLOR"})}}
                    placeholder = {lang ? "Hva vil du rapportere?" : "What would you like to report?"}
                    placeholderTextColor={FetchColor({theme, variable: "TITLETEXTCOLOR"})}
                        textAlign="center"
                        onChangeText={(val) => inputContent(val)}
                        selectionColor={FetchColor({theme, variable: "ORANGE"})}
                    />
                    {data.check_contentInputChange ?
                        <View>
                            <View style = {SS.reportGreenLight}><GreenLight/></View>
                            <View style = {SS.reportCheckContent}><Check/></View>
                        </View>
                    :
                        <View>
                            <View style = {SS.reportGreenLight}><RedLight/></View>
                            <View style = {SS.reportCheckContent}><Check/></View>
                        </View>
                    }
                </View>
              </CardSmaller>
            </View>

          <View>
          {Space(40)}
            <TouchableOpacity
            disabled ={!data.check_contentInputChange}
            onPress={() => sendForm()}>
              <Button>
                <Text style={{...T.centered20, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>SEND</Text>
              </Button>
            </TouchableOpacity>
            {Space(20)}
          </View>
        </View>
        {Space(Dimensions.get("window").height/10)}
    </View>

        <TopMenu 
            navigation={navigation} 
            screen="report" 
            title={lang ? "Varsle" : "Report"} 
            back={"MenuScreen"}
        />
        </View>
    </TouchableWithoutFeedback>

  )
}