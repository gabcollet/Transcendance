import styles from "./Members.module.css";
import { ChatProfileCard } from "./ChatProfileCard";
import { getChatMembers } from "../ChatUtils";
import { useState, useContext } from "react";
import axios from "axios";
import UserPopup from "./UserPopup";
import { ProfileContext } from "../../../App";
import { isAdminRequest } from "../ChatUtils";

const Members = (props: { id: number; members: string[] }) => {
  const profileName = useContext(ProfileContext);
  const [members, setMembers] = useState<string[]>([]);
  const [popMember, setPopMember] = useState<boolean>(false);
  const [currentMember, setCurrentMember] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const list = props.members.map((member: any, index: number) => {
    return (
      <div
        key={index}
        onClick={async () => {
          if (profileName !== member) {
            setCurrentMember(member);
            setPopMember(true);
            const result = isAdminRequest(props.id, member.username);
            console.log(result);
          }
        }}
      >
        <ChatProfileCard key={index} username={member}></ChatProfileCard>
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
        isAdmin={isAdmin}
      ></UserPopup>
    </div>
  );
};

export default Members;
