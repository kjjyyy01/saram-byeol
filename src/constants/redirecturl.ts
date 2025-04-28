// 개발 환경(pnpm dev)에서는 localhost로 리다이렉션

import { AUTH_CALLBACK, CHANGE_PASSWORD, FINISH_SIGNUP } from './paths';

// 배포 환경(pnpm start 또는 배포 사이트)에서는 실제 도메인으로 리다이렉션
const isDev = process.env.NODE_ENV === 'development';

const BASE_URL = isDev ? process.env.NEXT_PUBLIC_LOCAL_BASE_URL : process.env.NEXT_PUBLIC_PROJECT_BASE_URL;

export const REDIRECT_TO = `${BASE_URL}${AUTH_CALLBACK}`;

export const REDIRECT_TO_CHANGE_PASSWORD = `${BASE_URL}${CHANGE_PASSWORD}`;

export const REDIRECT_TO_FINISH_SIGNUP = `${BASE_URL}${FINISH_SIGNUP}`;
