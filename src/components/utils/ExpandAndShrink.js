import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpandAndShrink = ({seeAll, setSeeAll}) => {

    return (
        <>
            {seeAll ?
                <div className='controlContent' onClick={() => setSeeAll(prev => !prev)}>
                    <ExpandMoreIcon className='shrink' />
                    <p>Shrink</p>
                </div>
                :
                <div className='controlContent' onClick={() => setSeeAll(prev => !prev)}>
                    <ExpandMoreIcon className='expand' />
                    <p>Expand</p>
                </div>
            }
        </>
    )
}

export default ExpandAndShrink
