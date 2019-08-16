import { createStackNavigator, createAppContainer } from 'react-navigation';
import BarCodeScannerExample from './Scanner';
import Index from './Index';
import Tickets from './Tickets';
const AppNavigator = createStackNavigator(
    {
        miScanner: {
            screen: BarCodeScannerExample,
        },
        miIndex: {
            screen: Index,
        },
        
        miTicket: {
            screen: Tickets,
            /*navigationOptions: {
                header: null,
            },*/
        }
    },
    {
        initialRouteName: 'miIndex',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'rgba(30,30,30,1)'
            },
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 20,
                color: '#fff',
                fontWeight: 'bold',
                flex: 1
            }
        }
    }
);
export default createAppContainer(AppNavigator);