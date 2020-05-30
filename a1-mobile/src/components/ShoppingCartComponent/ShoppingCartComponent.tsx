import React from 'react';
import {BsTrash, GiShoppingCart} from "react-icons/all";
import './ShoppingCartComponent.css';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonItem, IonList} from "@ionic/react";
import {uid} from 'react-uid';

interface ContainerProps {
  setCartItems: Function;
  showToast: Function;
  cartItems: any;
}

const ShoppingCartComponent: React.FC<ContainerProps> = (props) => {

  const removeItem = (item: any) => {
    const items = props.cartItems;
    const index = items.indexOf(item, 0);
    if (index > -1) {
      items.splice(index, 1);
    }
    props.setCartItems(items);
    props.showToast("Item removed successfully",'success');
  }

  return (
    <IonCard>
      <IonCardHeader className="center">
        <GiShoppingCart id="cart-icon"/>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {props.cartItems.map((item: any) =>
            <IonItem key={uid(item)}>
              {item.label}{'  :  '}{item.quantity}{'  x  '}{item.value}
              <IonButton onClick={() => {removeItem(item)}} slot="end" color="danger" fill="clear">
                <BsTrash className="delete-icon"></BsTrash>
              </IonButton>
            </IonItem>
          )}

        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default ShoppingCartComponent;
