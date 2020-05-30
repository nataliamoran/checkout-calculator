import {IonButton, IonCard, IonCardContent, IonInput, IonItem, IonLabel, IonList} from '@ionic/react';
import React, {useState} from 'react';
import {CART} from "../../config";

interface ContainerProps {
  showToast: Function;
  setShowModal: Function;
  setModalData: Function;
  cartItems:any;
}

const CheckoutComponent: React.FC<ContainerProps> = (props:ContainerProps) => {
  const [discount, setDiscount] = useState<number>(0);

  const checkout=()=> {
    if (discount < 0) {
      props.showToast('Please enter a positive value for the discount','error');
      return;
    }
    if (discount >= 1) {
      props.showToast('Please enter a value smaller than 1 for the discount','error');
      return;
    }
    const data = {
      items: props.cartItems,
      discountRate: discount,
    };
    const request = new Request(CART, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    fetch(request)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // this.setState({
        //   cart: json,
        //   checkoutMode: true,
        // });
        props.setModalData(json);
        props.setShowModal(true);
      })
      .catch(() => {
        // console.error(error);
      });
  }

  return (
    <IonCard>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Discount</IonLabel>
            <IonInput type="number"
                      value={discount}
                      onIonChange={e => setDiscount(+e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton onClick={()=>{checkout()}}
                     expand="block" fill="outline" color="success">
            Checkout
          </IonButton>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default CheckoutComponent;
