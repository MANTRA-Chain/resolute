import { bytesFromBase64 } from "cosmjs-types/helpers";

export const CheckForWasmMsgs = (msgs: Msg[]): Msg[] => {
  const updatedMsgs = [];
  for (let i = 0; i < msgs.length; i++) {
    if (msgs[i].typeUrl.includes("/cosmwasm.wasm.v1.")) {
      const byteMsg = Buffer.from(JSON.stringify(msgs[0].value.msg));
      switch(msgs[i].typeUrl) {
        case "/cosmwasm.wasm.v1.MsgExecuteContract": {
          updatedMsgs.push({
            typeUrl: msgs[i].typeUrl,
            value: {
              msg: byteMsg,
              funds: msgs[i].value.funds,
              sender: msgs[i].value.sender,
              contract: msgs[i].value.contract,
            }
          })
          break
        }
        case "/cosmwasm.wasm.v1.MsgInstantiateContract": {
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
          })
          break
        }
        case "/cosmwasm.wasm.v1.MsgInstantiateContract2": {
          updatedMsgs.push({
            typeUrl: msgs[i].typeUrl,
            value: {
              sender: msgs[i].value.sender,
              admin: msgs[i].value.admin,
              codeId: msgs[i].value.codeId,
              label: msgs[i].value.label,
              msg: byteMsg,
              funds: msgs[i].value.funds,
              salt: bytesFromBase64(msgs[i].value.salt),
              fixMsg: msgs[i].value.fixMsg,
            }
          })
          break
        }
        default: {
          throw new Error(`Unsupported wasm message type: ${msgs[i].typeUrl}`);
        }
      }
    } else {
      updatedMsgs.push(msgs[i]);
    }
  }
  return updatedMsgs;
}