import { getFirestore, collection, doc, getDoc } from 'firebase/firestore/lite';

const ReadToCloudFirestore = () => {
  const sendData = async () => {
    try {
      const db = getFirestore();
      const col = collection(db, 'myCollection');
      const documentRef = doc(col, 'my_document');
      const document = await getDoc(documentRef);
      console.log(document.data());
      alert('Data was successfully fetched');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return <button onClick={sendData}>Fetch data</button>;
};

export default ReadToCloudFirestore;
