export const memberBasePath = '/api/v2/members';

export const environment = {
  production: true,
  memberApiPath: `http://${window.location.hostname}:8001` + memberBasePath
};
