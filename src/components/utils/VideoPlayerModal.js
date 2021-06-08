import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {Animated} from 'react-animated-css'
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
    position: relative;
    background: #ffffffbd;
    color: black;
    /* width: 45%; */
    /* height: 50%; */
    /* width: 100%; */
    height: 100%;
    width: 900px;
    border-radius: 5px;

h1 {
    padding: 25px 25px;
    font-weight: 600;
    text-transform: uppercase;
    color: #b460a8;
    /* color: #1c212a; */
    text-shadow: 0px 2px 15px rgba(0, 0, 0, 0.5);
    font-size: 1.3rem;
    letter-spacing: 1px;
}
`

const CloseModalButton = styled.div`
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 10;
    cursor: pointer;
    
    svg {
        font-size: 1.8rem;
        color: #4d5866;
        transition: transform .25s, opacity .25s;
    }
    
    svg:hover {
        color: #343a46;
        opacity: 1;
	    transform: scale(1.1) rotate(90deg);
    }
`

const VideoMissing = styled.div`
    padding: 25px 25px;
    text-align: center;

`

const VideoPlayerModal = ({showModal, setShowModal, media, youtubeVideo}) => {
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
                    <Animated animationIn='fadeInDown' animationInDuration={500}>
                        <ModalContent>
                            <h1>{media.title}</h1>
                            {youtubeVideo ?
                                <ReactPlayer
                                    // url={youtubeUrl + video.key}
                                    url={youtubeUrl + youtubeVideo.key}
                                    playing
                                    width="100%"
                                    height='420px'
                                ></ReactPlayer>
                                :
                                <VideoMissing>
                                    Video missing! Sorry for the inconvenience.
                                </VideoMissing>
                            }
                            <CloseModalButton>
                                <CloseOutlinedIcon onClick={() => setShowModal(prev => !prev)} />
                            </CloseModalButton>
                        </ModalContent>
                    </Animated>
                </Background>
            ) : null}
        </>
    )
}

export default VideoPlayerModal
