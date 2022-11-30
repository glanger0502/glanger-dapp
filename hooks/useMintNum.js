
import { useEffect, useState } from "react";

export function useMintNum() {
    const [mintNum, setMintNum] = useState(1);

    useEffect(() => {
        if(mintNum <= 0) {
            setMintNum(1);
        }

    }, [mintNum])

    return {mintNum, setMintNum};
}