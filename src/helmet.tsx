import { Helmet } from 'react-helmet-async';

import img from '../src/assets/imgs/og/manito-og@4x-100.jpg';
interface ReactHelmetProps {
  title?: string;
  description?: string;
  url?: string;
  imgSrc?: string;
}

export const TITLE = '마니또';
const DESCRIPTION = '마니또와 함께하는 행복하고 특별한 순간을 만들어보세요. :)';
const URL = import.meta.env.VITE_CLIENT_URL;
const IMAGE_SRC = img;

export default function ReactHelmet({
  description,
  title,
  url,
  imgSrc,
}: ReactHelmetProps) {
  const titleContent = title || TITLE;
  const descriptionContent = description || DESCRIPTION;
  const imageContent = imgSrc || IMAGE_SRC;
  const urlContent = url || URL;
  return (
    <Helmet>
      <title>{titleContent}</title>
      <meta name="description" content={descriptionContent} />
      <meta property="og:title" content={titleContent} />
      <meta property="og:description" content={descriptionContent} />
      <meta property="og:image" content={imageContent} />
      <meta property="og:url" content={urlContent} />
      <meta name="twitter:title" content={titleContent} />
      <meta name="twitter:description" content={descriptionContent} />
      <meta name="twitter:image" content={imageContent} />
    </Helmet>
  );
}
