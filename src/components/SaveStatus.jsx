import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";

const LAST_UPDATED_AT_REFRESH_TIME = 5000;

const LastSavedAt = ({ savedAt }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const updatedLastUpdatedText = () => {
      if (!savedAt) return;

      setText(formatLastSavedAt(savedAt));
    };

    updatedLastUpdatedText();
    const interval = setInterval(
      updatedLastUpdatedText,
      LAST_UPDATED_AT_REFRESH_TIME
    );

    return () => clearInterval(interval);
  }, [savedAt]);

  return <span>{text}</span>;
};

const formatLastSavedAt = (savedAt) => {
  const currentTime = new Date();

  return formatDistance(savedAt, currentTime, {
    addSuffix: true,
  });
};

const SaveStatus = ({ savedAt }) => {
  if (!savedAt) {
    return <StatusIcon icon={FaExclamationCircle}>Not saved yet.</StatusIcon>;
  }

  return (
    <StatusIcon icon={FaCheckCircle}>
      Last saved <LastSavedAt savedAt={savedAt} />.
    </StatusIcon>
  );
};

const StatusIcon = ({ icon, children }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.35em",
        alignItems: "center",
      }}
    >
      {icon({ fontSize: 20 })}
      <span>{children}</span>
    </div>
  );
};

export { SaveStatus };
