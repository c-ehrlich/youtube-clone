import axios from 'axios';

const base =
  process.env.NEXT_PUBLIC_API_ENDPOINT ||
  'http://MISSING_ENV_VAR_NEXT_PUBLIC_API_ENDPOINT:3000';

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videosBase = `${base}/api/videos`;

export function registerUser(payload: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return axios.post(userBase, payload).then((res) => res.data);
}

export function loginUser(payload: { email: string; password: string }) {
  return axios
    .post(authBase, payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

export function getMe() {
  return axios
    .get(userBase, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch(() => {
      // user not logged in isn't a problem
      return null;
    });
}

export function uploadVideo({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) {
  return axios
    .post(videosBase, formData, {
      withCredentials: true,
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export function updateVideo({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) {
  return axios.patch(`${videosBase}/${videoId}`, payload, {
    withCredentials: true,
  });
}
