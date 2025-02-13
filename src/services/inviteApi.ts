import api from './api';

export const inviteMember = async (token: string, email: string) => {
  return await api.post('/v1/invitations', { email: email }, token);
}

export const getInvitation = async (token: string, slug: string) => {
  return await api.get(`/v1/invitations/${slug}`, token);
}

export const acceptInvitation = async (token: string, slug: string) => {
  return await api.put(`/v1/invitations/${slug}/accept`, { }, token);
}