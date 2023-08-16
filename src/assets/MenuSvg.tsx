
export default function MenuSvg({className, isDark} : {className?: string, isDark: boolean}) {
  return (
    <svg
      width="38"
      height="33"
      viewBox="0 0 38 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 0V4.67822H37.4258V0H0ZM0 13.8943V18.5725H37.4258V13.8943H0ZM0 27.929V32.6072H37.4258V27.929H0Z"
        fill={isDark ? "#A5C9CA" : "black"}
      />
    </svg>
  );
}