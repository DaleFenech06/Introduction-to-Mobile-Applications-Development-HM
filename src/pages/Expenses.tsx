import { InputCustomEvent, IonAlert, IonBadge, IonButton, IonCheckbox, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState } from 'react';

const Expenses: React.FC = () => {

  // Variables

  const [totalExpenses, setTotalExpenses] = useState<string[]>(() => {

    const storedExpenses = localStorage.getItem('storedExpenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const [userInput, setUserInput] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);

  const [accountHolder, setAccountHolder] = useState(() => {

    const accountHolder = localStorage.getItem('accountHolder');
    return accountHolder ? accountHolder : 'Dale Fenech'
  });

  const [theme, setTheme] = useState(() => {

    const currentTheme = localStorage.getItem('currentTheme');
    return currentTheme ? currentTheme : 'primary'
  });

  // Methods

  const getExpense = (event : InputCustomEvent) => {
    setUserInput(event.target.value);
  }

  const addExpense = () => {
    if(userInput == ''){
      setAlertOpen(true);
    }else{
      const storedExpenses = [...totalExpenses, userInput]
      setTotalExpenses(storedExpenses);
      localStorage.setItem('storedExpenses', JSON.stringify(storedExpenses));
    }
  }

  const deleteExpensesButton = (event : CustomEvent) =>{
    const id = event.target.id;
    const tempExpenses = [];
    for(let indexNum = 0; indexNum < totalExpenses.length; indexNum++){
      let idNum = id.substring(3, 4);
      if(indexNum != idNum){
        tempExpenses.push(totalExpenses[indexNum])
      }
    }
    setTotalExpenses(tempExpenses);
    localStorage.setItem('storedExpenses', JSON.stringify(tempExpenses));
  } 

  const deleteExpensesSlider = (event : CustomEvent) =>{
    const id = event.target.id;
    const tempExpenses = [];
    if(event.detail.amount > 150){
      for(let indexNum = 0; indexNum < totalExpenses.length; indexNum++){
        let idNum = id.substring(3, 4);
        if(indexNum != idNum){
          tempExpenses.push(totalExpenses[indexNum])
        }
      }
      setTotalExpenses(tempExpenses);
      localStorage.setItem('storedExpenses', JSON.stringify(tempExpenses));
      event.target.close();
    }
  } 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={theme}>
          <IonTitle className='ion-text-center'>Expense Tracker
            <IonBadge className='ion-margin-start' color='danger'>{totalExpenses.length}</IonBadge>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
            {
              totalExpenses.map((item, index) => (
                <IonItemSliding id={`sli${index}`} onIonDrag={deleteExpensesSlider}>
                  <IonItemOptions side="end">
                    <IonLabel color='danger'>Swipe To Delete</IonLabel>
                  </IonItemOptions>
                  <IonItem>
                    <IonLabel>{item}</IonLabel>
                    <IonButton id={`but${index}`} color='danger' slot='end' onClick={deleteExpensesButton}>Delete</IonButton>
                  </IonItem>
                </IonItemSliding>
              ))
            }
        </IonList>
      </IonContent>
      <IonFooter>
        <div className='ion-padding'>
          <IonInput placeholder="Add new expense" onIonInput={getExpense}></IonInput>
          <IonButton color={theme} size="small" onClick={addExpense}>Add</IonButton>
          <IonAlert
          isOpen={alertOpen}
          header="Error"
          subHeader="You must enter an expense"
          buttons={['OK']}
          onDidDismiss={() => setAlertOpen(false)}
      ></IonAlert>
        </div>
        <div className='ion-text-center'>
          <IonLabel>Registered to: </IonLabel>
          <IonLabel color={theme}>{accountHolder}</IonLabel>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Expenses;