import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem, IonItemDivider,
  IonList,
  IonModal
} from '@ionic/react';
import './CheckoutModal.css';
import {uid} from "react-uid";
import {BsTrash} from "react-icons/all";

interface ContainerProps {
  showModal: boolean;
  startNewCart: Function;
  data: any;
}

export const CheckoutModal: React.FC<ContainerProps> = (props) => {
  return (
    <IonModal isOpen={props.showModal}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Payment Due</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className='center'>
          {(props.data) && (<div>
            <p>Discount {props.data.discountRate}</p>
            <p>Subtotal {props.data.summary.subtotal}</p>
            <p>Tax {props.data.summary.tax}</p>
            <p>Total {props.data.summary.total}</p>

            <IonList>
              <IonItemDivider>Items in cart</IonItemDivider>
              {props.data.items.map((item: any) =>
                <IonItem key={uid(item)}>
                  {item.label}{'  :  '}{item.quantity}{'  x  '}{item.value}
                </IonItem>
              )}
            </IonList>
          </div>)}
        </IonCardContent>
      </IonCard>
      <IonButton onClick={() => props.startNewCart()}>Start new cart</IonButton>
    </IonModal>
  );
};
