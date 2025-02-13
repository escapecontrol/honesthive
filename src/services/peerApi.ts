import api from './api';

interface Peer {
    firstName: string;
    lastName: string;
    email: string;
    profileUrl: string;
}

export const getMyProfile = async (token: string) => {
  return await api.get('/v1/peers/me', token);
};

export const saveMyProfile = async (token: string, peer: Peer) => {
  return await api.put('/v1/peers/me', peer, token);
};

export const createTeam = async (token: string, name: string, type: string) => {
  return await api.post('/v1/peers/me/own-team', { name: name, type: type }, token);
}

export const getMyTeam = async(token: string) => {
  return await api.get('/v1/me/teams', token);
}