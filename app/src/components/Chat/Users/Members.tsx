import styles from "./Members.module.css";
import { ChatProfileCard } from "./ChatProfileCard";
import { getChatMembers } from "../ChatUtils";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserPopup from "./UserPopup";
import { ProfileContext } from "../../../App";
import { isAdminRequest } from "../ChatUtils";

const Members = (props: {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  members: string[];
  isAdmin: boolean;
  channelTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const profileName = useContext(ProfileContext);
  const [members, setMembers] = useState<string[]>([]);
  const [popMember, setPopMember] = useState<boolean>(false);
  const [currentMember, setCurrentMember] = useState<string>("");
  const [isSelectAdmin, setIsSelectAdmin] = useState<boolean>(false);
  let list = [<></>];
  let admin: boolean;

  list = props.members.map((member: any, index: number) => {
    console.log(member);
    return (
      <div
        key={index}
        onClick={async () => {
          if (profileName !== member) {
            setCurrentMember(member);
            const result = await isAdminRequest(props.id, member);
            setIsSelectAdmin(result);
          }
        }}
      >
        <ChatProfileCard
          key={index}
          username={member}
          member={true}
          admin={props.isAdmin}
          setTrigger={setPopMember}
          channelTrigger={props.channelTrigger}
        ></ChatProfileCard>
      </div>
    );
  });
  return (
    <div className={styles["membersWrapper"]}>
      <div className={styles["cardWrapper"]}></div>
      <div className={styles["top-title"]}>Members</div>
      {list}
      <UserPopup
        trigger={popMember}
        setTrigger={setPopMember}
        username={currentMember}
        isAdmin={props.isAdmin}
        currentRoom={props.id}
        setMembers={props.setMembers}
      ></UserPopup>
    </div>
  );
};

export default Members;
