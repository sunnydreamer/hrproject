import React, {useEffect, useState} from 'react';
import './styles.css'
import HousingDetail from './HousingDetail';
import HousingReport from './HousingReport';
import HousingComment from './HousingComment';
import Modal from './Modal';
import axios from 'axios';




const HousingPage = () => {
  const [data, setData] = useState();
  const [houseInfo, setHouseInfo] = useState(null);
  const [comment, setComment] = useState("");

  const [showComment, setShowComment] = useState({
    showBool : false,
    comments : [],
    housingId: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  //the modal has been submitted.... then add it to the houseInfo
  //then add it to server
  const closeModal = (title, description) => {

    const payload = {title, 
                          description, 
                          houseId: houseInfo.housing._id,
                          userId: data._id
                        };
    axios.put("http://localhost:3000/user/housing/report", payload)
      .then(response =>
        {
          console.log(response.data)
          setIsOpen(false);
        }
      )
      .catch(error => 
          console.error("error")
      )
  };


function fetchfoo(){
    axios.get("http://localhost:3000/user/housing")
    .then(res => {
      const initData = {
        housing : res.data.house
      }
      setHouseInfo(initData); 
      setData(res.data);

      // userId = res.data._id;
    })
    .catch(error => {
      console.error('Error fetching housing data:', error);
    });
}

// creation of new comment 
function handleComment(event){
  const payload = {
    housingId: showComment.housingID,
    comment: comment
  }

  axios.put("http://localhost:3000/user/housing/report/comment", payload)
  .then(response =>
    {
      // console.log(response.data, "========")
      setComment("")
      setIsOpen(false);
    }
  )
  .catch(error => 
      console.error("error")
  )

}

// console.log(houseInfo)

//usecallback

  useEffect(() => {
    fetchfoo();
  }, [isOpen]);

  return (
    <div className="Housing-Parent">
      <h2 className='Housing'>Housing Detail</h2>
      {houseInfo ? (
        <>
          <HousingDetail houseInfo={houseInfo}></HousingDetail>
          <h2 className='Housing'>Facility Report</h2>
          <button onClick={openModal}>New Report</button>
          <Modal isOpen={isOpen} onClose={closeModal} />
          <HousingReport data={data} setShowComment={setShowComment}></HousingReport>

          {showComment.showBool? 
          <div>
            <h2 className='Housing'>Report Comments</h2>
            {/*comeback to the comments, and filter out only the ones for that user*/}
            <HousingComment showComment={showComment}></HousingComment>
            <br></br>
            <h2>New Comment</h2>
            <input 
                type="text" 
                name="Comment" 
                id="Comment" 
                value={comment} 
                onChange={(event) => {
                  setComment(event.target.value)}}
            />
            <button onClick={handleComment}>Submit</button>
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
