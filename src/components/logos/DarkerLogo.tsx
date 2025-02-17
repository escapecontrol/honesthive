import React from 'react';

interface DarkerLogoProps {
  width?: number;
  height?: number;
}

const DarkerLogo: React.FC<DarkerLogoProps> = ({ width = 88, height = 98 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 88 98" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i_0_1)">
      <path d="M38 2.4641C41.7128 0.320508 46.2872 0.320508 50 2.4641L81.3013 20.5359C85.0141 22.6795 87.3013 26.641 87.3013 30.9282V67.0718C87.3013 71.359 85.0141 75.3205 81.3013 77.4641L50 95.5359C46.2872 97.6795 41.7128 97.6795 38 95.5359L6.69873 77.4641C2.98592 75.3205 0.69873 71.359 0.69873 67.0718V30.9282C0.69873 26.641 2.98592 22.6795 6.69873 20.5359L38 2.4641Z" fill="#FFC300"/>
      </g>
      <path d="M49 4.19615L80.3013 22.268C83.3953 24.0543 85.3013 27.3555 85.3013 30.9282V67.0718C85.3013 70.6445 83.3953 73.9457 80.3013 75.732L49 93.8038C45.906 95.5902 42.094 95.5902 39 93.8038L7.69873 75.732C4.60472 73.9457 2.69873 70.6445 2.69873 67.0718V30.9282C2.69873 27.3555 4.60472 24.0543 7.69873 22.268L39 4.19615C42.094 2.40982 45.906 2.40982 49 4.19615Z" stroke="#8C5302" stroke-width="4"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M55.8485 43.9948C62.0385 43.8106 67 38.7347 67 32.5C67 26.1487 61.8513 21 55.5 21C49.2653 21 44.1894 25.9615 44.0052 32.1515H44V32.5V44H55.5H55.8485V43.9948Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M27.8485 60.9948C34.0385 60.8106 39 55.7347 39 49.5C39 43.1487 33.8513 38 27.5 38C21.2653 38 16.1894 42.9615 16.0052 49.1515H16V49.5V61H27.5H27.8485V60.9948Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M54.8485 72.9948C61.0385 72.8106 66 67.7347 66 61.5C66 55.1487 60.8513 50 54.5 50C48.2653 50 43.1894 54.9615 43.0052 61.1515H43V61.5V73H54.5H54.8485V72.9948Z" fill="white"/>
      <defs>
      <filter id="filter0_i_0_1" x="0.69873" y="0.8564" width="86.6025" height="96.2872" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="10" dy="10"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_1"/>
      </filter>
      </defs>
    </svg>
  );
};

export default DarkerLogo;