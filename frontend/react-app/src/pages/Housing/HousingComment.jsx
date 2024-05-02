import React from 'react'
import './styles.css'



function HousingComment({showComment}){

    // let comment = [
    //     "Comment1",
    //     "Cooment2",
    //     "Reply1",
    //     "Reply2"
    // ]

    console.log(showComment)
    return (
        <div className='Comment-Div'>
          {showComment.comments.map((each, index) => (
            <div key={index}>
              {/* <label></label> */}
              <input type="text" value={each.description} readOnly />
            </div>
          ))}
        </div>
      );

}

export default HousingComment