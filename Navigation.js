// Import React Navigation
import {
    createBottomTabNavigator,
    createStackNavigator,
  } from 'react-navigation';
  
  import tabBarIcon from './utils/tabBarIcon';
  // Import the screens
  import FeedScreen from './screens/FeedScreen';
  import NewPostScreen from './screens/NewPostScreen';
  import SelectPhotoScreen from './screens/SelectPhotoScreen';
  import Map from './screens/Map';
 // import Basketball from './game/Basketball';
  //import New from './screens/New';
  
  //import Mapp from './screens/Mapp';
  //import Test from './screens/Test';
  
  
  // Create our main tab navigator for moving between the Feed and Photo screens
  const navigator = createBottomTabNavigator(
    {
      // The name `Feed` is used later for accessing screens
      Feed: {
        // Define the component we will use for the Feed screen.
        screen: FeedScreen,
        navigationOptions: {
          // Add a cool Material Icon for this screen
          tabBarIcon: tabBarIcon('home'),
        },
      },
      // All the same stuff but for the Photo screen
      Photo: {
        screen: SelectPhotoScreen,
        navigationOptions: {
          tabBarIcon: tabBarIcon('camera'),
        },
      },
      Map: {
        screen: Map,
        navigationOptions: {
          tabBarIcon: tabBarIcon('language'),
        },
      },
     /* Mapp: {
        screen: Mapp,
        navigationOptions: {
          tabBarIcon: tabBarIcon('language'),
        },
      },
      New: {
        screen: New,
        navigationOptions: {
          tabBarIcon: tabBarIcon('language'),
        },
      },
      Game: {
        screen: Basketball,
        navigationOptions: {
          tabBarIcon: tabBarIcon('games'),
        },
      },*/
    },
    {
      // We want to hide the labels and set a nice 2-tone tint system for our tabs
      tabBarOptions: {
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      },
    },
  );
  
  
  
  // Create the navigator that pushes high-level screens like the `NewPost` screen.
  const stackNavigator = createStackNavigator(
    {
      Main: {
        screen: navigator,
        // Set the title for our app when the tab bar screen is present
        navigationOptions: { title: 'MyApp' },
      },
      // This screen will not have a tab bar
      NewPost: NewPostScreen,
    },
    {
      cardStyle: { backgroundColor: 'white' },
    },
  );
  
  
  
  // Export it as the root component
  export default stackNavigator;
  