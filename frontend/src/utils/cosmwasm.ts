export const CheckForWasmMsgs = (msgs: Msg[]): Msg[] => {
  const updatedMsgs = [];
  for (let i = 0; i < msgs.length; i++) {
    if (msgs[i].typeUrl.includes("/cosmwasm.wasm.v1.")) {
      const byteMsg = new Uint8Array(Buffer.from(JSON.stringify(msgs[0].value.msg)));
      updatedMsgs.push({
        typeUrl: msgs[i].typeUrl,
        value: {
          msg: byteMsg,
          admin: msgs[i].value.admin,
          codeId: msgs[i].value.codeId,
          funds: msgs[i].value.funds,
          label: msgs[i].value.label,
          sender: msgs[i].value.sender,
        }
      });
    } else {
      updatedMsgs.push(msgs[i]);
    }
  }
  return updatedMsgs;
}