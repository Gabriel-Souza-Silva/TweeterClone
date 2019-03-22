import {createSwitchNavigator,createStackNavigator,createAppContainer} from 'react-navigation'

import Login from './pages/Login';
import TimeLine from './pages/TimeLine';
import New from './pages/New'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        //usar o createStackNavigator permite trocar entre as abas sem fazer um novo tweet pra sair da pagina de new tweet
        App: createStackNavigator({
            TimeLine,
            New
        })
    })
);

export default Routes