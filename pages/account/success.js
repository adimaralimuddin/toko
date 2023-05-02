import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Success() {
  const { query } = useRouter();
  const { sessionId, userId } = query;

  useEffect(() => {
    if (!sessionId) return;
    getResult();
  }, [sessionId]);

  const getResult = async () => {
    const response = await fetch(
      `/api/stripe/session/${sessionId}?userId=${userId}`
    );
    const results = await response.json();
  };

  return (
    <div>
      <h1>payment success</h1>
      sessionId: {sessionId}
    </div>
  );
}
