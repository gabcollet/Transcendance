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
  members: string[];
  isAdmin: boolean;
}) => {
  const profileName = useContext(ProfileContext);
  const [members, setMembers] = useState<string[]>([]);
  const [popMember, setPopMember] = useState<boolean>(false);
  const [currentMember, setCurrentMember] = useState<string>("");
  const [isSelectAdmin, setIsSelectAdmin] = useState<boolean>(false);
  let list = [<></>];
  list = props.members.map((member: any, index: number) => {
    return (
      <div
        key={index}
        onClick={async () => {
          if (profileName !== member) {
            setCurrentMember(member);
            setPopMember(true);
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
      ></UserPopup>
    </div>
  );
};

export default Members;
