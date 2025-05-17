import { useParams } from "react-router-dom";
import PublicProfileCard from "../components/PublicProfileCard";

const PublicProfile= () => {
    const {nickname}= useParams();
    console.log("Nickname:", nickname);
  return (
    <PublicProfileCard nickname={nickname} />
  );
};

export default PublicProfile;
