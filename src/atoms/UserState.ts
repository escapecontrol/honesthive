import { atom } from "recoil";

export const userState = atom({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: {
    firstName: "",
    lastName: "",
    profileUrl: "",
    hasCompletedProfile: false,
    team: {
      id: "",
      name: "",
      members: [],
    },
  }, // default value (aka initial value)
});
