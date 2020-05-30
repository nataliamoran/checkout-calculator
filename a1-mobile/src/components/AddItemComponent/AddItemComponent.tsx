import React, {useEffect, useState} from 'react';
import './AddItemComponent.css';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonSpinner
} from "@ionic/react";
import {ITEMS} from "../../config";
import {uid} from 'react-uid';

interface ContainerProps {
  showToast: Function;
  setCartItems: Function;
  cartItems: any;
}

function getItems() {
  return fetch(ITEMS).then((response) => response.json())
}


const AddItemComponent: React.FC<ContainerProps> = (props) => {
  const [items, setItems] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [chosenQuantity, setChosenQuantity] = useState<number>();
  const [loading, setLoading] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    getItems().then((response) => {
      console.log(response);
      setItems(response);
    }).finally(() => {
      setLoading(false);
    })
  }

  const addItemToCart = () => {
    if (!selectedItem || !chosenQuantity) {
      props.showToast('Please choose an item and its quantity','error');
      return;
    }
    if (chosenQuantity <= 0) {
      props.showToast('Please choose a positive quantity','error');
      return;
    }
    const itemAlreadyInCart = props.cartItems.filter(
      (item: any) => item.label === selectedItem.label,
    );
    if (itemAlreadyInCart.length !== 0) {
      props.showToast('This item is already in the cart','error');
      return;
    }
    const items = props.cartItems;
    selectedItem.quantity = chosenQuantity;
    items.push(selectedItem);
    props.setCartItems(items);
    console.log(props.cartItems);
    props.showToast("Item added successfully",'success');
    setSelectedItem(null);
    setChosenQuantity(0);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      {(loading) && (
        <div className="ion-text-center ion-padding">
          <IonSpinner name="crescent"/>
        </div>
      )}
      {(items) && (<IonCard>
        <IonCardHeader>
          <IonCardTitle>Add new item</IonCardTitle>

        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonLabel>Which item?</IonLabel>
              <IonSelect value={selectedItem} okText="Okay" cancelText="Dismiss"
                         onIonChange={e => setSelectedItem(e.detail.value)}>
                {items.map((item: any) => (
                  <IonSelectOption value={item} key={uid(item)}>
                    {item.label}{'  :  $'}{item.value}
                  </IonSelectOption>
                ))}

              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">How many?</IonLabel>
              <IonInput type="number"
                        value={chosenQuantity}
                        onIonChange={e => setChosenQuantity(+e.detail.value!)}></IonInput>
            </IonItem>
            <IonButton expand="block" fill="outline" onClick={() => addItemToCart()}>
              Add item
            </IonButton>
          </IonList>
        </IonCardContent>

      </IonCard>)}
    </div>)
};

export default AddItemComponent;
