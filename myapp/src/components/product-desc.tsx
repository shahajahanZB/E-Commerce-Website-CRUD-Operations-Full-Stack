import { useState } from "react";

const MAX_LENGTH = 80;

const ProductDescription = ({ description }: { description: string }) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > MAX_LENGTH;

  const displayText =
    expanded || !isLong
      ? description
      : description.slice(0, MAX_LENGTH) + "...";

  return (
    <p className="desc">
      {displayText}
      {isLong && (
        <span
          className="read-more"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? " Read less" : " Read more"}
        </span>
      )}
    </p>
  );
};

export default ProductDescription;
