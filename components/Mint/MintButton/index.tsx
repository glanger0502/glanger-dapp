import { useChainState } from '../../../hooks/useChainState';
import { useMint } from '../../../hooks/useMint';

export default function MintNFTButton(props:{totalPrice:number, mintNum:number, connectState:boolean}) {
    
    const chainStatus = useChainState();
    const {disableMint, mint} = useMint(props.totalPrice, props.mintNum);

    return (
        <>
            <button className="btn btn-primary mx-2" disabled={!disableMint || chainStatus || !props.connectState} onClick={(e) => {e.preventDefault(); mint?.()}}>Mint</button>
        </>
    )
}