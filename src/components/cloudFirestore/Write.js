import { getFirestore, collection, doc, setDoc } from 'firebase/firestore/lite';

const WriteToCloudFirestore = () => {
  const sendData = async () => {
    try {
      const db = getFirestore();
      const col = collection(db, 'myCollection');
      const documentRef = doc(col, 'my_document');
      setDoc(documentRef, {
        name: 'y/n',
        email: 'email@11.com',
        sent: false
      }).then(alert('Data was successfully sent'));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return <button onClick={sendData}>Send data</button>;
};

export default WriteToCloudFirestore;
