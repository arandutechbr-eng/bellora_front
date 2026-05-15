import { api } from "./api";

export async function getMessages(requestId: number | string) {
  const response = await api.get(`/messages/request/${requestId}`);
  return response.data;
}

export async function createMessage(requestId: number | string, content: string) {
  const response = await api.post("/messages", {
    request_id: Number(requestId),
    content,
  });
  return response.data;
}
