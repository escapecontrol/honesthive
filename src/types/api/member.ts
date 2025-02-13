export interface Member {
    id: string;
    name: string;
    email: string;
    profileUrl: string;
    isPending: boolean;
    lastActive?: string;
  }