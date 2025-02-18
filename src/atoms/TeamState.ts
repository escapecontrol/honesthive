import { atom } from "recoil";

export const teamState = atom({
  key: "teamState", // unique ID (with respect to other atoms/selectors)
  default: {
    id: "",
    name: "",
    members: [],
  }, // default value (aka initial value)
});
