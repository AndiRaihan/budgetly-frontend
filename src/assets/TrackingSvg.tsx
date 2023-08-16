export default function TrackingSvg({className, isDark} : {className?: string, isDark: boolean}) {
  return (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.8908 0.0482594C7.57673 0.0482594 0 7.62499 0 16.9391C0 26.2531 7.57673 33.8299 16.8908 33.8299C19.7381 33.8299 22.5372 33.1542 24.9019 31.8512C25.0913 32.0792 25.3013 32.2892 25.5292 32.4786L30.3552 37.3045C30.8008 37.8059 31.3442 38.211 31.952 38.4948C32.5598 38.7786 33.2192 38.9352 33.8898 38.9549C34.5603 38.9747 35.2278 38.8572 35.8512 38.6096C36.4747 38.362 37.041 37.9896 37.5153 37.5153C37.9896 37.041 38.362 36.4747 38.6096 35.8512C38.8572 35.2278 38.9747 34.5603 38.9549 33.8898C38.9352 33.2192 38.7786 32.5598 38.4948 31.952C38.211 31.3442 37.806 30.8008 37.3045 30.3552L32.4786 25.5292C32.2435 25.2941 31.9848 25.0838 31.7064 24.9019C33.0094 22.5372 33.8299 19.7864 33.8299 16.8908C33.8299 7.57673 26.2531 0 16.9391 0L16.8908 0.0482594ZM16.8908 4.8742C23.5989 4.8742 28.9557 10.231 28.9557 16.9391C28.9557 20.1242 27.7974 23.068 25.7705 25.2397C25.7223 25.2879 25.674 25.3362 25.6258 25.3845C25.3978 25.5739 25.1878 25.7839 24.9984 26.0118C22.875 27.9422 19.9794 29.0522 16.8425 29.0522C10.1345 29.0522 4.77768 23.6954 4.77768 16.9873C4.77768 10.2793 10.1345 4.92246 16.8425 4.92246L16.8908 4.8742Z"
        fill={isDark? "#A5C9CA" : "black"}
      />
    </svg>
  );
}