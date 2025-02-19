import { atom } from "jotai";

export interface Member {
  id: string;
  name: string;
  email: string;
  profileUrl: string;
  isPending: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  profileUrl: string;
  hasCompletedProfile: boolean;
  team: {
    id: string;
    name: string;
    members: Member[];
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
