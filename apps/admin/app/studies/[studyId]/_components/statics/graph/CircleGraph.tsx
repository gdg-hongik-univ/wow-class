import { css } from "@styled-system/css";
import { Flex } from "@styled-system/jsx";
import { Text } from "@wow-class/ui";
import { color } from "wowds-tokens";

const CircleGraph = ({
  size = 192,
  percentage = 0,
  total = 100,
}: {
  size?: number;
  percentage?: number;
  total?: number;
}) => {
  const strokeWidth = 25;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / total) * circumference;

  return (
    <Flex alignItems="center" direction="column" gap="lg" minWidth={size}>
      <div className={circleGraphWrapperStyle}>
        <svg
          className={circleGraphStyle}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            fill="none"
            r={radius}
            stroke={color.darkDisabled}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            fill="none"
            r={radius}
            stroke={color.primary}
            strokeDasharray={`${progress} ${circumference}`}
            strokeDashoffset="0"
            strokeWidth={strokeWidth}
          />
        </svg>
        <Text className={circleGraphLabelStyle} typo="h1">
          {percentage}%
        </Text>
      </div>
    </Flex>
  );
};

export default CircleGraph;

const circleGraphStyle = css({
  width: "100%",
  transform: "rotate(-90deg)",
});

const circleGraphWrapperStyle = css({
  width: "100%",
  position: "relative",
});

const circleGraphLabelStyle = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
