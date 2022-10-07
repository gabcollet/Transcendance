import styles from "./Members.module.css";
import { ChatProfileCard } from "./ChatProfileCard";
import { getChatMembers } from "../ChatUtils";
import { useState } from "react";
import axios from "axios";

const Members = (props: { id: number; members: string[] }) => {
  const [members, setMembers] = useState<string[]>([]);
  const list = props.members.map((member: any, index: number) => {
    return <ChatProfileCard key={index} username={member}></ChatProfileCard>;
  });
  return (
    <div className={styles["membersWrapper"]}>
      <div className={styles["cardWrapper"]}></div>
      <div className={styles["top-title"]}>Members</div>
      {list}
    </div>
  );
};

export default Members;
