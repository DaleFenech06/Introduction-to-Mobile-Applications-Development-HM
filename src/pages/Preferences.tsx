import { InputCustomEvent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState } from 'react';

const Preferences: React.FC = () => {

  // Variables

  const [accountHolder, setAccountHolder] = useState(() => {

    const accountHolder = localStorage.getItem('accountHolder');
    return accountHolder ? accountHolder : 'Dale Fenech'
  });
  
  const [theme, setTheme] = useState(() => {

    const currentTheme = localStorage.getItem('currentTheme');
    return currentTheme ? currentTheme : 'primary'
  });

  const [toggleCheck, setToggleCheck] = useState(() => {

    const startCheck = localStorage.getItem('toggleCheck');
    return startCheck ? startCheck : 'on'
  });

  // Methods

  const changeTheme = (event : CustomEvent) => {
    if(event.target?.checked){
      localStorage.setItem('currentTheme', 'primary');
      localStorage.setItem('toggleCheck', 'on');
      setTheme('primary');
      setToggleCheck('on')
    }else{
      localStorage.setItem('currentTheme', 'medium');
      localStorage.setItem('toggleCheck', 'off');
      setTheme('medium');
      setToggleCheck('off')
   }
  }

  const changeAccountHolder = (event : InputCustomEvent) => {
    setAccountHolder(event.target.value)
    localStorage.setItem('accountHolder', event.target.value);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={theme} className='ion-text-center'>
          <IonTitle>Preferences</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonInput label="Registered to: " labelPlacement="stacked" value={accountHolder} onIonChange={changeAccountHolder}></IonInput>
        <br></br>
        <IonLabel>Color Theme</IonLabel>
        <IonToggle className='ion-margin-start' onIonChange={changeTheme} checked={toggleCheck === 'on'}></IonToggle>
      </IonContent>
    </IonPage>
  );
};

export default Preferences;