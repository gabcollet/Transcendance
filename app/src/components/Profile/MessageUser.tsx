import { useContext } from "react";
import { Link } from "react-router-dom";
import { OtherUsernameContext } from "../../App";
import { Username_ } from "../../interfaces";

export const MessageUser = (props: any) => {
  const otherUsernameContext = useContext(OtherUsernameContext);

  console.log(`messageUser props.otherName: ${props.otherUsername}`);

  return (
    <>
      <OtherUsernameContext.Provider value={props.otherUsername}>
        <Link to="/Chat">Message</Link>;
      </OtherUsernameContext.Provider>
      {/* <OtherUsernameContext.Provider value={""}></OtherUsernameContext.Provider> */}
    </>
  );
};
