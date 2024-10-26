import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRange, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { Redirect, Route } from 'react-router';
import {card, settings} from 'ionicons/icons';

import Expenses from './Expenses'
import Preferences from './Preferences'

const TabsMain: React.FC = () => {
  return (
    <IonTabs>
        <IonRouterOutlet>
            <Redirect exact from="/TabsMain" to="/TabsMain/Expenses"></Redirect>
            <Route exact path='/TabsMain/Expenses'>
                <Expenses/>
            </Route>
            <Route exact path='/TabsMain/Preferences'>
                <Preferences/>
            </Route>
        </IonRouterOutlet>

        <IonTabBar slot='bottom'>
          <IonTabButton tab='Expenses' href='/TabsMain/Expenses'>
            <IonIcon icon={card}></IonIcon>
            <IonLabel>Expenses</IonLabel>
          </IonTabButton>

          <IonTabButton tab='Preferences' href='/TabsMain/Preferences'> 
            <IonIcon icon={settings}></IonIcon>
            <IonLabel>Preferences</IonLabel>
          </IonTabButton>
        </IonTabBar>
    </IonTabs>
  );
};

export default TabsMain;