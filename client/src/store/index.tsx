import {create} from "zustand"

type State = {
    userPublicKey: string | null,
    account: number,
    count: number,
}
type Action = {
    setUserPublicKey: (key: string) => void;
    setAccount: (account: number) => void;
    setCount: (count: number) => void;
}

export const WalletStore = create<State & Action>((set)=>({
    userPublicKey: "",
    account: 0,
    count: 1,
    setUserPublicKey: (userPublicKey)=>set(()=>({userPublicKey: userPublicKey})),
    setAccount: (account) => set(() => ({ account: account })),
    setCount: (count) => set(() => ({ count: count })),
}))