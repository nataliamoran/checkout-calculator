import {IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar} from '@ionic/react';
import React, {useState} from 'react';
import AddItemComponent from '../components/AddItemComponent/AddItemComponent';
import ShoppingCartComponent from '../components/ShoppingCartComponent/ShoppingCartComponent';
import CheckoutComponent from '../components/CheckoutComponent/CheckoutComponent';
import './Home.css';
import {CheckoutModal} from "../components/CheckoutModal/CheckoutModal";

const Home: React.FC = () => {
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error!");
  const [showSucceesToast, setShowSuccessToast] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Item successfully added");

  const [cartItems, setCartItems] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();

  const startNewCart = () => {
    setCartItems([]);
    setShowModal(false);
  }

  const showToast = (msg: string, type: string) => {
    if (type === 'error') {
      setErrorMessage(msg);
      setShowErrorToast(true);
    } else {
      setSuccessMsg(msg);
      setShowSuccessToast(true);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Checkout Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message={errorMessage}
          position="top"
          color="danger"
          duration={1500}
        />
        <IonToast
          isOpen={showSucceesToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message={successMsg}
          position="bottom"
          color="success"
          duration={1500}
        />
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Checkout Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AddItemComponent showToast={showToast}
                          cartItems={cartItems}
                          setCartItems={setCartItems}

        />
        <CheckoutComponent cartItems={cartItems}
                           showToast={showToast}
                           setShowModal={setShowModal}
                           setModalData={setModalData}
        />
        <ShoppingCartComponent cartItems={cartItems}
                               setCartItems={setCartItems}
                               showToast={showToast}
        />
        <CheckoutModal showModal={showModal}
                       startNewCart={startNewCart}
                       data={modalData}>
        </CheckoutModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
