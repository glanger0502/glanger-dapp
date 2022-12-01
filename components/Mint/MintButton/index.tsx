import { useChainState } from '../../../hooks/useChainState';
import { useMint } from '../../../hooks/useMint';

export default function MintNFTButton(props:{totalPrice:number, mintNum:number}) {
    
    const chainStatus = useChainState();
    const {disableMint, mint} = useMint(props.totalPrice, props.mintNum);

    return (
        <>
            <button className="btn btn-primary mx-2" disabled={!disableMint || chainStatus} onClick={(e) => {e.preventDefault(); mint?.()}}>Mint</button>
        </>
    )
}