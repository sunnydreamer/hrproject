import React, {useEffect, useState} from 'react';
import './styles.css'
import HousingDetail from './HousingDetail';
import HousingReport from './HousingReport';
import HousingComment from './HousingComment';
import Modal from './Modal';
import axios from 'axios';




const HousingPage = () => {

  let [houseInfo, setHouseInfo] = useState(null);

  let [showComment, setShowComment] = useState({
    showBool : false,
    comments : []
  });
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  //the modal has been submitted.... then add it to the houseInfo
  //then add it to server
  const closeModal = (title, description) => {
    const payload = {title, description, houseId: houseInfo.housing._id};

    // console.log(houseInfo.housing._id)

    //need to make the HousingReport on database
    //grab that ID...
    //take it to the house...
    //add it into housingReport

    //soo... we need in payload... the houseID...



    
    // const updatedHouseInfo = { ...houseInfo };

    // // Shallow copy the housing object
    // const updatedHousing = { ...updatedHouseInfo.housing };
  
    // // Update the housingReport property
    // updatedHousing.housingReport =  [... updatedHousing.housingReport, payload];
  
    // // Update the houseInfo state with the new housing object
    // setHouseInfo({
    //   ...updatedHouseInfo,
    //   housing: updatedHousing,
    // });





    // console.log(title, description, "+++")
    //send in the payload...
    axios.post("http://localhost:3000/user/housing/report", payload)
      .then(response =>
        {
          console.log(response.data)
        }
      )
      .catch(error => 
          console.error("error")
      )


    //send the data over
    setIsOpen(false);
  };




function fetchfoo(){
    axios.get("http://localhost:3000/user/housing")
    .then(res => {
      const initData = {
        housing : res.data.house
      }


      setHouseInfo(initData); // Set houseInfo when data is fetched
    })
    .then(
      console.log(houseInfo)
    )
    .catch(error => {
      console.error('Error fetching housing data:', error);
    });
}

  // console.log(houseInfo)

  useEffect(() => {
    fetchfoo();
  }, []);

  return (
    <div className="Housing-Parent">
      <h2 className='Housing'>Housing Detail</h2>
      {houseInfo ? (
        <>
          <HousingDetail houseInfo={houseInfo}></HousingDetail>
          <h2 className='Housing'>Facility Report</h2>
          <button onClick={openModal}>New Report</button>
          <Modal isOpen={isOpen} onClose={closeModal} />
          <HousingReport houseInfo={houseInfo} setShowComment={setShowComment}></HousingReport>



          {showComment.showBool? 
          <div>
            <h2 className='Housing'>Report Comments</h2>
            <HousingComment showComment={showComment}></HousingComment>
          </div>
          :
          <div></div>}
        </>
      ) : (
        <h2>Please come back later... you have not been assigned</h2>
      )}
    </div>
  );
  
}

export default HousingPage;
