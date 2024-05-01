import React, {useEffect, useState} from 'react';
import './styles.css'
import HousingDetail from './HousingDetail';
import HousingReport from './HousingReport';
import HousingComment from './HousingComment';
import axios from 'axios';




const HousingPage = () => {

  let [houseInfo, setHouseInfo] = useState({
    housing: {},
    housingReport: []
  });

  let [showComment, setShowComment] = useState(false);

function fetchfoo(){
    axios.get("http://localhost:3000/user/housing")
    .then(res => {
      const initData = {
        housing : res.data.house[0],
        housingReport : res.data.housingReport
      }
      // console.log(initData)
      setHouseInfo(initData); // Set houseInfo when data is fetched
    })
    .catch(error => {
      console.error('Error fetching housing data:', error);
    });
}


  useEffect(() => {
    fetchfoo();
  }, []);

  return (
    <div className="full-parent-height">
      <h2 className='Housing'>Housing Detail</h2>
      {/* add housing detail */}
      <HousingDetail houseInfo={houseInfo}></HousingDetail>
      {/* <h1 className='Housing'>Facility Report</h1> */}

      {/* add housing reports */}
      {/* <HousingReport houseInfo={houseInfo} setShowComment={setShowComment}></HousingReport> */}

      {/* <h1 className='Housing'>Report Comments</h1>/ */}

      {/* add comments */}
      {/* <HousingComment houseInfo={houseInfo}></HousingComment> */}


    </div>
  );
}

export default HousingPage;
