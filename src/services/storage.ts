import UserFlowHandler from "./userFlowHandler";

export let SESSION = new UserFlowHandler();

export function resetSession() {
  SESSION = new UserFlowHandler();
}
