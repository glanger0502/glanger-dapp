import { useEffect, useState } from "react";
import { useAccount } from 'wagmi';

export function useAddressState() {
    const { address, isConnected } = useAccount();
    const [addressState, setAddressState] = useState(false);
    useEffect(() => {
        if(isConnected) {
            setAddressState(true);
        }
        // setAddressState(false);
    }, [isConnected])

    return {addressState, address};
}