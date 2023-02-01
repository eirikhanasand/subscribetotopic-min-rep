{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { MS } from '../styles/menuStyles'
import { GS } from '../styles/globalStyles'
import { ES }from '../styles/eventStyles'
import React, { useState } from 'react';
import Card, {Space} from '../shared/sharedComponents';
import { DynamicCircle } from '../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import FetchColor from '../styles/fetchTheme';
import { BlurView } from 'expo-blur';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
  Alert
} from 'react-native';
import { T } from '../styles/text';

{/* ========================= APP START ========================= */}

export default function MenuScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
      {id: '1', nav: 'SettingScreen',       titleNO: 'Innstillinger',   titleEN: 'Settings'       },
      //{id: '2', nav: 'ReportScreen',        titleNO: 'Varsle',          titleEN: 'Report'         },
      {id: '3', nav: 'CommitteeMenuScreen', titleNO: 'Komité',          titleEN: 'Committee'      },
      {id: '4', nav: 'AboutScreen',         titleNO: 'Om oss',          titleEN: 'About Login'    },
      {id: '5', nav: 'BusinessScreen',      titleNO: 'For bedrifter',   titleEN: 'For companies'  },
      //{id: '6', nav: 'LoginScreen',         titleNO: 'Innsida (verv)',  titleEN: 'Intranet (verv)'},
  ])
  const [feedback, setFeedback] = useState({status: 0})                   //  Feedback options visibility boolean

  function toggleFeedback() {                                             //  --- UPDATES FEEDBACK STATE ---
    setFeedback({                                                         //  Function to show feedback types
           status: !feedback.status                                       //  Change feedback state
    });
}
  const eventPage   = () => { navigation.navigate('EventScreen')   }
  const listingPage = () => { navigation.navigate('ListingScreen') }

return(
  <View>

{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
          <FlatList
          style={{minHeight: '100%'}}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item, index}) => (
            <View>
              {index == 0 ? Space(Dimensions.get('window').height/9): null}
            <TouchableOpacity onPress={() => item.id == 6 && login? navigation.navigate('InternalScreen', item) : navigation.navigate(item.nav, item)}>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text>
              </Card>
            </TouchableOpacity>
            <View>
              {index == setting.length-1 ? Space(10):null}
              {index == setting.length-1 && !feedback.status ?
                <TouchableOpacity onPress={() => toggleFeedback()}>
                  <View style={{backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
                    <Text style={{...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Gi tilbakemelding' : 'Give feedback'}</Text>
                  </View>
                </TouchableOpacity>
              :null}
              
              {index == setting.length-1 && feedback.status ?
              <View style={{...ES.row, justifyContent: 'space-evenly'}}>
                <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/376827396764073997')}>
                  <View style={{backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
                    <Text style={{...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>Discord</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={async() => {
                 Linking.openURL('mailto:kontakt@login.no').catch(() => lang ? Alert.alert('Kunne ikke åpne mail!', 'Mail: kontakt@login.no'):Alert.alert('Could not open mail!', 'Reach us at kontakt@login.no'))
                }}>
                  <View style={{backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
                    <Text style={{...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>Mail</Text>
                  </View>
                </TouchableOpacity>
              </View>
                
              :null}
            </View>
          </View>
            
          )}
          />
            {Space(Dimensions.get('window').height/10)}
      </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => eventPage()}>
      <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/logo/loginText.png') : require('../assets/logo/loginText-black.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Meny' : 'Menu'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/calendar777.png') : require('../assets/menu/calendar-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => listingPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/business.png') : require('../assets/menu/business-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
              <Image style={MS.bMenuIcon} source={require('../assets/menu/menu-orange.png')} />
        </TouchableOpacity>
      </View>     
    </View>
  )
};
