/**
 * - 이미지 경로
 * @type {string}
 */

import { StaticImageData } from 'next/image';
import mainRepairIcon from './main_repair_icon.png';
import projectLogo from './project_logo.png';

interface ImageType extends Record<string, StaticImageData> {}

const Images: ImageType = {
  mainRepairIcon,
  projectLogo,
};

export default Images;
