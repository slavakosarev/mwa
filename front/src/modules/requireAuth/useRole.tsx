import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Role } from "../../interfaces";
import { selectListEvent, selectListGift, selectUser } from "../store";
export const useRole = () => {
  // userId: string | null | undefined,
  // creator: string | null
  const { value: user } = useSelector(selectUser);
  const [role, setRole] = useState("norequired");
  const { value: event } = useSelector(selectListEvent);
  const { value: gift } = useSelector(selectListGift);
  // let creator = event[0]?.userCreatorId || "";
  let creator = gift[0]?.userCreatorId || "";
  useEffect(() => {
    if (user.userId === creator) {
      setRole("creator");
    } else {
      setRole("giver");
    }
  }, []);
  const resp: [string, string] = [role, creator];
  return resp;
};
