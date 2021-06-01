import styled from 'styled-components'
import {useRef, useEffect, useCallback} from 'react'
import ReactPlayer from 'react-player'

const Background = styled.div`
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
background: rgba(0, 0, 0, .75);
z-index: 1000;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 30px;
`

const ModalContent = styled.div`
background: #ffffffbd;
color: black;
width: 45%;
height: 50%;

h1 {
    padding: 12px 20px;
    font-weight: 400;
}
`


const PlayerModal = ({showModal, setShowModal, movies}) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";

    // to close modal by clicking outside of it
    const modalRef = useRef()

    // to close modal by clicking outside of it
    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false)
        }
    }


    return (
        <>
            {showModal ? (
                <Background ref={modalRef} onClick={closeModal}>
                    <ModalContent>
                        <h1>Movie Name</h1>
                        <ReactPlayer
                            // url={youtubeUrl + video.key}
                            url='https://www.youtube.com/watch?v=-BQPKD7eozY'
                            playing
                            width="100%"
                            height='420px'
                        ></ReactPlayer>
                    </ModalContent>
                </Background>
            ) : null}
        </>
    )
}

export default PlayerModal
