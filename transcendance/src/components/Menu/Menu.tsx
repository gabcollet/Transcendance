import "./Menu.css";
import Toggle from "./Toggle";
import _Toggle from "./Toggle";
import MenuButton from "./MenuButton";
import {
  faCommentDots,
  faPlayCircle,
  faTrophy,
  faRankingStar,
  faUser,
  faBinoculars,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
const Menu = () => {
  let MenuComp = (
    <div className="menu-wrap">
      <Toggle icon={faBars}></Toggle>
      <MenuButton icon={faPlayCircle}></MenuButton>
      <MenuButton icon={faBinoculars}></MenuButton>
      <MenuButton icon={faUser}></MenuButton>
      <MenuButton icon={faRankingStar}></MenuButton>
      <MenuButton icon={faTrophy}></MenuButton>
      <MenuButton icon={faCommentDots}></MenuButton>
    </div>
  );

  return MenuComp;
};

export default Menu;
