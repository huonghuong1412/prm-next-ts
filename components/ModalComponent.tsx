import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Modal } from "react-responsive-modal";
import { XIcon } from "@heroicons/react/outline";

const closeIcon = (
    <span className="p-1 outline-none rounded-[50%] shadow-xl bg-white absolute -top-6 text-rose-600 hover:text-rose-400 -right-6 z-10">
        <XIcon className="h-6 w-6" />
    </span>
);

const ModalComponent = ({ open, closeModal, children, ...props }: any) => {
    const [width, setWidth] = useState<string>('')
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    useEffect(() => {
        if (isDesktopOrLaptop) {
            setWidth('40%')
        } else if (isTabletOrMobile) {
            setWidth('100%')
        }
    }, [isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isPortrait, isRetina])
    return (
        <>
            <Modal open={open} onClose={closeModal} closeIcon={closeIcon} center {...props}>
                {children}
            </Modal>
        </>
    )
}

export default ModalComponent