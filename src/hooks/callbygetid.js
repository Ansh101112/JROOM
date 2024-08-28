"use client";

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const Callbygetid = (id) => {
  const [call, setcall] = useState();
  const [iscallLoading, setiscallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadcall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id,
        },
      });
      if (calls.length > 0) setcall(calls[0]);

      setiscallLoading(false);
    };
    loadcall();
  }, [client, id]);

  return { call, iscallLoading };
};
