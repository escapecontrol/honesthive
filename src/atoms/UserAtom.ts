import { atom } from "jotai";

export interface User {
  firstName: string;
  lastName: string;
  profileUrl: string;
  hasCompletedProfile: boolean;
  team: {
    id: string;
    name: string;
    members: {
      id: string;
      name: string;
      email: string;
      profileUrl: string;
    }[];
  }; 
}

export const userAtom = atom<User>({
  firstName: "",
  lastName: "",
  profileUrl: "",
  hasCompletedProfile: false,
  team: {
    id: "",
    name: "",
    members: [],
  },
});
