import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import {
  GetChatsDocument,
  GetCurrentChatDocument,
  useApproveChatMutation,
  useChatActionsSubscription,
  User,
} from "../graphql/generated/schema";

interface Props {
  received?: User;
}

export default function FirstMessage({ received }: Props) {
  const { query } = useRouter();
  const client = useApolloClient();
  const [approved, setApproved] = useState(false);
  const [approve, { data }] = useApproveChatMutation();
  useChatActionsSubscription({
    variables: { chatId: String(query.chatId) },
    onSubscriptionData: ({ subscriptionData }) => {
      const action = subscriptionData.data?.chatActions;
      if (action === "approved") setApproved(true);
    },
  });
  useEffect(() => {
    const {getCurrentChat} = client.readQuery({
      query: GetCurrentChatDocument,
      variables: {
        chatId: String(query.chatId),
      },
    });
    setApproved(getCurrentChat?.approved);
  }, [query]);

  if (approved)
    return (
      <div className="rounded-xl bg-darkgreen overflow-hidden w-[25%]">
        <h3 className="text-white px-5 py-2 bg-[#3C8248] text-xl">
          Chat začal
        </h3>
        <p className="py-2 text-green-100  px-5 ">Nyní můžete psát do chatu</p>
      </div>
    );
  if (!received)
    return (
      <div className="rounded-xl bg-darkgreen overflow-hidden w-[25%]">
        <h3 className="text-white px-5 py-2 bg-[#3C8248] text-xl">
          Nový chat 💬
        </h3>
        <p className="py-2 text-green-100  px-5 ">
          Pro psaní do chatu musíte počkat na povolení druhého člena
        </p>
      </div>
    );
  return (
    <div className="rounded-xl bg-darkgreen overflow-hidden pb-2 w-[25%]">
      <h3 className="text-white px-5 py-2 bg-[#3C8248] text-xl">
        Nový chat 💬
      </h3>
      <p className="pt-2 text-green-100  px-5 mb-6">
        {received?.name} chce s vámi založit nový chat.
      </p>
      <div className="flex justify-end px-3 gap-x-2">
        <button className="px-3 py-1 bg-red-500 hover:bg-red-600 shadow-sm shadow-white transition-all rounded-xl">
          Zablokovat 🤨
        </button>
        <button
          onClick={async () => {
            const a = await approve({
              variables: { chatId: String(query.chatId) },
            });
          }}
          className="px-3 py-1 bg-green-500 hover:bg-green-600  shadow-sm shadow-white rounded-xl"
        >
          Povolit 👋
        </button>
      </div>
    </div>
  );
}
