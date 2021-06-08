import {useParams, Link} from 'react-router-dom'

const Actor = () => {

    let {id} = useParams()

    return (
        <div className='container person'>
            person id: {id}
        </div>
    )
}

export default Actor
