import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '군지원 플래너',
    short_name: '군지원 플래너',
    description: '지원 가능 여부, 준비 우선순위, 마감 역산을 빠르게 판단하는 비공식 군지원 웹앱',
    start_url: '/',
    display: 'standalone',
    background_color: '#edf1f4',
    theme_color: '#1d3b63',
    lang: 'ko',
  };
}
