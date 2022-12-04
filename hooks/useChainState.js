import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

export function useChainState() {

    const { chain } = useNetwork();
    const [chainState, setChainState] = useState(false);
    useEffect(() => {
        console.log(chain);
        if(chain?.id == 5) {
            setChainState(true);
        }
    }, [chain]);

    return chainState
}