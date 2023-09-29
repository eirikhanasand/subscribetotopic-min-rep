import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Creates bottom tab navigator
import {NavigationContainer} from '@react-navigation/native'; // Navigation container
import { SafeAreaView } from 'react-native';

const Tab = createBottomTabNavigator(); // Declares Tab to equal CBTN function
import SpecificEventScreen from '../screens/specificEvent'; // Specific Events
import InternalScreen from '../screens/menu/internal'; // Internal screen
import BusinessScreen from '../screens/menu/business'; // Companies' screen
// import SpecificAdScreen from '../screens/specificAd'; // Specific job listing
import SettingScreen from '../screens/menu/settings'; // Settings
import ReportScreen from '../screens/menu/report'; // Report form for blameworthy conditions
import AboutScreen from '../screens/menu/about'; // About Login
import ProfileScreen from '../screens/menu/profile/profile'; // Login to innsida
import LoginScreen from '../screens/menu/profile/login'; // Login to innsida
import EventScreen from '../screens/event'; // Events
import MenuScreen from '../screens/menu'; // Menu
// import AdScreen from '../screens/ads'; // Job advertisements
import TabBar from './functions/tabBar.js'
import Header from './functions/header';

export default function Navigator() { // Declares Navigator, wraps in container and declares all navigation routes
    return (
        <NavigationContainer>
            <Tab.Navigator
            intialRouteName='EventScreen'
            backBehavior='history'
            screenOptions={{
                headerMode: 'screen',
                headerTransparent: true,
                header: props => <Header {...props}/>
            }}
            tabBar={props => <TabBar {...props} />}
            >
                <Tab.Screen 
                    options={{
                        display: true,
                        focusedIcon: require('../assets/menu/calendar-orange.png'),
                        themeIcon: (theme)=>{
                            return theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/calendar777.png') : require('../assets/menu/calendar-black.png')
                        }
                    }}
                    name='EventScreen'
                    component={EventScreen}
                />
                <Tab.Screen 
                    options={{
                        display: true,
                        focusedIcon: require('../assets/menu/menu-orange.png'),
                        themeIcon: (theme)=>{
                            return theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/menu.png') : require('../assets/menu/menu-black.png')
                        },
                        title: ['Menu', 'Meny']
                    }} 
                    name='MenuScreen' 
                    component={MenuScreen}
                />
                {/* <Tab.Screen name='AdScreen' options={{tabBarStyle: {display: "none"}}} component={AdScreen}/>  */}
                <Tab.Screen 
                    name='AboutScreen' 
                    options={{
                        display: false
                    }} 
                    component={AboutScreen}
                />
                <Tab.Screen 
                    name='SpecificEventScreen' 
                    options={{
                        display: false
                    }} 
                    component={SpecificEventScreen}
                />
                <Tab.Screen 
                    name='BusinessScreen' 
                    options={{
                        display: false
                    }} 
                    component={BusinessScreen}
                />
                <Tab.Screen 
                    name='SettingScreen' 
                    options={{
                        display: false
                    }} 
                    component={SettingScreen}
                />
                <Tab.Screen 
                    name='InternalScreen' 
                    options={{
                        display: false
                    }} 
                    component={InternalScreen}
                />
                <Tab.Screen 
                    name='LoginScreen' 
                    options={{
                        display: false
                    }} 
                    component={LoginScreen}
                />
                <Tab.Screen 
                    name='ProfileScreen' 
                    options={{
                        display: false
                    }} 
                    component={ProfileScreen}
                />
                {/* <Tab.Screen name='ReportScreen'             options={{tabBarStyle: { display: "none" }}} component={ReportScreen} /> */}
                {/* <Tab.Screen name='SpecificAdScreen' options={{tabBarStyle: {display: "none"}}} component={SpecificAdScreen}/> */}
 
            </Tab.Navigator>
        </NavigationContainer>
    )
}