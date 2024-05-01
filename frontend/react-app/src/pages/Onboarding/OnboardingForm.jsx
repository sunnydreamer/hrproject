import Driving from "./Driving";
import PersonalInfo from "./PersonalInfo";
import WorkAuth from "./WorkAuth";

const OnboardingForm = ({ userInfo, setUserInfo }) => {
  const changeHandler = (e) => {
    if (e.target.id.includes(`.`)) {
      const keys = e.target.id.split(`.`);
      userInfo[keys[0]][keys[1]] = e.target.value;
      setUserInfo({ ...userInfo });
      return;
    }
    if (e.target.value === `true` && e.target.id === `hasDriversLicense`) {
      userInfo[e.target.id] = true;
      setUserInfo({
        ...userInfo,
        driversLicense: {
          licenseNumber: ``,
          expirationDate: new Date().toISOString().split(`T`)[0],
          licenseImage: ``,
        },
      });
      return;
    }
    if (e.target.value === `false` && e.target.id === `hasDriversLicense`) {
      userInfo[e.target.id] = false;
      setUserInfo({ ...userInfo });
      return;
    }

    userInfo[e.target.id] = e.target.value;
    setUserInfo({ ...userInfo });
  };

  return (
    <>
      <h1>Onboarding Form</h1>
      <img src={userInfo.profilePicture} />
      <form>
        <PersonalInfo userInfo={userInfo} changeHandler={changeHandler} />
        <Driving
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          changeHandler={changeHandler}
        />
        <WorkAuth userInfo={userInfo} changeHandler={changeHandler} />

      </form>
    </>
  );
};

export default OnboardingForm;
