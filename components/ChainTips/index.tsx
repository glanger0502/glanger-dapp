import { useChainState } from "../../hooks/useChainState"

export function ChainTips() {
    const chainStatus = useChainState();
    return (
        <>
        {chainStatus && <div className="absolute top-0 left-0 w-full flex bg-secondary"><div className=" mx-auto my-0 text-secondar">the current network is not Geoli Test </div></div>}
        </>
    )
}