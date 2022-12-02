import { useEffect, useState } from "react";
import { useAccount } from 'wagmi';

export function useConnectState() {
    // connected
    const { isConnected } = useAccount();
    const [connectState, setConnectState] = useState(false);
    useEffect(() => {
        if(isConnected) {
            setConnectState(true);
        }
    }, [isConnected])

    return connectState;
}