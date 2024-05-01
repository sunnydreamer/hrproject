


import React, {useState} from 'react'
// import './styles.css'
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';


function FileThumbnail({fileUrl}) {


    

    return (
        <div>
            <iframe title="PDF Viewer" src={fileUrl} style={{ width: '70%', height: '500px' }}></iframe>
        </div>
    );
}


function Documents({data}){

    // console.log(data)
    // console.log(data.opt, "===");
    //when luolian finsihes pull out the data.opt, which is array
        //go trhoug it and pull out the links

    //also use data.driversLicense.licenseImage




    //for now just use the test ones 
    // const pdfUrl = "https://testbuckethrproject.s3.amazonaws.com/73398308.jpg"


    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(prevState => !prevState);
    };

    const pdfUrl= "https://testbuckethrproject.s3.amazonaws.com/HR+Project+2024+March.pdf"



    return(



        <div className="Document-Div">

            <div>
            {data.driversLicense? 
                (<img id="Profile-Pic" src={data.profilePicture} ></img>)
                :
                undefined
            }
            </div>



            <div>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">SOME PDF NAME </a>

                <button onClick={togglePopup}>Open Preview</button>
                {showPopup && (
                    <div className="popup">
                        <div className="popup-inner">
                            <button onClick={togglePopup}>Close</button>
                            <FileThumbnail fileUrl={pdfUrl} />
                        </div>
                    </div>
                )}
            </div>


            {/* {data.opt.map((each, index) => (
                <div>
                    
                </div>
            ))} */}

        </div>

    )

}

export default Documents





// import React from 'react'
// import './styles.css'

// function Documents({data}){

//     // console.log(data)
//     // console.log(data.opt, "===");
//     //when luolian finsihes pull out the data.opt, which is array
//         //go trhoug it and pull out the links

//     //also use data.driversLicense.licenseImage


//     console.log(data)

//     //for now just use the test ones 
//     //https://testbuckethrproject.s3.amazonaws.com/73398308.jpg
//     const fileUrl= "https://testbuckethrproject.s3.amazonaws.com/HR+Project+2024+March.pdf"



//     return(
//         <div className="Document-Div">
//             {data.driversLicense? 
//                 (<img id="Profile-Pic" src={data.profilePicture} ></img>)
//                 :
//                 undefined
//             }




//                 <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download HR Project 2024 March PDF</a>


//             {/* {data.opt.map((each, index) => (
//                 <div>
                    
//                 </div>
//             ))} */}

//         </div>
//     )

// }

// export default Documents