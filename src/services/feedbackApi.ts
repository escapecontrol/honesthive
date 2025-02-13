import api from './api';

export const giveFeedback = async (token: string, toMemberId: string, message: string) => {
  return await api.post('/v1/feedback', { 
    toMemberId: toMemberId,
    message: message
  }, token);
}

export const getTeamFeedback = async (token: string, teamId: string) => {
  return await api.get(`/v1/feedback/teams/${teamId}`, token);
}