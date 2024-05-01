import React from 'react'
import './styles.css'



function HousingComment({showComment}){

    // let comment = [
    //     "Comment1",
    //     "Cooment2",
    //     "Reply1",
    //     "Reply2"
    // ]


    return (
        <div className='Comment-Div'>
          {showComment.comments.map((each, index) => (
            <div key={index}>
              <input type="text" value={each.description} readOnly />
            </div>
          ))}
        </div>
      );

}

export default HousingComment